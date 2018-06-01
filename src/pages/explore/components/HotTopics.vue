<template lang="html">
  <div class="hot-topics">
    <div class="title-bar">
      <h2 class="title-bar-title">热门话题</h2>
      <a class="title-bar-link">更多话题</a>
    </div>
    <div class="hot-topic-list">
      <div class="hot-topic-item clearfix" v-for="(item, index) of hotTopics" :key="index">
        <div class="item-img fleft">
          <img src="" alt="">
        </div>
        <h3 class="item-title">
          <a class="item-title-link">话题的标题</a>
        </h3>
        <div class="item-info">
          <span class="follower-number">关注人数</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotTopics',
  data: function() {
    return {
      hotTopics: [
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
.hot-topics {
  .title-bar {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    .title-bar-title {
      font-size: $large;
      color: #666;
      font-weight: 700;
    }
    .title-bar-link {
      font-size: $small;
      color: $gray1;
    }
  }
  .hot-topic-list {
    .hot-topic-item {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      font-size: $middle;
      .item-img {
        width: 40px;
        height: 40px;
        background: #ccc;
        border-radius: 5px;
      }
      .item-title {
        margin-left: 50px;
        .item-title-link {
          color: $blue3;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .item-info {
        margin: 5px 0 0 50px;
        color: $gray1;
      }
    }
  }
}
</style>
