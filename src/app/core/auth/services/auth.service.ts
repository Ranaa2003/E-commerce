import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AuthService = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  registerForm(user: object): Observable<any> {
    return this.AuthService.post(environment.baseUrl + 'auth/signup', user);
  }
  loginForm(user: object): Observable<any> {
    return this.AuthService.post(environment.baseUrl + 'auth/signin', user);
  }

  logOut(): void {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
  decodeToken() {
    let token;
    try {
      token = jwtDecode(this.cookieService.get('token'));
    } catch (error) {
      this.logOut();
    }
    console.log(token)
    return token;
  }
  verifyEmail(email: object): Observable<any> {
    return this.AuthService.post(
      environment.baseUrl + 'auth/forgotPasswords',
      email
    );
  }
  verifyCode(code: object): Observable<any> {
    return this.AuthService.post(
      environment.baseUrl + 'auth/verifyResetCode',
      code
    );
  }
  restPassword(data: object): Observable<any> {
    console.log('hello');
    return this.AuthService.put(
      environment.baseUrl + 'auth/resetPassword',
      data
    );
  }
}
