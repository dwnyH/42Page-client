import { cloneDeep } from 'lodash';
import {
  LOADING_STATE_SEND,
  SEND_MEMO_STATE,
} from '../actions/ActionTypes';

const initialState = {
  initiate: true,
  update: false,
  isMemoPage: true,
};

export default (state = initialState, action) => {
  const copiedState = cloneDeep(state);

  switch (action.type) {
    case LOADING_STATE_SEND:
      copiedState.initiate = false;

      return copiedState;

    case SEND_MEMO_STATE:
      copiedState.isMemoPage = action.isMemo;

      return copiedState;

    default:
      return state;
  }
};
