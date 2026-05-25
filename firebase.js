// ── FIREBASE CONFIG & INIT ────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyD-Y6IHQhLh3z2AXAsBLJ9pTyXFRBxJ1iM",
  authDomain: "nyawit-f67a6.firebaseapp.com",
  projectId: "nyawit-f67a6",
  storageBucket: "nyawit-f67a6.firebasestorage.app",
  messagingSenderId: "649529760782",
  appId: "1:649529760782:web:0cb6c93593af7cf5b7f05f"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const DOC_REF = db.collection('dbh26').doc('sumut');
