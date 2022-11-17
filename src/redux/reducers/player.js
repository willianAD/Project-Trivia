import { CHANGE_POINTS } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_POINTS:
    return {
      ...state,
      score: action.player.score,
      name: action.player.name,
      gravatarEmail: action.player.gravatarEmail,
      assertions: action.player.assertions,
    };
  default:
    return state;
  }
};

export default playerData;
