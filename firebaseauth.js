
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

  const db = getFirestore();

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




