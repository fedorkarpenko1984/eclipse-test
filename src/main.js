import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { createRouter, createWebHashHistory } from 'vue-router'
import './main.css'

import Converter from './pages/Converter'
import CurrencyList from './pages/CurrencyList'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: CurrencyList
        },
        {
            path: '/converter',
            component: Converter
        }
    ]
})



createApp(App)
    .use(store)
    .use(router)

    .mount('#app')
