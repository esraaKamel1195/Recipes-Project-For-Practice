import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationsService } from '../services/authentications.service';
import { IAuthResponseData } from '../shared/auth.response';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../directive/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoggedInMode: boolean = false;
  isLoading: boolean = false;
  error: any = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost?: PlaceholderDirective;
  @ViewChild('dynamicComponent', { read: ViewContainerRef }) dynamicComponent?: ViewContainerRef;
  private closeSubscription?: Subscription;

  constructor(
    // private componentFactoryResolver: ComponentFactoryResolver,
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

    let authObs: Observable<IAuthResponseData>;
    this.isLoading = true;

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
        this.isLoading = false;
        this.showErrorAlert(errorMessage);
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

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    // not correct way
    // const alertComponent = new AlertComponent();

    // old version deprecated
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    // const hostViewContainerRef = this.alertHost?.viewContainerRef;
    // hostViewContainerRef?.clear();

    // const componentRef = hostViewContainerRef?.createComponent(componentFactory);
    // if (componentRef?.instance.message) {
    //   // componentRef?.instance.message = message;
    // }

    // this.closeSubscription = componentRef?.instance.close.subscribe(() => {
    //   this.closeSubscription?.unsubscribe();
    //   hostViewContainerRef?.clear();
    // });

    this.dynamicComponent?.clear();
    const componentRef: any = this.dynamicComponent?.createComponent(AlertComponent);
    componentRef.instance.message = message;

    this.closeSubscription = componentRef?.instance.close.subscribe((data: never) => {
      this.closeSubscription?.unsubscribe();
      this.dynamicComponent?.clear();
    });
  }
}
