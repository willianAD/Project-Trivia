import { combineReducers } from 'redux';
import login from './login';
import player from './player';

const rootReducer = combineReducers({ login, player });

export default rootReducer;
