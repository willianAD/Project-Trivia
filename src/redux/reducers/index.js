import { combineReducers } from 'redux';
import login from './login';
import gravatarIMG from './gravatar';
import player from './player';

const rootReducer = combineReducers({ login, player, gravatarIMG });

export default rootReducer;
