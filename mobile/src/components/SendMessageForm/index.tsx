import React, { useState } from 'react'
import { Alert, Keyboard, TextInput, View } from 'react-native'
import { Button } from '../Button'

import { COLORS } from '../../theme'
import { Styles } from './styles'
import { api } from '../../services/api'

export function SendMessageForm() {
  const [message, setMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)

  async function handleMessageSubmit() {
    const formattedMessage = message.trim()

    if(formattedMessage.length > 0) {
      setSendingMessage(true)
      await api.post('messages', { message: formattedMessage })

      setMessage('')
      Keyboard.dismiss()
      setSendingMessage(false)
    } else {
      Alert.alert('Escreva sua expectativa para o evento.')
    }
  }

  return (
    <View style={Styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual é a sua expectativa para o evento?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        style={Styles.input}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
      />
      <Button
        title="Enviar mensagem"
        color={COLORS.WHITE}
        backgroundColor={COLORS.PINK}
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
  )
}
