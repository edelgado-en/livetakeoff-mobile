import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import navigationTheme from './app/components/navigation/navigationTheme';
import AppNavigator from './app/components/navigation/AppNavigator';

import LoginScreen from './app/screens/LoginScreen';
import AccountScreen from './app/screens/AccountScreen';

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
    </NavigationContainer>
  );
}

