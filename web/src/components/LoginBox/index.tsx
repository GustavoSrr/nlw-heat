import { useContext } from 'react'
import { FaGithub } from 'react-icons/fa'
import { AuthContext } from '../../contexts/AuthContext'

import styles from './styles.module.scss'

export function LoginBox() {
  const { signInUrl } = useContext(AuthContext)
  
  return (
    <div className={styles.LoginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem.</strong>
      <a href={signInUrl} className={styles.SignInWithGithub}>
        <FaGithub size="24"/> Entrar com GitHub
      </a>
    </div>
  )
}