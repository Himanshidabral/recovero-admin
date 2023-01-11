import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CHANGE_PASSWORD_API, LOGIN_API, REGISTER_API } from '../constants/api.constants';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private $http: HttpService,
    private $fb: FormBuilder
  ) { }

  loginForm(): FormGroup {
    return this.$fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(15)]],
      role:['']
    });
    
  }

  logIn(data: { email: string; password: string }): Observable<LoginResp> {
    return this.$http.post(LOGIN_API, data);
  }

  changePassword(data:any): Observable<{ message: string }> {
    return this.$http.post(CHANGE_PASSWORD_API, data);
  }

  register(data:any): Observable<{ message: string }> {
    return this.$http.post(REGISTER_API, data);
  }
}



interface LoginResp {
  status: number;
  data: {
    admin: {},
    token: string;
  };
}
