import { Injectable } from '@angular/core';
import { Item } from '../classes/item';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase/app';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  public items: Item[] = [];
  private fireData: any;
  static petlist = "/petlist/";
  public itemList: any;

  constructor() {
    firebase.initializeApp(environment.firebase);
    this.fireData = firebase.database();
  }

  getItems(){
    
    //if (localStorage.getItem('items')) {
    //  this.items = JSON.parse(localStorage.getItem('items'));
    //}
    return new Promise((resolve) => {

      // Reset Array
      this.items.length = 0;
      let item: any;
      
      // Instead of Mock Data Use Firebase
      //this.categories = CATEGORIES;  
      this.itemList = this.fireData.ref(ItemService.petlist);
      console.log(this.itemList);
      this.itemList.on('value', snapshot => {
        snapshot.forEach( snap => {
          item = {
            key: snap.key,
            id: snap.val().id,
            name: snap.val().name,
            available: snap.val().available
          };
          console.log(item);
          this.items.push(item);
        });   
        resolve(true);
      }); 

    });

    
  }

  saveItems(){
    //this.storage.store('items', this.items);
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  getItem(id: string){
    return this.items.find(item => item.id == id);
  }

  addItem(item: Item){

    this.items.push(item);
    //this.saveItems();
    // Use Firebase 
    return this.fireData.ref(ItemService.petlist).push(item);
  }

  updateItem(item: Item){
 
    return this.fireData.ref(ItemService.petlist).child(item.key).update(item);
  }

  deleteItem(item: Item){

    return this.fireData.ref(ItemService.petlist).child(item.key).remove();
    this.items.splice(this.items.indexOf(item), 1);
    //this.saveItems();

  }
}
