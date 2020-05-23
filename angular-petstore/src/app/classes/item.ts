export class Item {
    catid: string;
    catname: string;
    productid: string;
    itemid: string;
    name: string;
    icon: string;
    descn: string;
    attr1: string;
    listprice: number;
    quantity: number;
    bookmarked?: boolean;

    getItemprice(): any {
        return this.listprice;
    }
}
