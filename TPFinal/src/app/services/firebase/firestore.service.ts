import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  collection: AngularFirestoreCollection<any> | undefined;
  collectionPathUsers = '/users'

  constructor(private firestore: AngularFirestore) {

  }

  saveUser(user: User) {
    this.collection = this.firestore.collection(this.collectionPathUsers);
    return this.collection.add({ ...user });
  }

  getUserCompleto(uid: string) {
    var docRef = this.firestore.collection(this.collectionPathUsers).doc(uid);
    return docRef.get();
  }
}
