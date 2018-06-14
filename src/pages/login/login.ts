import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, LoadingController, Events, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { logInService } from '../../services/logInService'
import { Globals } from '../../app/globals';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  users
  userDetails

  

  constructor(private formBuilder: FormBuilder,
    public loginService: logInService,
    private globals: Globals,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public alertCtrl: AlertController,
  ) {
    

    this.users = this.formBuilder.group({
      userName: ['', Validators.required],
      passWord: ['', Validators.required],
    });
  }

  doLogin() {
    console.log('in the login', this.users.value);

    if (this.users.value.userName && this.users.value.passWord) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

      this.loginService.getAccessToken(this.users.value.userName).subscribe(acessToken => {
        console.log(acessToken);
        this.globals.authToken = acessToken;
        this.globals.userId = this.users.value.userName.trim().toLowerCase();
        if (acessToken) {
          this.loginService.getUserDetails(this.users.value.userName).subscribe(data => {
            console.log('data', data);
            if (data == null) {
              //Invalid username/password
              let alert = this.alertCtrl.create({
                title: 'Invalid username/password',
                buttons: ['OK']
              });
              alert.present();
              this.users.reset();
            } else {
              //sucess user

              window.localStorage.setItem('user', JSON.stringify(data));
              window.localStorage.setItem('userName', data.firstName);
              window.localStorage.setItem('userFullName', data.firstName + ' ' + data.lastName);
              window.localStorage.setItem('userDesignation', data.roleName);

              this.globals.firstName = data.firstName;
              this.globals.lastName = data.lastName
              this.globals.middleName = data.middleName
              this.globals.userId = data.userID
              this.globals.regionID = data.regionID
              this.globals.regionName = data.regionName
              this.globals.role = data.roleID
              this.globals.state = data.state
              this.globals.userDesignation = data.roleName
              this.globals.userdistributorID = data.distributorID
              this.globals.userdistributorName = data.distributorName

              console.log('this.globals', this.globals)
              //publish an event
              this.events.publish('user:login', data);

              //this.navCtrl.push("HomePage");
              this.navCtrl.setRoot('HomePage');
            }
            loading.dismiss();
          })
        }
      })
    } else {
      console.log(this.users.value.passWord)
      console.log(this.users.value.userName)
    }

  }

}
