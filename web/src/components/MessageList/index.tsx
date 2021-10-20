import Logo from '../../assets/logo.svg'

import styles from './styles.module.scss'

export function MessageList() {
  return (
    <div className={styles.MessageListWrapper}>
      <img src={Logo} alt="DoWhile" draggable={false} />
      <ul className={styles.MessageList}>
        <li className={styles.Message}>
        <p className={styles.MessageContent}>Não vejo a hora de começar! 🚀</p>
          <div className={styles.MessageAuthor}>
            <div className={styles.AuthorAvatar}>
              <img src="https://github.com/gustavosrr.png" alt="Gustavo Rodrigues" />
            </div>
            <span>Gustavo Rodrigues</span>
          </div>
        </li>
        <li className={styles.Message}>
          <p className={styles.MessageContent}>Não vejo a hora de começar! 🚀</p>
          <div className={styles.MessageAuthor}>
            <div className={styles.AuthorAvatar}>
              <img src="https://github.com/gustavosrr.png" alt="Gustavo Rodrigues" />
            </div>
            <span>Gustavo Rodrigues</span>
          </div>
        </li>
        <li className={styles.Message}>
        <p className={styles.MessageContent}>Não vejo a hora de começar! 🚀</p>
          <div className={styles.MessageAuthor}>
            <div className={styles.AuthorAvatar}>
              <img src="https://github.com/gustavosrr.png" alt="Gustavo Rodrigues" />
            </div>
            <span>Gustavo Rodrigues</span>
          </div>
        </li>
      </ul>
    </div>
  )
}