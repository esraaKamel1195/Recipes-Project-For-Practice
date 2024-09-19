import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationsService } from '../services/authentications.service';
import { IAuthResponseData } from '../shared/auth.response';

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
    if (!form.valid) {
      return;
    }

    // const email = form.value.email;
    // const password = form.value.password;
    let authObs: Observable<IAuthResponseData>;
    this.isLoading = true;

    // if (this.isLoggedInMode) {
    //   authObs = this.authenticationsService.login(email, password);
    // } else {
    //   authObs = this.authenticationsService.signUp(email, password);
    // }

    if (this.isLoggedInMode) {
      authObs = this.authenticationsService.login(form.value.email, form.value.password);
    } else {
      authObs = this.authenticationsService.signUp(form.value.email, form.value.password);
    }

    authObs.subscribe({
      next: (data: IAuthResponseData) => {
        console.log(data);
        this.error = null;
        this.isLoading = false;
        form.reset();
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        console.log(this.error);
        this.isLoading = false;
      },
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form.value);

  //   if (!form.valid) {
  //     return;
  //   }

  //   console.log(form.value);
  //   // login and sign up function still not work ya Esraa

  //   this.isLoading = true;
  //   let authObs: Observable<IAuthResponseData>;

  //   if (this.isLoggedInMode) {
  //     this.authenticationsService.login(
  //       form.value.email,
  //       form.value.password
  //     ).subscribe({
  //       next: (response) => {
  //         this.error = null;
  //         this.isLoading = false;
  //         console.log(response);
  //         this.router.navigate(['/recipes']);
  //       },
  //       error: (error) => {
  //         this.error = error;
  //         this.isLoading = false;
  //       },
  //       complete: () => {
  //         form.reset();
  //       },
  //     });
  //     console.log(this.isLoggedInMode);
  //   } else {
  //     // this.authenticationsService.signUp(
  //     //   form.value.email,
  //     //   form.value.password
  //     // ).subscribe({
  //     //   next: (response) => {
  //     //     this.error = null;
  //     //     this.isLoading = false;
  //     //     console.log(response);
  //     //     this.router.navigate(['/recipes']);
  //     //   },
  //     //   error: (error) => {
  //     //     this.error = error;
  //     //     this.isLoading = false;
  //     //   },
  //     //   complete: () => {
  //     //     form.reset();
  //     //   },
  //     // });

  //     console.log(this.isLoggedInMode);
  //   }

  //   // console.log(authObs);
  //   // authObs.subscribe({
  //   //   next: (response) => {
  //   //     this.error = null;
  //   //     this.isLoading = false;
  //   //     console.log(response);
  //   //     this.router.navigate(['/recipes']);
  //   //   },
  //   //   error: (error) => {
  //   //     this.error = error;
  //   //     this.isLoading = false;
  //   //   },
  //   //   complete: () => {
  //   //     form.reset();
  //   //   },
  //   // });
  // }
}
