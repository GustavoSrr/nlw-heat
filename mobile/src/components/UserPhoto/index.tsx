import React from 'react'

import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient' 

import DefaultAvatarImg from '../../assets/avatar.png'

import { COLORS } from '../../theme'
import { Styles } from './styles'

type UserPhotoProps = {
  imageUri: string | undefined
  sizes?: 'small' | 'normal'
}

const Sizes = {
  small: {
    containerSize: 32,
    avatarSize: 28
  },
  normal: {
    containerSize: 48,
    avatarSize: 42
  }
}

const DefaultAvatar = Image.resolveAssetSource(DefaultAvatarImg).uri

export function UserPhoto ({ imageUri, sizes = 'normal' } : UserPhotoProps) {
  const { containerSize, avatarSize } = Sizes[sizes]

  return (
    <LinearGradient
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.9, y: 1}}
      colors={[COLORS.PINK, COLORS.YELLOW]}
      style={[Styles.container, {
        width: containerSize,
        height: containerSize,
        borderRadius: containerSize / 2
      }]}
    >
      <Image
        source={{ uri: imageUri || DefaultAvatar }}
        style={[Styles.avatar, {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2
        }]}
      />
    </LinearGradient>
  )
}
