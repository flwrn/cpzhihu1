<template lang="html">
  <div class="footer">
    <div class="clearfix">
      <a href="#" class="f-l">刘看山</a>
      <a href="#" class="f-l">移动应用</a>
      <a href="#" class="f-l">加入知乎</a>
      <a href="#" class="f-l">知乎协议</a>
    </div>
    <div class="clearfix">
      <a href="#" class="f-l">举报投诉</a>
      <a href="#" class="f-l">联系我们</a>
      <p class="f-l">&copy; 20xx 知乎</p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .footer {
    margin: 10px;
    // width: 100%;
    // box-sizing: border-box;
    a, p {
      color: #999;
      font-size: 14px;
      margin: 5px;
    }
  }
  @media screen and (max-width: 1000px) {
    .footer > * {
      display: inline-block;
    }
  }
</style>
