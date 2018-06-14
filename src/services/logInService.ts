import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Globals } from '../app/globals';

@Injectable()
export class logInService {
    expenses: any = [];
    totalIncome = 0;
    totalExpense = 0;
    balance = 0;
    constructor(private _http: Http, private globals: Globals) {

    }

    getAccessToken(userName) {
        return this._http.post(this.globals.APIHOST + 'auth/Gettoken?username=' + userName, {})
            .map(res => res.json())
    }

    getUserDetails(userName) {
        console.log('this.globals.authToken', this.globals.authToken)
        console.log(userName)
        let header = new Headers({ 'Authorization': this.globals.authToken, "Accept": "application/json" });

        return this._http.get(this.globals.APIHOST + 'users/GetUserByUsername?username=' + userName, { headers: header })
            .map(res => res.json())
    }

    putDeviceToken() {

    }

    

}