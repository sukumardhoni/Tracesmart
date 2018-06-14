import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Globals } from '../app/globals';


@Injectable()
export class SalesService {

    constructor(private _http: Http, private globals: Globals) {

    }



    getDistributors() {
        console.log('this.globals.authToken', this.globals.authToken)

        let header = new Headers({ 'Authorization': this.globals.authToken });

        return this._http.get(this.globals.APIHOST + 'Distributors/GetDistributorsList', { headers: header })
            .map(res => res.json())
    }

    getProductCategories() {
        console.log('this.globals.authToken', this.globals.authToken)

        let header = new Headers({ 'Authorization': this.globals.authToken });

        return this._http.get(this.globals.APIHOST + 'ProductCategories/GetProductCategories', { headers: header })
            .map(res => res.json())
    }

    getProductVarients() {
        console.log('this.globals.authToken', this.globals.authToken)

        let header = new Headers({ 'Authorization': this.globals.authToken });

        return this._http.get(this.globals.APIHOST + 'Products/ProductsList', { headers: header })
            .map(res => res.json())
    }

    getSalesStock() {
        console.log('this.globals.authToken', this.globals.authToken)

        let header = new Headers({ 'Authorization': this.globals.authToken });

        return this._http.get(this.globals.APIHOST + 'stock/GetDispatchCenter/1', { headers: header })
            .map(res => res.json())
    }

    getDistributorStock(disId) {
        console.log('this.globals.authToken', this.globals.authToken)

        let header = new Headers({ 'Authorization': this.globals.authToken });

        return this._http.get(this.globals.APIHOST + 'Stock/GetDistributorStock/' + disId, { headers: header })
            .map(res => res.json())
    }

    GetDispatchCenterStock() {
        console.log('this.globals.authToken', this.globals.authToken)

        let header = new Headers({ 'Authorization': this.globals.authToken, "accept": "application/json" });

        return this._http.get(this.globals.APIHOST + 'stock/GetDispatchCenter?id=1', { headers: header })
            .map(res => res.json())
    }

    putCreateOrder() {
        console.log('this.globals.authToken', this.globals.authToken)
        let data = {
            "OrderRequestID": 0,
            "DistributorID": this.globals.distId,
            "ProductID": this.globals.prodId,
            "Quantity": this.globals.selectedQuantity
        }
        let header = new Headers({ 'Authorization': this.globals.authToken, "accept": "application/json" });

        return this._http.post(this.globals.APIHOST + 'OrderRequest/CreateOrderRequest', data, { headers: header })
            .map(res => res.json())
    }

    putCreateOrderRequest() {
        console.log('this.globals.authToken', this.globals.authToken)
        let data = {
            "OrderRequestID": 0,
            "DistributorID": this.globals.userdistributorID,
            "ProductID": this.globals.prodId,
            "Quantity": this.globals.selectedQuantity
        }
        console.log('this', data)

        let header = new Headers({ 'Authorization': this.globals.authToken, "accept": "application/json" });

        return this._http.post(this.globals.APIHOST + 'OrderRequest/CreateOrderRequest', data, { headers: header })
            .map(res => res.json())
    }

    sendRequestStockNotification() {

        var NotificationType = "Request Stock Order "
        var NotificationDetails = 'Request Stock Order Processed Successfully  ' + Math.floor(Math.random() * 1000000);
        //var deviceID = window.localStorage.getItem('deviceToken');

        let data = {
            "UserId": this.globals.userId,
            "NotificationType": NotificationType,
            "NotificationDetails": NotificationDetails,
        }
        console.log(data)

        let header = new Headers({ 'Authorization': this.globals.authToken, "accept": "application/json" });

        return this._http.post(this.globals.APIHOST + 'Notification/SendNotification', data, { headers: header })
            .map(res => res.json())

    }

    CreateStockTransfer() {
        console.log('this.globals.authToken', this.globals.authToken)
        let data = {
            "DistibutorStockTransferID": 0,
            "DistributorFromID": this.globals.userdistributorID,
            "DistributorToID": this.globals.distId,
            "ProductID": this.globals.prodId,
            "Quantity": this.globals.selectedQuantity,
            "UpdatedAt": this.globals.firstName
        }
        console.log('this.globals data', JSON.stringify(data))
        let header = new Headers({ 'Authorization': this.globals.authToken, "accept": "application/json" });

        return this._http.post(this.globals.APIHOST + 'OrderRequest/CreateOrderRequest', data, { headers: header })
            .map(res => res.json())
    }


}