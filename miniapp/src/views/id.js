
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
var firebaseConfig = {
    // ...
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://miniapp-dc095-default-rtdb.firebaseio.com/",
  };

  firebase.initializeApp(firebaseConfig)




async function writing(uniquKey) {        
    const newRef = firebase.database().ref('Users').push();
    uniquKey = newRef.key;
    newRef.set({
        username: "penis"
    })
    console.log(uniquKey)

    try {

        const query_clientsList = await firebase.database().ref('Users/'+uniquKey).once('value')
        const clientsList = query_clientsList.val()         
        console.log(clientsList.username)
    } catch (error) {
        console.log(error.message)
        throw error
    }



}
import * as fs from 'node:fs'
async function  test(params) {

fs.readFile('user_config.json', 'utf8', (err, data) => {
  if (data = " ") {console.log('penis')};
  console.log(data);
});
}

writing()