import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import colors from '../config/colors'
import ListItem from '../components/ListItem'
import Screen from '../components/Screen'
import ListItemSeparator from '../components/ListItemSeparator'
import Icon from '../components/Icon'

const menuItems = [
    {
        title: "Reset Password",
        icon: {
            name: "lock-reset",
            backgroundColor: colors.primary
        }
    }
]

const AccountScreen = () => {
  return (
    <Screen style={styles.screen}>
        <View style={styles.container}>
            <ListItem 
                title="Enrique Delgado"
                subtitle="enriquedelgado806@gmail.com"
                image={require('../../assets/profile.jpeg')}
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
                    />
                )}
            />
        </View>
        <ListItem 
            title="Log Out"
            IconComponent={<Icon name="logout" backgroundColor="#ffe66d"/>}
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