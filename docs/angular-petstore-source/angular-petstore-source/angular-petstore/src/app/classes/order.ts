import { Account } from './account';
import { Item } from './item';

export class Order {
    orderdate: number;
    totalprice: number;
    orderstatus: string;
    account: Account;
    orderItems: Item[];
    token?: any;
}