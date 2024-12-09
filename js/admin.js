import { db } from './firebase-config.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

// Admin Panel Elements
const teacherNameInput = document.getElementById('teacherName');
const departmentInput = document.getElementById('department');
const subjectInput = document.getElementById('subject');
const addTeacherBtn = document.getElementById('addTeacher');
const teacherList = document.getElementById('teacherList');

// Add Teacher
addTeacherBtn.addEventListener('click', async () => {
    const name = teacherNameInput.value;
    const department = departmentInput.value;
    const subject = subjectInput.value;

    try {
        await addDoc(collection(db, 'teachers'), { name, department, subject });
        alert('Teacher added successfully!');
        fetchTeachers();
    } catch (error) {
        console.error('Add Teacher Error:', error);
        alert('Failed to add teacher!');
    }
});

// Fetch Teachers
export const fetchTeachers = async () => {
    teacherList.innerHTML = '';
    const snapshot = await getDocs(collection(db, 'teachers'));
    snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = `${data.name} (${data.department} - ${data.subject})`;
        teacherList.appendChild(li);
    });
};

// Load Data
window.onload=() => {fetchTeachers();}
