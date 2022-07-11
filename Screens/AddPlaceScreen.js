import { View, Text } from 'react-native'
import React from 'react'

const AddPlaceScreen = () => {
    return (
        <View>
            <Text>AddPlaceScreen</Text>
        </View>
    )
}
AddPlaceScreen['navigationOptions'] = screenProps => ({
    title: 'Parkings',
})

export default AddPlaceScreen