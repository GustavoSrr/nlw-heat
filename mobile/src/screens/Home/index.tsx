import React from "react"
import { useAuth } from "../../hooks/Auth"

import { View, KeyboardAvoidingView, Platform } from "react-native"

import { Header } from "../../components/Header"
import { MessageList } from "../../components/MessageList"
import { SendMessageForm } from "../../components/SendMessageForm"
import { SignInBox } from "../../components/SignInBox"

import { Styles } from "./styles"

export function Home() {
  const { user } = useAuth()
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={Styles.container}>
        <Header />
        <MessageList />
        {user ? <SendMessageForm /> : <SignInBox />}
      </View>
    </KeyboardAvoidingView>
  )
}