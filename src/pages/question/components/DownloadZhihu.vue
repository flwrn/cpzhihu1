<template lang="html">
  <div class="download-zhihu">
    <a class="clearfix">
      <div class="qrcode fleft">
        <img src="" alt="">
      </div>
      <h2>下载知乎客户端</h2>
      <span>与世界分享知识、经验和见解</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'DownloadZhihu'
}
</script>

<style lang="scss" scoped>
@import '../../../css/layout.scss';
.download-zhihu {
  background: #fff;
  margin-left: 10px;
  box-shadow: 0 1px 3px #ccc;
  a {
    display: block;
    height: 70px;
    padding: 10px;
    color: #333;
    .qrcode {
      background: #ccc;
      width: 50px;
      height: 50px;
    }
    h2 {
      font-size: 16px;
      font-weight: 700;
      margin-left: 60px;
      height: 25px;
      line-height: 25px;
    }
    span {
      display: block;
      font-size: 14px;
      margin-left: 60px;
      height: 25px;
      line-height: 25px;
    }
  }
}
</style>
