import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAuthResponseData } from '../shared/auth.response';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationsService {

  constructor(private httpClient: HttpClient) {}

  user = new Subject<User>();

  signUp(email: string, password: string) {
    console.log("signUp", email, password);

    return this.httpClient
      .post<IAuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDh60_7CNb6aZSxc6Ss9smYtYtQ0lDztXo',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {

          console.log('signUp', responseData);

          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    console.log("login", email, password);

    return this.httpClient
      .post<IAuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDh60_7CNb6aZSxc6Ss9smYtYtQ0lDztXo',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          console.log('login', responseData);
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next({
      _token: '',
      _tokenExpirationData: new Date(),
      email: '',
      id: '',
      token: '',
    });
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Unknown error';
    console.log( "handleError" );

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'An error email exist';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'EMAIL NOT FOUND';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'TOO MANY ATTEMPTS TRY LATER';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'INVALID PASSWORD';
        break;
      case 'USER_DISABLED':
        errorMessage = 'USER DISABLED';
        break;
      default:
        errorMessage = errorResponse.error.error.message;
    }

    return throwError(() => errorMessage);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    console.log("handleAuthentication");

    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);

    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
  }
}
