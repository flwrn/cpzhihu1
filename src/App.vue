<template>
  <div id="app">
    <router-view/>
    <Popup>
      <CommentPopup v-if="currentPopup.type === 'QuestionComment' || currentPopup.type === 'AnswerComment'"/>
      <LoginPopup v-if="currentPopup.type === 'Login'"/>
      <SignupPopup v-if="currentPopup.type === 'Signup'"/>
    </Popup>
  </div>
</template>

<script>
import Popup from './pages/Popup.vue'
import CommentPopup from './pages/Popup/CommentPopup.vue'
import LoginPopup from './pages/Popup/LoginPopup.vue'
import SignupPopup from './pages/Popup/SignupPopup.vue'

import { mapState, mapActions } from 'vuex'
import utils from './store/utils.js'

export default {
  components: {
    Popup,
    CommentPopup,
    LoginPopup,
    SignupPopup
  },
  computed: {
    ...mapState('popup', {
      isPopupDisplayed: 'isPopupDisplayed',
      currentPopup: 'currentPopup'
    })
  },
  methods: {
    ...utils,
    ...mapActions('user', {
      loginWithSessionToken: 'loginWithSessionToken'
    }),
    checkSessionToken() {
      if (document.cookie !== '') {
        const parsedCookie = this.parseCookie(document.cookie)
        if (parsedCookie.sessionToken) {
          this.loginWithSessionToken(parsedCookie.sessionToken)
        }
      }
    }
  },
  created() {
    this.checkSessionToken()
  }
}
</script>

<style lang="scss">
</style>
