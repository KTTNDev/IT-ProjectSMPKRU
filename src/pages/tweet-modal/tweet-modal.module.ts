import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TweetModalPage } from './tweet-modal';

@NgModule({
  declarations: [
    TweetModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TweetModalPage),
  ],
})
export class TweetModalPageModule {}
