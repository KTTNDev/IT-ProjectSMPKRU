import { Component } from '@angular/core';

import { PlacePage } from '../place/place';
import { MapsPage } from '../maps/maps';
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PlacePage;
  tab3Root = ListPage;
  tab4Root = MapsPage;


  constructor() {

  }
}
