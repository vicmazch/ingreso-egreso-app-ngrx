import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Usuario } from '../models/usuario.model';
import { AppState } from '../app.reducer';

import * as authActions from '../auth/auth.actions';
import * as ingresosEgresosActions from '.././ingreso-egreso/ingreso-egreso.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscription: Subscription;
  private _usuario: Usuario;

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAutListener() {
    this.auth.authState.subscribe((usr) => {
      if (usr) {
        this.userSubscription = this.firestore
          .doc(`${usr.uid}/usuario`)
          .valueChanges()
          .subscribe((fireStoreUsr: any) => {
            const userN = Usuario.fromFirebase(fireStoreUsr);
            this.store.dispatch(authActions.setUser({ usuario: userN }));
            this.store.dispatch(ingresosEgresosActions.unSetItems());
            this._usuario = userN;
          });
      } else {
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(ingresosEgresosActions.unSetItems());

        if (!!this.userSubscription) this.userSubscription.unsubscribe();
        this._usuario = null;
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string): Promise<any> {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((fbusr) => {
        const newUsr = new Usuario(fbusr.user.uid, nombre, fbusr.user.email);
        return this.firestore
          .doc(`${fbusr.user.uid}/usuario`)
          .set({ ...newUsr });
      });
  }

  login(email: string, password: string): Promise<any> {
    console.log('::: PARASM LOGIN ', { email, password });

    return this.auth.signInWithEmailAndPassword(email, password);
  }

  get usuario(): Usuario {
    return { ...this._usuario };
  }

  logout(): Promise<any> {
    this.store.dispatch(ingresosEgresosActions.unSetItems());

    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fbUsr) => !!fbUsr));
  }
}
