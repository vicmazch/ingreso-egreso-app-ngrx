import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// MIS SERVICES...
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  constructor(private autService: AuthService, private route: Router) {}

  ngOnInit(): void {}

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
