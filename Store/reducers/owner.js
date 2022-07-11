import Data from '../../DummyData/Dataset'
import { CREATE_OWNER } from '../actions/owner'

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
    }

    return state
}

export default OwnerReducer