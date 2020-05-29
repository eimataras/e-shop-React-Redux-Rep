import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyBlVoU0MulRyi8g_6KbK5j4FGtg5YfPjVc',
  authDomain: 'bookshop-86079.firebaseapp.com',
  databaseURL: 'https://bookshop-86079.firebaseio.com',
  projectId: 'bookshop-86079',
  storageBucket: 'bookshop-86079.appspot.com',
  messagingSenderId: '708903165736',
  appId: '1:708903165736:web:cca9d6abcfa42112f6fa1d',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//  make firebase and firestore references
export const auth = firebase.auth();
export const db = firebase.firestore();
