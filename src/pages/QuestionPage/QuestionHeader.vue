<template lang="html">
  <div class="question-header" :class="{'scroll':scroll}">
    <div class="center header1">
      <div class="fleft">
        <h1 class="logo">
          <a>知乎</a>
        </h1>
        <div class="nav-links">
          <a class="home-link">首页</a>
          <a class="explore-link">发现</a>
          <a class="topic-link">话题</a>
        </div>
        <div class="search-wrapper" :class="{'focus':isSearchInputFocused}">
          <input
            class="search-input"
            type="text"
            placeholder="搜索你感兴趣的内容"
            v-model="searchInput"
            @focus="onSearchInputFocus"
            @blur="onSearchInputBlur"
            @keydown="onSearchInputKeydown"
          >
          <a class="search-btn" @click="onSearchBtnClick">
            <i class="fas fa-search"></i>
          </a>
        </div>
        <a class="new-question-btn" @click="onNewQuestionBtnClick">提问</a>
      </div>
      <div class="fright">
        <a class="login" v-show="!loginState" @click="onLoginClick">登录</a>
        <a class="signup" v-show="!loginState" @click="onSignupClick">加入知乎</a>
        <a class="logout" v-show="loginState" @click="onLogoutClick">退出登录</a>
        <span class="current-username" v-show="loginState">{{currentUser ? currentUser.username : ''}}</span>
      </div>
    </div>
    <div class="center header2">
      <div class="fleft">
        <h1 class="header-title">{{shortenedQuestionTitle}}</h1>
      </div>
      <div class="fright">
        <a class="follow-question">关注问题</a>
        <a class="write-answer" @click="onWriteAnswerClick">
          <i class="fas fa-pencil-alt"></i>
          写回答
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'QuestionHeader',
  data() {
    return {
      isSearchInputFocused: false,
      scroll: false,
      laggingPosition: 0,
      currentPosition: 0,
      searchInput: ''
    }
  },
  computed: {
    ...mapState('user', {
      loginState: 'loginState',
      currentUser: 'currentUser'
    }),
    ...mapState('questionPage', {
      currentQuestion: 'currentQuestion'
    }),
    shortenedQuestionTitle() {
      if (this.currentQuestion.title.length >= 30) {
        return this.currentQuestion.title.slice(0, 30) + '...'
      } else {
        return this.currentQuestion.title
      }
    }
  },
  methods: {
    ...mapMutations('questionPage', {
      // setIsAnswerBoxDisplayed: 'setIsAnswerBoxDisplayed'
      changeAnswerBoxState: 'changeAnswerBoxState'
    }),
    ...mapMutations('popup', {
      // setCurrentPopup: 'setCurrentPopup',
      // setIsPopupDisplayed: 'setIsPopupDisplayed'
      changePopupState: 'changePopupState'
    }),
    ...mapActions('user', {
      logout: 'logout'
    }),
    ...mapActions('searchPage', {
      makeNewSearch: 'makeNewSearch'
    }),
    onSearchInputFocus() {
      this.isSearchInputFocused = true
    },
    onSearchInputBlur() {
      this.isSearchInputFocused = false
    },
    onSearchInputKeydown(event) {
      if (event.keyCode === 13 && this.searchInput !== '') {
        const searchUrl = `/search?q=${this.searchInput}`
        window.open(searchUrl)
      }
    },
    onScroll() {
      this.currentPosition = document.querySelector('.question-panel').getBoundingClientRect().bottom
      if (this.currentPosition - this.laggingPosition > 50) {
        this.laggingPosition = this.currentPosition - 50
      }
      if (this.laggingPosition - this.currentPosition > 50) {
        this.laggingPosition = this.currentPosition + 50
      }
      if (this.currentPosition >= 50) {
        this.scroll = false
      } else {
        if (this.laggingPosition - this.currentPosition >= 50) {
          this.scroll = true
        }
        if (this.currentPosition - this.laggingPosition >= 50) {
          this.scroll = false
        }
      }
    },
    onSearchBtnClick() {
      if (this.searchInput !== '') {
        const searchUrl = `/search?q=${this.searchInput}`
        window.open(searchUrl)
      }
    },
    onNewQuestionBtnClick() {
      // this.setCurrentPopup({
      //   type: 'NewQuestion',
      //   data: null
      // })
      // this.setIsPopupDisplayed(true)
      this.changePopupState({
        currentPopup: {
          type: 'NewQuestion',
          data: null
        },
        isPopupDisplayed: true
      })
    },
    onWriteAnswerClick() {
      if (!this.currentUser) {
        // this.setCurrentPopup({
        //   type: 'Login',
        //   data: null
        // })
        // this.setIsPopupDisplayed(true)
        this.changePopupState({
          currentPopup: {
            type: 'Login',
            data: null
          },
          isPopupDisplayed: true
        })
      } else {
        // this.setIsAnswerBoxDisplayed(true)
        this.changeAnswerBoxState(true)
        this.$nextTick(() => {
          document.querySelector('.answer-box .new-answer-input').focus()
        })
      }
    },
    onLoginClick() {
      // this.setCurrentPopup({
      //   type: 'Login',
      //   data: null
      // })
      // this.setIsPopupDisplayed(true)
      this.changePopupState({
        currentPopup: {
          type: 'Login',
          data: null
        },
        isPopupDisplayed: true
      })
    },
    onSignupClick() {
      // this.setCurrentPopup({
      //   type: 'Signup',
      //   data: null
      // })
      // this.setIsPopupDisplayed(true)
      this.changePopupState({
        currentPopup: {
          type: 'Signup',
          data: null
        },
        isPopupDisplayed: true
      })
    },
    onLogoutClick() {
      this.logout()
    }
  },
  mounted() {
    document.querySelector('div.container').addEventListener('scroll', this.onScroll)
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
a {
  display: block;
}
.question-header {
  background: #fff;
  box-shadow: 0 1px 3px #ccc;
  height: 50px;
  overflow: hidden;
  // width: 100%;
  .center {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    min-height: 50px;
    transition: all .2s;
    .fleft {
      display: flex;
      align-items: center;
      flex: 1;
      .logo {
        margin: 0 10px;
        color: $blue1;
        font-size: $px32;
      }
      .search-wrapper {
        display: flex;
        margin: 0 10px;
        border: 1px solid #ddd;
        border-radius: 3px;
        transition: all .2s;
        font-size: $px14;
        background: #f6f6f6;
        .search-input {
          width: 300px;
          height: 32px;
          padding: 0 10px;
          border: 0;
          background: none;
          color: #333;
          transition: all .2s;
        }
        .search-input::-webkit-input-placeholder {
          color: $gray1;
        }
        .search-btn {
          height: 32px;
          line-height: 32px;
          padding: 0 10px;
          transition: all .2s;
          background: none;
          color: $gray1;
          border: 0;
        }
      }
      .search-wrapper.focus {
        background: #fff;
        border: 1px solid #999;
        .search-input {
          width: 350px;
        }
        .search-btn {
          color: $blue1;
        }
      }
      .new-question-btn {
        margin-left: 5px;
        height: 32px;
        line-height: 32px;
        padding: 0 10px;
        color: #fff;
        background: $blue1;
        border: 1px solid $blue1;
        border-radius: 3px;
        font-size: $px14;
        &:hover {
          background: $blue2;
        }
      }
      .nav-links {
        display: flex;
        margin: 0 10px;
        a {
          padding: 0 10px;
          height: 32px;
          line-height: 32px;
          color: $gray1;
          font-size: $px15;
          &:hover {
            color: $darkBlue1;
          }
        }
      }
      .header-title {
        font-size: $px22;
        font-weight: 700;
      }
    }
    .fright {
      display: flex;
      align-items: center;
      color: #eee;
      max-width: 210px;
      justify-content: flex-end;
      .login, .logout, .write-answer {
        height: 32px;
        line-height: 32px;
        padding: 0 10px;
        color: $blue1;
        border: 1px solid $blue1;
        border-radius: 3px;
        margin-left: 15px;
        font-size: $px14;
        &:hover {
          background: $lightBlue1;
        }
      }
      .signup, .follow-question {
        margin-left: 15px;
        height: 32px;
        line-height: 32px;
        padding: 0 10px;
        color: #fff;
        background: $blue1;
        border: 1px solid $blue1;
        border-radius: 3px;
        font-size: $px14;
        &:hover {
          background: $blue2;
        }
      }
      .current-username {
        color: #333;
        padding: 0 10px;
        font-size: $px14;
      }
    }
  }
}

.question-header.scroll {
  .center {
    transform: translateY(-100%);
  }
}

@media screen and (max-width: 1024px) {
  .question-header {
    .center {
      padding: 0 10px;
      .fleft {
        .header-title {
          font-size: $px18;
        }
        .nav-links {
          display: none;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .question-header {
    .center {
      .fleft {
        width: 100%;
        .logo {
          display: none;
        }
        .search-wrapper, .search-wrapper.focus {
          width: 100%;
          .search-input {
            width: 100%;
          }
        }
        .new-question-btn {
          display: none;
        }
      }
      .fright {
        .login {
          display: none;
        }
        .signup {
          display: none;
        }
        .follow-question {
          display: none;
        }
        .write-answer {
          display: none;
        }
      }
    }
  }
}

@media screen and (max-width: 540px) {
  .question-header {
    .center {
      .fleft {
        .header-title {
          font-size: $px14;
        }
      }
    }
  }
}

</style>
