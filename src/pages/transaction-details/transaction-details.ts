import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-transaction-details',
  templateUrl: 'transaction-details.html',
})
export class TransactionDetailsPage {
  transactionDetails
  objectKeys
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ngOnInit(){
    this.objectKeys = Object.keys;
    this.transactionDetails = this.navParams.get('transDetails');
    console.log(this.transactionDetails);
  }

  

}
