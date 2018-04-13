<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  $centerWidth: 1000px;
  $largerColWidth: 600px;
  $smallerColWidth: 400px;
  $mainBlue: #09f;
  $defaultFontSize: 16px;

  * {
    // font-size: $defaultFontSize;
  }
  .center {
    max-width: 1000px;
    margin: 0 auto;
  }
  .col-l {
    max-width: 700px;
    min-width: 300px;
    width: 100%;
  }
  .col-s {
    max-width: 300px;
    // min-width: 200px;
    width: 100%;
  }
  .f-l {
    float: left;
  }
  .f-r {
    float: right;
  }
  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }

</style>
