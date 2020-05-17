import { Component } from '@angular/core';
// MIS SERVICES...
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ingresoEgresoApp';
  constructor(private autService: AuthService) {
    this.autService.initAutListener();
  }
}
