import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globals } from '../app/globals';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';
  user

  pages: Array<{ title: string, component: any, icon: any }>;
  loginpages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    public events: Events, private globals: Globals) {
    this.initializeApp();

    //subscribe an event when user logged in
    events.subscribe('user:login', (user) => {
      if (user) {
        this.user = user;
        //console.log('in the app component', this.user)
        this.initializePages();
      }
    });

    this.user = JSON.parse(window.localStorage.getItem('user'));

    this.loginpages = [
      { title: 'Log In', component: 'LoginPage' },
    ];


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    var mode: number;

    if(page.component === 'SalesPage' || page.component === 'RequestStockPage' || page.component === 'CheckProductPage' || page.component === 'TransfersPage'){
      if (page.component === 'SalesPage') {
        mode = 1
      } else if (page.component === 'CheckProductPage') {
        mode = 1
      }
      else if (page.component === 'RequestStockPage') {
        mode = 2
      } else if (page.component === 'TransfersPage') {
        mode = 3
      }
      this.nav.setRoot('SalesPage', {'mode':mode,'page':page.component});
    }else{
      this.nav.setRoot(page.component)
    }

    
  }

  signOut() {
    localStorage.clear();
    this.events.publish('user:login', null);
    this.nav.setRoot('LoginPage');
  }

  goToPrgofile() {
    this.nav.push('ProfilePage');
  }

  initializePages() {
    console.log('in the app component user', this.globals)
    console.log('in the app component user', this.user)
    if (this.globals.role === 1) {
      this.pages = [
        { title: 'Home', component: 'HomePage', icon: 'md-home' },
        { title: 'Transactions', component: 'TransactionsPage', icon: 'md-clipboard' },
        { title: 'Reports', component: 'ReportsPage', icon: 'md-list-box' },
        { title: 'Settings', component: 'SettingsPage', icon: 'md-settings' }
      ];
    } else if (this.globals.role === 2) {
      this.pages = [
        { title: 'Home', component: 'HomePage', icon: 'md-home' },
        { title: 'Sales', component: 'SalesPage', icon: 'md-cart' },
        { title: 'Transactions', component: 'TransactionsPage', icon: 'md-clipboard' },
        { title: 'Reports', component: 'ReportsPage', icon: 'md-list-box' }
      ];

    } else if (this.globals.role === 3) {
      this.pages = [
        { title: 'Home', component: 'HomePage', icon: 'md-home' },
        { title: 'Sales', component: 'SalesPage', icon: 'md-cart' },
        { title: 'Request Stock', component: 'RequestStockPage', icon: 'logo-buffer' },
        { title: 'Transfers', component: 'TransfersPage', icon: 'md-analytics' },
        { title: 'Transactions', component: 'TransactionsPage', icon: 'md-clipboard' },
        { title: 'Reports', component: 'ReportsPage', icon: 'md-list-box' }
      ];
    } else {
      this.pages = [
        { title: 'Home', component: 'HomePage', icon: 'md-home' },
        { title: 'Check product', component: 'CheckProductPage', icon: 'md-pricetag' },
        { title: 'PassBook', component: 'TransactionsPage', icon: 'md-book' }
      ];
    }
  }
}
