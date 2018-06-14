import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Globals } from '../../app/globals';
import { logInService } from '../../services/logInService'
import { SalesService } from '../../services/sales.service';
import { ProductFilterPipe } from '../../pipes/product-filter/product-filter'

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html',
})
export class SalesPage {
  mode
  Role
  showUser: boolean;
  showScan: boolean;
  showDistributor: boolean;
  showCrop: boolean;
  showHybrid: boolean;
  showQuantity: boolean;
  showAvailableQuantity: boolean;
  title: string;
  userMobile;
  userDetails;
  orderNumber;
  scannedCode = ''

  CROPLIST = [];
  DEALERSLISTGLOBAL = [];
  dealerList;
  cropsList;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private globals: Globals,
    public loginService: logInService,
    private salesService: SalesService,
    private toast: Toast,
    private barcodeScanner: BarcodeScanner) {
  }

  ngOnInit() {
    this.salesService.getDistributors().subscribe(data => {
      console.log('this.globals.userdistributorID', this.globals.userdistributorID);
      let mode = this.navParams.get('mode');
      if (mode == 3) {
        data.forEach(element => {
          //console.log(element)
          if (element.distributorID == this.globals.userdistributorID) {
            data.splice(data.indexOf(element), 1)
          }
        });
      }
      this.DEALERSLISTGLOBAL = data;
      //this.DEALERSLISTGLOBAL = Object.assign(, data);
      //console.log(JSON.stringify(this.DEALERSLISTGLOBAL))
    })

    this.salesService.getProductCategories().subscribe(data => {
      this.CROPLIST = data
      // console.log(JSON.stringify(this.CROPLIST));
    })
  }

  ngAfterViewInit() {
    console.log(this.navParams.get('mode'));
    console.log(this.globals.role);
    this.mode = this.navParams.get('mode');
    let page = this.navParams.get('page');
    this.showUser = false;
    this.Role = this.globals.role;

    if (this.Role == 4) {
      this.title = 'Check Product';
    } else {
      this.title = 'Sales';
    }

    if (page == 'RequestStockPage') {
      this.title = 'Request Stock';
    } else if (page == 'TransfersPage') {
      this.title = 'Transfer Stock';
    }

    if (this.mode == 1 && this.Role == 3) {
      this.showScan = true;
      this.showDistributor = false;
      this.showCrop = false;
      this.showHybrid = false;
      this.showQuantity = true;
      this.showUser = true;
      this.showAvailableQuantity = true;
    }

    if (this.mode == 2 && this.Role == 3) {
      this.showScan = false;
      this.showDistributor = false;
      this.showCrop = true;
      this.showHybrid = true;
      this.showQuantity = true;
      this.showAvailableQuantity = true;
    }

    if (this.mode == 3 && this.Role == 3) {
      this.showScan = false;
      this.showDistributor = true;
      this.showCrop = true;
      this.showHybrid = true;
      this.showQuantity = true;
      this.showAvailableQuantity = true;
    }

    if (this.mode == 1 && this.Role == 2) {
      this.showScan = false;
      this.showDistributor = true;
      this.showCrop = true;
      this.showHybrid = true;
      this.showAvailableQuantity = true;
      this.showQuantity = true;
    }

    if (this.mode == 1 && this.Role == 4) {
      this.showScan = true;
      this.showDistributor = false;
      this.showCrop = false;
      this.showHybrid = false;
      this.showQuantity = false;
      this.showAvailableQuantity = false;
      this.showUser = false;
    }
  }

  getUserDetails(ev) {
    console.log(ev.target.value)
    console.log(this.userMobile)
    if (this.userMobile.length > 9) {
      console.log('if')
      this.loginService.getUserDetails(this.userMobile).subscribe(data => {
        //console.log(data)
        if (data === null) {
          this.userDetails = "New Customer";
        } else {
          this.userDetails = data.firstName + " " + data.lastName;;

        }
      })
    } else {
      this.userDetails = '';
    }
  }


  salesStockFilter

  selectedQuantity(item) {
    console.log(item)
    this.globals.selectedQuantity = item;
    window.localStorage.setItem('selectedQuantity', item);

    //From Sales
    if (this.Role == 2 && this.selectedVarientName) {
      this.salesService.getSalesStock().subscribe(data => {
        var salesStockFilter = new ProductFilterPipe().transform(data, this.selectedVarientName);
        console.log(salesStockFilter);

        if (salesStockFilter[0].quantity > 0) {
          this.availableNumber = salesStockFilter[0].quantity;
          this.max = salesStockFilter[0].quantity;
        } else {
          this.availableNumber = 0;
        }

      })
    }

    //From distributer
    if (this.Role == 3 && this.selectedVarientName) {
      console.log(this.globals.userdistributorID)
      let disId = this.globals.userdistributorID
      this.salesService.getDistributorStock(disId).subscribe(data => {
        var salesStockFilter = new ProductFilterPipe().transform(data, this.selectedVarientName);
        console.log(salesStockFilter);
        if (salesStockFilter.length != 0) {
          if (salesStockFilter[0].quantity > 0) {
            this.availableNumber = salesStockFilter[0].quantity;
            this.max = salesStockFilter[0].quantity;
          } else {
            this.availableNumber = 0;
          }
        } else {

        }

      })
    }
  }

  selectDist
  selectDistName

  //need to work here
  selectedDistributer(item) {
    console.log(item)
    this.globals.selectedDistributors = item
    this.globals.distId = item.distributorID
    this.globals.distName = item.name
  }

  selectCrop
  selectCropName
  varientsList
  selectedCrop(item) {

    console.log(item)
    this.varientsList = [];

    this.selectCrop = item.productCategoryID;
    this.selectCropName = item.name;

    this.globals.catdId = item.productCategoryID
    this.globals.catdName = item.name

    this.salesService.getProductVarients().subscribe(data => {
      // console.log('product variants', JSON.stringify(data))
      // let value = this.customPipe.transform(data);

      this.varientsList = new ProductFilterPipe().transform(data, item.name);
      console.log(this.varientsList);
    })
  }

  availableNumber: number = 0;
  max;
  selectedVarientName
  selectedVarient(item) {
    this.orderNumber = '';
    console.log(item)
    console.log(this.Role);

    this.globals.prodId = item.productID
    this.globals.prodName = item.name

    this.selectedVarientName = item.name;

    if (this.Role == 2 && this.selectedVarientName) {
      this.salesService.getSalesStock().subscribe(data => {
        var salesStockFilter = new ProductFilterPipe().transform(data, this.selectedVarientName);
        console.log(salesStockFilter);

        if (salesStockFilter[0] != undefined && salesStockFilter[0].quantity > 0) {
          this.availableNumber = salesStockFilter[0].quantity;
          this.max = salesStockFilter[0].quantity;
        } else {
          this.availableNumber = 0;
        }

      })
    }

    if (this.Role == 3 && this.selectedVarientName) {
      let disId = this.globals.userdistributorID
      this.salesService.getDistributorStock(disId).subscribe(data => {
        var salesStockFilter = new ProductFilterPipe().transform(data, this.selectedVarientName);
        console.log(salesStockFilter);

        if (salesStockFilter.length != 0) {
          if (salesStockFilter[0] != undefined && salesStockFilter[0].quantity > 0) {
            this.availableNumber = salesStockFilter[0].quantity;
            this.max = salesStockFilter[0].quantity;
          } else {
            this.availableNumber = 0;
          }
        }
      })
    }

    if (this.Role == 3 && this.mode == 2) {
      this.salesService.getSalesStock().subscribe(data => {
        var salesStockFilter = new ProductFilterPipe().transform(data, this.selectedVarientName);

        if (salesStockFilter.length != 0) {
          if (salesStockFilter[0] != undefined && salesStockFilter[0].quantity > 0) {
            this.availableNumber = salesStockFilter[0].quantity;
            this.max = salesStockFilter[0].quantity;
          } else {
            this.availableNumber = 0;
          }
        }

      })
    }
  }


  scan() {
    // this.availableNumber = '';
    this.barcodeScanner.scan().then((barcodeData) => {
      alert("Success! Barcode data is here" + barcodeData.text);
      this.scannedCode = (barcodeData.text.indexOf('$') != -1) ? barcodeData.text.replace(/[$]/g, ' - ') : barcodeData.text;
      this.scannedCode = barcodeData.text.split('$')[0] + ' ' + barcodeData.text.split('$')[1];
      this.selectCrop = barcodeData.text.split('$')[0];
      this.orderNumber = parseInt(barcodeData.text.split('$')[2]);
      let selectVarient = barcodeData.text.split('$')[1] == undefined ? 'undefined' : barcodeData.text.split('$')[1];
      this.barCodeSuccess(selectVarient, this.orderNumber, this.scannedCode);
      this.globals.scannedProductCode = selectVarient;
      this.globals.scannedProductQuantity = barcodeData.text.split('$')[2]

    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    })
  }

  barCodeSuccess(selectVarient, orderNumber, scannedCode) {
    if (scannedCode) {
      let disId = this.globals.userdistributorID;
      this.salesService.getDistributorStock(disId).subscribe(data => {
        var salesStockFilter = new ProductFilterPipe().transform(data, selectVarient);

        if (salesStockFilter.length != 0) {
          if (salesStockFilter[0] != undefined && salesStockFilter[0].quantity > 0) {
            if (this.Role == 4) {
              alert('Product is genuine');
            } else {
              alert('product is available');
            }
            this.availableNumber = salesStockFilter[0].quantity;
            this.max = salesStockFilter[0].quantity;
          } else {
            this.availableNumber = 0;

            if (this.Role == 4) {
              alert('Product is not genuine');
            } else {
              alert('product is not available');
            }
          }
        }

      })
    }
  }

  resetDropDowns() {
    this.orderNumber = '';
    this.availableNumber = 0;
    this.scannedCode = '';
    this.max = '';
  }

  confirmSale() {
    if (this.orderNumber != '' && this.orderNumber != null) {
      this.salesService.putCreateOrder().subscribe(data => {
        console.log(data)
        this.globals.salesOrderNumber = data
        // this.sendSalesNotifcation();

        this.toast.showLongTop('Order Processed Successfully').subscribe(data => {
          alert('toast sucess' + data)
        }, err => {
          alert('toast error')
        })
        this.resetDropDowns();
      })
    }
  }

  confirmReturn() {
    if (this.orderNumber != '' && this.orderNumber != null) {
      this.globals.selectedQuantity = this.orderNumber;
      window.localStorage.setItem('selectedQuantity', this.orderNumber);

      this.salesService.putCreateOrder().subscribe(data => {
        console.log(data)
        this.globals.salesOrderNumber = data
        // this.sendSalesNotifcation();

        this.toast.showLongTop('Return Processed Successfully').subscribe(data => {
          alert('toast sucess' + data)
        }, err => {
          alert('toast error')
        })
        this.resetDropDowns();
      })

    }
  }

  requestStock() {
    if (this.orderNumber != '' && this.orderNumber != null) {
      this.salesService.putCreateOrderRequest().subscribe(data => {
        console.log(data)
        if (data) {
          this.globals.requestStockOrderNumber = data;

          // this.salesService.sendRequestStockNotification().subscribe(data => {

          // })
           

            this.toast.showLongTop('Request Placed Successfully').subscribe(data => {
              alert('toast sucess' + data)
            }, err => {
              alert('toast error')
            })
            this.resetDropDowns();
         
        }
      })
    }
  }


  confirmTransfer() {
    if (this.orderNumber != '' && this.orderNumber != null) {
      this.salesService.CreateStockTransfer().subscribe(data => {

        this.toast.showLongTop('Transfer Done Successfully').subscribe(data => {
          alert('toast sucess' + data)
        }, err => {
          alert('toast error')
        })
        this.resetDropDowns();

      })
    }
  }

  confirmOrder() {
    if (this.orderNumber != '' && this.orderNumber != null) {
      this.salesService.putCreateOrder().subscribe(data => {

        if(data){
          this.globals.salesOrderNumber = data;
          this.toast.showLongTop('Order Placed Sucessfully').subscribe(data => {
            alert('toast sucess' + data)
          }, err => {
            alert('toast error')
          })
          this.resetDropDowns();
        }
      })
    }
  }

  //need to implement 
  sendSalesNotifcation() {

  }




}
