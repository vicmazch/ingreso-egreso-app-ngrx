import { createReducer, on } from '@ngrx/store';
import * as ACTIONS from './ui.actions';

export interface State {
  isLoading: boolean;
}

export const initialState: State = {
  isLoading: false,
};

const _uiReducer = createReducer(
  initialState,

  on(ACTIONS.isLoading, (state) => ({ ...state, isLoading: true })),
  on(ACTIONS.stopLoading, (state) => ({ ...state, isLoading: false }))
);

export function uiReducer(state, action) {
  return _uiReducer(state, action);
}
