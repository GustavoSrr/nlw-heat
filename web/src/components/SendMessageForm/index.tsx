import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import { VscSignOut } from 'react-icons/vsc'
import { FaGithub } from 'react-icons/fa'

import styles from './styles.module.scss'
import { api } from '../../services/api'

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext)

  const [message, setMessage] = useState('')

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault()

    if(!message.trim()) return
    await api.post('messages', { message })

    setMessage('')
  }

  return (
    <div className={styles.SendMessageFormWrapper}>
      <button className={styles.SignOutBtn} onClick={signOut}>
        <VscSignOut size="31" />
      </button>
      <header className={styles.UserInfo}>
        <div className={styles.UserImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.UserName}>{user?.name}</strong>
        <span className={styles.UserGitHub}>
          <FaGithub size="16"/>
          {user?.login}
        </span>
      </header>
      <form className={styles.SendMessageForm} onSubmit={handleSendMessage}>
        <label htmlFor="Message">Mensagem</label>
        <textarea
          name="Message"
          id="Message"
          placeholder="Qual é a sua expectativa para o evento?"
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}