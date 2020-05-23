import { Component } from '@angular/core';
import { CommonService } from './services/common.service';
import { CategoryService } from './services/category.service';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
// Get firebase environmet parameter
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-petstore';
  
  constructor(private router: Router,
              private commonService: CommonService,
              private cartService: CartService,
              private categoryService: CategoryService) {
    firebase.initializeApp(environment.firebase);
    this.commonService.fireAuth = firebase.auth();
    this.commonService.fireData = firebase.database();
    this.commonService.googleAuth = new firebase.auth.GoogleAuthProvider();
    this.commonService.userProfile = this.commonService.fireData.ref(CommonService.account);

    this.commonService.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        
        this.commonService.userProfile.child(user.uid).update({
          //uid: user.uid,
          providerData: user.providerData,     
          loginTimestamp: new Date().getTime()  
        });
        this.commonService.isLogin = true;
        this.commonService.userProfile.child(user.uid).on('value', snapshot => { 
          this.commonService.currentUser = {
            email: user.email,
            name: user.displayName,
            country: snapshot.child('country').val(),
            city: snapshot.child('city').val(),
            address: snapshot.child('address').val(),
            zip: snapshot.child('zip').val(),
            photoURL: user.photoURL,
            uid: user.uid    
          }      
        }); 
  
        this.router.navigateByUrl('/home');
      } else {
        this.commonService.isLogin = false;
        // Initialize currentUser
        this.commonService.currentUser = {
          email: null
        }    
        //{displayName: '', email: '', photoURL: '/assets/images/splash.png'};
        this.router.navigateByUrl('/login');
      }
    });
    this.initializeApp();
  } 

  initializeApp() {
    // Initialize Language
    let data = this.commonService.getObject(CommonService.USER_LANGUAGE);
    if (data !== undefined && data !== null) {
      this.commonService.currentLanguage = JSON.parse(data);     
      this.commonService.changeLanguage(this.commonService.currentLanguage);
    } else {
      let key = navigator.language.split('-')[0]; // use navigator lang if available
      let keyLang = this.commonService.langs.find(lang => lang.value == key);
      if (keyLang) {
        this.commonService.currentLanguage = keyLang;          
      }
      this.commonService.changeLanguage(this.commonService.currentLanguage);
    }

    this.commonService.createLoading();
    this.categoryService.getItems().then(() => {
      this.commonService.dismissLoading();
    });

    this.cartService.getCarts();
    this.cartService.getWishs();
  }

}
