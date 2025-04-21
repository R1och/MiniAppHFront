      // Import the functions you need from the SDKs you need
      import { initializeApp } from "firebase/app";
      import { getAnalytics } from "firebase/analytics";
      import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
      import { getDatabase, push, ref, set, onValue, get } from "firebase/database";
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
      export const auth = getAuth(app)
      export const database = getDatabase(app);

      export async function signUp(email, password, name) {

          try {
              const userCredential = await createUserWithEmailAndPassword(auth, email, password);
              const user = userCredential.user;
              const userRef = ref(database, 'Users/' + user.uid);
              await set(userRef, {
                  name: name,
                  email: email,
              });

              console.log("Пользователь зарегистрирован:", user.uid);
              return user.uid;
          } catch (error) {
              console.error("Ошибка при регистрации:", error.message);
              return null;
          }

      }

      export function signIn(email, password) {
          return signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  const user = userCredential.user;
                  console.log("Пользователь вошел:", user.uid);
                  return user.uid;
              })
              .catch((error) => {
                  console.error("Ошибка при входе:", error.message);
                  return null;
              });
      }

      export function createChat(chatName) {
          const Ref = ref(database, 'Chats/' + chatName);
          const user = auth.currentUser;
          const userRef = ref(database, 'Chats/' + chatName + '/Users');

          get(Ref).then((snapshot) => {
              if (!snapshot.exists()) {
                  set(Ref, { status: "Isachat" })
                      .then(() => {
                          console.log(`Чат "${chatName}" успешно создан.`);
                          push(userRef, user.uid); // Добавляем пользователя в чат
                      })
                      .catch((error) => {
                          console.error("Ошибка при создании чата:", error);
                      });
              } else {
                  console.log(`Чат "${chatName}" уже существует.`);
                  push(userRef, user.uid); // Добавляем пользователя в существующий чат
              }
          }).catch((error) => {
              console.error("Ошибка при проверке существования чата:", error);
          });
      }



      export const writeMessage = async(message, chatNameMessage) => {
          const messageRef = ref(database, 'Chats/' + chatNameMessage + '/Messages'); // Определяем путь с сообщениями
          await push(messageRef, message); // Добавляем новое сообщение
      };

      export const listenForMessages = (callback, chatNameMessages) => {
          const messageRef = ref(database, 'Chats/' + chatNameMessages + '/Messages');
          onValue(messageRef, (snapshot) => {
              const messages = [];
              snapshot.forEach((childSnapshot) => {
                  messages.push(childSnapshot.val());
              });
              callback(messages);
          });
      };


      export function userData() {
          const user = auth.currentUser;
          if (user) {
              return user.uid;

          }

      }