<template lang="html">
  <div class="hot-favs">
    <div class="title-bar">
      <h2 class="title-bar-title">热门收藏</h2>
      <a class="title-bar-link">换一换</a>
    </div>
    <div class="hot-fav-list">
      <div class="hot-fav-item" v-for="(item, index) of hotFavs" :key="index">
        <h3 class="item-title">
          <a class="item-title-link">收藏的标题</a>
        </h3>
        <div class="item-info">
          <span class="follower-number">关注人数</span>
          <span class="content-number">内容数</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotFavs',
  data: function() {
    return {
      hotFavs: [
        {},
        {},
        {},
        {},
        {}
      ]

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../css/variables.scss';
@import '../../../css/layout.scss';
a, span {
  display: block;
}
.hot-favs {
  .title-bar {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    .title-bar-title {
      color: #666;
      font-size: $large;
      font-weight: 700;
    }
    .title-bar-link {
      color: $gray1;
      font-size: $small;
    }
  }
  .hot-fav-list {
    .hot-fav-item {
      font-size: $middle;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      .item-title {
        .item-title-link {
          color: $blue3;
          font-size: $middle;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .item-info {
        color: $gray1;
        margin-top: 5px;
        display: flex;
        .follower-number {

        }
        .content-number {
          margin-left: 3px;
        }
      }
    }
  }
}
</style>
