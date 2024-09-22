import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationsService } from '../services/authentications.service';
import { inject, Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: "root"
})

class CanActivateClass {
  constructor(
    private authenticationsService: AuthenticationsService,
    private router: Router
  ) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.authenticationsService.user.pipe(
      take(1),
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      },
    ));
  } 
}

export const canActivateGuard: CanActivateFn = (route, state) => {
  return inject(CanActivateClass).canActivate();
};
