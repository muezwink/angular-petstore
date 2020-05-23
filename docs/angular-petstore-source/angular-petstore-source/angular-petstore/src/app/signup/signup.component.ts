import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonService } from '../services/common.service';
import { AuthenticationService } from '../services/authentication.service';
import { Account } from '../classes/account'
import { Router } from '@angular/router';
import { Dialog } from '../classes/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  private account: Account;
  public countries = [];
  public defaultCountry: any;

  constructor(private router: Router,
      public commonService: CommonService,
      private authenticationService: AuthenticationService,
      public formBuilder: FormBuilder) { 
      this.countries = commonService.coutries;
      this.defaultCountry = this.countries.find(country => country.selected == true);  
      //this.signupForm.controls.country = this.defaultCountry.value;
      this.signupForm = this.formBuilder.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        name: [null, [Validators.required, Validators.minLength(2)]],
        country: [this.defaultCountry.value, Validators.required],
        city: [null, [Validators.required, Validators.minLength(2)]],
        address: [null, [Validators.required, Validators.minLength(2)]],
        zip: [null, [Validators.required, Validators.minLength(2)]]
      });
  }
    
  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.signupForm.controls.email.hasError('required') ? this.commonService.messageRequired :
        this.signupForm.controls.email.hasError('email') ? this.commonService.messageInvaildEmail :
            '';
  }
  getPasswordErrorMessage() {
    return this.signupForm.controls.password.hasError('required') ? this.commonService.messageRequired :
        this.signupForm.controls.password.hasError('minlength') ? this.commonService.messageMinlength + '6' :
            '';
  }
  getNameErrorMessage() {
    return this.signupForm.controls.name.hasError('required') ? this.commonService.messageRequired :
        this.signupForm.controls.name.hasError('minlength') ? this.commonService.messageMinlength + '2' :
            '';
  }
  getCountryErrorMessage() {
    return this.signupForm.controls.country.hasError('required') ? this.commonService.messageRequired : '';
  }
  getCityErrorMessage() {
    return this.signupForm.controls.city.hasError('required') ? this.commonService.messageRequired :
        this.signupForm.controls.city.hasError('minlength') ? this.commonService.messageMinlength + '2' :
            '';
  }
  getAddressErrorMessage() {
    return this.signupForm.controls.address.hasError('required') ? this.commonService.messageRequired :
        this.signupForm.controls.address.hasError('minlength') ? this.commonService.messageMinlength + '2' :
            '';
  }
  getZipErrorMessage() {
    return this.signupForm.controls.zip.hasError('required') ? this.commonService.messageRequired :
        this.signupForm.controls.zip.hasError('minlength') ? this.commonService.messageMinlength + '2' :
            '';
  }

  signupUser(){
    if (!this.signupForm.valid){
      this.commonService.showMessage(new Dialog(this.commonService.messageForminvalid, JSON.stringify(this.signupForm.value)));
     } else {
      this.commonService.createLoading();

      this.account = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        name: this.signupForm.value.name,
        country: this.signupForm.value.country,
        city: this.signupForm.value.city,
        address: this.signupForm.value.address,
        zip: this.signupForm.value.zip    
      }    

      this.authenticationService.signupUser(this.account).then( authData => {
        this.commonService.dismissLoading();
        this.router.navigateByUrl('/home');
      }, error => {
        this.commonService.dismissLoading();
        this.commonService.showMessage(new Dialog(error.code, error.message));
      });
    }
  }
}

