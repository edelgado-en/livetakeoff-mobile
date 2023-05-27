import React from 'react'
import AppText from './AppText'
import { TouchableOpacity, StyleSheet } from 'react-native'

import colors from '../config/colors'

function PickerItem({ label, onPress }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <AppText style={styles.text}>{label}</AppText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        padding: 15,
    },
    container: {
        borderBottomWidth: 1,
        borderBottomColor: colors.light,
    }

})


export default PickerItem;