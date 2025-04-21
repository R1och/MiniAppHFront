<template>
    <div class="chats-page">
        <header class="chats-header">
            <h1>Чаты</h1>
        </header>
        <main class="chats-list">
            <ul>
                <li 
                    v-for="chat in userChats" 
                    :key="chat.id" 
                    class="chat-item"
                    @click="openChat(chat.id)"
                >
                    <div class="chat-info">
                        <h2>{{ chat.name }}</h2>
                        <p>{{ chat.lastMessage }}</p>
                    </div>
                    <span class="chat-time">{{ chat.time }}</span>
                </li>
            </ul>
        </main>
    </div>
</template>

<script>
import { ref, get, onValue } from "firebase/database";
import { auth, database } from "@/firebase1"; // Импортируйте auth и database из firebase1.js

export default {
    name: "Chats",
    data() {
        return {
            chats: [], // Все чаты
            userChats: [], // Чаты, в которых есть текущий пользователь
        };
    },
    methods: {
        openChat(chatId) {
            this.$router.push(`/profile`);
        },
        fetchChats() {
            const chatsRef = ref(database, "Chats");
            const currentUser = auth.currentUser;

            if (!currentUser) {
                console.error("Пользователь не авторизован.");
                return;
            }

            onValue(chatsRef, (snapshot) => {
                const allChats = [];
                const userChats = [];
                snapshot.forEach((chatSnapshot) => {
                    const chatId = chatSnapshot.key;
                    const chatData = chatSnapshot.val();

                    // Проверяем, есть ли текущий пользователь в чате
                    if (chatData.Users && Object.values(chatData.Users).includes(currentUser.uid)) {
                        userChats.push({
                            id: chatId,
                            name: chatId, // Можно заменить на chatData.name, если есть имя чата
                            lastMessage: chatData.lastMessage || "Нет сообщений",
                            time: chatData.time || "Неизвестно",
                        });
                    }

                    allChats.push({
                        id: chatId,
                        ...chatData,
                    });
                });

                this.chats = allChats;
                this.userChats = userChats;
            });
        },
    },
    mounted() {
        this.fetchChats();
    },
};
</script>

<style scoped>
.chats-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background: linear-gradient(#c6d9ff, #6195ff); /* Общий фон */
    color: #fff; /* Белый текст */
    font-family: Arial, sans-serif;
}

.chats-header {
    background-color: #1954CC; /* Полупрозрачный фон */
    backdrop-filter: blur(8px); /* Эффект размытия */
    width: 100%;
    padding: 1rem;
    text-align: center;
    color: #FFF; /* Оранжевый цвет заголовка */
    font-weight: bold;
    font-size: 1.5rem;
}

.chats-list {
    flex: 1;
    width: 100%;
    padding: 1rem;
    overflow-y: auto;
}

.chat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: #afc8ff; /* Полупрозрачный фон для элементов */
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.chat-item:hover {
    background-color: #457df7; /* Оранжевый при наведении */
}

.chat-info h2 {
    margin: 0;
    font-size: 1rem;
    color: #fff; /* Белый текст */
}

.chat-info p {
    margin: 0;
    color: #ccc; /* Серый текст */
    font-size: 0.875rem;
}

.chat-time {
    color: #999;
    font-size: 0.75rem;
}
</style>