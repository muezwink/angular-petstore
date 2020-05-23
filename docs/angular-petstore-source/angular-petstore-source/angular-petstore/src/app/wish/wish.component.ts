import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.scss']
})
export class WishComponent implements OnInit {

  constructor(public cartService: CartService,
    private router: Router,) { }

  ngOnInit() {
  }
  
  addCart(item: any) {
    this.cartService.addCart(item);
    this.router.navigateByUrl('/cart');
  }

  flipWishmark(id: string) {
    this.cartService.flipWishmark(id);
  }
}
