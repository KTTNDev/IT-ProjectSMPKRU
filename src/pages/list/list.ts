import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { TweetModalPage } from '../tweet-modal/tweet-modal';
import { ModalController } from 'ionic-angular';
import { DataProvider } from './../../providers/data/data';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  files: Observable<any[]>

  apiEndpoint = "https://us-central1-angular-tikkeb.cloudfunctions.net/api/api/tweets"
  tweets = []
  tweetModal;
  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController, private toastCtrl: ToastController,private dataProvider: DataProvider,public navCtrl: NavController, private http:HttpClient, public navParams: NavParams) {
    this.initializeItems();
    this.files = this.dataProvider.getFiles();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
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


  initializeItems() {
    this.tweets = [
      
      'ตึกเกษตร',
      'Bogota',
  
    ];
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.tweets = this.tweets.filter((tweet) => {
        return (tweet.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
