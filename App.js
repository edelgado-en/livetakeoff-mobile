import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import navigationTheme from './app/components/navigation/navigationTheme';
import AppNavigator from './app/components/navigation/AppNavigator';

import WelcomeScreen from './app/screens/WelcomeScreen';
import AuthContext from './app/auth/context';
import OfflineNotice from './app/components/OfflineNotice';

import AuthNavigator from './app/components/navigation/AuthNavigator';

{/* <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
    </NavigationContainer> */}

export default function App() {
    const [user, setUser] = useState();

    return (
     <AuthContext.Provider value={{ user, setUser }}>
         <OfflineNotice />
         <NavigationContainer theme={navigationTheme}>
            <AuthNavigator />
        </NavigationContainer>
     </AuthContext.Provider>
    
  );
}

