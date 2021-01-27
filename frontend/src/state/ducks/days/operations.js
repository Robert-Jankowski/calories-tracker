import {createAction} from "redux-api-middleware";
import types from "./types";
import {normalize, schema} from "normalizr";

const {DAYS_REQUEST, DAYS_FAILURE, DAYS_SUCCESS} = types

const daySchema = new schema.Entity('days');
const daysSchema = new schema.Array(daySchema);

const getDays = (userId) => (dispatch) => dispatch(createAction({
    method: 'GET',
    endpoint: `https://localhost:5000/calories-tracker/${userId}/days`,
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
const operations = {
    getDays
}
export default operations