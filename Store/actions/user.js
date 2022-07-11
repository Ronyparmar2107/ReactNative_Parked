export const CREATE_USER = 'CREATE_USER';

export const createUser = (name, contact, password) => {

    return { type: CREATE_USER, name: name, contact: contact, password: password }
}
