import { createReducer, on } from '@ngrx/store';
import * as ACTIONS from './auth.actions';
import { Usuario } from '../models/usuario.model';

export interface State {
  usuario: Usuario;
}

export const initialState: State = {
  usuario: null,
};

const _authReducer = createReducer(
  initialState,

  on(ACTIONS.setUser, (state, { usuario }) => ({ usuario })),
  on(ACTIONS.unSetUser, (state) => null)
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
