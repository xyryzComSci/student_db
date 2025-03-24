import { db } from "./firebaseauth.js"; // Import Firestore instance
import { getDocs, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


const colRef = collection(db, 'students');

getDocs(colRef)
  .then((snapshot => {
      let students = [];
      snapshot.docs.forEach((doc) => {
          students.push({ ...doc.data(), id: doc.id })
      })
      console.log(students)
  })) 
  .catch(err =>{
      console.log(err.message)
  });

const studentsTableBody = document.getElementById("studentsTableBody");

// Function to Populate Table
const populateTable = (students) => {
  studentsTableBody.innerHTML = ""; // Clear previous data

  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.yearlvl}</td>
      <td>${student.email}</td>
    `;
    studentsTableBody.appendChild(row);
  });
};

// Fetch Students (One-time Fetch)
const fetchStudents = async () => {
  try {
    const snapshot = await getDocs(colRef);
    const students = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    populateTable(students);
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

// Real-time Updates from Firestore
onSnapshot(colRef, (snapshot) => {
  const students = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  populateTable(students);
});

// Fetch students when the page loads
document.addEventListener("DOMContentLoaded", fetchStudents);