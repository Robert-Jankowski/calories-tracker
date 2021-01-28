import {createAction} from "redux-api-middleware";
import types from "./types";
const {USER_REQUEST, USER_FAILURE, USER_SUCCESS} = types

const login = (username, password) => (dispatch) => dispatch(createAction({
    method: 'POST',
    endpoint: `http://localhost:5000/calories-tracker/login`,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({username, password}),
    types: [
        USER_REQUEST,
        USER_SUCCESS,
        USER_FAILURE
    ]
}))

const register = (username, password) => (dispatch) => dispatch(createAction({
    method: 'POST',
    endpoint: `http://localhost:5000/calories-tracker/register`,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({username, password}),
    types: [
        USER_REQUEST,
        USER_SUCCESS,
        USER_FAILURE
    ]
}))

const operations = {
    login,
    register
}
export default operations