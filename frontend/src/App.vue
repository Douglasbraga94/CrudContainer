<template>
  <div id="app" :class="{ 'hide-menu': !isMenuVisible}">
    <MyHeader title="Controle de Contêiners" :hideToogle="false"/>
    <MyMenu />
    <MyContent />
    <MyFooter />
  </div>
</template>

<script>
import MyHeader from './components/tamplate/MyHeader.vue'
import MyContent from './components/tamplate/MyContent.vue'
import MyMenu from './components/tamplate/MyMenu.vue'
import MyFooter from './components/tamplate/MyFooter.vue'
import {mapState} from 'vuex'

export default {
  name: 'App',
  components: { MyHeader, MyMenu, MyContent, MyFooter  },
  computed: mapState(['isMenuVisible'])
}
</script>

<style>
*{
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#app{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50; */
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 110px 1fr;
  grid-template-areas: 
    "header header"
    "menu content"
    "menu footer";
}

body{
  margin: 0;
}

#app.hide-menu{
  grid-template-areas: 
    "header header"
    "content content"
    "footer footer";
}


</style>
