import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

const Screen1 = () => {
    return (
        <View>
            <Text>Screen 1</Text>
        </View>
    )
}

const Screen2 = () => {
    return (
        <View>
            <Text>Screen 2</Text>
        </View>
    )
}

const AppNavigator = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Screen 1" component={Screen1} />
        <Tab.Screen name="Screen 2" component={Screen2} />
    </Tab.Navigator>
  )
}

export default AppNavigator