
<template>  
    <div class="profile-container">
        <div class="profile-info">
            <h2>Профиль</h2>
            <div class="namestylo"><p>Пользователь:</p> <p><strong>{{ user.name }}</strong></p></div>
            <div class="work"><p ><strong>Работает</strong></p></div>
            <hr>
            <div class="namestylo"><p>Роль:</p> <p><strong>Разработчик</strong></p></div>
            <hr>
            <form @submit.prevent="timedeal"><!--чё сюда писать?-->
            <label for="nametime">Время работы:</label>
            <input class="timemanage" type="text" v-model="name" required /><!--типа так?-->
          <button type="submit">подтвердить</button>
        </form>
            <p>Время работы: {{ nametime }}</p>
            <hr>
            <p>ID пользователя: <strong>{{ user.id }}</strong></p>
            <hr>
            <form @submit.prevent="chat">
            <button type="submit">Чаты</button>
            </form>
        </div>
    </div>
    
</template>

<script>

import router from "@/router";

export default {
    name: 'ProfileView',      
    data() {
        return {
            user: {
                id: '',
                name: '',

            },
            nametime: ''
        }

    },

    async mounted() {
        await this.fetchProfile()
    },
    methods: {
        async fetchProfile() {
            try {
                const tg_user = window.Telegram.WebApp.initDataUnsafe?.user
                const response = await fetch('https://fluffy-lamp-4jjp57rwwp64fjppx-8000.app.github.dev/api/main/${tg_user.id}')
                const data = await response.json()
                this.user.id = tg_user.id
                this.user.name = tg_user.first_name
            } 
            catch (error) {
                console.log(error)
            }
        },
        chat() {
             router.push("/messages")
        },
        timedeal(){
            this.nametime;
        }
    }

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
  background-color: #1e1e1e;
}
.namestylo{
    text-align: center;
}
.work{
    background-color: #1e1e1e; /* Оранжевый цвет для кнопки */
    color: #ff7f00;
    border: none;
    border-radius: 4px;
    text-align: center;
    font-weight: bold; /* Сделать текст жирным */
}
.timemanage{
    background-color: #1e1e1e;
    color: #FFFFFF;
}
.profile-info {
  background-color: #3b3b3bec;/* фон #ffffffcc */
  backdrop-filter: blur(8px);
  padding: 16px;
  border-radius: 8px;
  text-align: left;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-top: 16px;
  width: 100%;
  max-width: 320px;
  color: #FFFFFF;
}
</style>