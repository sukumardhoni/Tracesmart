import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ChartsModule } from 'ng2-charts';
import { homeService } from '../../services/home.service';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ChartsModule
  ],
  providers:[homeService]
})
export class HomePageModule {}
