import { Injectable } from '@angular/core';
import { Item } from '../classes/item'
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public carts: Item[] = [];
  public wishs: Item[] = [];

  constructor(private categoryService: CategoryService) { }

  getCarts(){
    if (localStorage.getItem('carts')) {
      this.carts = JSON.parse(localStorage.getItem('carts'));
    }
  }

  saveCart(){
    localStorage.setItem('carts', JSON.stringify(this.carts));
  }

  getCart(id: string){
    return this.carts.find(cart => cart.itemid == id);
  }

  addCart(cart: Item){
    if (this.carts.find(i => i == cart)) {
    } else {
      this.carts.push(cart);
      this.saveCart();
    }
  }

  deleteCart(cart: Item){
    this.carts.splice(this.carts.indexOf(cart), 1);
    this.saveCart();
  }

  getWishs(){
    if (localStorage.getItem('wishs')) {
      this.wishs = JSON.parse(localStorage.getItem('wishs'));
    }
  }

  saveWish(){
    localStorage.setItem('wishs', JSON.stringify(this.wishs));
  }

  addWish(wish: Item){
    if (this.wishs.find(i => i == wish)) {
    } else {
      this.wishs.push(wish);
      this.saveWish();
    }
  }

  deleteWish(wish: Item){
    this.wishs.splice(this.wishs.indexOf(wish), 1);
    this.saveWish();
  }

  flipWishmark(id: string) {
    let item = this.categoryService.items.find(item => item.itemid == id);
    item.bookmarked = !item.bookmarked;
    if (this.wishs.find(i => i.itemid == id)) {
      this.deleteWish(item);
    } else {
      this.addWish(item);
    }
  }

  getTotalprice(): any {
    let total = 0;
    this.carts.forEach(cart => total += cart.listprice);
    return total;
  }
  
}
