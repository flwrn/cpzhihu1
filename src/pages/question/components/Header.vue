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
        <div class="search-wrapper" :class="{'focus':isSearchFocused}">
          <input
            class="search-input"
            type="text"
            placeholder="搜索你感兴趣的内容"
            @focus="onfocus"
            @blur="onblur"
          >
          <a class="search-btn">
            <i class="fas fa-search"></i>
          </a>
        </div>
        <a class="new-question-btn" @click="newQuestion">提问</a>
      </div>
      <div class="fright">
        <a class="login" @click="loginPage">登录</a>
        <a class="signup">加入知乎</a>
      </div>
    </div>
    <div class="center header2">
      <div class="fleft">
        <h1 class="header-title">{{questionTitle}}</h1>
      </div>
      <div class="fright">
        <a class="follow-question">关注问题</a>
        <a class="write-answer">
          <i class="fas fa-pencil-alt"></i>
          写回答
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionHeader',
  // props: {
  //   questionTitle: String
  // },
  data() {
    return {
      isSearchFocused: false,
      scroll: false,
      quesitonPanel: null,
      laggingPosition: 0,
      currentPosition: 0
    }
  },
  computed: {
    questionTitle() {
      return this.$store.state.questionItem.title
    },
    loggedIn() {
      return this.$store.state.loggedIn
    }
  },
  methods: {
    onfocus() {
      this.isSearchFocused = true
    },
    onblur() {
      this.isSearchFocused = false
    },
    onscroll() {
      this.currentPosition = this.questionPanel.getBoundingClientRect().bottom
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
    newQuestion() {
      // console.log('newQuestion')
      this.$store.commit('toggleNewQuestion', true)
    },
    loginPage() {
      this.$store.commit('toggleLoginPage', true)
    }
  },
  mounted() {
    document.querySelector('div.container').addEventListener('scroll', this.onscroll)
    this.questionPanel = document.querySelector('.question-panel')
  }
}
</script>

<style lang="scss" scoped>
@import '../../../css/variables.scss';
a {
  display: block;
}
.question-header {
  background: #fff;
  box-shadow: 0 1px 3px #ccc;
  font-size: $large;
  height: 50px;
  overflow: hidden;
  width: 100%;
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
      .logo {
        margin: 0 10px;
        color: $blue1;
        font-size: 32px;
      }
      .search-wrapper {
        display: flex;
        margin: 0 10px;
        border: 1px solid #ddd;
        border-radius: 3px;
        transition: all .2s;
        background: #eee;
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
          font-size: 15px;
          &:hover {
            color: $darkBlue1;
          }
        }
      }
      .header-title {
        font-size: 22px;
        font-weight: 600;
      }
    }
    .fright {
      display: flex;
      align-items: center;
      color: #eee;
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
      .login, .write-answer {
        height: 32px;
        line-height: 32px;
        padding: 0 10px;
        color: $blue1;
        border: 1px solid $blue1;
        border-radius: 3px;
        margin-left: 15px;
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
        &:hover {
          background: $blue2;
        }
      }
    }
  }
}
.question-header.scroll {
  .center {
    transform: translateY(-100%);
  }
}
</style>
