import Data from '../../DummyData/Dataset'
import { CREATE_USER } from '../actions/user';

const initialState = {
    users: Data[0].users,
}


const UserReducer = (state = initialState, action) => {

    switch (action.type) {
        case CREATE_USER:

            let newUser = {
                id: action.contact,
                password: action.password,
                Name: action.name
            }
            let currentState = [...state.users]
            let NewState = currentState.concat(newUser)

            return {
                ...state,
                users: [...NewState]
            }
    }

    return {
        ...state
    }
}

export default UserReducer