import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationsService } from '../services/authentications.service';
import { map, Observable, take } from 'rxjs';
import { User } from '../user.model';

@Injectable({
  providedIn: "root"
})

class CanActivateChildClass {
  constructor(
    private authenticationsService: AuthenticationsService,
    private router: Router
  ) {}

  canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
    return this.authenticationsService.user.pipe(
      take(1),
      map((user) => {
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

export const canActivateChildGuard: CanActivateFn = (route, state) => {
  return inject(CanActivateChildClass).canActivateChild();
};
