import React, { useRef, useReducer } from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet, TextInput, Keyboard, Dimensions, KeyboardAvoidingView, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';

import CustomeBtn from '../Components/CustomeBtn';
import { createUser } from '../Store/actions/user';
import { createOwner } from '../Store/actions/owner';
import { useDispatch, useSelector } from 'react-redux';

const CHANGE = 'CHANGE'

let initialState = {  //The state holding all values
    initialValues: {
        name: '',
        contact: '',
        email: '',
        password: '',
        type: 'user'
    },
    initialValidations: {
        name: true,
        contact: true,
        email: true,
        password: true
    }
}

const FormReducer = (state, action) => {
    switch (action.type) {
        case CHANGE:
            let input = action.input
            let value = action.value
            let NewValues = {
                ...state.initialValues,
                [value]: input
            }
            return {
                ...state,
                initialValues: NewValues
            }

    }
}

const SignUp = (props) => {
    const userdispatch = useDispatch()
    const UserData = useSelector(state => state.user.users)
    const Owners = useSelector(state => state.owner.owners)
    let [state, dispatch] = useReducer(FormReducer, initialState);


    const pickerRef = useRef();  //function for closing and oping of the select
    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    //storing values on change
    const nameHandler = (text, identifier) => {
        if (identifier === 'name') {
            let nameRegex = `/^[a-z ,.'-]+$/`
            if (nameRegex.test(text)) {
                state.initialValidations = false
            }
        }
        dispatch({ type: CHANGE, input: identifier, value: text })
    }

    // Storing in Redux Store
    const signUpHandler = async () => {
        if (state.initialValues.type === 'user') {
            try {
                await userdispatch(createUser(state.initialValues.name, state.initialValues.contact, state.initialValues.password, UserData))
                AccountCreated()
            } catch (error) {
                console.log(error)
            }
        }
        else {
            try {
                await userdispatch(createOwner(state.initialValues.name, state.initialValues.contact, state.initialValues.password, Owners))
                AccountCreated()
            } catch (error) {
                console.log(error)
            }
        }
    }

    //promting account created
    const AccountCreated = () => {
        Alert.alert(state.initialValues.type + ' account created', state.initialValues.name + ', your account was created. Now login with your credentials', [{
            text: "LogIn",
            onPress: () => props.navigation.replace('Login')
        }])
    }


    return (
        <KeyboardAvoidingView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <LinearGradient colors={['transparent', "#FF84FF", "#C13DDC",]} style={Style.MainContainer} >
                    <View style={Style.FormContainer}>
                        <View style={Style.Form}>
                            <View style={Style.FormElement}>
                                <Text>Name</Text>
                                <TextInput
                                    placeholder='Name'
                                    style={Style.InputElement}
                                    value={state.initialValues.name}
                                    onChangeText={nameHandler.bind(this, 'name')} />
                            </View>
                            <View style={Style.FormElement}>
                                <Text>Contact Number</Text>
                                <TextInput
                                    placeholder='Contact Number'
                                    style={Style.InputElement}
                                    value={state.initialValues.contact}
                                    onChangeText={nameHandler.bind(this, 'contact')}
                                    keyboardType='number-pad' />
                            </View>
                            <View style={Style.FormElement}>
                                <Text>Email</Text>
                                <TextInput
                                    placeholder='Email'
                                    style={Style.InputElement}
                                    value={state.initialValues.email}
                                    keyboardType='email-address'
                                    onChangeText={nameHandler.bind(this, 'email')} />
                            </View>
                            <View style={Style.FormElement}>
                                <Text>Password</Text>
                                <TextInput
                                    placeholder='Password'
                                    style={Style.InputElement}
                                    value={state.initialValues.password}
                                    secureTextEntry
                                    onChangeText={nameHandler.bind(this, 'password')} />
                            </View>
                            <View style={{
                                alignItems: 'flex-start',
                                width: '85%',
                            }}>
                                <Text>Want to use Parked! as</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>

                            <Picker
                                style={{ width: '90%' }}
                                ref={pickerRef}
                                selectedValue={state.initialValues.type}
                                onValueChange={nameHandler.bind(this, 'type')}>
                                <Picker.Item label="Parking User" value="user" />
                                <Picker.Item label="Parking Owner" value="owner" />
                            </Picker>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <CustomeBtn width='90%' onClick={signUpHandler} >SignUp</CustomeBtn>
                        </View>
                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const Style = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    FormContainer: {
        justifyContent: 'center',
        padding: 10,
        height: Dimensions.get('window').height / 1.5,
        width: '80%',
        backgroundColor: 'rgba(255,255,255,0.5)',
        overflow: 'hidden',
        borderRadius: 10,
        fontSize: 24,
        textAlign: 'left',
        elevation: 150
    },
    Form: {
        width: '100%',
        alignItems: 'center'
    },
    FormElement: {
        alignItems: 'flex-start',
        width: '90%',
        marginBottom: 10
    },
    InputElement: {
        borderWidth: 1,
        width: '100%',
        borderColor: 'black',
        marginVertical: 5,
        borderRadius: 5,
        padding: 8
    },

})

export default SignUp