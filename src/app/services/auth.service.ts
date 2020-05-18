import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ACTIONS from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscription: Subscription;

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
            this.store.dispatch(ACTIONS.setUser({ usuario: userN }));
          });
      } else {
        this.store.dispatch(ACTIONS.unSetUser());
        this.userSubscription.unsubscribe();
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

  logout(): Promise<any> {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fbUsr) => !!fbUsr));
  }
}
