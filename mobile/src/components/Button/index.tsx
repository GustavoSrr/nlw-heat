import React from 'react'
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text, 
  ColorValue,
  ActivityIndicator
 } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { Styles } from './styles'

type ButtonProps = TouchableOpacityProps & {
  title: string;
  color: ColorValue;
  backgroundColor: ColorValue;
  icon?: React.ComponentProps<typeof AntDesign>['name'];
  isLoading?: boolean;
}

export function Button({
  title,
  color,
  backgroundColor,
  icon,
  isLoading = false,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[Styles.button, { backgroundColor }]}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {
        isLoading ? <ActivityIndicator color={color}/> :
        <>
          <AntDesign name={icon} size={24} style={Styles.icon}/>
          <Text style={[Styles.title, { color }]}>{title}</Text>
        </>
      }
    </TouchableOpacity>
  )
}
