import React from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions, Image, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import Data from '../DummyData/Dataset'
import Place from '../Components/Place';


const UserHomePage = (props) => {

    let places = Data.map(ele => ele.Places)
    let Users = Data.map(ele => ele.users)
    let userId = props.navigation.getParam('userid')
    let user = Users[0].find(ele => ele.id.toString() === userId.toString())

    const Navigation = (placeid) => {
        props.navigation.navigate({
            routeName: 'Place', params: {
                id: placeid
            }
        })
    }

    let time = new Date().getHours()
    let greetings = 'Good Afternoon🔆'
    if (time <= 12) {
        greetings = 'Good Morning🔆'
    } else if (time >= 16) {
        greetings = 'Good Evening🌄'
    }
    console.log(time)
    return (
        <LinearGradient
            colors={['transparent', "#FF84FF", "#C13DDC",]}
            style={Style.Screen}>

            <View style={Style.UserDetails}>

                <View style={Style.profileImageContainer}>
                    <Image
                        source={{ uri: 'https://i.pinimg.com/originals/cc/18/9c/cc189ca9c6dc75dcc530bf9bc1c32fcc.png' }}
                        style={Style.profileImage} />
                </View>
                <View>
                    <Text>{greetings}</Text>
                    <Text style={Style.UserName}>{user.Name}</Text>
                </View>

            </View>

            <View style={Style.placesSectionContainer} onPress={console.log('touched')}>
                <TextInput placeholder='Search Space' style={Style.Sreach} />
                <View style={Style.placesContainer}>
                    <Text>Nearby Places</Text>
                    <FlatList
                        contentContainerStyle={{ alignItems: 'center', }}
                        style={Style.PlaceList}
                        data={places[0]}
                        key={places.id}
                        renderItem={(item) => <Place
                            Name={item.item.Name}
                            id={item.item.id}
                            Address={item.item.Address}
                            Navigate={Navigation}
                            img={item.item.img} />} />
                </View>
            </View>

        </LinearGradient>
    )
}

const Style = StyleSheet.create({
    Screen: {
        height: '100%'
    },
    UserDetails: {
        height: Dimensions.get('window').height / 4,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImageContainer: {
        marginHorizontal: 15,
        height: 60,
        width: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        elevation: 30,
        overflow: 'hidden'
    },
    profileImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    UserName: {
        fontSize: 20,
        fontWeight: '600'
    },
    placesSectionContainer: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        elevation: 5,
        padding: 20

    },
    Sreach: {
        height: 40,
        width: '90%',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        fontSize: 12
    },
    placesContainer: {
        width: '100%',
        marginTop: 10

    },
    PlaceList: {
        marginBottom: 50
    },
})

export default UserHomePage