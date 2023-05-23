import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import navigationTheme from './app/components/navigation/navigationTheme';
import AppNavigator from './app/components/navigation/AppNavigator';

import WelcomeScreen from './app/screens/WelcomeScreen';

{/* <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
    </NavigationContainer> */}

export default function App() {
  return (
      <WelcomeScreen />
    
  );
}

