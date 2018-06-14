import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SalesService } from '../../services/sales.service'
import { Globals } from '../../app/globals';

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  userProfile
  reportList: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private salesService: SalesService,
    private globals: Globals, public loadingCtrl: LoadingController) {
  }

  ngAfterViewInit() {
    // var CROPLIST = [];
    // var DEALERSLISTDETAILS = [];
    //var DISTRIBUTORSTOCKREPORT = [];

    this.userProfile = JSON.parse(window.localStorage.getItem('user'));
    console.log(JSON.stringify(this.userProfile))

    // this.salesService.getProductCategories().subscribe(data => {
    //   CROPLIST = data
    // })

    // this.salesService.getDistributors().subscribe(data => {
    //   DEALERSLISTDETAILS = data
    // })

    if (this.userProfile.roleID == 1) {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();
      this.salesService.GetDispatchCenterStock().subscribe(data => {
        this.reportList = data
        loader.dismiss();
      })
    }

    if (this.userProfile.roleID == 3) {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();

      let disId = this.globals.userdistributorID
      this.salesService.getDistributorStock(disId).subscribe(data => {
        this.reportList = data
        loader.dismiss();
        console.log(this.reportList)

      })
    }

    if (this.userProfile.roleID == 2) {
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();
      this.salesService.getSalesStock().subscribe(data => {
        this.reportList = data
        loader.dismiss();
      })
    }


  }


}
