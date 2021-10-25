import React from 'react'
import { Text, View } from 'react-native'
import { MotiView } from 'moti'

import { UserPhoto } from '../UserPhoto'

import { Styles } from './styles'

export type MessageProps = {
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
  id: string;
}

type Props = {
  data: MessageProps;
}

export function Message({ data }: Props) {
  return (
    <MotiView
      style={Styles.container}
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{type: 'timing', duration: 700}}
    >
      <Text style={Styles.message}>{data.text}</Text>
      <View style={Styles.footer}>
        <UserPhoto
          imageUri={data.user.avatar_url}
          sizes="small"
        />
        <Text style={Styles.userName}>{data.user.name}</Text>
      </View>
    </MotiView>
  )
}
