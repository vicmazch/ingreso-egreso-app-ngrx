import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import _ from 'lodash';

@Pipe({
  name: 'ordenIngreso',
})
export class OrdenIngresoPipe implements PipeTransform {
  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    console.log('::: ITEMS ', JSON.stringify(items));

    if (items && items.length) {
      //   return _.orderBy(items, (_i) => _i.tipo);
      return [...items].sort((a, b) => {
        if (a.tipo == 'ingreso') {
          return -1;
        } else {
          return 1;
        }
      });
    } else {
      return items;
    }
  }
}
