import { Text, StyleSheet } from 'react-native'
import React from 'react'

import Screen from '../components/Screen'

const ResetPasswordScreen = () => {
  return (
    <Screen style={styles.container}>
      <Text>Reset PasswordS creen</Text>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})

export default ResetPasswordScreen