<template lang="html">
  <div class="modal loginPage" :class="{shown:loginPage}">
    <div class="modal-background">
      <div class="modal-box">
        <form class="login-form" action="http://localhost:4000/login" method="post">
          <h2>登录</h2>
        </form>
      </div>
      <a class="close-login-page" @click="closeLoginPage">
        <i class="fas fa-times"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    loginPage() {
      return this.$store.state.loginPage
    }
  },
  methods: {
    closeLoginPage() {
      this.$store.commit('toggleLoginPage', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../css/variables.scss';
@import '../../../css/layout.scss';
// Transition style
.modal {
  visibility: hidden;
  transition: visibility .3s .3s;
  .modal-background {
    opacity: 0;
    transition: opacity .3s;
    .modal-box, .close-login-page {
      transform: translateY(50px);
      transition: transform .3s;
    }
  }
}
.modal.shown {
  visibility: visible;
  transition: visibility .3s;
  .modal-background {
    opacity: 1;
    .modal-box, .close-login-page {
      transform: translateY(0);
    }
  }
}


.modal {
  .modal-background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    background: rgba(0, 0, 0, .6);
    display: flex;
    justify-content: center;
    align-items: center;
    .modal-box {
      background: #fff;
      width: 700px;
      max-height: calc(100% - 40px);
      margin: 20px 0;
      border-radius: 3px;
      overflow: auto;

      form.new-question-form {
        padding: 30px;
        h2 {
          font-size: 30px;
          text-align: center;
        }
        span.subtitle {
          color: $gray1;
          text-align: center;
          display: block;
        }
        .question-title-wrapper, .question-keywords-wrapper, .question-detail-wrapper {
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 3px;
          textarea {
            border: 0;
            background: none;
            width: 100%;
            height: 100%;
            display: block;
            resize: none;
            outline: none;
            padding: 10px;
            font-size: 16px;
          }
          textarea::-webkit-input-placeholder {
            color: $gray1;
          }
        }
        // textarea.question-title, textarea.keywords, textarea.question-detail {
        //   margin-top: 30px;
        //   border: 1px solid #ddd;
        //   border-radius: 3px;
        // }
        .anonymous-label {
          color: $gray1;
        }
        input.sumbit-btn {
          margin: 0 auto;
          display: block;
          width: 300px;
          height: 36px;
          background: $blue1;
          color: #fff;
          cursor: pointer;
          border: 0;
          border-radius: 3px;
          &:hover {
            background: $blue2;
          }
        }
      }
    }
    .close-login-page {
      position: absolute;
      color: #fff;
      font-size: 20px;
      // margin-left: 700px;
      top: calc((100% - 500px) / 2 + 10px);
      // right: 1000px;
      right: calc((100% - 700px) / 2 - 30px);
      // right: calc((100% - 700px) / 2);
      // margin-left: 370px;
    }
  }
}
</style>
