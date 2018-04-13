<template lang="html">
  <div class="explore-page-header">
    <div class="center clearfix">
      <div class="logo f-l">
        <h1>知乎</h1>
      </div>
      <div class="search f-l clearfix">
        <input type="text" class="f-l" placeholder="搜索你感兴趣的内容...">
        <a class="search-btn f-r">搜索</a>
      </div>
      <nav class="nav f-l">
        <ul class="clearfix">
          <li class="f-l"><a class="home">首页</a></li>
          <li class="f-l"><a class="topic">话题</a></li>
          <li class="f-l"><a class="explore">发现</a></li>
        </ul>
      </nav>
      <div class="btns f-r">
        <ul class="clearfix">
          <li class="f-l"><a class="ask">提问</a></li>
          <li class="f-l"><a class="signup">注册知乎</a></li>
          <li class="f-l"><a class="login">登录</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .explore-page-header {
    // background: #06c;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(#06c, #05b);
    height: 46px;
    color: #000;
    box-shadow: 0 0 3px #000;
    .logo {
      height: 46px;
      line-height: 46px;
      margin: 0 10px;
      color: #eee;
    }
    .search, .nav, .btns {
      height: 34px;
      margin: 6px 0;
      a {
        color: #eee;
        height: 34px;
        line-height: 34px;
        text-align: center;
        padding: 0 20px;
        &:hover {
          color: #fff;
        }
      }
    }
    input {
      width: 300px;
      height: 34px;
      // border: 0;
      border: 1px solid #05b;
      border-radius: 2px 0 0 2px;
      background: #ddf;
      padding: 10px;
      transition: background 0.2s;
      &:focus {
        background: #fff;
      }
    }
    .search {
      border: none;
      border-radius: 2px;
      // border: 1px solid #05b;
    }
    a.search-btn {
      border-radius: 0 2px 2px 0;
      background: #07e;
    }
    a.ask {
      border-radius: 2px;
      // width: 60px;
      border: 1px solid #05b;
      background: #07e;
    }
  }

  @media screen and (max-width: 1000px) {
    .explore-page-header .nav {
      display: none;
    }
  }
  @media screen and (max-width: 750px) {
    .explore-page-header .search {
      display: none;
    }
  }
  @media screen and (max-width: 400px) {
    .explore-page-header .ask {
      display: none;
    }
  }
</style>
