import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}

  initAutListener() {
    this.auth.authState.subscribe((usr) => {
      console.log(':::AUTHLISTENER ', { usr });
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
