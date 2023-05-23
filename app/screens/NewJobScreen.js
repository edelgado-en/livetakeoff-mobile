import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native'
import * as Yup from 'yup'
import DateTimePicker from '@react-native-community/datetimepicker'

import AppForm from '../components/AppForm'
import AppFormField from '../components/AppFormField'
import AppFormPicker from '../components/AppFormPicker'
import SubmitButton from '../components/SubmitButton'
import Screen from '../components/Screen'
import FormImagePicker from '../components/FormImagePicker'
import CategoryPickerItem from '../components/CategoryPickerItem'
import AppText from '../components/AppText'

import defaultStyles from '../config/styles'    

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

const interiorServices = [
    { label: "Interior Service 1", value: 1 },
    { label: "Interior Service 2", value: 2 },
]

const exteriorServices = [
    { label: "Exterior Service 1", value: 1 },
    { label: "Exterior Service 2", value: 2 },
]


const NewJobScreen = () => {
    return (
    <ScrollView>
        <Screen style={styles.container}>
            <AppForm
                initialValues={{
                    tailNumber: "",
                    customer: null,
                    aircraftType: null,
                    airport: null,
                    fbo: null,
                    comment: "",
                    images: [],
                    arrivalDate: null
                }}
                onSubmit={(values) => console.log(values)}
                >
                <AppFormField 
                    name="tailNumber" />

                <AppFormPicker 
                    label="Customer"
                    items={customers}
                    name="customer"
                    placeholder="Customer"
                    numberOfColumns={3}
                    width="100%"
                    PickerItemComponent={CategoryPickerItem}
                />

                <AppFormPicker 
                    label="Aircraft Type"
                    items={aircraftTypes}
                    name="aircraftType"
                    placeholder="Aircraft Type"
                    numberOfColumns={3}
                    width="100%"
                    PickerItemComponent={CategoryPickerItem}
                />
                
                <AppFormPicker 
                    label="Airport"
                    items={airports}
                    name="airport"
                    placeholder="Airport"
                    numberOfColumns={3}
                    width="100%"
                    PickerItemComponent={CategoryPickerItem}
                />

                <AppFormPicker 
                    label="FBO"
                    items={fbos}
                    name="fbo"
                    placeholder="FBO"
                    numberOfColumns={3}
                    width="100%"
                    PickerItemComponent={CategoryPickerItem}
                />

                <View style={{ marginTop: 20 }}></View>
                <AppFormField
                    maxLength={255}
                    multiline
                    name="comment"
                    numberOfLines={5}
                />

                <AppText style={{ marginTop: 20 }}>Add Photos</AppText>
                <FormImagePicker name="images" />

                <View style={{ marginTop: 20 }}></View>
                <SubmitButton title="Create Job" />
            </AppForm> 
        </Screen>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    textContainer: {
        backgroundColor: defaultStyles.colors.light,
        //color: defaultStyles.colors.medium,
        borderRadius: 25,
        flexDirection: 'row',   
        width: '100%',
        padding: 15,
        marginVertical: 5,
    },
    text: {

    }
})

export default NewJobScreen