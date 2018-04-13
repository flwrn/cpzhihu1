<template lang="html">
  <div class="question-page-header">
    <div class="header1 center clearfix" v-bind:style="style.header1">
      <div class="logo f-l">
        <h1>知乎</h1>
      </div>
      <nav class="nav f-l">
        <ul class="clearfix">
          <li class="f-l"><a href="#" class="home">首页</a></li>
          <li class="f-l"><a href="#" class="topic">话题</a></li>
          <li class="f-l"><a href="#" class="explore">发现</a></li>
        </ul>
      </nav>
      <div class="search f-l clearfix" v-bind:style="style.search">
        <input type="text"
          class="f-l"
          v-bind:style="style.searchInput"
          v-on:focus="onfocus"
          v-on:blur="onblur"
          placeholder="搜索你感兴趣的内容..."
        >
        <a href="#" class="search-btn f-r" v-bind:style="style.searchBtn">搜索</a>
      </div>
      <div class="btns f-r">
        <ul class="clearfix">
          <li class="f-l"><a href="#" class="login">登录</a></li>
          <li class="f-l"><a href="#" class="signup">加入知乎</a></li>
        </ul>
      </div>
    </div>
    <div class="header2 center clearfix" v-bind:style="style.header2">
      <h2 class="question-title f-l">问问题</h2>
      <div class="btns f-r">
        <ul class="clearfix">
          <li class="f-l"><a href="#" class="follow">关注问题</a></li>
          <li class="f-l"><a href="#" class="write-answer">写回答</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      style: {
        search: {
          background: '#eee',
          border: '1px solid #ddd'
        },
        searchInput: {
          width: '250px'
        },
        searchBtn: {
          color: '#666'
        },
        header1: {
          transform: ''
        },
        header2: {
          transform: ''
        }
      },
      questionPanel: {
        el: null,
        seen: true,
        lastBottom: 0,
        currentBottom: 0
      }
    }
  },
  methods: {
    onfocus() {
      this.style.search.background = '#fff'
      this.style.search.border = '1px solid #999'
      this.style.searchInput.width = '300px'
      this.style.searchBtn.color = '#06f'
    },
    onblur() {
      this.style.search.background = '#eee'
      this.style.search.border = '1px solid #ddd'
      this.style.searchInput.width = '250px'
      this.style.searchBtn.color = '#666'
    },
    onscroll() {
      this.questionPanel.currentBottom = this.questionPanel.el.getBoundingClientRect().bottom
      if ((this.questionPanel.currentBottom > 46) !== this.questionPanel.seen) {
        this.questionPanel.seen = (this.questionPanel.currentBottom > 46)
        if (this.questionPanel.seen) {
          this.style.header1.transform = ''
          this.style.header2.transform = ''
        } else {
          this.style.header1.transform = 'translateY(-100%)'
          this.style.header2.transform = 'translateY(-100%)'
        }
      }
      if (this.questionPanel.currentBottom - this.questionPanel.lastBottom < -50) {
        this.questionPanel.lastBottom = this.questionPanel.currentBottom + 50
        if (!this.questionPanel.seen) {
          this.style.header1.transform = 'translateY(-100%)'
          this.style.header2.transform = 'translateY(-100%)'
        }
      }
      if (this.questionPanel.currentBottom - this.questionPanel.lastBottom > 50) {
        this.questionPanel.lastBottom = this.questionPanel.currentBottom - 50
        if (!this.questionPanel.seen) {
          this.style.header1.transform = ''
          this.style.header2.transform = ''
        }
      }

      // console.log('onscroll')
      // console.log(this.questionPanel.currentBottom)
      // console.log(this.questionPanel.lastBottom)
      // if (this.style.header1.transform &&
      //   questionPanel.getBoundingClientRect().bottom <= 46
      // ) {
      //   console.log(true)
      //   this.style.header1.transform = ''
      //   this.style.header2.transform = ''
      // } else {
      //   this.style.header1.transform = 'translateY(-100%)'
      //   this.style.header2.transform = 'translateY(-100%)'
      // }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.questionPanel.el = document.querySelector('.question-panel')
      this.questionPanel.currentBottom = this.questionPanel.el.getBoundingClientRect().bottom
      this.questionPanel.lastBottom = this.questionPanel.currentBottom
      document.addEventListener('scroll', () => {
        this.onscroll()
      })
    })
  }
}

</script>

<style lang="scss" scoped>
  .question-page-header {
    background: #fff;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    height: 46px;
    box-shadow: 0 0 3px #ccc;
    overflow: hidden;
    .header1 {
      transition: transform .2s;
      .logo {
        height: 46px;
        line-height: 46px;
        margin: 0 10px;
        color: #06f;
      }
      .nav {
        height: 34px;
        margin: 6px 0;
        line-height: 34px;
        a {
          padding: 0 20px;
          // background: #ccc;
          text-align: center;
          color: #999;
          &:hover {
            color: #039;
          }
        }
      }
      .search {
        height: 34px;
        margin: 6px 0;
        background: #eee;
        border: 1px solid #ddd;
        border-radius: 3px;
        transition: all .2s;
        input {
          height: 32px;
          line-height: 32px;
          width: 250px;
          border: 0;
          // font-size: 15px;
          background: none;
          padding-left: 10px;
          transition: all .2s;
          &:placeholder {
            color: #999;
          }
        }
        a.search-btn {
          // height: 100%;
          height: 32px;
          line-height: 32px;
          padding: 0 10px;
          color: #666;
          transition: all .2s;
        }
      }
      .btns {
        height: 32px;
        margin: 6px 0;
        line-height: 32px;
        a {
          padding: 0 15px;
          margin: 0 10px;
          border-radius: 3px;
          &.login {
            color: #06f;
            border: 1px solid #06f;
            &:hover {
              background: #eff;
            }
          }
          &.signup {
            background: #06f;
            color: #fff;
            border: 1px solid #06f;
            &:hover {
              background: #05e;
            }
          }
        }
      }
    }
    .header2 {
      transition: transform .2s;
      .question-title {
        height: 34px;
        line-height: 34px;
        margin: 6px 20px;
      }
      .btns {
        height: 32px;
        margin: 6px 0;
        a {
          padding: 0 15px;
          margin: 0 10px;
          height: 32px;
          line-height: 32px;
          border: 1px solid #06f;
          border-radius: 3px;
          &.follow {
            color: #fff;
            background: #06f;
            &:hover {
              background: #05e;
            }
          }
          &.write-answer {
            color: #06f;
            &:hover {
              background: #eff;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .explore-header .nav {
      display: none;
    }
  }
  @media screen and (max-width: 750px) {
    .explore-header .search {
      display: none;
    }
  }
  @media screen and (max-width: 400px) {
    .explore-header .ask {
      display: none;
    }
  }
</style>
