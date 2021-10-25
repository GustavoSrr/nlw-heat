import React from 'react'
import { View } from 'react-native'

import { useAuth } from '../../hooks/Auth'

import { Button } from '../Button'

import { COLORS } from '../../theme'
import { Styles } from './styles'

export function SignInBox() {
  const { signIn, isSigningIn } = useAuth()

  return (
    <View style={Styles.container}>
      <Button
        icon="github"
        title="Entrar com GitHub"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        onPress={signIn}
        isLoading={isSigningIn}
      />
    </View>
  )
}
