import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap/"
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueCookie from "vue-cookie"
Vue.use(VueCookie)
import VueRouter from "vue-router";
Vue.use(VueRouter);

import VueAxios from "vue-axios";
import axios from "axios";
axios.defaults.withCredentials = true

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

import HomeComponent from "./components/HomeComponent.vue";
import CreateE_juiceComponent from "./components/CreateE_juiceComponent.vue";
import AddAddressComponent from "./components/AddAddressComponent.vue"
import CreateOrderComponent from "./components/CreateOrderComponent"
import RegisterUserComponent from "./components/RegisterUserComponent.vue"
import LoginUserComponent from "./components/LoginUserComponent.vue"


const routes = [{
        name: "home",
        path: "/",
        component: HomeComponent,
    },
    {
        name: "addEjuice",
        path: "/add_ejuice",
        component: CreateE_juiceComponent,
    },
    {
        name: "addAddress",
        path: "/add_address",
        component: AddAddressComponent
    },
    {
        name: "addOrder",
        path: "/add_order",
        component: CreateOrderComponent
    },
    {
        name: "registerUser",
        path: "/register",
        component: RegisterUserComponent,
        meta: {
            guest: true
        }
    },
    {
        name: "loginUser",
        path: "/login",
        component: LoginUserComponent,
        meta: {
            guest: true
        }
    }
];

const router = new VueRouter({ mode: "history", routes: routes });

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem("jwt") == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if (to.matched.some(record => record.meta.is_admin)) {
                if (user.is_admin == 1) {
                    next()
                } else {
                    next({ name: 'userboard' })
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        } else {
            next({ name: 'userboard' })
        }
    } else {
        next()
    }
})

new Vue(Vue.util.extend({ router }, App)).$mount("#app");