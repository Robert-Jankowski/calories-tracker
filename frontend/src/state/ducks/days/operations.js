import {createAction} from "redux-api-middleware";
import types from "./types";
import {normalize, schema} from "normalizr";

const {DAYS_REQUEST, DAYS_FAILURE, DAYS_SUCCESS} = types

const daySchema = new schema.Entity('days');
const daysSchema = new schema.Array(daySchema);

const getDays = (userId) => (dispatch) => dispatch(createAction({
    method: 'GET',
    endpoint: `http://localhost:5000/calories-tracker/${userId}/days`,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        DAYS_REQUEST,
        {
            type: DAYS_SUCCESS,
            payload: async (action, state, res) => {
                const json = await res.json();
                const { entities } = normalize(json, daysSchema);
                return entities;
            },
            meta: { actionType: 'GET_ALL' }
        },
        DAYS_FAILURE
    ]
}))

const addDay = (userId, dayId) => (dispatch) => dispatch(createAction({
    method: 'POST',
    endpoint: `http://localhost:5000/calories-tracker/${userId}/day`,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({dayId}),
    types: [
        DAYS_REQUEST,
        {
            type: DAYS_SUCCESS,
            payload: async (action, state, res) => {
                const json = await res.json();
                const { entities } = normalize(json, daySchema);
                return entities;
            },
            meta: { actionType: 'GET_ONE' }
        },
        DAYS_FAILURE
    ]
}))

const updateDay = (userId, day) => (dispatch) => dispatch(createAction({
    method: 'PATCH',
    endpoint: `http://localhost:5000/calories-tracker/${userId}/day`,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({...day}),
    types: [
        DAYS_REQUEST,
        {
            type: DAYS_SUCCESS,
            payload: async (action, state, res) => {
                const json = await res.json();
                const { entities } = normalize(json, daySchema);
                return entities;
            },
            meta: { actionType: 'GET_ONE' }
        },
        DAYS_FAILURE
    ]
}))

const operations = {
    getDays, addDay, updateDay
}
export default operations