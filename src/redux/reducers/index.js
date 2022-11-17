import { combineReducers } from 'redux';
import login from './login';
import gravatarIMG from './gravatar';

const rootReducer = combineReducers({ login, gravatarIMG });

export default rootReducer;
