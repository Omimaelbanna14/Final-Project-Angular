import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode } from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _HttpClient = inject(HttpClient)
  private readonly _CookieService = inject(CookieService)
  userInfo: any

  decodeToken() {
    this.userInfo = jwtDecode(this._CookieService.get('token'))
  }


  SignUp(registerData: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signup`, registerData)
  }
  SignIn(loginData: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signin`, loginData)
  }


  ForgotPassword(forgotPassword: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/forgotPasswords`, forgotPassword)
  }
  VerifyResetCode(verifyResetCode: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/verifyResetCode`, verifyResetCode)
  }

  UpdateLoggedUserPassword(changeMyPassword: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseURL}/api/v1/users/changeMyPassword`, changeMyPassword)
  }
  ResetPassword(resetPassword: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseURL}/api/v1/auth/resetPassword`, resetPassword)
  }
  UpdateLoggedUserData(updateMe: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseURL}/api/v1/users/updateMe/`, updateMe)
  }
  GetAllUsers(users: object): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/users`, users)
  }
  VerifyToken(verifyToken: object): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/auth/verifyToken`, verifyToken)
  }

constructor() {
  const token = this._CookieService.get('token');
  if (token) {
    this.decodeToken();
  }
}


}
