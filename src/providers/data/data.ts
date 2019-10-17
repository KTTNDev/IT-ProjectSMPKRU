import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
@Injectable()
export class DataProvider {
 
  constructor(private db: AngularFireDatabase,public afd: AngularFireDatabase, private afStorage: AngularFireStorage) { }
 

  getFiles() {
    let ref = this.db.list('tweets');
 
    return ref.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
  uploadToStorage(information): AngularFireUploadTask {
    let newName = `${new Date().getTime()}.txt`;
 
    return this.afStorage.ref(`tweets/${newName}`).putString(information);
  }
 
  storeInfoToDatabase(metainfo) {
    let toSave = {
      name:metainfo.name,
      created: metainfo.timeCreated,
      url: metainfo.downloadURLs[0],
      floor: metainfo.floor,
      detail: metainfo.detail
    }
    return this.db.list('files').push(toSave);
  }
 
 
  deleteFile(file) {
    let key = file.key;
    let storagePath = file.fullPath;
 
    let ref = this.db.list('tweets');
    
 
    ref.remove(key);
    return this.afStorage.ref(storagePath).delete();
  }
  getData() {
    let ref = this.afd.list('todos');
    return ref.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
  save(data){
    this.afd.list('/todos').push(data);
  }
 
}