import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your Firebase configuration
const firebaseConfig = {
  projectId: 'my-app-cebd6'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a Firestore instance
const db = firebase.firestore();

export { db, firebase };
