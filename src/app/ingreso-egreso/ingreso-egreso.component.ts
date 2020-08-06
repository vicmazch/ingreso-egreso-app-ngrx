import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

import { AppState } from 'src/app/app.reducer';

import * as ACTIONS from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoEgresoForm: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;

  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.ingresoEgresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  submit() {
    if (this.ingresoEgresoForm.invalid) return;

    this.store.dispatch(ACTIONS.isLoading());

    const { descripcion, monto } = this.ingresoEgresoForm.value;
    // const newItem = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService
      .crearIngresogreso({ descripcion, monto, tipo: this.tipo })
      .then((sucess) => {
        this.ingresoEgresoForm.reset();
        this.store.dispatch(ACTIONS.stopLoading());

        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch((error) => {
        this.store.dispatch(ACTIONS.stopLoading());

        Swal.fire('Error', error.message, 'error');
      });
  }
}
