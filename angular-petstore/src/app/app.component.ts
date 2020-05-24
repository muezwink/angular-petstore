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
  
  constructor(private commonService: CommonService,
              private categoryService: CategoryService,
              private cartService: CartService
             )
  {
    firebase.initializeApp(environment.firebase);
    this.commonService.fireAuth = firebase.auth();
    this.commonService.fireData = firebase.database();

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

    this.categoryService.getItems();

    this.cartService.getCarts();
    this.cartService.getWishs();
  }
}
