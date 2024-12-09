import { db } from './firebase-config.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

// Student Panel Elements
const appointmentTeacherInput = document.getElementById('appointmentTeacher');
const appointmentMessageInput = document.getElementById('appointmentMessage');
const bookAppointmentBtn = document.getElementById('bookAppointment');
const appointmentList = document.getElementById('appointmentList');

// Book Appointment
bookAppointmentBtn.addEventListener('click', async () => {
    const teacher = appointmentTeacherInput.value;
    const message = appointmentMessageInput.value;

    try {
        await addDoc(collection(db, 'appointments'), { teacher, message });
        alert('Appointment booked successfully!');
        fetchAppointments();
    } catch (error) {
        console.error('Book Appointment Error:', error);
        alert('Failed to book appointment!');
    }
});

// Fetch Appointments
export const fetchAppointments = async () => {
    appointmentList.innerHTML = '';
    const snapshot = await getDocs(collection(db, 'appointments'));
    snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = `Teacher: ${data.teacher}, Message: ${data.message}`;
        appointmentList.appendChild(li);
    });
};

// Load Data
window.onload = () => {fetchAppointments();}
