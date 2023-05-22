import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import * as Yup from 'yup'

import AppForm from '../components/AppForm'
import AppFormField from '../components/AppFormField'
import AppFormPicker from '../components/AppFormPicker'
import SubmitButton from '../components/SubmitButton'
import Screen from '../components/Screen'
import FormImagePicker from '../components/FormImagePicker'
import CategoryPickerItem from '../components/CategoryPickerItem'

const customers = [
    { label: "Customer 1", value: 1 },
    { label: "Customer 2", value: 2 },
]

const aircraftTypes = [
    { label: "Aircraft Type 1", value: 1 },
    { label: "Aircraft Type 2", value: 2 },
]

const airports = [
    { label: "Airport 1", value: 1 },
    { label: "Airport 2", value: 2 },
]

const fbos = [
    { label: "FBO 1", value: 1 },
    { label: "FBO 2", value: 2 },
]



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
            <AppFormField name="tailNumber" placeholder="Tail number" />

            <AppFormPicker 
                items={customers}
                name="customer"
                placeholder="Customer"
                numberOfColumns={3}
                width="100%"
                PickerItemComponent={CategoryPickerItem}
            />

            <AppFormPicker 
                items={aircraftTypes}
                name="aircraftType"
                placeholder="Aircraft Type"
                numberOfColumns={3}
                width="100%"
                PickerItemComponent={CategoryPickerItem}
            />

            <AppFormPicker 
                items={airports}
                name="airport"
                placeholder="Airport"
                numberOfColumns={3}
                width="100%"
                PickerItemComponent={CategoryPickerItem}
            />

            <AppFormPicker 
                items={fbos}
                name="fbo"
                placeholder="FBO"
                numberOfColumns={3}
                width="100%"
                PickerItemComponent={CategoryPickerItem}
            />

            <AppFormField 
                maxLength={255}
                multiline
                name="comment"
                numberOfLines={5}
                placeholder="Add a comment"
            />

            <FormImagePicker name="images" />
            <SubmitButton title="Create Job" />
        </AppForm>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})

export default NewJobScreen