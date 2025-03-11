
import { colRef } from "./firebaseConfig.js"; // Import Firestore instance
import { getDocs, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


let students = [];
getDocs(colRef)
.then((snapshot => {
    snapshot.docs.forEach((doc) => {
        students.push({ ...doc.data(), id: doc.id })
    })
    console.log(students)
})) 
.catch(err =>{
    console.log(err.message)
});

console.log("1");

const fetchStudents = async () => {
    const studentsTableBody = document.getElementById("studentsTableBody");
    studentsTableBody.innerHTML = ""; 
  
    try {
        students.forEach((student) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.yearLevel}</td>
            <td>${student.email}</td>
            `;
    
            studentsTableBody.appendChild(row);
        });
  
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  
  // Call function when the page loads
  document.addEventListener("DOMContentLoaded", fetchStudents);