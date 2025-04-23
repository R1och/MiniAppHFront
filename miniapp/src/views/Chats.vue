<template>
    <div class="chats-page">
        <header class="chats-header">
            <form @submit.prevent="profile">
                <button class="profbutton" type="submit">профиль</button>
            </form>
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
        <div v-if="isAdmin" class="new-chat-container">
            <form @submit.prevent="addUser">
                <input class="input1" type="text" v-model="userID" placeholder="Введите id пользователя" required />
                <input class="input1" type="text" v-model="chatAddUser" placeholder="Введите название чата" required />
                <button class="button1" type="submit">добавить</button>
            </form>
            <form @submit.prevent="newСhat">
                <input class="input1" type="text" v-model="chatNew" placeholder="Введите название чата" required />
                <button class="button1" type="submit">новый чат</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, get, set, onValue } from "firebase/database";
import { auth, database, createChat } from "@/firebase1";

export default {
    name: "Chats",
    data() {
        return {
            chats: [], // Все чаты
            userChats: [],
            chat: "",
            chatAddUser: "",
            chatNew: "",
            sumbitChatNew: "",
            adminKey: "HjsdNCXjdCBGLSBjcbsalkjxSserdtgyujiokplyhtgrkefuy", // Уникальный ключ администратора
            isAdmin: false, // Флаг для проверки, является ли пользователь администратором
            userID: "", // ID пользователя для добавления в чат
        };
    },
    methods: {
        openChat(chatId) {
            this.$router.push({
                name: "MessageView",
                params: { chatId },
            });
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
                            name: chatData.name || chatId,
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
        newСhat() {
            this.sumbitChatNew = this.chatNew;
            if (this.sumbitChatNew) {
                createChat(this.sumbitChatNew);
                this.openChat(this.sumbitChatNew);
                this.resetChat();
            }
        },
        addUser() {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                console.error("Пользователь не авторизован.");
                return;
            }

            const chatRef = ref(database, `Chats/${this.chatAddUser}/Users/${this.userID}`);
            set(chatRef, this.userID)
                .then(() => {
                    console.log("Пользователь добавлен в чат:", this.chatAddUser);
                    this.fetchChats(); // Обновляем список чатов после добавления пользователя
                })
                .catch((error) => {
                    console.error("Ошибка при добавлении пользователя в чат:", error);
                });
        },
        resetChat() {
            this.chat = '';
        },
        checkAdmin() {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                console.error("Пользователь не авторизован.");
                return;
            }

            const adminKeyRef = ref(database, `Users/${currentUser.uid}/adminKey`);
            get(adminKeyRef).then((snapshot) => {
                if (snapshot.exists() && snapshot.val() === this.adminKey) {
                    this.isAdmin = true; // Устанавливаем флаг администратора
                } else {
                    this.isAdmin = false; // Пользователь не администратор
                }
            }).catch((error) => {
                console.error("Ошибка при проверке adminKey:", error);
            });
        },
        profile() {
            this.$router.push("/messages");
        },
    },
    mounted() {
        this.fetchChats();
        this.checkAdmin(); // Проверяем, является ли пользователь администратором
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
    align-items: left;
}

.profbutton{
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

.button2:hover {
    background-color: #002d81; /* Более темный НЕ оранжевый при наведении */
}

.chats-list {
    flex: 1;
    width: 100%;
    padding: 1rem;
    overflow-y: auto;
    margin-bottom: 80px; /* Отступ снизу для кнопок */
    max-height: calc(100vh - 150px); /* Ограничиваем высоту списка */
}

.chat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: #b7ceff; /* Полупрозрачный фон для элементов */
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.chat-item:hover {
    background-color: #ffffff; /* Оранжевый при наведении */
}

.chat-info h2 {
    margin: 0;
    font-size: 1rem;
    color: #145eff; /* Белый текст */
}

.chat-info p {
    margin: 0;
    color: #3c7aff; /* Серый текст */
    font-size: 0.875rem;
}

.chat-time {
    color: #3575ff;
    font-size: 0.75rem;
}

.new-chat-container {
    position: fixed;
    bottom: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 10; /* Убедимся, что кнопки отображаются поверх */
}

.input1 {
    width: 200px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    border: 1px solid #ccc;
}

.button1 {
    padding: 0.5rem 1rem;
    background-color: #0038a2;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.button1:hover {
    background-color: #002d81;
}
</style>