import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Globals } from '../app/globals';


@Injectable()
export class transactionsService {
    constructor(private _http: Http, private globals: Globals) {

    }


    getDistibutorOrderListDetails(){
        let user = JSON.parse(window.localStorage.getItem('user'));
        console.log('this.globals.authToken', this.globals.authToken)
        console.log('this.globals.userDetails', user)
        let header = new Headers({ 'Authorization': this.globals.authToken, "accept": "application/json"});
       
        return this._http.get(this.globals.APIHOST + 'DistributorOrders/GetDistributorOrders?distributorID'+ user.distributorID , { headers: header })
        .map(res => res.json())
    }

    getOrderList(){
        console.log('this.globals.authToken', this.globals.authToken)
        
        let header = new Headers({ 'Authorization': this.globals.authToken, "accept": "application/json"});
       
        return this._http.get(this.globals.APIHOST + 'Orders/OrdersList' , { headers: header })
        .map(res => res.json())
    }
    


}