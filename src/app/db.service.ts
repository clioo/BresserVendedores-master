import { Injectable } from '@angular/core';
import {firebase} from '@firebase/app';
import '@firebase/firestore';
import '@firebase/storage';
// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import { FirebaseFirestore } from '@firebase/firestore-types';
import { FirebaseStorage } from '@firebase/storage-types';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  db: FirebaseFirestore;
  storage: FirebaseStorage;
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDnMkw8wHSbIAZfWVkmNVVtwaCKml_nZJg',
      authDomain: 'bresser.firebaseapp.com',
      databaseURL: 'https://bresser.firebaseio.com',
      projectId: 'bresser',
      storageBucket: 'bresser.appspot.com',
      messagingSenderId: '169208186125',
      appId: '1:169208186125:web:735e891daaf467de235c44',
      measurementId: 'G-X14ZSY8CN2'
    };
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }
  insert(coleccion: string, objeto: any, entonces, cachar) {
    this.db.collection(coleccion).add(objeto)
      .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id);
          entonces(docRef);
        }
      )
      .catch(function(error) {
          console.error('Error adding document: ', error);
          cachar(error);
        }
      );
  }
  select(coleccion: string, entonces) {
    this.db.collection(coleccion).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            var documento = doc.data();
            documento.id = doc.id;
            entonces(documento);
          }
        );
      }
    );
  }
  delete(colection: string, ID: string, entonces, errores) {
    this.db.collection(colection).doc(ID).delete().then(function() {
      console.log('Documento eliminado');
      entonces();
    }).catch(function(error) {
      console.error('Error al remover: ', error);
      errores(error);
    });
  }
  selectOne(coleccion: string, condicion: string, valorcondicion, entonces) {
    this.db.collection(coleccion)
    .where(condicion, '==', valorcondicion)
    .limit(1)
    .get()
    .then(
      (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const docu = doc.data();
            docu.id = doc.id;
            entonces(docu);
          }
        );
      }
    );
  }
}
