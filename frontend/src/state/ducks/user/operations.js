import {createAction} from "redux-api-middleware";
import types from "./types";
import {normalize, schema} from "normalizr";

const {USER_REQUEST, USER_FAILURE, USER_SUCCESS} = types

const userSchema = new schema.Entity('user');

const getUser = (userId) => (dispatch) => dispatch(createAction({
    method: 'GET',
    endpoint: `http://localhost:5000/calories-tracker/${userId}/user`,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        USER_REQUEST,
        {
            type: USER_SUCCESS,
            payload: async (action, state, res) => {
                const json = await res.json();
                const { entities } = normalize(json, userSchema);
                return entities;
            },
            meta: { actionType: 'GET_ONE' }
        },
        USER_FAILURE
    ]
}))

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
    getUser,
    login,
    register
}
export default operations