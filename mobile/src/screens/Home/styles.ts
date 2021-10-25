import { StyleSheet } from 'react-native'
import { getStatusBarHeight } from "react-native-iphone-x-helper"

import { COLORS } from '../../theme'

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK_SECONDARY,
    paddingTop: getStatusBarHeight() + 20
  }
})