import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor(public commonService: CommonService,
    private router: Router) { }

  ngOnInit() {
  }

  changeLanguage(item) {
    this.commonService.changeLanguage(item);
    this.router.navigateByUrl('/home');
	}
}
