export const CREATE_USER = 'CREATE_USER';
export const GETALLUSER = 'GETALLUSER';

export const createUser = (name, contact, password, previousUsers) => {
    return async dispatch => {
        let newUser = { id: contact, password: password, Name: name }
        let newUsers = [...previousUsers, newUser]
        try {
            let response = await fetch('https://parked-3f145-default-rtdb.firebaseio.com/users/-NGKpltAHVgaM6WVJ6Va.json?auth=Nrkqs8mHvV9KYDEdOrSzIoTZ2BD3zW7Ufmer9Bqk', {
                method: 'PUT',
                body: JSON.stringify(newUsers),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            const resposnseData = await response.json()
            dispatch({
                type: CREATE_USER,
                data: resposnseData
            })
        } catch (error) {
            console.log(error.error)
        }
    }

}

export const getAllUser = () => {
    return async dispatch => {
        try {
            let response = await fetch('https://parked-3f145-default-rtdb.firebaseio.com/users/-NGKpltAHVgaM6WVJ6Va.json?auth=Nrkqs8mHvV9KYDEdOrSzIoTZ2BD3zW7Ufmer9Bqk')
            const responsedata = await response.json();
            dispatch({
                type: GETALLUSER,
                data: responsedata
            })
        } catch (error) {
            throw error
        }
    }
}
