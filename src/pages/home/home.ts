import { Component, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Globals } from '../../app/globals';
import { homeService } from '../../services/home.service';
import { Http, Headers } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements AfterViewInit {
  Role
  labels
  series
  data
  totalSales = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private globals: Globals,
    public homeService: homeService,
    private _http: Http) {
    console.log('constructor HomePage', this.globals);
  }



  // Pie
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string = 'pie';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

   // lineChart
   public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56], label: 'Series A'},
    {data: [28, 48, 40, 19, 86], label: 'Series B'},
    {data: [18, 48, 77, 9, 100], label: 'Series C'}
  ];

  public lineChartLabels:Array<any> = ['Jan', 'Mar', 'May', 'July','Sep','Oct','Dec'];

  public lineChartOptions:any = {
    responsive: true
  };

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  // public randomize():void {
  //   let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
  //     }
  //   }
  //   this.lineChartData = _lineChartData;
  // }


  //bar
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56], label: 'Series A'},
    {data: [28, 48, 40, 19, 86], label: 'Series B'}
  ];
 

 
  // public randomize2():void {
  //   // Only Change 3 values
  //   let data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40];
  //   let clone = JSON.parse(JSON.stringify(this.barChartData));
  //   clone[0].data = data;
  //   this.barChartData = clone;

  // }
 

  ngAfterViewInit() {
    console.log('ionViewWillEnter HomePage', this.globals.role);
    this.Role = this.globals.role;



    // this.homeService.GetDistributorStock().subscribe(data => {
    //   if (user.roleID == 3) {
    //     this.pieChartLabels = [];
    //     this.pieChartData = [];


    //     data.forEach(element => {
    //       // console.log(element)
    //       if (element.productName) {
    //         this.pieChartLabels.push(element.productName);
    //       }
    //       if (element.quantity) {
    //         this.pieChartData.push(element.quantity);
    //       }
    //     });
    //     console.log(this.pieChartData)
    //     console.log(this.pieChartLabels)
    //   }

    // })


    let header = new Headers({ 'Authorization': this.globals.authToken });

    if (this.Role == 3) {
      this._http.get(this.globals.APIHOST + 'Stock/GetDistributorStock/' + this.globals.userdistributorID, { headers: header })
        .subscribe(res => {
          var value = res.json();
          this.pieChartLabels = [];
          this.pieChartData = [];

          value.forEach(element => {
            // console.log(element)
            if (element.productName) {
              this.pieChartLabels.push(element.productName);
            }
            if (element.quantity) {
              this.pieChartData.push(element.quantity);
            }
          });

          console.log('pieChartData ' + JSON.stringify(this.pieChartData))
          console.log(this.pieChartLabels)
        })
    }

    if (this.Role == 1 || this.Role == 2) {
      this.pieChartLabels = [];
      this.pieChartData = [];
      this._http.get(this.globals.APIHOST + 'Stock/GetDispatchCenter/1', { headers: header })
        .subscribe(res => {
          var value = res.json();
          this.pieChartLabels = [];
          this.pieChartData = [];

          value.forEach(element => {
            // console.log(element)
            if (element.productName) {
              this.pieChartLabels.push(element.productName);
            }
            if (element.quantity) {
              this.pieChartData.push(element.quantity);
            }
          });

          console.log('pieChartData ' + JSON.stringify(this.pieChartData))
          console.log(this.pieChartLabels)
        });
    }

    

    // if (this.Role == 1) {
    //   this.labels = ["Jan", "Mar", "May", "July", "Sep", "Oct", "Dec"];
    //   this.series = ['Series A', 'Series B'];
    //   this.data = [
    //     [95, 59, 80, 81, 56, 55, 40],
    //     [80, 65, 70, 69, 86, 37, 50]
    //   ];
    //   var da2 = [];
    //   for (var i = 1; i < 6; i++) {
    //     var totalCount = 0;
    //     for (var j = 1; j < 4; j++) {
    //         for (var k = 1; k < 4; k++) {
    //             totalCount = totalCount + this.globals('d' + k + '_' + '0' + i + '_' + '0' + j + '_s');
    //             this.totalSales = homeVm.totalSales + totalCount;
    //         }
    //     }
    //     da2.push(totalCount);
    // }
    // }

  }

}
