import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'


import "./assets/css/animate.css"

import "./assets/bootstrap/css/bootstrap.min.css"


import "./assets/css/all.min.css"
import "./assets/css/ionicons.min.css"
import "./assets/css/themify-icons.css"
import "./assets/css/linearicons.css"
import "./assets/css/flaticon.css"
import "./assets/css/simple-line-icons.css"

import "./assets/owlcarousel/css/owl.carousel.min.css"
import "./assets/owlcarousel/css/owl.theme.css"
import "./assets/owlcarousel/css/owl.theme.default.min.css"

import "./assets/css/magnific-popup.css"

import "./assets/css/slick.css"
import "./assets/css/slick-theme.css"

import "./assets/css/style.css"
import "./assets/css/responsive.css"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
