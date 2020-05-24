import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CategoryService } from '../services/category.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  public appPages = [
    {
      title: 'HOME',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'LIST',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'WISH',
      url: '/wish',
      icon: 'favorite'
    },
    {
      title: 'CART',
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
              private router: Router
             ) 
  {}

  doSearch() {
    this.categoryService.flipSearch()
    this.router.navigateByUrl('/list');
  }
}
