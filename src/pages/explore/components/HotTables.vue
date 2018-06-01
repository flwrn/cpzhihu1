<template lang="html">
  <div class="hot-tables">
    <div class="title-bar">
      <h2 class="title-bar-title">热门圆桌</h2>
      <a class="title-bar-link">更多圆桌</a>
    </div>
    <div class="hot-table-list">
      <div class="hot-table-item clearfix" v-for="(item, index) of hotTables" :key="index">
        <div class="item-img fleft">
          <img src="" alt="">
        </div>
        <div class="starting-time fright">
          开始时间
        </div>
        <h3 class="item-title">
          <a class="item-title-link">圆桌标题</a>
        </h3>
        <div class="item-info">
          <span class="follower-number">关注人数</span>
          <span class="question-number">问题数</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotTables',
  data: function() {
    return {
      hotTables: [
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
.hot-tables {
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
  .hot-table-list {
    .hot-table-item {
      font-size: $middle;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
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
          font-size: $middle;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .starting-time {
        color: $gray1;
      }
      .item-info {
        color: $gray1;
        margin: 5px 0 0 50px;
        display: flex;
        .follower-number {

        }
        .question-number {
          margin-left: 3px;
        }
      }
    }
  }
}
</style>
