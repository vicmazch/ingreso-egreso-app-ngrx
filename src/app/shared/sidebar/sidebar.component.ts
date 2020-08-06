import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

// MIS SERVICES...
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  usuario: Usuario;
  usuarioSubcription: Subscription;

  constructor(
    private autService: AuthService,
    private route: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.usuarioSubcription = this.store
      .select('auth')
      .pipe(filter((auth) => auth != null))
      .subscribe(({ usuario }) => {
        this.usuario = usuario;
      });
  }

  ngOnDestroy() {
    this.usuarioSubcription.unsubscribe();
  }

  logout() {
    this.autService
      .logout()
      .then((success) => {
        this.route.navigate(['/login']);
        console.log('::: LOGOUT - SUCCESS- ', {
          success,
        });
      })
      .catch((error) => console.error('::: LOGOUT -ERROR- ', { error }));
  }
}
