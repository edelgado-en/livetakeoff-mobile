import React from 'react'
import { useFormikContext } from 'formik'

import ErrorMessage from './ErrorMessage'
import ServiceInputList from './ServiceInputList'
import AppText from './AppText'

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
        {label && <AppText style={{ marginTop: 20 }}>{label}</AppText>}
        <ServiceInputList 
            services={services}
            onToggleService={toggleService}
        />
    </>
  )
}

export default FormServicePicker