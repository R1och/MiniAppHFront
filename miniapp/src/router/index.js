import { createRouter, createWebHistory } from 'vue-router'
import MessageView from '../views/MessageView.vue'
import ProfileView from '../views/ProfileView.vue'
import SignUp from '../views/SignUp.vue'
import Chats from '../views/Chats.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [{
        path: '/',
        name: 'Signup',
        component: SignUp,
    },
    {
        path: '/messages',
        name: 'Profile',
        component: ProfileView,
    },
    {
        path: '/profile',
        name: 'MessageView',
        component: MessageView,
    },
    {
        path: '/chats',
        name: 'Chats',
        component: Chats,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login

    },
    {
        path: '/register',
        name: 'Register',
        component: Register

    }

]

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes
})
export default router