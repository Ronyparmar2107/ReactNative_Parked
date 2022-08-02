import React, { useRef, useReducer, useEffect, useState } from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet, TextInput, Keyboard, Dimensions, KeyboardAvoidingView, Alert, Image, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';

import CustomeBtn from '../Components/CustomeBtn';
import { addPlace } from '../Store/actions/owner';

const CHANGE = 'CHANGE';
const UPDATE = "UPDATE";
const UPDATE_PARKING_TYPE = "UPDATE_PARKING_TYPE"

let initialState = {
    initialValues: {
        name: '',
        address: '',
        imgUrl: '',
        parkingSize: 0,
        numberOfParkings: 0,
        pakringAreas: [],
    },
    initialValidations: {
        name: true,
        contact: true,
        email: true,
        password: true,
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
        case UPDATE:
            state.initialValues.pakringAreas[action.index] = { ...state.initialValues.pakringAreas[action.index], value: action.value, name: action.name }
            return state
        case UPDATE_PARKING_TYPE:
            state.initialValues.pakringAreas[action.index] = { ...state.initialValues.pakringAreas[action.index], parkingtype: action.value }
            return { ...state }
    }

}

const AddPlaceScreen = (props) => {
    const [parkings, setparkings] = useState([])
    const [parkingType, setparkingType] = useState([])


    const ownerData = useSelector(state => state.owner.owners)
    const ownerId = props.navigation.getParam('id')
    let owner = ownerData.find(ele => ele.id.toString() === ownerId.toString())


    const userdispatch = useDispatch()
    let [state, dispatch] = useReducer(FormReducer, initialState);

    const pickerRef = useRef();
    function open() {
        pickerRef.current.focus();
    }
    function close() {
        pickerRef.current.blur();
    }

    useEffect(() => {
        setparkingType(state.initialValues.pakringAreas)
    }, [state.initialValues.pakringAreas])

    useEffect(() => {
        let array = []
        const parkingsInputHandler = () => {
            for (let i = 0; i < state.initialValues.numberOfParkings; i++) {
                let sum = 65 + i
                let parking = {
                    name: String.fromCharCode(sum),
                }
                array.push(parking)
            }
        }
        parkingsInputHandler()
        setparkings(array)
    }, [state.initialValues.numberOfParkings])



    const nameHandler = (text, identifier) => {
        dispatch({ type: CHANGE, input: identifier, value: text })
    }

    const CountHandler = (text, index, name) => {
        dispatch({ type: UPDATE, index: index, value: text, name: name })
    }

    const ParkingStateHandler = (value, index) => {
        dispatch({ type: UPDATE_PARKING_TYPE, index: index, value: value })
    }

    const addPlaceHandler = () => {

        userdispatch(addPlace(state.initialValues, ownerId))
        Alert.alert('Registration successfull', 'Your mall was added successfully', [{ type: 'OK', onPress: () => { props.navigation.pop() } }])

    }

    let time = new Date().getHours()
    let greetings = 'Good Afternoon 🔆'
    if (time <= 12) {
        greetings = 'Good Morning 🔆'
    } else if (time >= 16) {
        greetings = 'Good Evening 🌄'
    }


    return (
        <KeyboardAvoidingView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <LinearGradient colors={['transparent', "#FF84FF", "#C13DDC",]} style={Style.MainContainer} >
                    <View style={Style.UserDetails}>

                        <View style={Style.profileImageContainer}>
                            <Image
                                source={{ uri: 'https://i.pinimg.com/originals/cc/18/9c/cc189ca9c6dc75dcc530bf9bc1c32fcc.png' }}
                                style={Style.profileImage} />
                        </View>
                        <View>
                            <Text>{greetings}</Text>
                            <Text style={Style.UserName}>{owner.Name}</Text>
                        </View>

                    </View>
                    <View style={Style.FormContainer}>
                        <ScrollView style={Style.Form} contentContainerStyle={{ alignItems: 'center' }}>
                            <View style={Style.FormElement}>
                                <Text>Name of Mall</Text>
                                <TextInput
                                    placeholder='Name'
                                    style={Style.InputElement}
                                    value={state.initialValues.name}
                                    onChangeText={nameHandler.bind(this, 'name')} />
                            </View>
                            <View style={Style.FormElement}>
                                <Text>Address</Text>
                                <TextInput
                                    placeholder='Address'
                                    style={Style.InputElement}
                                    value={state.initialValues.address}
                                    onChangeText={nameHandler.bind(this, 'address')} />
                            </View>
                            <View style={Style.FormElement}>
                                <Text>Image Url</Text>
                                <TextInput
                                    placeholder='Url of the image of your mall'
                                    style={Style.InputElement}
                                    value={state.initialValues.imgUrl}
                                    onChangeText={nameHandler.bind(this, 'imgUrl')} />
                            </View>
                            <View style={Style.FormElement}>
                                <Text>Total Number of Parkings</Text>
                                <TextInput
                                    placeholder='Number of parkings'
                                    style={Style.InputElement}
                                    value={state.initialValues.parkingSize}
                                    keyboardType='number-pad'
                                    onChangeText={nameHandler.bind(this, 'parkingSize')} />
                            </View>
                            <View style={{
                                alignItems: 'flex-start',
                                width: '90%',
                            }}>
                                <Text>Number of parking areas</Text>
                            </View>
                            <View style={{ width: '90%' }}>
                                <Picker
                                    style={{ width: '30%' }}
                                    selectedValue={state.initialValues.numberOfParkings}
                                    onValueChange={nameHandler.bind(this, 'numberOfParkings')
                                    }>
                                    <Picker.Item label="1" value={1} />
                                    <Picker.Item label="2" value={2} />
                                    <Picker.Item label="3" value={3} />
                                    <Picker.Item label="4" value={4} />
                                </Picker>
                            </View>
                            <View style={{ width: '90%' }}>
                                {parkings.map((ele, index) => {
                                    return (
                                        <View key={index} style={Style.ParkingAreaInput}>
                                            <Text style={{ fontSize: 16, textAlign: 'center' }}> For Area {ele.name}</Text>
                                            <View style={Style.PakingElement}>
                                                <Picker
                                                    selectedValue={parkingType[index]?.parkingtype === undefined ? "" : parkingType[index]?.parkingtype === "UnderGround" ? "UnderGround" : "UpperGround"}
                                                    onValueChange={(itemValue) => ParkingStateHandler(itemValue, index)
                                                    }>
                                                    <Picker.Item label="Select your value" value={''} />
                                                    <Picker.Item label="Upper-Ground" value={'UpperGround'} />
                                                    <Picker.Item label="Under-Ground" value={'UnderGround'} />
                                                </Picker>

                                                <Text>Total Number of Parkings</Text>
                                                <TextInput onChange={e => CountHandler(e.nativeEvent.text, index, ele.name)} keyboardType='number-pad' placeholder='Number of Slots' style={Style.InputElement}></TextInput>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                            <View style={{ width: '100%', alignItems: 'center', marginBottom: 15 }}>
                                <CustomeBtn width='90%' onClick={addPlaceHandler} >Add</CustomeBtn>
                            </View>
                        </ScrollView>
                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
AddPlaceScreen['navigationOptions'] = screenProps => ({
    title: 'Add Mall',
})

const Style = StyleSheet.create({
    MainContainer: {
        height: '100%'
    },
    UserDetails: {
        height: Dimensions.get('window').height / 5,
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
    FormContainer: {
        paddingTop: '10%',
        marginTop: '3%',
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        overflow: 'hidden',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        fontSize: 24,
        textAlign: 'left',
        elevation: 5
    },
    Form: {
        width: '100%',
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
    ParkingAreaInput: {
        width: '100%',
        marginBottom: 10
    }

})


export default AddPlaceScreen