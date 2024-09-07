import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

interface SignUpResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

interface LogInResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  user = new BehaviorSubject<LogInResponseData | null>(null);
  
  signUp(email: string, password: string) {
    return this.http.post<SignUpResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_GB_aBAqtyqoMS8xSFVkCeNxPYvc14eo',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    );
  }

  logIn(email: string, password: string) {
    return this.http.post<LogInResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_GB_aBAqtyqoMS8xSFVkCeNxPYvc14eo',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(tap(responseData => {
      this.user.next(responseData);
    }));
  }

  logOut() {
    this.user.next(null);
  }

  isLoggedIn(): boolean {
    if (this.user.value !== null) {
      return true;
    } else {
      return false;
    }
  }


}





