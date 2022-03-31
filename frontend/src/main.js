import 'font-awesome/css/font-awesome.css'
import { createApp } from 'vue'
import App from './App.vue'
import {store} from './config/store'
import router from './config/router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


const app = createApp(App)//.mount('#app')
app.use(store)
app.use(router)
app.mount('#app')
