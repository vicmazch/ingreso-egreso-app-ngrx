import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ingresosEgresosActions from '.././../ingreso-egreso/ingreso-egreso.action';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresosSubscription: Subscription;
  ingresosEgresos: IngresoEgreso[];

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit() {
    this.ingresosEgresosSubscription = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => {
        this.ingresosEgresos = items;
      });
  }

  ngOnDestroy() {
    this.ingresosEgresosSubscription.unsubscribe();
  }

  borrar(uid: string) {
    this.ingresoEgresoService
      .borrarIngresoEgreso(uid)
      .then((success) => {
        Swal.fire('Borrado', 'Item borrado', 'success');
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
      });
  }
}
