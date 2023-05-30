import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import NewJobButton from '../NewJobButton'
import NewJobScreen from '../../screens/NewJobScreen'
import AccountScreen from '../../screens/AccountScreen'

import AccountNavigator from './AccountNavigator'

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
        <Tab.Screen 
            name="Home"
            component={Screen1}
            options={{
                tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }}
        />
        
        <Tab.Screen
            name="Create Job"
            component={NewJobScreen}
            options={({ navigation }) => ({
                tabBarButton: () => (
                <NewJobButton
                    onPress={() => navigation.navigate("Create Job")}
                />
                ),
                tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                    name="plus-circle"
                    color={color}
                    size={size}
                />
                ),
            })}
        />
        
        <Tab.Screen 
            name="AccountScreen"
            component={AccountNavigator}
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
            }}    
        />
    </Tab.Navigator>
  )
}

export default AppNavigator