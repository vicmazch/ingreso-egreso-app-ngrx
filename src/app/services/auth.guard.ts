import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private autService: AuthService, private route: Router) {}

  canActivate(): Observable<boolean> {
    return this.autService.isAuth().pipe(
      tap((estado) => {
        if (!estado) {
          this.route.navigate(['/login']);
        }
      })
    );
  }
}
