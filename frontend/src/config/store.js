import { createStore } from 'vuex'

const store = createStore({
    state: {
        isMenuVisible: true
    },
    mutations: {
        toogleMenu(state, isVisible) {
            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            }else {
                state.isMenuVisible = isVisible
            }
        }
    }
  })

  export {store}