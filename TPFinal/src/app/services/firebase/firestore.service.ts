import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Turnos } from 'src/app/models/turnos';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  collection: AngularFirestoreCollection<any> | undefined;
  collectionPathUsers = '/users';
  collectionPathTurnos = '/turnos';
  collectionPathEspecialidades = '/especialidades';

  constructor(private firestore: AngularFirestore) {

  }

  saveUser(user: User) {
    this.collection = this.firestore.collection(this.collectionPathUsers);
    return this.collection.add({ ...user });
  }

  getUserCompleto(uid: string) {
    let docRef = this.firestore.collection(this.collectionPathUsers).doc(uid);
    return docRef.get();
  }

  getAllUsers() {
    this.collection = this.firestore.collection(this.collectionPathUsers);
    return this.collection;
  }

  actualizarUsuarios(id: any, datos: any): Promise<void> {
    this.collection = this.firestore.collection(this.collectionPathUsers);
    return this.collection.doc(id).update(datos);
  }

  saveTurno(turno: Turnos) {
    this.collection = this.firestore.collection(this.collectionPathTurnos);
    return this.collection.add({ ...turno });
  }

  getTurnos() {
    this.collection = this.firestore.collection(this.collectionPathTurnos);
    return this.collection;
  }

  getAllEspecialidades(){
    this.collection = this.firestore.collection(this.collectionPathEspecialidades);
    return this.collection;
  }

  getEspecialistasConAgenda(){
    const usersRef = this.firestore.collection(this.collectionPathUsers).ref;
    var query = usersRef.where("tipo", "==", "especialista").where("agenda", "!=", null);
    return query.get();
  }

  getPacientes(){
    const usersRef = this.firestore.collection(this.collectionPathUsers).ref;
    var query = usersRef.where("tipo", "==", "paciente");
    return query.get();
  }

  getTurnosDePeciente(uid){
    const usersRef = this.firestore.collection(this.collectionPathTurnos).ref;
    var query = usersRef.where("paciente.uid", "==", uid);
    return query.get();
  }

  getTurnosDeEspecialista(uid){
    const usersRef = this.firestore.collection(this.collectionPathTurnos).ref;
    var query = usersRef.where("especialista.uid", "==", uid);
    return query.get();
  }

  actualizarTurno(id: any, datos: any): Promise<void> {
    this.collection = this.firestore.collection(this.collectionPathTurnos);
    return this.collection.doc(id).update(datos);
  }
}
