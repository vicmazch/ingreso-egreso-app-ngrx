import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  crearIngresogreso(ingresoEgreso: IngresoEgreso): Promise<any> {
    const uid = this.authService.usuario.uid;
    console.log(':::UID: ', uid, ingresoEgreso);

    return this.firestore
      .doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  initIngresosEgresosListener(uid: string) {
    return this.firestore
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map((_snapshot) =>
          _snapshot.map((_item) => ({
            uid: _item.payload.doc.id,
            ...(_item.payload.doc.data() as any),
          }))
        )
      );
  }

  borrarIngresoEgreso(uidItem: string): Promise<any> {
    const uidUsr = this.authService.usuario.uid;

    return this.firestore
      .doc(`${uidUsr}/ingresos-egresos/items/${uidItem}`)
      .delete();
  }
}
