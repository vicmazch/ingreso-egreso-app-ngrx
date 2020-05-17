import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// TERCEROS
import Swal from 'sweetalert2';
// MIS SERVICES
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get fc() {
    return this.formGroup.controls;
  }

  crearUsuario() {
    const { nombre, correo, password } = this.formGroup.value;

    Swal.fire({
      title: 'Espere por favor...',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    this.authService
      .crearUsuario(nombre, correo, password)
      .then((credenciales) => {
        Swal.close();
        this.router.navigate(['/']);

        console.log('::: REGISTER CREDENCIALES -SUCCESS- ', { credenciales });
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
