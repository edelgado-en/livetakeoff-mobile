import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import * as Yup from 'yup'

import AppForm from '../components/AppForm'
import AppFormField from '../components/AppFormField'
import SubmitButton from '../components/SubmitButton'
import Screen from '../components/Screen'

const NewJobScreen = () => {
  return (
    <Screen>
        <View>
            <Text>New Job</Text>
        </View>
    </Screen>
  )
}

export default NewJobScreen