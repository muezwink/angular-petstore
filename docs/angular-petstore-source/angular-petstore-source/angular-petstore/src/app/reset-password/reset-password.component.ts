import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { CommonService } from '../services/common.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Dialog } from '../classes/dialog';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]]
  });

  constructor(private router: Router,
    public commonService: CommonService,
    private authenticationService: AuthenticationService,
    public formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.resetPasswordForm.controls.email.hasError('required') ? this.commonService.messageRequired :
        this.resetPasswordForm.controls.email.hasError('email') ? this.commonService.messageInvaildEmail :
            '';
  }

  resetPassword(){
    if (!this.resetPasswordForm.valid){
      this.commonService.showMessage(new Dialog(this.commonService.messageForminvalid, JSON.stringify(this.resetPasswordForm.value)));
    } else {
      this.commonService.createLoading();
      
      this.authenticationService.resetPassword(this.resetPasswordForm.value.email).then( authData => {
        this.commonService.dismissLoading();
        this.router.navigateByUrl('/home');
      }, error => {
        this.commonService.dismissLoading();
        this.commonService.showMessage(new Dialog(error.code, error.message));
      });
    }

  }
}
