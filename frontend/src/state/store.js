import thunk from 'redux-thunk';
import {createStore, applyMiddleware, combineReducers} from 'redux';

import logger from 'redux-logger';

import {createMiddleware} from 'redux-api-middleware';
import entitiesReducers from "./ducks/entities"
import userReducers from "./ducks/user/reducers";
import daysReducers from "./ducks/days/reducers";

const rootReducer = combineReducers(
    {...entitiesReducers, ...userReducers, ...daysReducers});

const store = createStore(rootReducer, applyMiddleware(thunk, createMiddleware(), logger));

export default store;