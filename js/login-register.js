import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";


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
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { 
  doc, setDoc, getDoc 
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

console.log("firebase")
// Handle Registration
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
console.log('Register')
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  const fname = document.getElementById('fname').value;
  const lname = document.getElementById('lname').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;
    console.log(userCredential,userId,db)
    // Save user details in Firestore
    let ref=doc(db,"users",userId);
    await setDoc(ref, {
      fname,
      lname,
      email,
      role,
    });

    alert('Registration successful!');
    window.location.href = '../module/login.html';
  } catch (error) {
    console.error("Registration Error:", error);
    alert(`Error: ${error.message}`);
  }
});

// Handle Login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    const userId =userCredential.user.uid
   
    if(userCredential) localStorage.setItem('user',userId);
    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(db, 'users', userId));

    if (userDoc.exists()) {
      const userRole = userDoc.data().role;
    
      // Redirect based on role
      switch (userRole) {
        case 'admin':
          window.location.href = '../module/admin.html';
          break;
        case 'student':
          window.location.href = '../modules/student.html';
          break;
        case 'teacher':
          window.location.href = '../modules/teacher.html';
          break;
        default:
          alert('Unknown role');
      }
    } else {
      alert('User role not found!');
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert(`Error: ${error.message}`);
  }
});
