import Data from '../../DummyData/Dataset'
import { ADD_PLACE, CREATE_OWNER, GETALLOWNERS, GETALLPLACES, UPDATE_OWNER, UPDATE_PARKING } from '../actions/owner'

const initialState = {
    owners: [],
    places: []
}


const OwnerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETALLOWNERS:
            return { ...state, owners: action.data }
        case GETALLPLACES:
            return { ...state, places: action.data }
        case CREATE_OWNER:
            return { ...state, owners: action.data }
        case UPDATE_OWNER:
            return { ...state, owners: action.data }
        case UPDATE_PARKING:
            return { ...state, places: action.data }
        case ADD_PLACE:
            return { ...state, places: action.data }
        default:
            return { ...state }
    }
}

export default OwnerReducer