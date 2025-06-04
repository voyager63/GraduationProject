import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from '../views/AboutView.vue'
import SignUp from '../views/SignUp.vue'
import UserLogin from '../views/UserLogin.vue'
import UserLogout from '../views/UserLogout.vue'
import ProductList from '../views/ProductList.vue'
import ProductRegister from '../views/ProductRegister.vue'


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
  },
  {
    path: '/productList',
    name: 'productList',
    component: ProductList
  },
  {
    path: '/productRegister',
    name: 'productRegister',
    component: ProductRegister
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
