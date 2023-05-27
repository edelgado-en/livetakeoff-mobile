import React, { useState } from 'react'
import { TouchableWithoutFeedback, StyleSheet, View, Modal, Button, FlatList, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import defaultStyles from '../config/styles'
import AppText from './AppText'
import Screen from './Screen'
import PickerItem from './PickerItem'

function AppPicker({ items, icon, placeholder, onSelectItem, selectedItem }) {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.container}>
                    {icon && <MaterialCommunityIcons
                                name={icon}
                                size={20}
                                color={defaultStyles.colors.medium}
                                style={styles.icon}
                                />}

                    {selectedItem 
                            ? <AppText style={styles.text}>{selectedItem.name}</AppText>
                            : <AppText style={styles.placeholder}>{placeholder}</AppText>}
                    <MaterialCommunityIcons
                        name="chevron-down"
                        size={20}
                        color={defaultStyles.colors.medium}
                        />
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                    <FlatList 
                        data={items}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => 
                            <PickerItem 
                                label={item.name}
                                onPress={() => {
                                    setModalVisible(false)
                                    onSelectItem(item)
                                }}
                            />
                        }
                    />
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        marginVertical: 5,
    },
    icon: {
        marginRight: 10,
    },
    placeholder: {
        color: defaultStyles.colors.medium,
        flex: 1,
    },
    text: {
        flex: 1
    },
    modalContainer: {
        flex: 1,
        padding: 20
    }
})

export default AppPicker;