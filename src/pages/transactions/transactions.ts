import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { transactionsService } from '../../services/transactions.service';


// import { ProductFilterPipe } from '../../pipes/product-filter/product-filter'

@IonicPage()
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage {
  userProfile
  transList: Array<any> = []
  userFilter
  title
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _transactionService: transactionsService, public loadingCtrl: LoadingController) {

  }
  ngAfterViewInit() {



    var filterTransaction: Array<any> = []
    this.userProfile = JSON.parse(window.localStorage.getItem('user'));
    console.log(this.userProfile)
    this.userFilter = this.userProfile.firstName;

    if (this.userProfile.roleID == 4) {
      this.title = 'PassBook';
    } else {
      this.title = 'Transactions';
    }

    if (this.userProfile.roleID == 3) {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();

      this._transactionService.getDistibutorOrderListDetails().subscribe(data => {
        console.log(data)
        filterTransaction = data
        //var gradeC = new ProductFilterPipe().transform(filterTransaction, this.userFilter);
        this.transList = filterTransaction

      })
      loader.dismiss();
    }

    if (this.userProfile.roleID == 2 || this.userProfile.roleID == 1) {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();

      this._transactionService.getOrderList().subscribe(data => {
        console.log(data)
        filterTransaction = data
        //var gradeC = new ProductFilterPipe().transform(filterTransaction, this.userFilter);
        this.transList = filterTransaction

      })
      loader.dismiss();
    }

  }

  showDetails(item) {
    this.navCtrl.push('TransactionDetailsPage', { transDetails: item })
  }

}
