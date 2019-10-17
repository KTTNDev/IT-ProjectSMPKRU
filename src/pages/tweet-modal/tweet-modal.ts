
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-tweet-modal',
  templateUrl: 'tweet-modal.html',
})
export class TweetModalPage {
  files: Observable<any[]>
 
  constructor( public navParams: NavParams, private http: HttpClient, private viewCtrl: ViewController,public navCtrl: NavController, private dataProvider: DataProvider, private alertCtrl: AlertController, private toastCtrl: ToastController, private iab: InAppBrowser) {
    this.files = this.dataProvider.getFiles();
    
  }
  apiEndpoint =  "https://us-central1-angular-tikkeb.cloudfunctions.net/api/api/tweets"
  message;

  createTweet(name,floor,detail,url){ 
    var body = {
      name: name,
      floor: floor,
      detail: detail,
      url: url
    }
    this.http.post(this.apiEndpoint,body).subscribe((result:any)=>{
      console.log(result)
      this.viewCtrl.dismiss(true)
    })
  }
 
  addFile() {
    let inputAlert = this.alertCtrl.create({
      title: 'Store new information',
      inputs: [
        {
          name: 'info',
          placeholder: 'Lorem ipsum dolor...'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Store',
          handler: data => {
            this.uploadInformation(data.info);
          }
        }
      ]
    });
    inputAlert.present();
  }
 
  uploadInformation(text) {
    let upload = this.dataProvider.uploadToStorage(text);
 
    // Perhaps this syntax might change, it's no error here!
    upload.then().then(res => {
      this.dataProvider.storeInfoToDatabase(res.metadata).then(() => {
        let toast = this.toastCtrl.create({
          message: 'New File added!',
          duration: 3000
        });
        toast.present();
      });
    });
  }
 
  deleteFile(file) {
    this.dataProvider.deleteFile(file).subscribe(() => {
      let toast = this.toastCtrl.create({
        message: 'File removed!',
        duration: 3000
      });
      toast.present();
    });
  }
 
  viewFile(url) {
    this.iab.create(url);
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

}