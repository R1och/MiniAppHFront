<template>
    <div class="register-page">
        <form class="register-form">
            <form @submit.prevent="back">
                <button class="button2" type="submit">назад</button>
            </form>
            <h1>Регистрация</h1>
            <input 
                type="text" 
                v-model="name" 
                placeholder="Введите имя" 
                required 
                class="input-field"
            />
            <input 
                type="email" 
                v-model="email" 
                placeholder="Введите email" 
                required 
                class="input-field"
            />
            <input 
                type="password" 
                v-model="password" 
                placeholder="Введите пароль" 
                required 
                class="input-field"
            />
            <input 
                type="text" 
                v-model="adminKey" 
                placeholder="Введите ключ администратора" 
                required 
                class="input-field"
            />
            <form @submit.prevent="register">
                <button class="button1" type="submit">Зарегистрироваться</button>
            </form>

        </form>
    </div>
</template>

<script>
import router from "@/router";
import "firebase/compat/database";
import {signUp} from '@/firebase1.js'
export default {
    name: 'Register',
    data() {
        return {
            email: '',
            password: '',
            name: '',
            adminKey: '',
        };
    },
    methods: {
        register() {
            if (this.email && this.password && this.name) {
                signUp(this.email, this.password, this.name, this.adminKey)
                    .then(() => {
                        console.log("Пользователь зарегистрирован");
                        router.push("/login"); // Перенаправление на страницу входа после успешной регистрации
                    })
                    .catch((error) => {
                        console.error("Ошибка регистрации:", error);
                    });
            } else {
                console.error("Пожалуйста, заполните все поля.");
            }
        },
        resetForm() {
            this.name = '';
            this.email = '';
            this.password = '';
            this.adminKey = '';
        },
        back(){
            router.push("/");
        }
    }
};
</script>

<style scoped>
.register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #1954CC; /* Общий фон */
    color: #fff; /* Белый текст */
    font-family: Arial, sans-serif;
}

.register-form {
    align-items: center;
    display: flex;
    flex-direction: column;
    background: linear-gradient(#c6d9ff, #6195ff);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
    height: 80%;
    max-height: 800px;
}

.register-form h1 {

    margin-bottom: 1.5rem;
    color: #0038a2; /* НЕ Оранжевый цвет заголовка */
    font-size: 1.8rem;
}

.input-field {

    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    background-color: #ffffff;
    color: #457df7;
}

.input-field::placeholder {
    color: #afc8ff;
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

.button2 {
    width: 100%;
    padding: 0.75rem;
    background-color: #0038a2; /* НЕ Оранжевый цвет кнопки */
    color: #fff;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    border-radius: 15px;
    right: 10px;
    top: 5px;
}

.button2:hover {
    background-color: #002d81; /* Более темный НЕ оранжевый при наведении */
}
</style>