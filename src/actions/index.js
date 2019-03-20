import {
  LOADING_STATE_SEND,
} from './ActionTypes';

export function sendLoadingState() {
  return {
    type: LOADING_STATE_SEND,
  };
}
