import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    public categoryService: CategoryService,
    public cartService: CartService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.categoryService.getItemsByCategory(id);
    } 
  }

  filterList(evt: any) {
    const searchTerm = evt.srcElement.value;
    this.categoryService.filterItems(searchTerm);
  }

  addCart(item: any) {
    this.cartService.addCart(item);
    this.router.navigateByUrl('/cart');
  }

  flipWishmark(id: string) {
    this.cartService.flipWishmark(id);
  }
}
