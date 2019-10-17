import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { TweetModalPage } from '../tweet-modal/tweet-modal';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  apiEndpoint = "https://us-central1-angular-tikkeb.cloudfunctions.net/api/api/tweets"
  tweets = []
  tweetModal;
  locations = []
  images = ['T1.JPG', 'T2.JPG', 'T3.JPEG', 'T4.JPEG'];
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(private modalCtrl: ModalController,public navCtrl: NavController, private http:HttpClient, public navParams: NavParams) {
 
   
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
