import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAuthResponseData } from '../shared/auth.response';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationsService {
  constructor(private httpClient: HttpClient) {}

  user = new BehaviorSubject<User | null>(null);

  signUp(email: string, password: string) {
    return this.httpClient
      .post<IAuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDh60_7CNb6aZSxc6Ss9smYtYtQ0lDztXo',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
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
        tap((responseData) => {
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
    this.user.next(null);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Unknown error';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'An email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found !';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password !';
    }
    return throwError(() => errorMessage);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }
}
