import React from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import ParkingSpot from '../Components/ParkingSpot';
import Data from '../DummyData/Dataset'

const ParkingScreen = (props) => {
    const parkingAreaId = props.navigation.getParam('id')
    const places = Data.map(ele => ele.Places)
    const place = places[0].find(ele => ele.id === parseInt(parkingAreaId.toString().slice(0, 1)))
    const parkingArea = place.ParkingAreas.find(ele => ele.id === parkingAreaId)
    const parking = parkingArea.parkings

    const Park = (id) => {
        let clickedParking = parking.find(e => e.id === id)
        if (clickedParking.isAvailable) {
            Alert.alert('Confirm Parking', 'Are you sure you want to rent this Parking?', [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ])
        }
        else {
            Alert.alert('Already Parked!', 'This parking is already rented choose another one!', [

                { text: "OK", onPress: () => console.log("OK Pressed") }
            ])
        }
    }

    return (
        <LinearGradient
            colors={['transparent', "#FF84FF", "#C13DDC",]}
            style={Style.Screen}>

            <View style={Style.parkingSection}>
                <Text style={Style.parkingSectionText}>CHOOSE PARKING</Text>
                <Text>{place.Name}</Text>
                <Text>{parkingArea.Name}</Text>
            </View>

            <View style={Style.parkingSectionContainer} >
                <FlatList
                    key={parking.id}
                    data={parking}
                    style={Style.scrollComponent}
                    alignItems={'center'}
                    renderItem={item => <ParkingSpot id={item.item.id} Park={Park} isAvailable={item.item.isAvailable} />} />
            </View>

        </LinearGradient>
    )
}
const Style = StyleSheet.create({
    Screen: {
        height: '100%'
    },
    parkingSection: {
        height: Dimensions.get('window').height / 6,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
    },
    parkingSectionText: {
        fontSize: 20,
        fontWeight: '700'
    },
    parkingSectionContainer: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        elevation: 5,
        padding: 20

    },
    scrollComponent: {
        width: '100%'
    },


})
export default ParkingScreen