import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

// Teacher Panel Elements
const teacherAppointments = document.getElementById('teacherAppointments');

// Fetch Appointments for Teacher
export const fetchTeacherAppointments = async () => {
    teacherAppointments.innerHTML = '';
    const snapshot = await getDocs(collection(db, 'appointments'));
    snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = `Student: ${data.message}, Requested with ${data.teacher}`;
        teacherAppointments.appendChild(li);
    });
};

// Load Data
window.onload=()=>{fetchTeacherAppointments();}
