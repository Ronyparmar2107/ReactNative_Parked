export const CREATE_OWNER = 'CREATE_OWNER';

export const createOwner = (name, contact, password) => {

    return { type: CREATE_OWNER, name: name, contact: contact, password: password }
}
