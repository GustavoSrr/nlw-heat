import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import io from 'socket.io-client'

import Logo from '../../assets/logo.svg'

import styles from './styles.module.scss'

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

const messagesQueue: Message[] = [] 

const socket = io('http://localhost:4000')

socket.on('new_message', (newMessage: Message) => {
  messagesQueue.push(newMessage)
})

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    setInterval(() => {
      if(messagesQueue.length > 0) {
        setMessages(prevState => [
            messagesQueue[0],
            prevState[0],
            prevState[1]
          ].filter(Boolean))

        messagesQueue.shift()
      }
    }, 3000)
  }, [])

  useEffect(() => {
    api.get<Message[]>('messages/last3').then(response => {
      setMessages(response.data)
    })
  }, [])

  return (
    <div className={styles.MessageListWrapper}>
      <img src={Logo} alt="DoWhile" draggable={false} />
      <ul className={styles.MessageList}>
        {
          messages.map(message => {
            return (
              <li className={styles.Message} key={message.id}>
                <p className={styles.MessageContent}>{message.text}</p>
                <div className={styles.MessageAuthor}>
                  <div className={styles.AuthorAvatar}>
                    <img src={message.user.avatar_url} alt={message.user.name} />
                  </div>
                  <span>{message.user.name}</span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}