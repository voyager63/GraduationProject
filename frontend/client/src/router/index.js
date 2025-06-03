import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from '../views/AboutView.vue'
import SignUp from '../views/SignUp.vue'
import UserLogin from '../views/UserLogin.vue'
import UserLogout from '../views/UserLogout.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
  path: '/about',
  name: 'about',
  component: About
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'userLogin',
    component: UserLogin
  },
  {
    path: '/logout',
    name: 'userLogout',
    component: UserLogout
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
