import Vue from "vue";
import App from "./App.vue";
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueCookie from "vue-cookie"
Vue.use(VueCookie)
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'
import 'material-design-icons/iconfont/material-icons.css'
import 'materialize-css'
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
import EjuiceIndexComponent from "./components/EjuiceIndexComponent"
import ProfileComponent from "./components/ProfileComponent"
import ContactComponent from "./components/ContactComponent"
import TanksAndCoilsComponent from "./components/TanksAndCoilsComponent"


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
        name: "tanksAndCoils",
        path: "/tanks_and_coils",
        component: TanksAndCoilsComponent
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
    },
    {
        name: "indexEjuice",
        path: "/e_juices",
        component: EjuiceIndexComponent
    },
    {
        name: "profileUser",
        path: "/profile",
        component: ProfileComponent
    },
    {
        name: 'contactPage',
        path: '/contact',
        component: ContactComponent
    }
];

const router = new VueRouter({ mode: "history", routes: routes });

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (document.cookie.auth != null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (document.cookie.auth == null) {
            next()
        } else {
            next({ name: 'profile' })
        }
    } else {
        next()
    }
})

new Vue(Vue.util.extend({ router }, App)).$mount("#app");