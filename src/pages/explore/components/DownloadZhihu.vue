<template lang="html">
  <div class="download-zhihu">
    <a class="download-zhihu-link">下载知乎 App</a>
  </div>
</template>

<script>
export default {
  name: 'DownloadZhihu'
}
</script>

<style lang="scss" scoped>
@import '../../../css/variables.scss';
a {
  display: block;
}
.download-zhihu {
  .download-zhihu-link {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: $large;
    color: $blue3;
    border: 1px solid #eee;
    border-radius: 3px;
  }
}
</style>
