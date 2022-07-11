import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import ParkingArea from '../Components/ParkingArea';
import { useSelector } from 'react-redux';

const PlaceScreen = (props) => {

    const placesData = useSelector(state => state.owner.places)


    const Navigation = (id) => {
        props.navigation.navigate({
            routeName: 'Parking', params: {
                id: id
            }
        })
    }
    const placeId = props.navigation.getParam('id')
    const place = placesData.find(ele => ele.id === placeId)
    return (
        <LinearGradient
            colors={['transparent', "#FF84FF", "#C13DDC",]}
            style={Style.Screen}>

            <View style={Style.PlaceImageSection}>
                <View style={Style.imgContainer}>

                    <Image
                        source={{ uri: place.img }}
                        style={Style.image}
                    />
                </View>
            </View>

            <View style={Style.ParkingsSectionContainer}>
                <Text style={Style.PlaceName}>{place.Name}</Text>

                <Text>Mall's Parkings</Text>

                <FlatList
                    contentContainerStyle={{ alignItems: 'center', }}
                    numColumns={2}
                    style={Style.ParkingAreaList}
                    data={place.ParkingAreas}
                    key={place.ParkingAreas.id}
                    renderItem={item => <ParkingArea
                        Name={item.item.Name}
                        type={item.item.type}
                        Navigate={Navigation}
                        id={item.item.id} />}
                />

            </View>

        </LinearGradient>
    )
}

PlaceScreen['navigationOptions'] = screenProps => ({
    title: 'Mall',
})
const Style = StyleSheet.create({
    Screen: {
        height: '100%'
    },
    PlaceImageSection: {
        height: Dimensions.get('window').height / 4,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgContainer: {
        justifyContent: 'center',
        width: '80%',
        height: Dimensions.get('window').height / 5
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 15
    },
    ParkingsSectionContainer: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        elevation: 5,
        padding: 20,
    },
    PlaceName: {
        fontSize: 22,
        fontWeight: '800',
        textAlign: 'center'
    },
    parkingsContainer: {
        justifyContent: 'center'
    },
    ParkingAreaList: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
        flex: 1,
        minHeight: '100 %',
        overflow: 'hidden'
    }

})

export default PlaceScreen