import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';
declare var google:any;

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class MapsPage {
  @ViewChild('map') mapRef:ElementRef;
  map : any;

  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
    this.showMap();
  }
  showMap() {
    //Location 
    const location = new google.maps.LatLng('7.9099251','98.3872832');
 
    // map
    const options = {
      center: location,
      zoom: 16
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  };
}
