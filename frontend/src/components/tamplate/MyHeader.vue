<template>
    <header class="header">
        <a class="toogle" @click="toogleMenu()" v-if="!hideToogle">
            <i class="fa fa-lg" :class="icon"></i>
        </a>
        <h1 class="title"> {{title}}</h1>
    </header>
</template>

<script>
export default {
    name: 'MyHeader',
    props: {
        title: String,
        hideToogle: Boolean
    },
    computed: {
        icon(){
            return this.$store.state.isMenuVisible ?  "fa-angle-left" :  "fa-angle-down"
        }
    },
    methods: {
        toogleMenu() {
            this.$store.commit('toogleMenu')
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to right, #140f46, rgb(76, 82, 136));
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title{
        font-size: 1.2rem;
        color: white;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .title a {
        color: white;
        text-decoration: none;
    }

    header.header > a.toogle{
        width: 60px;
        height: 100%;
        color: white;
        justify-self: flex-start;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toogle:hover{
        background-color: rgba(0, 0, 0, 0.2);
    }
    
</style>