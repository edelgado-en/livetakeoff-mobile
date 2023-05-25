import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native'
import * as Yup from 'yup'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useFormikContext } from 'formik'

import AppForm from '../components/AppForm'
import AppFormField from '../components/AppFormField'
import AppFormPicker from '../components/AppFormPicker'
import SubmitButton from '../components/SubmitButton'
import Screen from '../components/Screen'
import FormImagePicker from '../components/FormImagePicker'
import CategoryPickerItem from '../components/CategoryPickerItem'
import AppText from '../components/AppText'

import defaultStyles from '../config/styles' 

import UploadScreen from './UploadScreen'

import jobApi from '../api/job'

const NewJobScreen = () => {
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [aircraftTypes, setAircraftTypes] = useState([]);
    const [airports, setAirports] = useState([]);
    const [fbos, setFbos] = useState([]);

    useEffect(() => {
        getFormInfo();
    }, [])

    const getFormInfo = async () => {
        const result = await jobApi.getJobFormInfo();
        if (!result.ok) {
            console.log(result);
            return;
        }

        setCustomers(result.data.customers);
        setAircraftTypes(result.data.aircraft_types);
        setAirports(result.data.airports);
        setFbos(result.data.fbos);

        
    }

    const handleSubmit = async (job, { resetForm }) => {
        setProgress(0);
        setUploadVisible(true);

    }

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
                    images: [],
                    arrivalDate: null
                }}
                onSubmit={(values) => console.log(values)}
                >
                <AppFormField 
                    label="Tail Number"
                    name="tailNumber" />

                <AppFormPicker 
                    label="Customer"
                    items={customers}
                    name="customer"
                    numberOfColumns={3}
                    width="100%"
                    PickerItemComponent={CategoryPickerItem}
                />

                <AppFormPicker 
                    label="Aircraft Type"
                    items={aircraftTypes}
                    name="aircraftType"
                    numberOfColumns={3}
                    width="100%"
                    PickerItemComponent={CategoryPickerItem}
                />
                
                <AppFormPicker 
                    label="Airport"
                    items={airports}
                    name="airport"
                    numberOfColumns={3}
                    width="100%"
                    PickerItemComponent={CategoryPickerItem}
                />

                <AppFormPicker 
                    label="FBO"
                    items={fbos}
                    name="fbo"
                    numberOfColumns={3}
                    width="100%"
                    PickerItemComponent={CategoryPickerItem}
                />

                <View style={{ marginTop: 20 }}></View>
                <AppFormField
                    label="Comments"
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