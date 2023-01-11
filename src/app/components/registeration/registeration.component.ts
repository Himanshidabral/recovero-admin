import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PASSWORD_REGEX } from 'src/app/constants/regex.constant';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent implements OnInit {
  
  registerUser: FormGroup = new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(7),
      Validators.pattern(PASSWORD_REGEX)]),
    passwordConfirm: new FormControl('', [Validators.required])
  },
    { validators: [this.matchPasswords('password', 'passwordConfirm')] }
  );
  constructor(
    private $loginService: LoginService,
    private $router: Router,
    private $alert: AlertService,
    private dialogRef: MatDialogRef<RegisterationComponent>,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void { 
    const userData = this.registerUser.value;
  
    this.$loginService.register(userData).subscribe(data => {
      this.$alert.success(data.message);
      this.dialogRef.close();

    });
  }

  private matchPasswords(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => { 
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      } 
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  close(){
    this.dialogRef.close();
  }

}
