export const CREATE_OWNER = 'CREATE_OWNER';
export const UPDATE_PARKING = 'UPDATE_PARKING';
export const ADD_PLACE = 'ADD_PLACE'

export const createOwner = async (name, contact, password) => {
    return dispatch => {
        // data fetch from backend

        dispatch({ type: CREATE_OWNER, name: name, contact: contact, password: password })
    }
}

export const updateParking = (id, placeId, areaId) => {
    return { type: UPDATE_PARKING, id: id, placeId: placeId, areaId: areaId }
}

export const addPlace = (place, ownerId) => {
    return { type: ADD_PLACE, place: place, ownerId: ownerId }
}
