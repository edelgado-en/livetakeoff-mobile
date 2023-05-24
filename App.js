import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import navigationTheme from './app/components/navigation/navigationTheme';
import AppNavigator from './app/components/navigation/AppNavigator';
import AuthNavigator from './app/components/navigation/AuthNavigator';

import AuthContext from './app/auth/context';
import OfflineNotice from './app/components/OfflineNotice';

export default function App() {
    const [user, setUser] = useState();

    return (
     <AuthContext.Provider value={{ user, setUser }}>
         <OfflineNotice />
         <NavigationContainer theme={navigationTheme}>
            {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
     </AuthContext.Provider>
    
  );
}

