import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// NG2 CHARTS
import { ChartsModule } from 'ng2-charts';

import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { OrdenIngresoPipe } from './pipes/orden-ingreso.pipe';

// MODULES
import { SharedModule } from '../shared/shared.module';
// ROUTING
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

import { StoreModule } from '@ngrx/store';
import { ingresosEgresosReducer } from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ChartsModule,
    // MODULES
    SharedModule,
    // ROUTING
    DashboardRoutesModule,
    // NGRX
    StoreModule.forFeature('ingresosEgresos', ingresosEgresosReducer),
  ],
})
export class IngresoEgresoModule {}
