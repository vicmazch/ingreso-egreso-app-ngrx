import { ActionReducerMap } from '@ngrx/store';
// MIS REDUCERS
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as ingresosEgresos from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
  ui: ui.State;
  auth: auth.State;
  //   ingresosEgresos: ingresosEgresos.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  //   ingresosEgresos: ingresosEgresos.ingresosEgresosReducer,
};
