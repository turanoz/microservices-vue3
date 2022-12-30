import {createRouter, createWebHistory} from 'vue-router'
import Shop from "@/pages/customer/Shop.vue";
import Product from "@/pages/customer/Product.vue";
import Cart from "@/pages/customer/Cart.vue";
import Checkout from "@/pages/customer/Checkout.vue";
import Order from "@/pages/customer/Order.vue";
import Account from "@/pages/customer/Account.vue";
import Login from "@/pages/customer/Login.vue";
import Register from "@/pages/customer/Register.vue";
import auth from "@/middlewares/auth";
import token from "@/middlewares/token";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:id?',
            name: 'shop',
            component: Shop
        },
        {
            path: '/product/:id?',
            name: 'product',
            component: Product
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
            beforeEnter: [token, auth]
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout,
            beforeEnter: [token, auth]
        },
        {
            path: '/order',
            name: 'order',
            component: Order,
            beforeEnter: [token, auth]

        },
        {
            path: '/account',
            name: 'account',
            component: Account,
            beforeEnter: [token, auth]

        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
    ]
})
export default router
