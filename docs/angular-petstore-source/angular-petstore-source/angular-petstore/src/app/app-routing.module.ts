import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { CartComponent } from './cart/cart.component';
import { WishComponent } from './wish/wish.component';
import { LoginComponent } from './login/login.component';
import { SettingComponent } from './setting/setting.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'list/:id',
    component: ListComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'wish',
    component: WishComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'setting',
    component: SettingComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'order',
    component: OrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
