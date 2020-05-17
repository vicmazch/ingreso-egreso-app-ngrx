import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// TERCEROS
import Swal from 'sweetalert2';
// MIS SERVICES
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private autService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get fc() {
    return this.formGroup.controls;
  }

  login() {
    const { correo, password } = this.formGroup.value;

    Swal.fire({
      title: 'Espere por favor...',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    this.autService
      .login(correo, password)
      .then((success) => {
        Swal.close();
        this.router.navigate(['/']);

        console.log('::: LOGIN -SUCCESS- ', {
          success,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Ooops!',
          text: error.message,
          icon: 'error',
        });
      });
  }
}
