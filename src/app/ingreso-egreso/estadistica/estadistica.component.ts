import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  public doughnutChartLabels: Label[] = ['Egresos', 'Ingresos'];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  ingresos: number = 0;
  egresos: number = 0;

  totalEgresos: number = 0;
  totalIngresos: number = 0;

  ingresosEgresosSubscribe: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.ingresosEgresosSubscribe = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => {
        this.generarEstaddistica(items);
      });
  }

  ngOnDestroy() {
    this.ingresosEgresosSubscribe.unsubscribe();
  }

  generarEstaddistica(items: IngresoEgreso[]) {
    this.egresos = items.reduce((acc, _ie) => {
      if (_ie.tipo == 'egreso') {
        return acc + _ie.monto;
      } else {
        return acc;
      }
    }, 0);

    this.ingresos = items.reduce((acc, _ie) => {
      if (_ie.tipo == 'ingreso') {
        return acc + _ie.monto;
      } else {
        return acc;
      }
    }, 0);

    this.totalEgresos = items.reduce((acc, _ie) => {
      if (_ie.tipo == 'egreso') {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    this.totalIngresos = items.reduce((acc, _ie) => {
      if (_ie.tipo == 'ingreso') {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    this.doughnutChartData = [[this.egresos, this.ingresos]];
  }
}
