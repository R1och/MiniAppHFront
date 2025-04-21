
<template>  
    <div class="profile-container">
        <div class="profile-info">
            <h2>Профиль</h2>
            <div class="namestylo"><p>Пользователь:</p> <p><strong>{{ user.name }}</strong></p></div>
            <div class="work"><p ><strong>Работает</strong></p></div>
            <div class="namestylo"><p>Роль:</p> <p><strong>Разработчик</strong></p></div>
            <p>ID пользователя: <strong>{{ user.id }}</strong></p>
            <form @submit.prevent="chat">
            <button class="button1" type="submit">Чаты</button>
            </form>
        </div>
    </div>
    
</template>

<script>

import router from "@/router";
import { auth, database} from "@/firebase1"; // Импортируйте auth и database из firebase1.js
import { ref, get } from "firebase/database";
export default {
    name: 'ProfileView',      
    data() {
        return {
            user: {
                name: '',
                id: '', // ID пользователя
            },
        }

    },
    methods: {
        chat() {
             router.push("/chats");
        },

        fetchUserData() {
            const user = auth.currentUser;
            if (user) {
                const userRef = ref(database, `Users/${user.uid}`);
                get(userRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        this.user.name = snapshot.val().name;
                        this.user.id = user.uid; // Получаем ID пользователя
                    } else {
                        console.error("Данные пользователя не найдены в базе данных.");
                    }
                }).catch((error) => {
                    console.error("Ошибка получения данных пользователя:", error);
                });
                console.log("EMAIL пользователя:", this.user.name);
                console.log("ID пользователя:", this.user.id);
            } else {
                console.error("Пользователь не авторизован.");
            }
        },
    },
    mounted() {
        this.fetchUserData(); 
    },

}
</script>

<style scoped>
.profile-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh; /* Занимает всю высоту экрана */
  align-items: center;
  padding: 16px;
  background-color: #1954CC;
}
.namestylo{
    text-align: center;
}
.work{
    background-color: #ffffff; /* Оранжевый цвет для кнопки */
    color: #0045cf;
    border: none;
    border-radius: 4px;
    text-align: center;
    font-weight: bold; /* Сделать текст жирным */
}
.profile-info {
    align-items: center;
    background: linear-gradient(#c6d9ff, #6195ff);/* фон #ffffffcc */
  backdrop-filter: blur(8px);
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-top: 16px;
  width: 100%;
  max-width: 320px;
  color: #0038a2;
}
.button1 {

width: 100%;
padding: 0.75rem;
background-color: #0038a2; /* НЕ Оранжевый цвет кнопки */
color: #fff;
border: none;
font-size: 1rem;
cursor: pointer;
transition: background-color 0.3s;
border-radius: 15px;
}

.button1:hover {
background-color: #002d81; /* Более темный НЕ оранжевый при наведении */
}
</style>