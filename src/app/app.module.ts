import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapsPage } from '../pages/maps/maps';
import { DetailPage } from '../pages/detail/detail';
import { PlacePage } from '../pages/place/place';
import { TabsPage } from '../pages/tabs/tabs';
import { ListPage } from '../pages/list/list';
import { TweetModalPage } from '../pages/tweet-modal/tweet-modal';
import { DataProvider } from '../providers/data/data';
import { LocationPage } from '../pages/location/location';


import { AngularFireStorageModule } from 'angularfire2/storage';

var firebaseConfig = {
  apiKey: "AIzaSyCqh8zkRDl_TJkyH6Y0jTQek3q-uSX2DuA",
    authDomain: "angular-tikkeb.firebaseapp.com",
    databaseURL: "https://angular-tikkeb.firebaseio.com",
    projectId: "angular-tikkeb",
    storageBucket: "angular-tikkeb.appspot.com",
    messagingSenderId: "296591939869"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlacePage,
    MapsPage,
    TabsPage,
    ListPage,
    DetailPage,
    LocationPage,    
    TweetModalPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp),
    AngularFireStorageModule,
    FormsModule
    

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlacePage,
    MapsPage,
    TabsPage,
    ListPage,
    DetailPage,
    LocationPage,
    TweetModalPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataProvider,
    Geolocation,
    GoogleMaps,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
