import { combineReducers } from 'redux';
import getRecipesReducer from './getRecipesReducer';

const rootReducer = combineReducers({ getRecipesReducer });
export default rootReducer;
