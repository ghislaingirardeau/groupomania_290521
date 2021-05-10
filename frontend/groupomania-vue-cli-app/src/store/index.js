import { createStore } from 'vuex'

export default createStore({
  state: {
    token: 'null'
  },
  mutations: {
    TOKEN_AUTHORIZATION (state, playload) {
      state.token = playload
    }
  },
  actions: {
  },
  modules: {
  }
})
