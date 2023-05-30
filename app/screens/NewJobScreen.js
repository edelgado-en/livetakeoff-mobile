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
import FormServicePicker from '../components/FormServicePicker'

import defaultStyles from '../config/styles' 

import UploadScreen from './UploadScreen'

import jobApi from '../api/job'

const NewJobScreen = () => {
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0.0);
    const [customers, setCustomers] = useState([]);
    const [aircraftTypes, setAircraftTypes] = useState([]);
    const [airports, setAirports] = useState([]);
    const [fbos, setFbos] = useState([]);

    const [interiorServices, setInteriorServices] = useState([]);
    const [exteriorServices, setExteriorServices] = useState([]);
    const [otherServices, setOtherServices] = useState([]);

    const [interiorRetainers, setInteriorRetainers] = useState([]);
    const [exteriorRetainers, setExteriorRetainers] = useState([]);
    const [otherRetainers, setOtherRetainers] = useState([]);

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

        const interior = [];
        const exterior = [];
        const other = [];

        result.data.services.forEach(service => {
            if (service.category === "I") {
                interior.push(service);
            
            } else if (service.category === "E") {
                exterior.push(service);
            
            } else {
                other.push(service);
            }
        })

        setInteriorServices(interior);
        setExteriorServices(exterior);
        setOtherServices(other);

        const interiorRetainers = [];
        const exteriorRetainers = [];
        const otherRetainers = [];

        result.data.retainer_services.forEach(retainerservice => {
            if (retainerservice.category === "I") {
                interiorRetainers.push(retainerservice);
            
            } else if (retainerservice.category === "E") {
                exteriorRetainers.push(retainerservice);
            
            } else {
                otherRetainers.push(retainerservice);
            }
        })

        setInteriorRetainers(interiorRetainers);
        setExteriorRetainers(exteriorRetainers);
        setOtherRetainers(otherRetainers);

    }

    const handleSubmit = async (job, { resetForm }) => {
        setProgress(0);
        setUploadVisible(true);
        
        const result = await jobApi.createJob(
                            job,
                            (progress) => setProgress(progress)
        );

        if (!result.ok) {
            console.log(result)
            setUploadVisible(false);
            return alert("Could not create job.")
        }

        resetForm();
    }

    return (
        <Screen style={styles.container}>
            <UploadScreen 
                onDone={() => setUploadVisible(false)}
                progress={progress}
                visible={uploadVisible}
            />
            <AppForm
                initialValues={{
                    tailNumber: "",
                    customer: null,
                    aircraftType: null,
                    airport: null,
                    fbo: null,
                    comment: "",
                    images: [],
                    selectedInteriorServices: [],
                    selectedExteriorServices: [],
                    selectedOtherServices: [],
                    arrivalDate: null
                }}
                onSubmit={handleSubmit}
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

                <FormServicePicker
                    label="Interior Services"
                    services={interiorServices}
                    updateServices={setInteriorServices}
                    name="selectedInteriorServices"
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