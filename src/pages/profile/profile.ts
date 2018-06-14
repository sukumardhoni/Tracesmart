import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Globals } from '../../app/globals';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userProfile
  constructor(public navCtrl: NavController, public navParams: NavParams,private globals: Globals) {
    this.userProfile = JSON.parse(window.localStorage.getItem('user'));
    console.log(this.globals)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
