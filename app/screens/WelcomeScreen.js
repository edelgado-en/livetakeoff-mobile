import { View, Text, ImageBackground, StyleSheet, Image, Button } from 'react-native'
import React from 'react'

import AppButton from '../components/AppButton'

const WelcomeScreen = () => {
  return (
    <View style={styles.background}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../../assets/logo-text.jpg")} />
            <Text style={styles.tagline}>Aircraft interior and exterior cleaning and detailing</Text>
        </View>
        <View style={styles.buttonsContainer}>
            <AppButton
            title="Login"
            />
            <AppButton
            title="Register"
            color="secondary"
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    buttonsContainer: {
        padding: 20,
        width: "100%",
    },
    logo: {
        width: 150,
        height: 150,
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center",
    },
    tagline: {
        fontSize: 25,
        fontWeight: "600",
        padding: 40,
    },
})

export default WelcomeScreen