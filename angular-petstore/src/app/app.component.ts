import { Component } from '@angular/core';
import { CommonService } from './services/common.service';
import { CategoryService } from './services/category.service';
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
              private categoryService: CategoryService
             )
  {
    firebase.initializeApp(environment.firebase);
    this.commonService.fireAuth = firebase.auth();
    this.commonService.fireData = firebase.database();

    this.categoryService.getItems();
  }

}
