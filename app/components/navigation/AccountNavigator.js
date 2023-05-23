import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AccountScreen from '../../screens/AccountScreen'
import ResetPasswordScreen from '../../screens/ResetPasswordScreen'

const Stack = createStackNavigator()

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
    </Stack.Navigator>
  )
}

export default AccountNavigator