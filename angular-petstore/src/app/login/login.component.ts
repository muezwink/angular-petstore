import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { CommonService } from '../services/common.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
  });

  constructor(public commonService: CommonService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService) { 
  }

  ngOnInit(): void {
  }

  getEmailErrorMessage() {
    return this.loginForm.controls.email.hasError('required') ? this.commonService.messageRequired :
        this.loginForm.controls.email.hasError('email') ? this.commonService.messageInvaildEmail :
            '';
  }

  getPasswordErrorMessage() {
    return this.loginForm.controls.password.hasError('required') ? this.commonService.messageRequired :
        this.loginForm.controls.password.hasError('minlength') ? this.commonService.messageMinlength + '6' :
            '';
  }

  loginUser(){
      this.authenticationService.loginUser(this.loginForm.value.email, this.loginForm.value.password);
  }
}
