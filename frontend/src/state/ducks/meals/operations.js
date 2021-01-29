import {createAction} from "redux-api-middleware";
import types from "./types";
import {normalize, schema} from "normalizr";

const {MEALS_REQUEST, MEALS_FAILURE, MEALS_SUCCESS} = types

const mealSchema = new schema.Entity('meals');
const mealsSchema = new schema.Array(mealSchema);

const getMeals = (userId) => (dispatch) => dispatch(createAction({
    method: 'GET',
    endpoint: `http://localhost:5000/calories-tracker/${userId}/meals`,
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

const deleteMeal = (userId, mealId) => (dispatch) => dispatch(createAction({
    method: 'DELETE',
    endpoint: `http://localhost:5000/calories-tracker/${userId}/meals/${mealId}`,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        MEALS_REQUEST,
        {
            type: MEALS_SUCCESS,
            payload: async (action, state, res) => {
                const json = {id: mealId}
                const { entities } = normalize(json, mealSchema);
                return entities;
            },
            meta: { actionType: 'DELETE_ONE' }
        },
        MEALS_FAILURE
    ]
}))

const addMeal = (userId, meal_type, meal_id) => (dispatch) => dispatch(createAction({
    method: 'POST',
    endpoint: `http://localhost:5000/calories-tracker/${userId}/meals`,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({meal_type, meal_id}),
    types: [
        MEALS_REQUEST,
        {
            type: MEALS_SUCCESS,
            payload: async (action, state, res) => {
                const json = await res.json()
                const { entities } = normalize(json, mealSchema);
                return entities;
            },
            meta: { actionType: 'GET_ONE' }
        },
        MEALS_FAILURE
    ]
}))

const operations = {
    getMeals, deleteMeal, addMeal
}
export default operations