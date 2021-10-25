import React from 'react'
import { useAuth } from '../../hooks/Auth'
import { View, Text, TouchableOpacity } from 'react-native'

import { UserPhoto } from '../UserPhoto'

import Logo from '../../assets/logo.svg'

import { Styles } from './styles'

export function Header () {
  const { user, signOut } = useAuth()

  return (
    <View style={Styles.container}>
      <Logo />
      <View style={Styles.logoutView}>
        { user &&
        <TouchableOpacity>
          <Text style={Styles.logoutText} onPress={signOut}>Sair</Text>
        </TouchableOpacity>}
        <UserPhoto imageUri={user?.avatar_url} />
      </View>
    </View>
  )
}
