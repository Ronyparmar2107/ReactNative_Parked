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
            let Currentplace = state.places.find(ele => ele.id.toString() === action.placeId.toString())
            // let Currentplace = state.places.find(ele => console.log(ele.id, action.placeId))
            let CurrentplaceIndex = state.places.findIndex((ele => ele.id.toString() === action.placeId.toString()))
            let CurrentAreaIndex = Currentplace.ParkingAreas.findIndex((ele => ele.id.toString() === action.areaId.toString()))
            let CurrentArea = Currentplace.ParkingAreas.find(ele => ele.id.toString() === action.areaId.toString())
            let CurrentParking = CurrentArea.parkings.findIndex((ele => ele.id.toString() === action.id.toString()))


            CurrentArea.parkings[CurrentParking].isAvailable = false
            Currentplace.ParkingAreas[CurrentAreaIndex] = CurrentArea
            state.places[CurrentplaceIndex] = Currentplace

            UpdatedPlaces = {
                ...state,
                places: state.places
            }

            return UpdatedPlaces

        case ADD_PLACE:
            let recievedData = action.place
            let allParkings = []

            for (let index = 0; index < recievedData.pakringAreas.length; index++) {
                let tempParking = {
                    id: '',
                    Name: '',
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
                    id: state.places.length + 1 + `${recievedData.pakringAreas[index].name.charCodeAt(0) - 64}`,
                    Name: recievedData.pakringAreas[index].name,
                    type: recievedData.pakringAreas[index].parkingtype,
                    size: recievedData.pakringAreas[index].value
                }
                allParkings.push(NewtempParking)
            }

            let newPlace = {
                id: state.places.length + 1,
                Name: recievedData.name,
                Address: recievedData.address,
                img: recievedData.imgUrl,
                parkingSize: recievedData.parkingSize,
                ParkingAreas: [
                    ...allParkings
                ]
            }

            let CurrentOwner = state.owners.find(ele => ele.id.toString() === action.ownerId.toString())
            let CurrentOwnerIndex = state.owners.indexOf(ele => ele.id.toString() === action.ownerId.toString())
            CurrentOwner.placesId.push(newPlace.id)

            state.owners[CurrentOwnerIndex]
            state.places.push(newPlace)

            return { ...state, places: state.places }

    }

    return state
}

export default OwnerReducer