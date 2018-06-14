import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesPage } from './sales';
import { logInService } from '../../services/logInService';
import { SalesService } from '../../services/sales.service';
import { PipesModule } from '../../pipes/pipes.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

@NgModule({
  declarations: [
    SalesPage
  ],
  imports: [
    IonicPageModule.forChild(SalesPage),
    PipesModule
  ],
  providers: [SalesService, logInService, BarcodeScanner, Toast]
})
export class SalesPageModule { }
