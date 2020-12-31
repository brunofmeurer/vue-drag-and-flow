import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nodes: [],
    drag: false
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})