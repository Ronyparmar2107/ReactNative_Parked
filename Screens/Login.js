import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Dimensions, Alert, Keyboard, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import CustomeBtn from '../Components/CustomeBtn';
import { Picker } from '@react-native-picker/picker';

import { useSelector } from 'react-redux';



const Login = (props) => {

    const UserData = useSelector(state => state.user)
    const OwnerData = useSelector(state => state.owner)
    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    const [userId, setuserId] = useState('')
    const [userPassword, setuserPassword] = useState('')
    const [selectedUser, setSelectedUser] = useState();

    const Navigator = (page, id) => {
        props.navigation.replace({
            routeName: page, params: {
                userid: id
            }
        })
    }
    const loginHandler = () => {
        console.log(OwnerData.owners)
        if (selectedUser === 'user' && userId.length === 10) {
            let checkUser = UserData.users.find(ele => ele.id.toString() === userId.toString())
            if (checkUser && userPassword.length >= 1 && checkUser.password.toString() === userPassword) {
                Navigator('Home', checkUser.id)
                setuserId('')
                setuserPassword('')
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
        else if (selectedUser === 'owner' && userId.length === 10) {
            let checkUser = OwnerData.owners.find(ele => ele.id.toString() === userId.toString())
            if (checkUser && userPassword.length >= 1 && checkUser.password === userPassword) {
                Navigator('OwnerHome', checkUser.id)
                setuserId('')
                setuserPassword('')
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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                                placeholder='Password'
                                style={Style.Input}
                                value={userPassword}
                                secureTextEntry
                                onChangeText={SetPassword} />
                        </View>
                        <View style={{ width: '85%' }}>
                            <Picker
                                selectedValue={selectedUser}
                                onValueChange={(itemValue) =>
                                    setSelectedUser(itemValue)
                                }>
                                <Picker.Item label="Parking User" value="user" />
                                <Picker.Item label="Parking Owner" value="owner" />
                            </Picker>
                        </View>
                        <View style={Style.Btn}>
                            <CustomeBtn width='100%' onClick={loginHandler}>Login</CustomeBtn>
                        </View>
                        <View style={{ marginTop: '5%' }}>
                            <TouchableOpacity activeOpacity={0.4} onPress={() => props.navigation.push('SignUp')}>
                                <Text style={{ textDecorationLine: 'underline' }}>Create a Account!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}

export default Login
const Style = StyleSheet.create({
    LoginPage: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
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
    Btn: {
        width: '90%',
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
