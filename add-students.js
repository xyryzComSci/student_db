import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBl4Q-HIv4McBFewP4qfW7gvnkJezv4LKs",
    authDomain: "student-information-16bc7.firebaseapp.com",
    projectId: "student-information-16bc7",
    storageBucket: "student-information-16bc7.firebasestorage.app",
    messagingSenderId: "939023653355",
    appId: "1:939023653355:web:ca42fee6b7476d0ddfa1ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Ensure DOM is loaded before adding event listener
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("studentForm");
    if (!form) {
        console.log("❌ studentForm NOT FOUND!");
        return;
    }
    
    form.addEventListener("submit", async function(event){
        event.preventDefault();
            console.log("🟢 Submitting student...");

            // ✅ Get input values
            const studentId = document.getElementById("studentId").value;
            const name = document.getElementById("name").value;
            const yearlvl = document.getElementById("yearlvl").value;
            const email = document.getElementById("email").value;

            console.log(`Captured Data: ID=${studentId}, Name=${name}, Year Level=${yearlvl}, Email=${email}`);

            // ✅ Add student to Firestore
            const newstudent = {id: studentId, name, yearlvl, email};

            try {
                await setDoc(doc(db, "students", studentId), newstudent);
                alert(`✅ Student ${name} added successfully with ID: ${studentId}!`);
                form.reset();
            } catch (error) {
                console.error("❌ Error adding student:", error);
            }

    });
});