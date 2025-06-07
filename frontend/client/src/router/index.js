import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUp.vue'
import UserLogin from '../views/UserLogin.vue'
import UserLogout from '../views/UserLogout.vue'
import ProductList from '../views/ProductList.vue'
import ProductRegister from '../views/ProductRegister.vue'
import MyProducts from '../views/MyProducts.vue'
import ProductDetails from '../views/ProductDetails.vue'
import SendMessage from '../views/SendMessage.vue'


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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
