import {createAction} from "redux-api-middleware";
import types from "./types";
import {normalize, schema} from "normalizr";
import api from "../../../api"

const {PRODUCTS_REQUEST, PRODUCTS_FAILURE, PRODUCTS_SUCCESS, SET_FETCHED} = types

const productSchema = new schema.Entity('products');
const productsSchema = new schema.Array(productSchema);

const getProducts = (userId) => (dispatch) => dispatch(createAction({
    method: 'GET',
    endpoint: `http://localhost:5000/calories-tracker/${userId}/products`,
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

const findProducts = (query) => (dispatch) => dispatch(createAction({
    method: 'GET',
    endpoint: `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${api.apiId}&app_key=${api.apiKey}`,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    types: [
        PRODUCTS_REQUEST,
        SET_FETCHED,
        PRODUCTS_FAILURE
    ]
}))

const addProduct = (userId, product) => (dispatch) => dispatch(createAction({
    method: 'POST',
    endpoint: `http://localhost:5000/calories-tracker/${userId}/product`,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({...product}),
    types: [
        PRODUCTS_REQUEST,
        {
            type: PRODUCTS_SUCCESS,
            payload: async (action, state, res) => {
                const json = await res.json();
                const { entities } = normalize(json, productSchema);
                return entities;
            },
            meta: { actionType: 'GET_ONE' }
        },
        PRODUCTS_FAILURE
    ]
}))

const operations = {
    getProducts, findProducts, addProduct
}
export default operations