import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Place = (props) => {
    return (
        <TouchableOpacity style={Style.place} onPress={props.Navigate.bind(this, props.id)}>
            <View style={Style.imgContainer}>

                <Image
                    source={{ uri: props.img }}
                    style={Style.image}
                />
            </View>
            <View style={Style.textContainer}>
                <Text style={Style.placeTitle}>
                    {props.Name}
                </Text>
                <Text style={Style.placeaddress} numberoflines={1}>
                    {props.Address}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const Style = StyleSheet.create({
    place: {
        backgroundColor: 'white',
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        elevation: 15,
        borderRadius: 15,
        overflow: 'hidden',

    },
    imgContainer: {
        width: 150, height: 100
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    textContainer: {
        width: '50%',
        paddingVertical: 10,
        alignItems: 'flex-start'
    },
    placeTitle: {
        fontSize: 17,
        fontWeight: '700'
    },
    placeaddress: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: '300'
    },
})

export default Place