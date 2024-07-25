// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJmy8KfyBHx__7A3PLgT8X368fWl3qr3E",
  authDomain: "weatherapp-firebase-47a92.firebaseapp.com",
  projectId: "weatherapp-firebase-47a92",
  storageBucket: "weatherapp-firebase-47a92.appspot.com",
  messagingSenderId: "960072226466",
  appId: "1:960072226466:web:0a3d192452fae3ca3fe9fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize Firestore
const db = getFirestore(app);

export async function storeWeatherData(weatherData){

    const docRef = await addDoc(collection(db, "weatherData"), weatherData);
    console.log("doc written");

}

