import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonService } from '../services/common.service';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';
import { Account } from '../classes/account';
import { Order } from '../classes/order'
import { Dialog } from '../classes/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public accountForm: FormGroup;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;  
  private account: Account;
  private order: Order;
  public countries = [];
  public defaultCountry: any;
  public stripe: any;
  card: any;
  cardErrors: any;

  constructor(public commonService: CommonService,
    private cartService: CartService,
    private orderService: OrderService,
    public formBuilder: FormBuilder) { 
    this.countries = commonService.coutries;

    this.accountForm = this.formBuilder.group({
      name: [this.commonService.currentUser.name, [Validators.required, Validators.minLength(2)]],
      country: [this.commonService.currentUser.country, Validators.required],
      city: [this.commonService.currentUser.city, [Validators.required, Validators.minLength(2)]],
      address: [this.commonService.currentUser.address, [Validators.required, Validators.minLength(2)]],
      zip: [this.commonService.currentUser.zip, [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit() {
  }

  getNameErrorMessage() {
    return this.accountForm.controls.name.hasError('required') ? this.commonService.messageRequired :
        this.accountForm.controls.name.hasError('minlength') ? this.commonService.messageMinlength + '2' :
            '';
  }
  getCountryErrorMessage() {
    return this.accountForm.controls.country.hasError('required') ? this.commonService.messageRequired : '';
  }
  getCityErrorMessage() {
    return this.accountForm.controls.city.hasError('required') ? this.commonService.messageRequired :
        this.accountForm.controls.city.hasError('minlength') ? this.commonService.messageMinlength + '2' :
            '';
  }
  getAddressErrorMessage() {
    return this.accountForm.controls.address.hasError('required') ? this.commonService.messageRequired :
        this.accountForm.controls.address.hasError('minlength') ? this.commonService.messageMinlength + '2' :
            '';
  }
  getZipErrorMessage() {
    return this.accountForm.controls.zip.hasError('required') ? this.commonService.messageRequired :
        this.accountForm.controls.zip.hasError('minlength') ? this.commonService.messageMinlength + '2' :
            '';
  }

  async processPayment(event) {
    event.preventDefault();

    if (!this.accountForm.valid){   
      this.commonService.showMessage(new Dialog(this.commonService.messageForminvalid, JSON.stringify(this.accountForm.value)));
    } else {
          this.cardErrors = null;
          this.commonService.createLoading();
    
          this.account = {
            email: this.commonService.currentUser.email,
            name: this.accountForm.value.name,
            country: this.accountForm.value.country,
            city: this.accountForm.value.city,
            address: this.accountForm.value.address,
            zip: this.accountForm.value.zip,
            uid: this.commonService.currentUser.uid    
          } 
          this.order = {
            orderdate: new Date().getTime(),
            account: this.account,
            orderstatus: 'get token',
            orderItems: this.cartService.carts,
            totalprice: this.cartService.getTotalprice(),
            // Stripe token
            token: 'token'
          }
    
          this.orderService.placeOrder(this.order).then( orderData => {
            this.commonService.dismissLoading();
            //this.router.navigateByUrl('/home');
          }, error => {
            this.commonService.dismissLoading();
            this.commonService.showMessage(new Dialog(error.code, error.message));
          });
    }

  };

}

