import { cloneDeep } from 'lodash';
import {
  LOADING_STATE_SEND,
} from '../actions/ActionTypes';

const initialState = {
  initiate: true,
};

export default (state = initialState, action) => {
  const copiedState = cloneDeep(state);

  switch (action.type) {
    case LOADING_STATE_SEND:
      copiedState.initiate = false;

      return copiedState;

    default:
      return state;
  }
};
