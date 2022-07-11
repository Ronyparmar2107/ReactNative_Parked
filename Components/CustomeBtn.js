import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const CustomeBtn = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.3} style={{ backgroundColor: '#FF84FF', width: '100%', paddingHorizontal: 10, paddingVertical: 8, alignItems: 'center', borderRadius: 8, width: props.width, ...props.style }} onPress={props.onClick}>
            <Text >{props.children}</Text>
        </TouchableOpacity>
    )
}

export default CustomeBtn