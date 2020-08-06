import { createReducer, on } from '@ngrx/store';
import * as actions from './ingreso-egreso.action';

import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface State {
  items: IngresoEgreso[];
}

export interface AppStateIngresoEgreso extends AppState {
  ingresosEgresos: State;
}
export const initialState: State = {
  items: [],
};

const _ingresosEgresosReducer = createReducer(
  initialState,
  on(actions.unSetItems, (state) => ({ items: [] })),
  on(actions.setItems, (state, { items }) => ({ ...state, items: [...items] }))
);

export function ingresosEgresosReducer(state, action) {
  return _ingresosEgresosReducer(state, action);
}
