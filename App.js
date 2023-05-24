import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import navigationTheme from './app/components/navigation/navigationTheme';
import AppNavigator from './app/components/navigation/AppNavigator';
import AuthNavigator from './app/components/navigation/AuthNavigator';

import AuthContext from './app/auth/context';
import OfflineNotice from './app/components/OfflineNotice';

import userApi from './app/api/user';

export default function App() {
    const [user, setUser] = useState();
    const [isReady, setIsReady] = useState(false);

    const restoreUser = async () => {
        const result = await userApi.getCurrentUser();
        
        if (!result.ok) {
            setUser(null)
            return;
        }

        setUser(result.data)
    }


    if (!isReady) {
        return (
            <AppLoading
                startAsync={restoreUser}
                onFinish={() => setIsReady(true)}
                onError={console.warn}
            />
        )
    }

    return (
     <AuthContext.Provider value={{ user, setUser }}>
         <OfflineNotice />
         <NavigationContainer theme={navigationTheme}>
            {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
     </AuthContext.Provider>
    
  );
}

