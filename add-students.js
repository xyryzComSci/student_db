
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const addStudent = async (studentId, name, yearlvl, email) => {
    try {
      await setDoc(doc(db, "students", studentId), {
        name: name,
        yearlvl: yearlvl,
        email: email,
      });
      alert(`Student ${name} added successfully with ID ${studentId}!`);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };
  
  
  document.getElementById("studentForm").addEventListener('submit', async function(e) {
    e.preventDefault()
  
      const studentId = document.getElementById("studentId").value;
      const name = document.getElementById("name").value;
      const yearlvl = document.getElementById("yearlvl").value;
      const email = document.getElementById("email").value;
      console.log("Submittin..." + name + " " + yearlvl);
  
      addStudent(studentId, name, yearlvl, email);
  
  });