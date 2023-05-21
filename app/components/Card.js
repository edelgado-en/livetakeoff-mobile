import React from 'react'
import { View, TouchableHighlight } from 'react-native'

import colors from '../config/colors'

const Card = ({ onPress, children }) => {
  return (
    <TouchableHighlight
        underlayColor={colors.light}
        onPress={onPress}
    >
        <View style={styles.card}>
            <View style={styles.detailsContainer}>
                {children}
            </View>
        </View>

    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: 'hidden',
    },
    detailsContainer: {
        padding: 20,
    },
})

export default Card;