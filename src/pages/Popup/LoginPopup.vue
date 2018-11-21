<template lang="html">
  <div class="login-popup">
    <div class="login-upper">
      <h1 class="login-title">登录</h1>
      <form class="login-form" @submit="onSubmit">
        <div class="email-input-wrapper">
          <input class="email-input" type="text" name="email" placeholder="邮箱" v-model="loginInput.email">
        </div>
        <div class="password-input-wrapper">
          <input class="password-input" type="password" name="password" placeholder="密码" v-model="loginInput.password">
        </div>
        <input class="login-btn" type="submit" value="登录">
      </form>
    </div>
    <div class="bottom-bar">
      切换到&nbsp;
      <a class="switch-to-signup" @click="onSwitchToSignupClick">注册</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'LoginPopup',
  data() {
    return {
      loginInput: {
        email: '',
        password: ''
      },
      sessionToken: ''
    }
  },
  computed: {
    ...mapState('user', {
      loginState: 'loginState'
    })
  },
  methods: {
    ...mapMutations('popup', {
      // setCurrentPopup: 'setCurrentPopup',
      // setIsPopupDisplayed: 'setIsPopupDisplayed'
      changePopupState: 'changePopupState'
    }),
    ...mapActions('user', {
      login: 'login'
    }),
    onSubmit(event) {
      event.preventDefault()
      this.login(this.loginInput).then(() => {
        if (this.loginState) {
          // this.setIsPopupDisplayed(false)
          this.changePopupState({
            isPopupDisplayed: false
          })
        }
      })
    },
    onSwitchToSignupClick() {
      // this.setCurrentPopup({
      //   type: 'Signup',
      //   data: null
      // })
      this.changePopupState({
        currentPopup: {
          type: 'Signup',
          data: null
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/layout.scss';
input {
  border: 0;
}
.login-popup {
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  // border-radius: 3px;
  .login-upper {
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    padding: 20px 50px 50px 50px;
    border-radius: 3px 3px 0 0;
    .login-title {
      padding-top: 50px;
      font-size: 40px;
      color: $blue2;
    }
    .login-form {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .email-input-wrapper {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        .email-input {
          width: 100%;
          font-size: 16px;
        }
      }
      .password-input-wrapper {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        .password-input {
          width: 100%;
          font-size: 16px;
        }
      }
      .login-btn {
        width: 100%;
        height: 40px;
        background: $blue1;
        border: 0;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        border-radius: 3px;
      }
      .login-btn:hover {
        background: $blue2;
      }
    }
  }
  .bottom-bar {
    height: 50px;
    padding: 10px;
    background: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    border-radius: 0 0 3px 3px;
    .switch-to-signup {
      color: $darkBlue1;
    }
  }
}
</style>
