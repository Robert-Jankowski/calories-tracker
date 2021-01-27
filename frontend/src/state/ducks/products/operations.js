import {createAction} from "redux-api-middleware";
import types from "./types";
import {normalize, schema} from "normalizr";

const {PRODUCTS_REQUEST, PRODUCTS_FAILURE, PRODUCTS_SUCCESS} = types

const productSchema = new schema.Entity('products');
const productsSchema = new schema.Array(productSchema);

const getProducts = (userId) => (dispatch) => dispatch(createAction({
    method: 'GET',
    endpoint: `https://localhost:5000/calories-tracker/${userId}/days`,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        PRODUCTS_REQUEST,
        {
            type: PRODUCTS_SUCCESS,
            payload: async (action, state, res) => {
                const json = await res.json();
                const { entities } = normalize(json, productsSchema);
                return entities;
            },
            meta: { actionType: 'GET_ALL' }
        },
        PRODUCTS_FAILURE
    ]
}))
const operations = {
    getProducts
}
export default operations