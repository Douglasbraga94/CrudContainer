import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../components/home/Myhome'
import Container from '../components/container/Mycontainer'
import Movimentacoes from '../components/movimentacoes/MyMovimentacoes'

const routes = [{
    name:'home',
    path: '/',
    component: Home
},
{
    name:'container',
    path: '/conteiner',
    component: Container
},{
    name:'movimentacoes',
    path: '/movimentacoes',
    component: Movimentacoes
},]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })

  export default router 