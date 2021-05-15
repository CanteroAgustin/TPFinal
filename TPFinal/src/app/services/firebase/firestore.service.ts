import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  collection: AngularFirestoreCollection<any> | undefined;

  constructor(private firestore: AngularFirestore) {

  }

  saveResutGame(datos: any, collectionPath: string) {
    this.collection = this.firestore.collection(collectionPath);
    return this.collection.add({ ...datos });
  }
}
