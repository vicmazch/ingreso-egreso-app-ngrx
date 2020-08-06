import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ingresosEgresosActions from '../ingreso-egreso/ingreso-egreso.action';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  usrSubscription: Subscription;
  ingresosEgresosFBSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.usrSubscription = this.store
      .select('auth')
      .pipe(filter((auth) => auth && auth.usuario != null))
      .subscribe(({ usuario }) => {
        this.ingresosEgresosFBSubscription = this.ingresoEgresoService
          .initIngresosEgresosListener(usuario.uid)
          .subscribe((itemsFB) => {
            this.store.dispatch(
              ingresosEgresosActions.setItems({ items: itemsFB })
            );
          });
      });
  }

  ngOnDestroy() {
    this.ingresosEgresosFBSubscription.unsubscribe();
    this.usrSubscription.unsubscribe();
  }
}
