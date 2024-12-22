import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { AuthenticationInterceptorService } from './services/authentication.interceptor.service';
import { StoreModule } from '@ngrx/store';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './directive/placeholder.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
