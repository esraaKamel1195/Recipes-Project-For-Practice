import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationsService } from '../services/authentications.service';
import { Observable } from 'rxjs';
import { IAuthResponseData } from '../shared/auth.response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoggedInMode: boolean = false;
  isLoading: boolean = false;
  error: any = null;

  constructor(
    private authenticationsService: AuthenticationsService,
    private router: Router
  ) {}

  onSwitchMode() {
    this.isLoggedInMode = !this.isLoggedInMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    if (!form.valid) {
      return;
    }

    // login and sign up function still not work ya Esraa

    this.isLoading = true;
    let authObs: Observable<IAuthResponseData>;

    if (this.isLoggedInMode) {
      this.authenticationsService.login(
        form.value.email,
        form.value.password
      ).subscribe({
        next: (response) => {
          this.error = null;
          this.isLoading = false;
          console.log(response);
          this.router.navigate(['/recipes']);
        },
        error: (error) => {
          this.error = error;
          this.isLoading = false;
        },
        complete: () => {
          form.reset();
        },
      });
      console.log(this.isLoggedInMode);
    } else {
      this.authenticationsService.signUp(
        form.value.email,
        form.value.password
      ).subscribe({
        next: (response) => {
          this.error = null;
          this.isLoading = false;
          console.log(response);
          this.router.navigate(['/recipes']);
        },
        error: (error) => {
          this.error = error;
          this.isLoading = false;
        },
        complete: () => {
          form.reset();
        },
      });

      console.log(this.isLoggedInMode);
    }

    // console.log(authObs);
    // authObs.subscribe({
    //   next: (response) => {
    //     this.error = null;
    //     this.isLoading = false;
    //     console.log(response);
    //     this.router.navigate(['/recipes']);
    //   },
    //   error: (error) => {
    //     this.error = error;
    //     this.isLoading = false;
    //   },
    //   complete: () => {
    //     form.reset();
    //   },
    // });
  }
}
