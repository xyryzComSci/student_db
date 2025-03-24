
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const addStudent = async (studentId, name, yearlvl, email) => {
  try {
      await setDoc(doc(collection(db, "students"), studentId), {
          name: name,
          yearlvl: yearlvl,
          email: email
      });

      alert(`✅ Student ${name} added successfully with ID: ${studentId}!`);
  } catch (error) {
      console.error("❌ Error adding student:", error);
  }
};

// 🔹 Ensure DOM is loaded before adding event listener
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");

  if (!form) {
      console.error("❌ studentForm NOT FOUND!");
      return;
  }

  form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Stop the page from refreshing

      console.log("🟢 Submitting student...");

      // ✅ Get input values
      const studentId = document.getElementById("studentId").value;
      const name = document.getElementById("name").value;
      const yearlvl = document.getElementById("yearlvl").value;
      const email = document.getElementById("email").value;

      console.log(`Captured Data: ID=${studentId}, Name=${name}, Year Level=${yearlvl}, Email=${email}`);

      // ✅ Add student to Firestore
      await addStudent(studentId, name, yearlvl, email);

      // ✅ Reset form after submission
      form.reset();
  });
});