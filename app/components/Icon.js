import React from 'react'
import { View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'


const Icon = ({
    name,
    size = 25,
    backgroundColor = '#000',
    iconColor = '#fff'}) => {
  return (
    <View style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
    </View>
  )
}

export default Icon