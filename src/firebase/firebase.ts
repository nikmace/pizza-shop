// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  CollectionReference,
  DocumentData,
} from 'firebase/firestore';

import { IPizza } from '../types/types';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAQK9n4l1uxUmtc-ZtTotXuSymKwYtXMhQ',
  authDomain: 'pizza-shop-d345e.firebaseapp.com',
  projectId: 'pizza-shop-d345e',
  storageBucket: 'pizza-shop-d345e.appspot.com',
  messagingSenderId: '281612283395',
  appId: '1:281612283395:web:3d3832a50c69c34448e836',
};

// Initialize Firebase
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
initializeApp(firebaseConfig);

// eslint-disable-next-line import/prefer-default-export
export const firestore = getFirestore();

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};

export const pizzasCollection = createCollection<IPizza>('pizzas');

// const colRef = collection(firestore, 'pizzas');

// const pizzas = getDocs(colRef).then((snapshot) => {
//   // snapshot.docs.forEach((doc) => pizzas.push({ ...doc.data(), id: doc.id }));
//   const pizzaArr = snapshot.docs.map((doc) => {
//     return { ...doc.data(), id: doc.id };
//   });

//   return pizzaArr;
// });
