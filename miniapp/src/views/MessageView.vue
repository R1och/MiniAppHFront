<template>   
    <div class="back">
        <form @submit.prevent="backprof">
            <button class="backbut" type="submit">назад</button>
        </form>
    </div>
    <div class="messages_container">
        <div class="messages-list" ref="messagesList">
            <div   
                v-for="(message, index) in messages"
                :key="index"
                :class="['message-item', { 'current-user': message.currentUser === currentUser, 'other-user': message.currentUser !== currentUser }]"
    >
                <div v-if="shouldShowUsername(index)" class="message-username">
                    {{ message.currentUser }}
                </div>
                <div class="message-text">
                    {{ message.name }}
                </div>
            </div>
        </div>
    </div>
    <form @submit.prevent="register">
        <input class="input" type="text" v-model="name" placeholder="Введите сообщение" required />
        <button class="button" type="submit">отправить</button>
    </form>
</template>

<script>
import router from "@/router";
import { writeMessage, listenForMessages, auth, database } from "@/firebase1";
import { ref, get } from "firebase/database";

export default {
    name: 'MessageView',
    data() {
        return {
            messages: [],
            name: "",
            user: {
                name: "",            
            },
            currentUser: "penis",
            chatID: this.$route.params.chatId, // Получаем ID чата из параметров маршрута
        };
    },
    
    methods: {
        async register() {
                try {
            const user = auth.currentUser;
            if (user) {
                const userRef = ref(database, `Users/${user.uid}`);
                const snapshot = await get(userRef); // Асинхронное получение данных пользователя
                if (snapshot.exists()) {
                    this.user.name = snapshot.val().name;
                    this.currentUser = this.user.name; // Устанавливаем имя пользователя
                } else {
                    console.error("Данные пользователя не найдены в базе данных.");
                    return;
                }
            }

            if (this.name) {
                const newMessage = {
                    name: this.name,
                    currentUser: this.currentUser,
                };

                await writeMessage(newMessage, this.chatID); // Отправляем сообщение
                this.resetForm();
            }
            } catch (error) {
                console.error("Ошибка при регистрации сообщения:", error);
            }
        },


        resetForm() {
            this.name = '';
        },       

        backprof() {
            router.push('/chats');
        },

        shouldShowUsername(index) {
            return index === 0 || this.messages[index].name !== this.messages[index - 1].name;
        },
        fetchChatName() {
            
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const container = this.$refs.messagesList;
                if (container) {
                    container.scrollTop = container.scrollHeight;
                }
            });
        },
    },

    mounted() {
        listenForMessages((messages) => {
            this.messages = messages;
            this.scrollToBottom();
        }, this.chatID);
    },   
    watch: {
        messages() {

                this.scrollToBottom(); // Прокрутка к последнему сообщению
        },
    },
};
</script>

<style scoped>
.messages_container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: calc(100vh - 80px); /* Высота контейнера с учетом области ввода */
    background: linear-gradient(#c6d9ff, #6195ff);
    padding-top: 20px;
    overflow: hidden; /* Предотвращение переполнения */
}
.message-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    max-width: 70%;
    word-wrap: break-word;
}

.current-user {
    align-self: flex-end; /* Сообщения текущего пользователя справа */
    background-color: #1265ff; /* Синий фон для текущего пользователя */
    padding: 10px;
    border-radius: 10px 10px 0 10px; /* Закругленные углы */
    text-align: right;
    color: #FFF;
}
.other-user {
    align-self: flex-start; /* Сообщения других пользователей слева */
    background-color: #ffffff; /* Светло-серый фон для других пользователей */
    padding: 10px;
    border-radius: 10px 10px 10px 0; /* Закругленные углы */
    text-align: left;
    color: #3060ff;
}
.messages-list {
    display: flex;
    flex-direction: column; /* Сообщения идут сверху вниз */
    justify-content: flex-end; /* Сообщения выравниваются по нижнему краю */
    background-color: #cfe2ff;
    backdrop-filter: blur(8px);
    padding: 16px;
    border-radius: 8px;
    text-align: left;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin-top: 16px;
    width: 100%;
    max-width: 420px;
    overflow-y: auto; /* Включение вертикальной прокрутки */
    height: calc(100vh - 120px); /* Высота с учетом области ввода */
    scroll-behavior: smooth; /* Плавная прокрутка */
}

.input {
    position: fixed; /* Фиксируем область ввода внизу экрана */
    bottom: 10px;
    left: 10%;
    width: 70%;
    border-radius: 6px;
    background-color: rgb(255, 255, 255);
    border-color: rgb(160, 198, 255);
    color: rgb(0, 0, 0);
    font-weight: 500;
    line-height: 26px;
    letter-spacing: 10%;
    z-index: 10; /* Поверх остальных элементов */
}

.button {
    position: fixed; /* Фиксируем кнопку отправки */
    right: 10px;
    bottom: 10px;
    z-index: 10; /* Поверх остальных элементов */
    border-radius: 6px;
    background-color: rgb(0, 86, 216);
    border: none;
    color: rgb(255, 255, 255);
    height:32px;
}

.back {
    position: absolute;
    left: 10px;
    top: 10px;
}

.backbut {
    border-radius: 6px;
    background-color: rgb(0, 86, 216);
    border: none;
    color: rgb(255, 255, 255);
}

.backbut:hover {
    background-color: rgb(1, 72, 179);
}

.button:hover {
    background-color: rgb(1, 72, 179);
}


.message-username {
    font-weight: bold;
    margin-bottom: 4px;
    font-size: 0.9rem;
    color: #89bcff;
}
</style>