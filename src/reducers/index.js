import { cloneDeep } from 'lodash';
import {
  LOADING_STATE_SEND,
} from '../actions/ActionTypes';

const initialState = {
  loading: true,
};

export default (state = initialState, action) => {
  const copiedState = cloneDeep(state);

  switch (action.type) {
    case LOADING_STATE_SEND:
      copiedState.loading = false;

      return copiedState;

    default:
      return state;
  }
};
