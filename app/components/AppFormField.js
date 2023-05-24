import React from 'react'
import { useFormikContext } from 'formik';

import ErrorMessage from './ErrorMessage';
import AppTextInput from './AppTextInput';

const AppFormField = ({ name, ...otherProps }) => {
   const { setFieldTouched, handleChange, errors, touched, values } = useFormikContext();

    return (
        <>
            <AppTextInput
                onChangeText={handleChange(name)}
                onBlur={() => setFieldTouched(name)}
                value={values[name]}
                width="100%"
                {...otherProps}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>    
    )
}

export default AppFormField