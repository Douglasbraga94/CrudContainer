<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="links"><router-link to="/"><i class="fa fa-bar-chart"></i>Relatório</router-link></div>
        <div class="links"><router-link to="/conteiner"><i class="fa fa-ship"></i>Contêiners</router-link></div>
        <div class="links"><router-link to="/movimentacoes"><i class="fa fa-file-text-o"></i>Movimentações</router-link></div>
    </aside>
</template>

<script>
import { mapState} from 'vuex'

export default {
    name: 'MyMenu',
    computed: mapState(['isMenuVisible'])
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #140f46, #1b1657);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        font-size: 14px;
    }

    .links a{
        display:flex; 
        flex-direction: column;
        justify-content: center;
        text-align: center;
        flex-grow: 1;
        color: white;
        height: 120px;
        text-decoration: none;
        padding-top: 20px;
    }

    .links:hover{
        cursor: pointer;
        background-color: #1b1657;
    }

    .links a:hover{
        color: white;
        text-decoration: none;
    }

    .links i{
        font-size: 20px;
    }

    
</style>