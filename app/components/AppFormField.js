import { StyleSheet } from 'react-native';
import React from 'react'
import { useFormikContext } from 'formik';

import ErrorMessage from './ErrorMessage';
import AppTextInput from './AppTextInput';
import AppText from './AppText';

const AppFormField = ({ name, ...otherProps }) => {
   const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

    return (
        <>
            <AppTextInput
                onChangeText={handleChange(name)}
                onBlur={() => setFieldTouched(name)}
                width="100%"
                {...otherProps}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>    
    )
}

const styles = StyleSheet.create({
    label: {
        marginTop: 10
    }
})

export default AppFormField