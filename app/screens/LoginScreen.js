import React, { useState } from 'react'
import { StyleSheet, Image } from 'react-native'

import Screen from '../components/Screen'
import AppForm from '../components/AppForm'
import AppFormField from '../components/AppFormField'
import SubmitButton from '../components/SubmitButton'
import ErrorMessage from '../components/ErrorMessage'

import authApi from '../api/auth'
import useAuth from '../auth/useAuth'

const LoginScreen = () => {
    const auth = useAuth();
    const [loginFailed, setLoginFailed] = useState(false)

    const handleSubmit = async ({ username, password }) => {
        const result = await authApi.login(username, password);
        if (!result.ok) {
            setLoginFailed(true);
            return;
        } 

        setLoginFailed(false);

        auth.logIn(result.data.access);
    }

    return (
        <Screen style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('../../assets/logo-text.jpg')}
            />
            <AppForm
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={handleSubmit}
            >
                <ErrorMessage error="Invalid username and/or password." visible={loginFailed} />
                <AppFormField 
                    placeholder="Username"
                    autoCorrect={false}
                    name="username"
                    icon="account"
                    autoCapitalize="none"
                />

                <AppFormField 
                    placeholder="Password"
                    autoCorrect={false}
                    name="password"
                    autoCapitalize="none"
                    secureTextEntry
                    icon="lock"
                    textContentType="password"
                />

                <SubmitButton title="Log In" />
            </AppForm>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
    }
})


export default LoginScreen