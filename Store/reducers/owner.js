import Data from '../../DummyData/Dataset'
import { ADD_PLACE, CREATE_OWNER, UPDATE_PARKING } from '../actions/owner'

const initialState = {
    owners: Data[0].owners,
    places: Data[0].Places
}


const OwnerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_OWNER:
            let newOwner = {
                id: action.contact,
                password: action.password,
                Name: action.name,
                placesId: []
            }
            let currentState = [...state.owners]
            let NewState = currentState.concat(newOwner)

            return {
                ...state,
                owners: [...NewState]
            }
        case UPDATE_PARKING:
            let Currentplace = initialState.places.find(ele => ele.id.toString() === action.placeId.toString())
            let CurrentplaceIndex = initialState.places.findIndex((ele => ele.id.toString() === action.placeId.toString()))
            let CurrentAreaIndex = Currentplace.ParkingAreas.findIndex((ele => ele.id.toString() === action.areaId.toString()))
            let CurrentArea = Currentplace.ParkingAreas.find(ele => ele.id.toString() === action.areaId.toString())
            let CurrentParking = CurrentArea.parkings.findIndex((ele => ele.id.toString() === action.id.toString()))


            CurrentArea.parkings[CurrentParking].isAvailable = false
            Currentplace.ParkingAreas[CurrentAreaIndex] = CurrentArea
            initialState.places[CurrentplaceIndex] = Currentplace

            UpdatedPlaces = {
                ...initialState,
                places: initialState.places
            }

            return UpdatedPlaces

        case ADD_PLACE:
            let recievedData = action.place
            let allParkings = []

            for (let index = 0; index < recievedData.pakringAreas.length; index++) {
                let tempParking = {
                    id: '',
                    name: '',
                    type: '',
                    size: '',
                    parkings: []
                }
                for (let i = 0; i < recievedData.pakringAreas[index].value; i++) {
                    let parking = {
                        id: recievedData.pakringAreas[index].name + `${i + 1}`,
                        isAvailable: true
                    }
                    tempParking.parkings.push(parking)
                }
                let NewtempParking = {
                    ...tempParking,
                    id: initialState.places.length + 1 + `${recievedData.pakringAreas[index].name.charCodeAt(0) - 64}`,
                    name: recievedData.pakringAreas[index].name,
                    type: recievedData.pakringAreas[index].parkingtype,
                    size: recievedData.pakringAreas[index].value
                }
                allParkings.push(NewtempParking)
            }

            let newPlace = {
                id: initialState.places.length + 1,
                Name: recievedData.name,
                Address: recievedData.address,
                img: recievedData.imgUrl,
                parkingSize: recievedData.parkingSize,
                ParkingAreas: [
                    ...allParkings
                ]
            }
            console.log(newPlace)

            let AddedPlaces = {
                ...initialState,
                places: initialState.places.concat(newPlace)
            }
            return AddedPlaces

    }

    return state
}

export default OwnerReducer