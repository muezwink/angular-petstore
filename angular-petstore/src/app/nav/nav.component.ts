import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CategoryService } from '../services/category.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  public appPages = [
    {
      title: 'COMMON.HOME',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'COMMON.LIST',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'COMMON.WISH',
      url: '/wish',
      icon: 'favorite'
    },
    {
      title: 'COMMON.CART',
      url: '/cart',
      icon: 'shopping_cart'
    }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public  categoryService: CategoryService,
              public  cartService: CartService,
              public  commonService: CommonService,
              public  authenticationService: AuthenticationService,
              private router: Router
             ) 
  {}

  doSearch() {
    this.categoryService.flipSearch()
    this.router.navigateByUrl('/list');
  }

  logout() {
    this.authenticationService.logoutUser()
  }
}
