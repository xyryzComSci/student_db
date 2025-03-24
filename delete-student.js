import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 🔹 Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBl4Q-HIv4McBFewP4qfW7gvnkJezv4LKs",
    authDomain: "student-information-16bc7.firebaseapp.com",
    projectId: "student-information-16bc7",
    storageBucket: "student-information-16bc7.firebasestorage.app",
    messagingSenderId: "939023653355",
    appId: "1:939023653355:web:ca42fee6b7476d0ddfa1ae"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔍 DOM Elements
const searchInput = document.getElementById("searchStudent");
const suggestionsBox = document.createElement("ul"); // Dropdown list
suggestionsBox.style.listStyle = "none";
suggestionsBox.style.position = "absolute";
suggestionsBox.style.background = "#fff";
suggestionsBox.style.border = "1px solid #ccc";
suggestionsBox.style.width = "200px";
suggestionsBox.style.padding = "5px";
suggestionsBox.style.display = "none";
document.body.appendChild(suggestionsBox);

let studentsList = [];

// 📥 Fetch all students from Firestore
async function fetchStudents() {
    try {
        const querySnapshot = await getDocs(collection(db, "students"));
        studentsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log("📌 Students Fetched:", studentsList);
    } catch (error) {
        console.error("❌ Error fetching students:", error);
    }
}

// 📝 Filter and Display Student List as User Types
searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();
    suggestionsBox.innerHTML = "";
    
    if (!searchText) {
        suggestionsBox.style.display = "none";
        return;
    }

    const filteredStudents = studentsList.filter(student => 
        student.id.toLowerCase().includes(searchText) || 
        student.name.toLowerCase().includes(searchText)
    );

    if (filteredStudents.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    filteredStudents.forEach(student => {
        const li = document.createElement("li");
        li.textContent = `${student.name} (ID: ${student.id})`;
        li.style.cursor = "pointer";
        li.style.padding = "5px";
        li.style.borderBottom = "1px solid #ddd";
        li.addEventListener("click", () => confirmDelete(student));
        suggestionsBox.appendChild(li);
    });

    const rect = searchInput.getBoundingClientRect();
    suggestionsBox.style.top = `${rect.bottom + window.scrollY}px`;
    suggestionsBox.style.left = `${rect.left + window.scrollX}px`;
    suggestionsBox.style.display = "block";
});

// ❌ Confirm and Delete Student
async function confirmDelete(student) {
    const confirmDelete = confirm(`⚠ Are you sure you want to delete ${student.name} (ID: ${student.id})?`);
    
    if (!confirmDelete) return;

    try {
        await deleteDoc(doc(db, "students", student.id));
        alert(`✅ Successfully deleted ${student.name} (ID: ${student.id})`);
        fetchStudents(); // Refresh list
        searchInput.value = ""; // Clear input field
        suggestionsBox.style.display = "none";
    } catch (error) {
        console.error("❌ Error deleting student:", error);
    }
}

// 🚀 Fetch students on page load
fetchStudents();