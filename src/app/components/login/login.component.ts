import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FORGOT_PASSWORD_ROUTE } from 'src/app/constants/route.constants';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { LoginService } from 'src/app/services/login.service';
import { RegisterationComponent as RegistrationComponent } from '../registeration/registeration.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  forgotPasswordRoute = FORGOT_PASSWORD_ROUTE;
  loginForm: FormGroup = this.$loginService.loginForm();
  isLoading = false;
  hide = true;
  constructor(
    private $router: Router,
    private $loginService: LoginService,
    private $alert: AlertService,
    private $dialog:MatDialog
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    const loginData = this.loginForm.value;
    this.isLoading = true;
    let role=loginData.role;
    loginData.role=loginData.role==true?2:1

    this.$loginService.logIn(loginData).subscribe(data => {
      const accessToken = data.data.token;
      const role='';
      localStorage.setItem('adminAccessToken', accessToken);
      localStorage.setItem('adminType', loginData.role);
      this.isLoading = false;
      this.$router.navigateByUrl('/');
    }, err => {
      loginData.role=role;
      this.isLoading = false;
    });
  }


  register()
  {
   const dialogRef= this.$dialog.open(RegistrationComponent,{
    height: 'auto',
    width: '30%',
    minWidth: '200px',
    maxHeight: '90vh',
   })
  }

}
