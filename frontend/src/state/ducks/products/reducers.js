import types from "./types";

const fetchedProducts = (state = [], action) => {
    switch (action.type) {
        case types.PRODUCTS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

const productsReducers = {fetchedProducts}

export default productsReducers;