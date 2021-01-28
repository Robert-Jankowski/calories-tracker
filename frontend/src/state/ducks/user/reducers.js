import types from "./types";
const {USER_SUCCESS} = types

const userState = (state = {userId: null, username: null, isLogged: false}, action) => {
    switch (action.type) {
        case USER_SUCCESS:
            return action.payload.userId != null ?
                {userId: action.payload.userId,
                isLogged: true,
                username: action.payload.username} : state;
        default:
            return state;
    }
}

const userReducers = {userState}

export default userReducers;