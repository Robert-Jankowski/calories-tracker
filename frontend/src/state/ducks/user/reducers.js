const userId = (state = null, action) => {
    switch (action.type) {
        case 'SET_USER_ID':
            return action.payload != null ? action.payload : state;
        default:
            return state;
    }
}

const userReducers = {userId}

export default userReducers;