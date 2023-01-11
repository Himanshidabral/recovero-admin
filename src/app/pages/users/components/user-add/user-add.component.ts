import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PASSWORD_REGEX } from 'src/app/constants/regex.constant';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  userAdd: FormGroup = new FormGroup({
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
    private $alert: AlertService,
    private dialogRef: MatDialogRef<UserAddComponent>,
    private $userService:UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void { 
    const userData = this.userAdd.value;
  
    this.$userService.addUser(userData).subscribe(data => {
      this.$alert.success(data.message);
      this.dialogRef.close();

    });
  }

  private matchPasswords(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => { console.log(formGroup.controls);
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
    this.dialogRef.close({add:true});
  }

}
