import {createAction} from "redux-api-middleware";
import types from "./types";
import {normalize, schema} from "normalizr";

const {MEALS_REQUEST, MEALS_FAILURE, MEALS_SUCCESS} = types

const productSchema = new schema.Entity('meals');
const mealsSchema = new schema.Array(productSchema);

const getMeals = (userId) => (dispatch) => dispatch(createAction({
    method: 'GET',
    endpoint: `https://localhost:5000/calories-tracker/${userId}/meals`,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        MEALS_REQUEST,
        {
            type: MEALS_SUCCESS,
            payload: async (action, state, res) => {
                const json = await res.json();
                const { entities } = normalize(json, mealsSchema);
                return entities;
            },
            meta: { actionType: 'GET_ALL' }
        },
        MEALS_FAILURE
    ]
}))
const operations = {
    getMeals
}
export default operations