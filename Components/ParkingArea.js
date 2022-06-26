import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const ParkingArea = (props) => {
    return (
        <TouchableOpacity style={Style.parkings} onPress={props.Navigate.bind(this, props.id)}>

            <View style={Style.textContainer}>
                <Text style={Style.parkingsTitle}>
                    {props.Name}
                </Text>
                <Text style={Style.parkingsType} numberoflines={1}>
                    {props.type}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
const Style = StyleSheet.create({
    parkings: {
        alignItems: 'center',
        backgroundColor: 'white',
        width: Dimensions.get('window').width / 3 + 20,
        height: Dimensions.get('window').width / 3 + 20,
        justifyContent: 'space-between',
        margin: 10,
        elevation: 15,
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 30
    },
    textContainer: {
        height: '100%',
        padding: 10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    parkingsTitle: {
        width: '100%',
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center'
    },
    parkingsType: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: '300'
    },
})

export default ParkingArea