import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { CommonService } from '../services/common.service';
import { AuthenticationService } from '../services/authentication.service';
import { Dialog } from '../classes/dialog';

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

  ngOnInit() {
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
      /**
   * If the form is valid it will call the AuthData service to log the user in displaying a loading component while
   * the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  loginUser(){
    if (!this.loginForm.valid){
      this.commonService.showMessage(new Dialog(this.commonService.messageForminvalid, JSON.stringify(this.loginForm.value)));
    } else {
      this.commonService.createLoading();
      
      this.authenticationService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        this.commonService.dismissLoading();
      }, error => {
        this.commonService.dismissLoading();
        this.commonService.showMessage(new Dialog(error.code, error.message));
      });
    }

  }

  googleUser() {
    this.commonService.createLoading();
    this.authenticationService.googleLogin().then( authData => {
      this.commonService.dismissLoading();
    }, error => {
      this.commonService.dismissLoading();
      this.commonService.showMessage(new Dialog(error.code, error.message));
    });    
  }


}
