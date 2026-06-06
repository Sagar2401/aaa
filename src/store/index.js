import {createStore, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';

import routeReducer from './reducers';

const initalState = {

}

const middleware = [thunk]

const store = createStore(routeReducer, initalState, applyMiddleware(...middleware))

export default store;