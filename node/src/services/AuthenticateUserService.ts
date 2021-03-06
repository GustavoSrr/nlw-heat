/*
1. Receber o code (string)
2. Recuperar o access_token do GitHub
3. Recuperar informações do user no GitHub
4. Verificar se o usuário existe no banco de dados
  ---- Sim = Gera um token
  ---- Não = Criar usuário e gerar token
5. Retornar o token com informações do usuário
*/

import axios from 'axios'
import { sign } from 'jsonwebtoken'
import { prismaClient } from '../prisma'

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  login: string;
  name: string;
  avatar_url: string;
  id: number;
}

export class AuthenticateUserService {
  async execute (code: string) {
    const url = 'https://github.com/login/oauth/access_token'

    const { data: AccessTokenResponse } =
      await axios.post<IAccessTokenResponse>(url, null, {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code
        },
        headers: {
          Accept: 'application/json'
        }
      })

    const response = await axios.get<IUserResponse>(
      'https://api.github.com/user',
      {
        headers: {
          authorization: `Bearer ${AccessTokenResponse.access_token}`
        }
      }
    )

    const { name, login, avatar_url, id } = response.data

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id
      }
    })

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          name,
          login,
          avatar_url,
          github_id: id
        }
      })
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id
        }
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d'
      }
    )

    return { token, user }
  }
}
