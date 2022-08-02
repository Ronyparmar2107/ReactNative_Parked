import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const ParkingSpot = (props) => {
    return (
        <TouchableOpacity style={{ ...Style.parkingItemContainer, backgroundColor: props.isAvailable ? '#5bb28c' : '#fd5f72' }} onPress={props.Park.bind(this, props.id)}>
            <View style={Style.parkingItem}>
                <Text >{props.id}</Text>
            </View>
        </TouchableOpacity>
    )
}
const Style = StyleSheet.create({
    parkingItemContainer: {
        height: 70,
        width: 100,
        // borderColor: 'gray',
        backgroundColor: '#f5f5f5',
        // borderWidth: 1,
        marginVertical: 5,
        padding: 10
    },
    parkingItem: {
        // borderStyle: 'dashed',
        // borderWidth: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // zIndex: '1',
        backgroundColor: 'white'
    }
})

export default ParkingSpot