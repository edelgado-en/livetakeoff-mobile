import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import * as Yup from 'yup'

import AppForm from '../components/AppForm'
import AppFormField from '../components/AppFormField'
import SubmitButton from '../components/SubmitButton'
import Screen from '../components/Screen'
import FormImagePicker from '../components/FormImagePicker'

const NewJobScreen = () => {
  return (
    <Screen style={styles.container}>
        <AppForm
            initialValues={{
                tailNumber: "",
                customer: null,
                aircraftType: null,
                airport: null,
                fbo: null,
                comment: "",
                images: []
            }}
            onSubmit={(values) => console.log(values)}
            >
            <FormImagePicker name="images" />

        </AppForm>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
})

export default NewJobScreen