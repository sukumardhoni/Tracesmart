import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Globals } from '../app/globals';


@Injectable()
export class homeService {
    constructor(private _http: Http, private globals: Globals) {

    }

   

    GetDistributorStock() {
        let user = JSON.parse(window.localStorage.getItem('user'));
        console.log('this.globals.authToken', this.globals.authToken)
        console.log('this.globals.userDetails', user)
        let header = new Headers({ 'Authorization': this.globals.authToken });
        
         return this._http.get(this.globals.APIHOST + 'Stock/GetDistributorStock/'+ user.distributorID , { headers: header })
             .map(res => res.json())
    }

    


}