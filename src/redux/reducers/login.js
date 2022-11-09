import { ADD_LOGIN, TOKEN_API } from '../action';

const INITIAL_STATE = {
  email: '',
  name: '',
  token: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_LOGIN:
    return {
      ...state,
      email: action.payload,
    };
  case TOKEN_API:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

export default login;
