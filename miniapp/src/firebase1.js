      // Import the functions you need from the SDKs you need
      import { initializeApp } from "firebase/app";
      import { getAnalytics } from "firebase/analytics";
      import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
      import { getDatabase, push, ref, set, onValue } from "firebase/database";
      import { title } from "process";

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
      const user = auth.currentUser;

      export function signUp(email, password) {

          createUserWithEmailAndPassword(auth, email, password)
      }

      export function signIn(email, password) {

          signInWithEmailAndPassword(auth, email, password)
          if (user !== null) {
              const uid = user.uid;
              console.log(uid)
          }
      }


      export const writeMessage = async(message) => {
          const messageRef = ref(database, 'Messages'); // Определяем путь с сообщениями
          await push(messageRef, message); // Добавляем новое сообщение
      };

      export const listenForMessages = (callback) => {
          const messageRef = ref(database, 'Messages');
          onValue(messageRef, (snapshot) => {
              const messages = [];
              snapshot.forEach((childSnapshot) => {
                  messages.push(childSnapshot.val());
              });
              callback(messages);
          });
      };