<template>
    <div class="login-page">
        <form class="login-form">
            <form @submit.prevent="back">
                <button class="button2" type="submit">назад</button>
            </form>
            <h1>Вход</h1>
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
            <form @submit.prevent="SignIn">
                <button class="button1" type="submit">Войти</button>
            </form>
        </form>
    </div>
</template>

<script>
import router from "@/router";
import { signIn } from "@/firebase1";
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        SignIn() {
            if (this.email && this.password) {
                signIn(this.email, this.password)
                    .then(() => {
                        console.log("Пользователь вошел в систему");
                         router.push("/messages"); // Перенаправление на страницу профиля после успешного входа
                    })
                    .catch((error) => {
                        console.error("Ошибка входа:", error);
                    });
            } else {
                console.error("Пожалуйста, заполните все поля.");
            }
        },
        back(){
            router.push("/");
        }
    }
};
</script>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /*background: linear-gradient(#c6d9ff, #6195ff);*/
    background-color: #1954CC; /* Общий фон */
    color: #fff; /* Белый текст */
    font-family: Arial, sans-serif;
}

.login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(#c6d9ff, #6195ff);
    /*background-color: rgba(255, 255, 255, 0.925); /* Полупрозрачный фон */
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
    height: 80%;
    max-height: 800px;
}

.login-form h1 {
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
    right: 25px;
    top: 5px;
}

.button2:hover {
    background-color: #002d81; /* Более темный НЕ оранжевый при наведении */
}
</style>