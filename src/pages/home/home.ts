import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlacePage } from '../place/place';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  placePage=PlacePage;
  listPage=ListPage;
  images = ['T1.JPG', 'T2.JPG', 'T3.JPEG', 'T4.JPEG'];
 
  constructor(public navCtrl: NavController) {

  }

}



