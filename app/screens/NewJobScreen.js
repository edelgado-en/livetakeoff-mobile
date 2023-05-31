import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView, TextInput, Button, TouchableWithoutFeedback } from 'react-native'
import * as Yup from 'yup'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useFormikContext } from 'formik'
import moment from 'moment'

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
import colors from '../config/colors'

const NewJobScreen = () => {
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0.0);
    const [customers, setCustomers] = useState([]);
    const [aircraftTypes, setAircraftTypes] = useState([]);
    const [airports, setAirports] = useState([]);
    const [fbos, setFbos] = useState([]);
    const [estimatedArrivalDate, setEstimatedArrivalDate] = useState(new Date());
    const [estimatedDepartureDate, setEstimatedDepartureDate] = useState(null);
    const [completeByDate, setCompleteByDate] = useState(null);

    const [estimatedArrivalDateOpen, setEstimatedArrivalDateOpen] = useState(false);
    const [estimatedDepartureDateOpen, setEstimatedDepartureDateOpen] = useState(false);
    const [completeByDateOpen, setCompleteByDateOpen] = useState(false);

    const [onSite, setOnSite] = useState(false);

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

    const handleArrivalDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || estimatedArrivalDate;
        setEstimatedArrivalDateOpen(false);
        setEstimatedArrivalDate(currentDate);

        const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
        console.log(formattedDate)
    }

    const handleSubmit = async (job, { resetForm }) => {
        setProgress(0);
        setUploadVisible(true);
        
        let selectedServices = [];
        selectedServices = selectedServices.concat(interiorServices.filter(service => service.selected === true));
        selectedServices = selectedServices.concat(exteriorServices.filter(service => service.selected === true));
        selectedServices = selectedServices.concat(otherServices.filter(service => service.selected === true));

        let selectedRetainerServices = [];
        selectedRetainerServices = selectedRetainerServices.concat(interiorRetainers.filter(service => service.selected === true));
        selectedRetainerServices = selectedRetainerServices.concat(exteriorRetainers.filter(service => service.selected === true));
        selectedRetainerServices = selectedRetainerServices.concat(otherRetainers.filter(service => service.selected === true));

        const selectedServicesIds = selectedServices.map(service => service.id);
        const selectedRetainerServicesIds = selectedRetainerServices.map(service => service.id);

        job.selectedServiceIds = selectedServicesIds;
        job.selectedRetainerServiceIds = selectedRetainerServicesIds;

        if (selectedServices.length === 0 && selectedRetainerServices.length === 0) {
            setUploadVisible(false);
            return alert("Please select at least one service.")
        }
        
        const formattedDate = moment(estimatedArrivalDate).toString();
        job.estimatedArrivalDate = formattedDate;

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

    const handleClearArrivalDate = () => {
        setEstimatedArrivalDate(null);
        setEstimatedArrivalDateOpen(false);
    }

    const handleOpenArrivalDate = () => {
        if (!estimatedArrivalDate) {
            setEstimatedArrivalDate(new Date());
        }

        setEstimatedArrivalDateOpen(true);
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

                <View>
                    <View style={styles.labelContainer}>
                        <AppText style={{ marginTop: 20 }}>Arrival Date</AppText>
                        <View style={styles.clearText}>
                            <Button 
                                title="clear" color={colors.primary}
                                onPress={handleClearArrivalDate}></Button>
                        </View>
                    </View>
                    <TouchableWithoutFeedback 
                        style={styles.datePickerContainer}
                         onPress={handleOpenArrivalDate}>
                            <View style={styles.datePickerContainer}>
                                <AppText>{estimatedArrivalDate ? estimatedArrivalDate.toString() : ''}</AppText>
                            </View>
                    </TouchableWithoutFeedback>
                    {estimatedArrivalDateOpen && (
                        <DateTimePicker
                        value={estimatedArrivalDate}
                        mode="datetime"
                        display="inline"
                        onChange={handleArrivalDateChange}
                        />
                    )}
                </View>

                <View style={styles.separator}></View>

                <FormServicePicker
                    label="Interior Services"
                    services={interiorServices}
                    updateServices={setInteriorServices}
                    name="selectedInteriorServices"
                />

                <View style={styles.separator}></View>

                <FormServicePicker
                    label="Exterior Services"
                    services={exteriorServices}
                    updateServices={setExteriorServices}
                    name="selectedExteriorServices"
                />

                <View style={styles.separator}></View>

                <FormServicePicker
                    label="Other Services"
                    services={otherServices}
                    updateServices={setOtherServices}
                    name="selectedOtherServices"
                />

                <View style={styles.separator}></View>

                <AppFormField
                    label="Comments"
                    maxLength={255}
                    multiline
                    name="comment"
                    numberOfLines={5}
                />

                <View style={styles.separator}></View>

                <AppText>Add Photos</AppText>
                <FormImagePicker name="images" />

                <View style={styles.separator}></View>

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

    },
    separator: {
        marginVertical: 30,
        borderBottomColor: defaultStyles.colors.light,
        width: '100%',
        borderBottomWidth: 1
    },
    clearText: {
        color: colors.primary,
        position: 'relative',
        top: 10,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    datePickerContainer: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: 'row',   
        width: '100%',
        padding: 15,
        marginVertical: 5,
    }
})

export default NewJobScreen