import leancloudModule from './leancloud-module.js'

export default {
  namespaced: true,
  state: {
    loginState: false,
    currentUser: null
  },
  mutations: {
    // setLoginState(state, value) {
    //   state.loginState = value
    // },
    // setCurrentUser(state, value) {
    //   state.currentUser = value
    // }
    changeUserState(state, user) {
      if (user) {
        state.currentUser = user
        state.loginState = true
      } else {
        state.currentUser = null
        state.loginState = false
      }
    }
  },
  actions: {
    async signup({ commit }, userInput) {
      const user = await leancloudModule.signup(userInput)
      if (user) {
        // commit('setLoginState', true)
        // commit('setCurrentUser', user)
        commit('changeUserState', user)
        document.cookie = `sessionToken=${user.sessionToken};max-age=86400;path=/`
      }
    },
    async login({ commit }, userInput) {
      const user = await leancloudModule.login(userInput)
      if (user) {
        // commit('setLoginState', true)
        // commit('setCurrentUser', user)
        commit('changeUserState', user)
        document.cookie = `sessionToken=${user.sessionToken};max-age=86400;path=/`
      }
    },
    async loginWithSessionToken({ commit }, sessionToken) {
      const user = await leancloudModule.loginWithSessionToken(sessionToken)
      if (user) {
        // commit('setLoginState', true)
        // commit('setCurrentUser', user)
        commit('changeUserState', user)
      }
    },
    async logout({ commit }) {
      const user = await leancloudModule.logout()
      // commit('setLoginState', false)
      // commit('setCurrentUser', null)
      commit('changeUserState', null)
      document.cookie = `sessionToken=;max-age=0`
    }
  }
}
