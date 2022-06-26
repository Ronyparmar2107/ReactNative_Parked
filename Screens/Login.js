import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Dimensions, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Data from '../DummyData/Dataset'

const Login = (props) => {

    let Users = Data.map(ele => ele.users)
    const [userId, setuserId] = useState('')
    const [userPassword, setuserPassword] = useState('')


    const loginHandler = () => {
        let checkUser = Users[0].find(ele => ele.id.toString() === userId.toString())
        if (checkUser.password.toString() === userPassword) {
            props.navigation.replace({
                routeName: 'Home', params: {
                    userid: userId
                }
            })
        }
        else {
            Alert.alert('User Not Found!', 'Please Check your phone number and password and then try again!', [
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ])
        }
    }

    const SetPhoneNumber = (e) => {
        setuserId(e)
    }
    const SetPassword = (e) => {
        setuserPassword(e)
    }

    return (
        <LinearGradient colors={['transparent', "#FF84FF", "#C13DDC",]} style={{ height: '100%' }}>
            <View style={Style.LoginPage}>
                <View style={Style.Form}>
                    <View style={Style.FormElement}>
                        <Text>Phone Number</Text>
                        <TextInput
                            keyboardType="numeric"
                            placeholder='Phone Number'
                            style={Style.Input}
                            value={userId}
                            onChangeText={SetPhoneNumber} />
                    </View>
                    <View style={Style.FormElement}>
                        <Text>Password</Text>
                        <TextInput
                            keyboardType='visible-password'
                            placeholder='Password'
                            style={Style.Input}
                            value={userPassword}
                            onChangeText={SetPassword} />
                    </View>
                    <View style={Style.LoginBtn}>
                        <Button
                            title='Log-In'
                            onPress={loginHandler} />
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Login

const Style = StyleSheet.create({
    LoginPage: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        // backgroundColor: '#E562FF',
        width: '100%'
    },
    Form: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: Dimensions.get('window').height / 2,
        width: '80%',
        backgroundColor: 'rgba(255,255,255,0.5)',
        overflow: 'hidden',
        borderRadius: 10,
        fontSize: 24,
        textAlign: 'left',
        elevation: 150

    },
    Input: {
        borderWidth: 1,
        width: '100%',
        borderColor: 'black',
        marginVertical: 5,
        borderRadius: 5,
        padding: 8
    },
    FormElement: {
        alignItems: 'flex-start',
        width: '90%',
        marginBottom: 10
    },
    LoginBtn: {
        marginTop: '15%',
    }
})