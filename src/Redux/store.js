import {createStore, applyMiddleware} from 'redux'
import { combineReducers } from 'redux'

import thunk from 'redux-thunk'
import reducer from './reducer'

const rootReducer = combineReducers({reducer})
export const Store = createStore(rootReducer, applyMiddleware(thunk))