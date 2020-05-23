import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment'
import { Account } from '../classes/account';
import { Dialog } from '../classes/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component'
import { MatDialog } from '@angular/material';
import { ConnectionService } from 'ng-connection-service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  static category = "/category/";
  static account = "/account/";
  static order = "/order/";
  static USER_LANGUAGE = "USER_LANGUAGE";
    
  public fireAuth: any;
  public fireData: any;
  public googleAuth: any;
  public userProfile: any;
  public currentUser: Account = { email: null };    
  public isLogin: boolean;
  public doSpinner: boolean;
  public isConnected: boolean = true;

  public messageOk: string;  
  public messageCancel: string;  
  public messageWait: string = "Please wait...";  
  public messageResetEmail: string;
  public messageYourEmailAddress: string = "Your email address";
	public messageYourPassword: string = "Your Password";	
	public messageYourName: string = "Your Name";	
	public messageYourCity = "Your City";
	public messageYourAddress = "Your Address";	
	public messageYourZip = "Your Zip code";	
	public messageForminvalid: string = 'Form is not valid yet, Please complete';
	public messageRequired: string = 'You must enter a value';
	public messageInvaildEmail: string = 'Not a valid email';
	public messageMinlength: string = 'You must enter at least ';
	public messageLoginFirst: string = 'Login First';
  public messagePlaceOrder: string = 'Please login to proceed order';
  
  public currentLanguage: any = {value: 'en', name: 'English'};

  public langs = [{value: 'en', name: 'English'},
				  {value: 'ko', name: '한글'}];
				  
  public coutries = [{value: 'US', name: 'United States', selected: true},
		{value: 'KR', name: 'Korea, Republic of'},
		{value: 'MY', name: 'Malaysia'},
		{value: 'NZ', name: 'New Zealand'}];
		
  constructor(private connectionService: ConnectionService,
			private translate: TranslateService,
			public dialog: MatDialog) { 
	this.connectionService.monitor().subscribe(isConnected => {
		this.isConnected = isConnected;
	});    
  }

  changeLanguage(item: any) {
		this.translate.setDefaultLang(item.value);
		this.translate.use(item.value);
		moment().locale(item.value);
		this.currentLanguage = item;
		this.putObject(CommonService.USER_LANGUAGE, item)
		// Optional: To localize the provider's OAuth flow to the user's preferred language 
		this.fireAuth.languageCode = item.value;

		if(item.value == "ko") {
			this.messageOk = "확인";	
			this.messageCancel = "취소";
			this.messageWait = "잠시만 기다리세요...";
			this.messageResetEmail = "이메일로 초기화 링크를 보내겠습니다.";
			this.messageYourEmailAddress = "이메일을 입력하세요.";
			this.messageYourPassword = "패스워드를 입력하세요.";	
			this.messageYourName = "이름을 입력하세요.";		
			this.messageYourCity = "도시를 입력하세요.";
			this.messageYourAddress = "주소를 입력하세요.";	
			this.messageYourZip = "우편번호를 입력하세요.";
			this.messageForminvalid = '모든 항목을 다 입력해 주세요.';
			this.messageRequired = '값을 입력해주세요.';
			this.messageInvaildEmail = '유효한 이메일이 아닙니다.';
			this.messageMinlength = '최소 입력 문자수는 ';	
			this.messageLoginFirst = '로그인';
			this.messagePlaceOrder = '주문하기 전에 로그인 하세요.';
		} else {
			this.messageOk = "OK";	
			this.messageCancel = "CANCEL";
			this.messageWait = "Please wait...";	
			this.messageResetEmail = "We will send you a reset link to your email";	
			this.messageYourEmailAddress = "Your email address";
			this.messageYourPassword = "Your Password";	
			this.messageYourName = "Your Name";	
			this.messageYourCity = "Your City";
			this.messageYourAddress = "Your Address";	
			this.messageYourZip = "Your Zip code";	
			this.messageForminvalid = 'Form is not valid yet, Please complete';  	
			this.messageRequired = 'You must enter a value';
			this.messageInvaildEmail = 'Not a valid email';
			this.messageMinlength = 'You must enter at least ';	  
			this.messageLoginFirst = 'Login First';
			this.messagePlaceOrder = 'Please login to proceed order';
		}
  }

  getObject(key: string): any {
    return JSON.parse(localStorage.getItem(key));
	}
	
	putObject(key: string, value: any) {
		// remove cyclical objects
		let seen = [];

		let result = JSON.stringify(value, function(key, val) {
			if (val != null && typeof val == "object") {
				if (seen.indexOf(val) >= 0) {
					return;
				}
				seen.push(val);
			}
			return val;
    });
    localStorage.setItem(key, JSON.stringify(result));
	}	

	createLoading() {
		this.doSpinner = true;
	}

	dismissLoading() {
		this.doSpinner = false;
	}

	showMessage(data: Dialog): void {
		const dialogRef = this.dialog.open(DialogBoxComponent, {
		  width: '250px',
		  data: {title: data.title, message: data.message}
		});
	}
}
