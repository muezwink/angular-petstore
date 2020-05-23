import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../services/item.service'
import { Item } from '../classes/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  areAll: boolean = true;
  
  constructor(public itemService: ItemService,
              private router: Router) { }

  ngOnInit() {
    this.itemService.getItems();
  }

  updateItem(id: string) {
    this.router.navigateByUrl('item/'+id);
  }
}
