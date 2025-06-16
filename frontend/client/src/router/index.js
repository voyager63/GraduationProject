import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUp.vue'
import UserLogin from '../views/UserLogin.vue'
import ProductList from '../views/ProductList.vue'
import ProductRegister from '../views/ProductRegister.vue'
import MyProducts from '../views/MyProducts.vue'
import ProductDetails from '../views/ProductDetails.vue'
import SendMessage from '../views/SendMessage.vue'
import MySentMessages from '../views/MySentMessages.vue'
import MyReceivedMessages from '../views/MyReceivedMessages.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
    path: '/productList',
    name: 'productList',
    component: ProductList
  },
  {
    path: '/productRegister',
    name: 'productRegister',
    component: ProductRegister
  },
  {
    path: '/myProducts',
    name: 'myProducts',
    component: MyProducts
  },
  {
    path: '/productDetails/:id',
    name: 'productDetails',
    component: ProductDetails,
    props: true
  },
  {
    path: '/sendMessage/:id',
    name: 'sendMessage',
    component: SendMessage,
    props: true
  },
  {
  path: '/mySentMessages',
  name: 'mySentMessages',
  component: MySentMessages
  },
  {
  path: '/myReceivedMessages',
  name: 'myReceivedMessages',
  component: MyReceivedMessages
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
