import Vue from 'vue'
import {BootstrapVue, ModalPlugin} from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import vueConfig from 'vue.config'

Vue.use(BootstrapVue)
Vue.use(ModalPlugin)