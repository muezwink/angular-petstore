import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { Dialog } from '../classes/dialog';

@Component({

  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  totalAmount: number;

  constructor(private router: Router,
    public commonService: CommonService,
    public cartService: CartService) { }

  ngOnInit() {
    this.totalAmount = this.cartService.getTotalprice();
  }

  deleteCart(item: any) {
    this.cartService.deleteCart(item);
  }

  placeOrder() {
    if (this.commonService.isLogin) {
      this.router.navigateByUrl('/order');
    } else {
      this.commonService.showMessage(new Dialog(this.commonService.messageLoginFirst, this.commonService.messagePlaceOrder));
      this.router.navigateByUrl('/login');
    }
  }
}
