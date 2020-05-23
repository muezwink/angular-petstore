import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CartComponent } from './cart/cart.component';
import { WishComponent } from './wish/wish.component';

// Form Module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Get locale environmet parameter
import { environment } from '../environments/environment';

// I18N
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SettingComponent } from './setting/setting.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { OrderComponent } from './order/order.component';

// I18N Settings
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ListComponent,
    CartComponent,
    WishComponent,
    SettingComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    DialogBoxComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [ HttpClient ]
      }
    }),
  ],
  entryComponents: [
    DialogBoxComponent 
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private translate: TranslateService) {
    // Set default language 'en-GB' -> 'en'
    // const defaultLanguage = environment.defaultLanguage.split('-')[0];
    // translate.setDefaultLang(defaultLanguage);
    // translate.use(defaultLanguage);
  }
}
