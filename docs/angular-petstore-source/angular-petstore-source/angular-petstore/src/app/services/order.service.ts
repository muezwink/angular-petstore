import { Injectable } from '@angular/core';
import { Order } from '../classes/order'
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public commonService: CommonService) { }

  placeOrder(order: Order): any {
    return this.commonService.fireData.ref(CommonService.order).child(this.commonService.currentUser.uid).push(order);
  }
}