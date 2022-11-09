import { ADD_LOGIN } from '../action';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_LOGIN:
    return {
      ...state,
      email: action.payload,
      name: action.payload,
    };
  default:
    return state;
  }
};

export default login;
