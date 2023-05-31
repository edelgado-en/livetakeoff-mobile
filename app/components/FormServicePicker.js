import React from 'react'
import { useFormikContext } from 'formik'
import { View, StyleSheet } from 'react-native'
import ErrorMessage from './ErrorMessage'
import ServiceInputList from './ServiceInputList'
import AppText from './AppText'
import colors from '../config/colors'

const FormServicePicker = ({ label, services, name, updateServices }) => {

    const handleAdd = (service) => {
        const updatedServices = services.map((s) => {
            if (s.id === service.id) {
                return { ...s, selected: true }
            } else {
                return { ...s}
            }
        }) 

        updateServices(updatedServices)
    }

    const handleRemove = (service) => {
        const updatedServices = services.map((s) => {
            if (s.id === service.id) {
                return { ...s, selected: false }
            } else {
                return { ...s}
            }
        })

        updateServices(updatedServices)
    }

    const toggleService = (service) => {
        if (service.selected) {
            handleRemove(service)
        } else {
            handleAdd(service)
        }
    }

  return (
    <>
        <View style={styles.labelContainer}>
            <AppText>{label}</AppText>
            <AppText style={{ color: colors.medium, marginLeft: 10 }}>(Tap to select)</AppText>
        </View>
        <ServiceInputList 
            services={services}
            onToggleService={toggleService}
        />
    </>
  )
}

const styles = StyleSheet.create({
    labelContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    }
})

export default FormServicePicker