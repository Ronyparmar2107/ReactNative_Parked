import { compose } from "redux";

export const CREATE_OWNER = 'CREATE_OWNER';
export const UPDATE_PARKING = 'UPDATE_PARKING';
export const UPDATE_OWNER = 'UPDATE_OWNER';
export const ADD_PLACE = 'ADD_PLACE'
export const GETALLOWNERS = 'GETALLOWNERS'
export const GETALLPLACES = 'GETALLPLACES'



export const getAllOwners = () => { //Fetch All Owners 
    return async dispatch => {
        try {
            let response = await fetch('https://parked-3f145-default-rtdb.firebaseio.com/owners/-NGKmzdpYehyaduOzGNp.json?auth=Nrkqs8mHvV9KYDEdOrSzIoTZ2BD3zW7Ufmer9Bqk')
            let data = await response.json()
            dispatch({
                type: GETALLOWNERS,
                data: data
            })
        } catch (error) {
            console.log(error.error)
        }
    }
}


export const getAllPlaces = () => { // Fetch all Places
    return async dispatch => {
        try {
            let response = await fetch('https://parked-3f145-default-rtdb.firebaseio.com/places/-NGKlcjmb-_v4gNdLh7S.json?auth=Nrkqs8mHvV9KYDEdOrSzIoTZ2BD3zW7Ufmer9Bqk')
            let data = await response.json()
            dispatch({
                type: GETALLPLACES,
                data: data
            })
        } catch (error) {
            console.log(error.error)
        }
    }
}

export const createOwner = (name, contact, password, owners) => { // Creating a New Owner
    return async dispatch => {

        try {
            let newOwner = { // Making a new Owner
                id: contact,
                password: password,
                Name: name,
                placesId: []
            }

            let newOwners = [...owners, newOwner]

            let response = await fetch('https://parked-3f145-default-rtdb.firebaseio.com/owners/-NGKmzdpYehyaduOzGNp.json?auth=Nrkqs8mHvV9KYDEdOrSzIoTZ2BD3zW7Ufmer9Bqk', {
                body: JSON.stringify(newOwners),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            let data = await response.json()

            dispatch({
                type: CREATE_OWNER,
                data: data
            })

        } catch (error) {
            console.log(error.error)
        }
    }
}

export const updateOwner = (owners, ownerId, places) => { // Updating a Owner
    return async dispatch => {
        try {
            owners.map(ele => {
                if (ele.id.toString() === ownerId.toString()) { //finding the Owner by id
                    ele.placesId = []                            //Making the placesId array empty
                    places.map(data => {
                        if (data.ownerId = ele.id) {               //Finding places having ownerId of Owner we have
                            ele.placesId.push(data.id)          //Filling the array again
                        }
                    })
                }
            })

            let response = await fetch('https://parked-3f145-default-rtdb.firebaseio.com/owners/-NGKmzdpYehyaduOzGNp.json?auth=Nrkqs8mHvV9KYDEdOrSzIoTZ2BD3zW7Ufmer9Bqk', {
                body: JSON.stringify(owners),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            let data = await response.json()
            dispatch({
                type: UPDATE_OWNER,
                data: data
            })
        } catch (error) {
            console.log(error.error)
        }
    }
}



export const updateParking = (id, placeId, areaId, places) => { // Updating a Parking
    return async dispatch => {
        try {
            //Find the Place and its index
            let Currentplace = places.find(ele => ele.id.toString() === placeId.toString())
            let CurrentplaceIndex = places.findIndex((ele => ele.id.toString() === placeId.toString()))
            //Find Parking Area and Index
            let CurrentAreaIndex = Currentplace.ParkingAreas.findIndex((ele => ele.id.toString() === areaId.toString()))
            let CurrentArea = Currentplace.ParkingAreas.find(ele => ele.id.toString() === areaId.toString())
            //Find the parking slot index
            let CurrentParking = CurrentArea.parkings.findIndex((ele => ele.id.toString() === id.toString()))


            CurrentArea.parkings[CurrentParking].isAvailable = false   //Updating the place's state
            Currentplace.ParkingAreas[CurrentAreaIndex] = CurrentArea
            places[CurrentplaceIndex] = Currentplace


            let newPlaces = [...places]

            let response = await fetch('https://parked-3f145-default-rtdb.firebaseio.com/places/-NGKlcjmb-_v4gNdLh7S?auth=Nrkqs8mHvV9KYDEdOrSzIoTZ2BD3zW7Ufmer9Bqk', {
                method: 'PUT',
                body: JSON.stringify(newPlaces),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            const resposnseData = await response.json()
            dispatch({
                type: UPDATE_PARKING,
                data: resposnseData
            })
        } catch (error) {

        }
    }
}

export const addPlace = (place, places, ownerId) => { // Add new Place
    return async dispatch => {
        try {

            let allParkings = []  // Empty array for storing the Parking-Area according to Schema

            for (let index = 0; index < place.pakringAreas.length; index++) { //itterating to make schema for each Parking-Area

                let tempParking = { // Using a templete to fill the details
                    id: '',
                    Name: '',
                    type: '',
                    size: '',
                    parkings: []
                }

                for (let i = 0; i < place.pakringAreas[index].value; i++) { //itterating to make each parking slot

                    let parking = {
                        id: place.pakringAreas[index].name + `${i + 1}`,
                        isAvailable: true
                    }

                    tempParking.parkings.push(parking) //compeleting the temporary object to push in array later
                }

                let NewtempParking = { //Filling the data here by the previously filled empty templete
                    ...tempParking,
                    id: places.length + 1 + `${place.pakringAreas[index].name.charCodeAt(0) - 64}`,
                    Name: place.pakringAreas[index].name,
                    type: place.pakringAreas[index].parkingtype,
                    size: place.pakringAreas[index].value
                }

                allParkings.push(NewtempParking) // Pushing the data in array after made as the schema
            }

            // New place is made using the recieved and data made in schema previously
            let newPlace = {
                id: places.length + 1,
                ownerId: ownerId,
                Name: place.name,
                Address: place.address,
                img: place.imgUrl,
                parkingSize: place.parkingSize,
                ParkingAreas: [
                    ...allParkings
                ]
            }

            //Making whole new json to post on DB
            let newPlaces = [...places, newPlace]

            let response = await fetch('https://parked-3f145-default-rtdb.firebaseio.com/places/-NGKlcjmb-_v4gNdLh7S?auth=Nrkqs8mHvV9KYDEdOrSzIoTZ2BD3zW7Ufmer9Bqk', {
                method: 'PUT',
                body: JSON.stringify(newPlaces),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            const resposnseData = await response.json()
            dispatch({
                type: ADD_PLACE,
                data: resposnseData
            })

        } catch (error) {
            console.log(error)
        }
    }
}
