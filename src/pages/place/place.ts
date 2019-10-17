import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { TweetModalPage } from '../tweet-modal/tweet-modal';
import { ModalController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { LocationPage } from '../location/location';
import { DataProvider } from './../../providers/data/data';
import { Observable } from 'rxjs/Observable';
import { Geolocation } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

import { AngularFireDatabase } from 'angularfire2/database'
@Component({
  selector: 'page-place',
  templateUrl: 'place.html'
})
export class PlacePage {

  arrData = []
  testInput

  latlng : string;
  DetailPage=DetailPage;
  LocationPage=LocationPage;
  apiEndpoint = "https://us-central1-angular-tikkeb.cloudfunctions.net/api/api/tweets"
  tweets = []
  tweetModal;
  locations = []
  images = ['T1.JPG', 'T2.JPG', 'T3.JPEG', 'T4.JPEG'];
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  files: Observable<any[]>
  files2: Observable<any[]>
  constructor(private geolocation: Geolocation,
    private modalCtrl: ModalController,
    private dataProvider: DataProvider,
    public navCtrl: NavController, 
    private http:HttpClient, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private fdb: AngularFireDatabase
    ) { 
         
    
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.latlng = resp.coords.latitude+' , '+resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  
    this.files = this.dataProvider.getFiles();
   
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }
  btnAddClicked(){
    this.fdb.list("/List/").push(this.testInput);
  }
 
  getlocations(){
    this.http.get(this.apiEndpoint).subscribe((result:any)=>{
      console.log(result)
      if(result.status == 200){
        this.locations = result.locations
      }
    })
  }
 
  ngOnInit(){
    this.tweetModal = this.modalCtrl.create(TweetModalPage)
    this.tweetModal.onDidDismiss(data =>
    {
      if(data == true){
        this.getTweets()
      }
    });
    this.getTweets()
  }


  getTweets(){
    this.http.get(this.apiEndpoint).subscribe((result:any)=>{
      console.log(result)
      if(result.status == 200){
        this.tweets = result.tweets
      }
    })
  }

  showTweetModal(){
    this.tweetModal.present()
  }



}
