import { GRAVATAR } from '../action';

const INITIAL_STATE = {
  gravatar: '',
};

const gravatarIMG = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GRAVATAR:
    return {
      ...state,
      gravatar: action.payload,
    };
  default:
    return state;
  }
};

export default gravatarIMG;
