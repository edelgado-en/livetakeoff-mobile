import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik'

import AppPicker from './AppPicker'
import ErrorMessage from './ErrorMessage'
import AppText from './AppText'

const AppFormPicker = ({
    items,
    name,
    numberOfColumns,
    PickerItemComponent,
    placeholder,
    width,
    label
}) => {
    const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
        {label && <AppText style={styles.label}>{label}</AppText>}
        <AppPicker
            items={items}
            numberOfColumns={numberOfColumns}
            onSelectItem={(item) => setFieldValue(name, item)}
            PickerItemComponent={PickerItemComponent}
            placeholder={placeholder}
            selectedItem={values[name]}
            width={width}
        />
         <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  )
}

const styles = StyleSheet.create({
    label: {
        marginTop: 20,
    }
})

export default AppFormPicker