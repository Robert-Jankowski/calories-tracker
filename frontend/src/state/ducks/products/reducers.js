import types from "./types";
import {v4 as uuid} from "uuid"

const fetchedProducts = (state = {list: [], isFetched: false}, action) => {
    switch (action.type) {
        case types.SET_FETCHED:
            return {list: action.payload.hints.map(n => ({
                    id: uuid(),
                    name: n.food.label,
                    calories: Math.round(n.food.nutrients.ENERC_KCAL),
                    proteins: Math.round(n.food.nutrients.PROCNT),
                    fats: Math.round(n.food.nutrients.FAT),
                    carbs: Math.round(n.food.nutrients.CHOCDF)
                })), isFetched: true};
        case types.RESET_FETCHED:
            return {list: [], isFetched: false}
        default:
            return state;
    }
}

const productsReducers = {fetchedProducts}

export default productsReducers;