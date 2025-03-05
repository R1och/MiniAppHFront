import firebase from "firebase/compat/app";
import "firebase/compat/database";

var firebaseConfig = {
    // ...
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://miniapp-dc095-default-rtdb.firebaseio.com/",
  };
 
firebase.initializeApp(firebaseConfig)

