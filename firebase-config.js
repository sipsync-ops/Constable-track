// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXaVmJHJmH_W3g-qhSkYPUYQ8RcyDNKCE",
  authDomain: "constable-track-ff05d.firebaseapp.com",
  projectId: "constable-track-ff05d",
  storageBucket: "constable-track-ff05d.firebasestorage.app",
  messagingSenderId: "836997408999",
  appId: "1:836997408999:web:60460f1e63395eea489a42",
  measurementId: "G-1RYGQS2T0H"
};

// Initialize Firebase
try {
  // Check if Firebase is already initialized
  if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // If already initialized, use the existing one
  }
  
  // Make db globally accessible
  var db = firebase.firestore();
  
  // Enable Firestore logs in console (helpful for debugging)
  if (location.hostname === "localhost") {
    db.settings({
      experimentalForceLongPolling: true
    });
    console.log("Firestore initialized in debug mode");
  } else {
    console.log("Firestore initialized successfully");
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
  alert("Error connecting to database. See console for details.");
}