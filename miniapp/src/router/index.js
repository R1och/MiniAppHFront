import { createRouter, createWebHistory } from 'vue-router'
import MessageView from '../views/MessageView.vue'
import ProfileView from '../views/ProfileView.vue'
import SignUp from '../views/SignUp.vue'

const routes = [
    {
      path: '/',
      name: 'Signup',
      component: SignUp,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView,
    },
    {
      path: '/messages',
      name: 'MessageView',
      component: MessageView,
    },
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router

