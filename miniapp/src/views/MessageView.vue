<template>   
    <div class="back">
        <form @submit.prevent="backprof">
            <button type="submit">назад</button>
        </form>
    </div>
    <div class="messages_container">
        <div class="messages-list">
            <div   
                v-for="(message, index) in messages"
                :key="index"
                class="message-item"
            >
                <div v-if="shouldShowUsername(index)" class="message-username">
                    {{ message.name }}
                </div>
                <div class="message-text">
                    {{ message.currentUser }}
                </div>
            </div>
        </div>
    </div>
    <form @submit.prevent="register">
        <input class="input" type="text" v-model="name" placeholder="Введите сообщение" required />
        <button class="button" type="submit">отправить</button>
    </form>
    <div class="NCB">
        <form @submit.prevent="newchat">
            <button type="submit">новый чат</button>
        </form>
    </div>
</template>

<script>
import router from "@/router";
import { writeMessage, listenForMessages } from "@/firebase1";

export default {
    name: 'MessageView',
    data() {
        return {
            messages: [],
            name: "",
            currentUser: "penis", 
        };
    },
    
    methods: {
        async register() {
            if (this.name) {
                const newMessage = {
                    name: this.currentUser,
                    currentUser: this.name,
                };

                await writeMessage(newMessage); 

                this.resetForm();
            }
        },
        
        resetForm() {
            this.name = '';
        },

        backprof() {
            router.push('/profile');
        },

        newchat() {
            this.messages = []; 
        },

        shouldShowUsername(index) {
            return index === 0 || this.messages[index].name !== this.messages[index - 1].name;
        }
    },

    mounted() {
        listenForMessages((messages) => {
            this.messages = messages;
        });
    }
};
</script>

<style scoped>
.messages_container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    background-color: #1e1e1e;
    padding-top: 20px;
}
.messages-list {
    background-color: #e0e0e0ec;
    backdrop-filter: blur(8px);
    padding: 16px;
    border-radius: 8px;
    text-align: left;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    margin-top: 16px;
    width: 100%;
    max-width: 320px;
    color: #000000;
}
.NCB {
    position: absolute;
    right: 10px;
    bottom: 10px;
}
.input {
    position: absolute;
    bottom: 40px;
    width: 80%;
    border-radius: 6px;
    background-color: rgb(255, 255, 255);
    border-color: rgb(119, 119, 119);
    color: rgb(0, 0, 0);
    font-weight: 500;
    line-height: 26px;
    letter-spacing: 10%;
}
.button {
    position: absolute;
    right: 10px;
    bottom: 40px;
}
.back {
    position: absolute;
    left: 10px;
    top: 10px;
}
.message-username {
    font-weight: bold;
    margin-bottom: 4px;
}
</style>