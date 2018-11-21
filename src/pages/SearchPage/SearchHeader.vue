<template lang="html">
  <div class="search-header">
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
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      searchInput: '',
      isSearchInputFocused: false
    }
  },
  computed: {
    ...mapState('user', {
      currentUser: 'currentUser',
      loginState: 'loginState'
    }),
    ...mapState('searchPage', {
      isLoadingMoreQuestion: 'isLoadingMoreQuestion'
    })
  },
  methods: {
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

    // Event handlers
    onSearchInputFocus() {
      this.isSearchInputFocused = true
    },
    onSearchInputBlur() {
      this.isSearchInputFocused = false
    },
    onSearchBtnClick() {
      if (this.searchInput !== '' && !this.isLoadingMoreQuestion) {
        // this.makeNewSearch(this.searchInput)
        const searchUrl = `/search?q=${this.searchInput}`
        window.location = searchUrl
      }
    },
    onSearchInputKeydown(event) {
      if (event.keyCode === 13 && this.searchInput !== '' && !this.isLoadingMoreQuestion) {
        // this.makeNewSearch(this.searchInput)
        const searchUrl = `/search?q=${this.searchInput}`
        window.location = searchUrl
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
  created() {
    if (this.$route.query.q) {
      this.searchInput = this.$route.query.q
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
a {
  display: block;
}
.search-header {
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
      // .new-question-btn, {
      //   height: 32px;
      //   line-height: 32px;
      //   padding: 0 20px;
      //   margin: 0 20px;
      //   background: linear-gradient(#08e, #07d);
      //   border: 1px solid $darkBlue1;
      //   border-radius: 3px;
      //   color: #eee;
      // }
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

@media screen and (max-width: 1024px) {
  .search-header {
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
  .search-header {
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
      }
    }
  }
}

</style>
