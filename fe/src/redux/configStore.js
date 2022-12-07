import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk'
import  MoviesReducer  from './reducers/MoviesReducer';
//middlewport LoadingReducer from './reducers/LoadingReducer';are redux saga
import createMiddlewareSaga from 'redux-saga'
import { rootSaga } from './saga/rootsaga';
import CheckoutReducer from './reducers/CheckoutReducer';
import UserReducer from './reducers/UserReducer';
import AdminReducer from './reducers/AdminReducer';
//create middleware saga
const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
    MoviesReducer,
    CheckoutReducer,
    UserReducer,
    AdminReducer
});

export const store = createStore(rootReducer,applyMiddleware(middlewareSaga));
//run saga
middlewareSaga.run(rootSaga)