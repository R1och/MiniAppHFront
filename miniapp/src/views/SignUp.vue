<template>

    <div class="registration-container">
      <div class="registration">
        <h2>Регистрация</h2>
        <img src="https://i.imgur.com/zOx9TgY.png" width="50%" style="position: relative;">
        <form @submit.prevent="register">
          <div class="form-group">
            <h3>Приветствуем!</h3>
            <p>Имя, под которым вас<br>будут видеть другие<br> пользователи,</p>
            <label for="name">введите сюда:</label>
            <input type="text" v-model="name" required />
          </div>
          <button type="submit">Войти</button>
        </form>
        <img src="https://i.imgur.com/M1WCjw3.png" width="50%" style="position: relative; left:122px; top: 24px;">
      </div>
    </div>
  </template>



  <script>

import router from "@/router";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
var firebaseConfig = {
    // ...
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://miniapp-dc095-default-rtdb.firebaseio.com/",
  };
 
firebase.initializeApp(firebaseConfig)



  export default {            
    name: 'Signup',
    data() {
      return {
        name: '',
      };
    },
    methods: {
      register() {
        if (this.name) {  
            console.log();

              console.log('Регистрация успешна', { name: this.name });
              router.push('/profile')
              const newRef = firebase.database().ref('Users').push();
              const uniquKey = newRef.key;
              newRef.set({
                  username: "asdassads"
                  })
          this.resetForm();
          router.push('/profile')
           }
       },
      resetForm() {
        this.name = '';
      },
    }
  };

  </script>
  
  <style scoped>
  .registration-container {
    display: flex;
    justify-content: center; /* Центрирование по горизонтали */
    align-items: flex-start; /* Блок выравнен по верхнему краю */
    height: 100vh; /* Занимает всю высоту экрана */
    background-color: #1e1e1e; /* Фоновый цвет страницы #f0f0f0 */
    padding-top: 20px; /* Отступ сверху */
  }
  
  .registration {
    max-width: 400px;
    padding: 20px;
    border: 1px solid #ccc; /* #ccc */
    border-radius: 5px;
    background-color: #fff; /* Цвет фона формы #fff */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Тень для формы */
    text-align: center; /* Центрирование текста внутри блока */
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 85%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 15px;
    background-color: #ff7f00; /* Оранжевый цвет для кнопки */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold; /* Сделать текст жирным */
  }
  
  button:hover {
    background-color: #e07500; /* Темнее при наведении */
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
