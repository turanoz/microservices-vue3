import {createRouter, createWebHistory} from 'vue-router'
import Header from "@/layouts/customer/Header.vue";
import Footer from "@/layouts/customer/Footer.vue";
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
import basket from "@/middlewares/basket";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:id?',
            name: 'shop',
            components: {
                default: Shop,
                header: Header,
                footer: Footer,
            }
        },
        {
            path: '/product/:id?',
            name: 'product',
            components: {
                default: Product,
                header: Header,
                footer: Footer,
            }
        },
        {
            path: '/cart',
            name: 'cart',
            components: {
                default: Cart,
                header: Header,
                footer: Footer,
            },
            beforeEnter: [token, auth, basket]
        },
        {
            path: '/checkout',
            name: 'checkout',
            components: {
                default: Checkout,
                header: Header,
                footer: Footer,
            },
            beforeEnter: [token, auth, basket]
        },
        {
            path: '/order',
            name: 'order',
            components: {
                default: Order,
                header: Header,
                footer: Footer,
            },
            beforeEnter: [token, auth]

        },
        {
            path: '/account',
            name: 'account',
            components: {
                default: Account,
                header: Header,
                footer: Footer,
            },
            beforeEnter: [token, auth]

        },
        {
            path: '/login',
            name: 'login',
            components: {
                default: Login,
                header: Header,
                footer: Footer,
            },
        },
        {
            path: '/register',
            name: 'register',
            components: {
                default: Register,
                header: Header,
                footer: Footer,
            }
        },
    ]
})
export default router
