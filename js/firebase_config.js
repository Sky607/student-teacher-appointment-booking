// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyAnZ33M8CI2NxogWDDsgwFVlb4qiUUhwVg",
    databaseURL: "https://student-teacher-appointement-pe-ad51e-default-rtdb.firebaseio.com",
    authDomain: "student-teacher-appointement.firebaseapp.com",
    projectId: "student-teacher-appointement",
    storageBucket: "student-teacher-appointement.firebasestorage.app",
    messagingSenderId: "478827655738",
    appId: "1:478827655738:web:1fb92797cd1cb3f7c27b03",
    measurementId: "G-2P4Y3F0V67"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth , db}