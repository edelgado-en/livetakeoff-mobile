import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import colors from '../config/colors'
import ListItem from '../components/ListItem'
import Screen from '../components/Screen'
import ListItemSeparator from '../components/ListItemSeparator'
import Icon from '../components/Icon'

import useAuth from '../auth/useAuth'

const menuItems = [
    {
        title: "Reset Password",
        icon: {
            name: "lock-reset",
            backgroundColor: colors.primary
        },
        targetScreen: "Reset Password"
    }
]

const AccountScreen = ({ navigation }) => {
    const { user, logOut } = useAuth();

    return (
    <Screen style={styles.screen}>
        <View style={styles.container}>
            <ListItem 
                title={user.first_name + ' ' + user.last_name}
                subtitle={user.email}
                image={{ uri: user.avatar }}
            />
        </View>
        <View style={styles.container}>
            <FlatList 
                data={menuItems}
                keyExtractor={menuItem => menuItem.title}
                ItemSeparatorComponent={ListItemSeparator}
                renderItem={({ item }) => (
                    <ListItem 
                        title={item.title}
                        IconComponent={
                            <Icon name={item.icon.name} backgroundColor={item.icon.backgroundColor}/>
                        }
                        onPress={() => navigation.navigate(item.targetScreen)}  
                    />
                )}
            />
        </View>
        <ListItem 
            title="Log Out"
            IconComponent={<Icon name="logout" backgroundColor="#ffe66d"/>}
            onPress={() => logOut()}
        />

    </Screen>
  )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light,
    },
    container: {
        marginVertical: 20,
    }   
})

export default AccountScreen