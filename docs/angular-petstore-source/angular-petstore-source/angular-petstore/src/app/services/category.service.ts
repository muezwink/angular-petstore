import { Injectable } from '@angular/core';
import { Item } from "../classes/item";
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public itemList: any;
  public categories = [];
  public items: Item[] = [];
  public initialItems: Item[] = [];
  public doSearch: boolean = false;

  constructor(private commonService: CommonService) { }

  getItems() {
    return new Promise((resolve) => {

      // Reset Array
      this.categories.length = 0;
      this.items.length = 0;
      let item: any;
      
      // Instead of Mock Data Use Firebase
      //this.categories = CATEGORIES;  
      this.itemList = this.commonService.fireData.ref(CommonService.category);
      this.itemList.on('value', snapshot => {
        snapshot.forEach( snap => {
          item = snap.val();
          this.categories.push(item);
        });   

        let currentItem: Item;
        for (let category of this.categories) {
          for (let product of category.product) {
            for (let item of product.item) {
              currentItem = <Item> {
                catid: category.catid,
                catname: category.name,
                productid: product.productid,
                itemid: item.itemid,
                name: product.name,
                icon: product.icon,
                descn: product.descn,
                attr1: item.attr1,
                listprice: item.listprice,
                bookmarked: false
              }
              this.items.push(currentItem);
              this.initialItems.push(currentItem);
            }
          }
        }
        resolve(true);
      }); 

    });    
  }

  initializeItems(): void {
    this.items = this.initialItems;
  }

  getItemsByCategory(catid: string) {
    this.initializeItems();
    this.items = this.items.filter(item => {
      if (item.catid && catid) {
        if (item.catid === catid) {
          return true;
        }
        return false;
      }
    });

  }

  filterItems(searchTerm: string) {
    this.initializeItems();
    let itemTerm: string = '';
    //const searchTerm = evt.srcElement.value;
    
    if (searchTerm) {
      this.items = this.items.filter(item => {
        itemTerm = item.catid + item.catname + item.name + item.descn + item.attr1;
        if (itemTerm && searchTerm) {
          if (itemTerm.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
            return true;
          }
          return false;
        }
      });
    } else {
      return;
    }
  }

  flipSearch() {
    this.doSearch = !this.doSearch;
  }
}
