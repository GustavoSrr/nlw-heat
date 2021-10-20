import { FaGithub } from 'react-icons/fa'

import styles from './styles.module.scss'

export function LoginBox() {
  return (
    <div className={styles.LoginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem.</strong>
      <a href="" className={styles.SignInWithGithub}>
        <FaGithub size="24"/> Entrar com GitHub
      </a>
    </div>
  )
}