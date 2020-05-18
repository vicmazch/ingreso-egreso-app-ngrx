import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// TERCEROS
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

//MIS ACTIONS
import * as ACTIONS from '../../shared/ui.actions';
// MIS SERVICES
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private autService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      console.log('::: SELECTOR UI: ', ui);
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  get fc() {
    return this.formGroup.controls;
  }

  login() {
    const { correo, password } = this.formGroup.value;

    this.store.dispatch(ACTIONS.isLoading());

    // Swal.fire({
    //   title: 'Espere por favor...',
    //   timerProgressBar: true,
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    this.autService
      .login(correo, password)
      .then((success) => {
        // Swal.close();
        this.router.navigate(['/']);

        this.store.dispatch(ACTIONS.stopLoading());

        console.log('::: LOGIN -SUCCESS- ', {
          success,
        });
      })
      .catch((error) => {
        this.store.dispatch(ACTIONS.stopLoading());

        Swal.fire({
          title: 'Ooops!',
          text: error.message,
          icon: 'error',
        });
      });
  }
}
