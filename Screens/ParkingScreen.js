import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Alert, DevSettings } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import ParkingSpot from '../Components/ParkingSpot';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPlaces, updateParking } from '../Store/actions/owner';

const ParkingScreen = (props) => {
    const placesData = useSelector(state => state.owner.places)
    const parkingAreaId = props.navigation.getParam('id')
    const paramPlace = props.navigation.getParam('place')
    const place = placesData.find(ele => ele.id === parseInt(parkingAreaId.toString().slice(0, 1)))
    const parkingArea = place.ParkingAreas.find(ele => ele.id === parkingAreaId)
    const parking = parkingArea.parkings
    console.log(paramPlace)

    const dispatch = useDispatch()
    const [temp, settemp] = useState(parking)

    // useEffect(() => {
    //     settemp(parking)
    // }, [placesData])


    const Park = (id) => {
        let clickedParking = parking.find(e => e.id === id)
        if (clickedParking.isAvailable) {
            Alert.alert('Confirm Parking', 'Are you sure you want to rent this Parking?', [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        await dispatch(updateParking(clickedParking.id, place.id, parkingArea.id, placesData))
                        await dispatch(getAllPlaces)
                        settemp(parking)
                    }
                }
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
                    key={temp.id}
                    data={temp}
                    style={Style.scrollComponent}
                    alignItems={'center'}
                    renderItem={item => <ParkingSpot id={item.item.id} Park={Park} isAvailable={item.item.isAvailable} />} />
            </View>

        </LinearGradient>
    )
}
ParkingScreen['navigationOptions'] = screenProps => ({
    title: 'Parkings',
})
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