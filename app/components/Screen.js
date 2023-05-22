import React from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import Constants from 'expo-constants';

function Screen({ children, style }) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            <ScrollView>
                <View style={style}>{children}</View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1 //this will make the screen take up the entire space of the screen
    }
})

export default Screen;
