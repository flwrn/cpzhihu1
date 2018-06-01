<template lang="html">
  <div class="explore-header">
    <div class="center">
      <div class="fleft">
        <h1 class="logo">
          <a>知乎</a>
        </h1>
        <div class="search-wrapper" :class="{'focus':isSearchFocused}">
          <input
          class="search-input"
          type="text"
          placeholder="搜索你感兴趣的内容..."
          @focus="onfocus"
          @blur="onblur"
          >
          <a class="search-btn">
            <i class="fas fa-search"></i>
          </a>
        </div>
        <div class="nav-links">
          <a class="home-link">首页</a>
          <a class="topic-link">话题</a>
          <a class="explore-link">发现</a>
        </div>
      </div>
      <div class="fright">
        <a class="new-question-btn">提问</a>
        <i class="fas fa-user"></i>
        <a class="signup">注册知乎</a>
        <a class="login">登录</a>
      </div>
    </div>
  </div>
</template>

<script>
// import '@/test.scss'
import '@/css/variables.scss'
export default {
  name: 'ExploreHeader',
  data: function() {
    return {
      isSearchFocused: false
    }
  },
  methods: {
    onfocus: function() {
      this.isSearchFocused = true
    },
    onblur: function() {
      this.isSearchFocused = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../css/variables.scss';
a {
  display: block;
}
.explore-header {
  background: linear-gradient(#06c, #05b);
  // box-shadow: 0 0 5px #ccc;
  font-size: $large;
  .center {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    min-height: 50px;
    .fleft {
      display: flex;
      align-items: center;
      .logo {
        margin: 0 10px;
        color: #eee;
        font-size: 32px;
      }
      .search-wrapper {
        display: flex;
        margin: 0 10px;
        // border: 1px solid $darkBlue1;
        // border-radius: 3px;
        transition: all .2s;
        .search-input {
          width: 300px;
          height: 32px;
          padding: 0 10px;
          border: 1px solid $darkBlue1;
          border-radius: 3px 0 0 3px;
          box-shadow: 1px 1px 5px #ccc inset;
          background: #eef;
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
          background: linear-gradient(#08e, #07d);
          color: #fff;
          border-top: 1px solid $darkBlue1;
          border-bottom: 1px solid $darkBlue1;
          border-right: 1px solid $darkBlue1;
          border-radius: 0 3px 3px 0;

        }
      }
      .search-wrapper.focus {
        .search-input {
          background: #fff;
        }
      }
      .nav-links {
        display: flex;
        margin: 0 10px;
        a {
          padding: 0 10px;
          height: 50px;
          line-height: 50px;
          color: #eee;
          &:hover {
            color: #fff;
          }
        }
      }
    }
    .fright {
      display: flex;
      align-items: center;
      color: #eee;
      .new-question-btn, {
        height: 32px;
        line-height: 32px;
        padding: 0 20px;
        margin: 0 20px;
        background: linear-gradient(#08e, #07d);
        border: 1px solid $darkBlue1;
        border-radius: 3px;
        color: #eee;
      }
      .signup, .login {
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        color: #eee;
        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>
