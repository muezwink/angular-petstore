import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../classes/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  private item: Item;
  private editable: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private itemService: ItemService) {
                this.item = {
                  key: '',
                  id: '',
                  name: '',
                  available: true
                };  
              }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    //if(id != null){
    if(id){

        this.editable = true;
        this.item = this.itemService.getItem(id);
    }
  }

  saveItem() {
    console.log(this.item);
    if(this.editable) {
      //this.itemService.saveItems();
      this.itemService.updateItem(this.item);
    } else {
      this.itemService.addItem(this.item);
    }
    this.router.navigateByUrl('/home');
  }

  deleteItem() {
    this.itemService.deleteItem(this.item);
    this.router.navigateByUrl('/home');
  }
}
