      // Import the functions you need from the SDKs you need
      import { initializeApp } from "firebase/app";
      import { getAnalytics } from "firebase/analytics";
      import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
      import { getDatabase } from "firebase/database";

      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries

      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
          apiKey: "AIzaSyCsArvffSi1cKet8hLjLlPtq8DmFvYqpdw",
          authDomain: "miniapp-dc095.firebaseapp.com",
          databaseURL: "https://miniapp-dc095-default-rtdb.firebaseio.com",
          projectId: "miniapp-dc095",
          storageBucket: "miniapp-dc095.firebasestorage.app",
          messagingSenderId: "118323140893",
          appId: "1:118323140893:web:ac4e8854dd9e805ba129f4"
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app)
      const analytics = getAnalytics(app);
      const database = getDatabase(app);


      export function signUp(email, password) {
          createUserWithEmailAndPassword(auth, email, password)

      }