// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQzBUgCcPpYu-GINTudzkyhL8QeStNBqM",
  authDomain: "business-listing-app-1f459.firebaseapp.com",
  projectId: "business-listing-app-1f459",
  storageBucket: "business-listing-app-1f459.appspot.com",
  messagingSenderId: "95253908567",
  appId: "1:95253908567:web:1f271f7f5bebd9ccbd2712",
  measurementId: "G-HVPC8MXKS2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); //Esta função é usada para inicializar o Firestore (banco de dados NoSQL do Firebase) e associá-lo ao aplicativo Firebase que você configurou com initializeApp()
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
