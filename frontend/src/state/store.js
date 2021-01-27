import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';

import logger from 'redux-logger';

import {createMiddleware} from 'redux-api-middleware';
import entitiesReducers from "./ducks/entities"

const rootReducer = combineReducers(
    {...entitiesReducers});

const store = createStore(rootReducer, applyMiddleware(thunk, createMiddleware(), logger));

export default store;