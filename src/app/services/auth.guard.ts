import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private autService: AuthService, private route: Router) {}

  canLoad(): Observable<boolean> {
    return this.autService.isAuth().pipe(
      tap((estado) => {
        if (!estado) {
          this.route.navigate(['/login']);
        }
      }),
      take(1)
    );
  }

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
