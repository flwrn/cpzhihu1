<template lang="html">
  <div class="hot-tables">
    <div class="header clearfix">
      <h4 class="f-l">热门圆桌</h4>
      <a href="#" class="f-r">更多圆桌>></a>
    </div>
    <div class="table-list">
      <ul>
        <li class="clearfix" v-for="table in hotTables">
          <a href="#" class="avatar f-l"></a>
          <p class="remaining-days f-r">还有{{table.remainingDays}}天结束</p>
          <a href="#" class="name">{{table.tableName}}</a>
          <p class="info">{{table.followerNumber}}个人关注，{{table.questionNumber}}个问题</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotTables: [
        {
          tableName: '圆桌名字',
          remainingDays: 3,
          followerNumber: 666,
          questionNumber: 233
        },
        {
          tableName: '圆桌名字',
          remainingDays: 3,
          followerNumber: 666,
          questionNumber: 233
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .hot-tables {
    border-bottom: 1px solid #ccc;
    margin: 10px;
    // width: 100%;
    // box-sizing: border-box;
    .header {
      a {
        color: #999;
      }
    }
    .table-list {
      li {
        border-bottom: 1px solid #ccc;
        margin: 10px 0;
        padding: 10px 0;
        &:last-of-type {
          border-bottom: 0;
        }
        .avatar {
          height: 40px;
          width: 40px;
          border-radius: 2px;
          background: #999;
        }
        .name {
          color: #000;
        }
        .info, .remaining-days {
          color: #999;
        }
        .name, .info {
          margin-left: 50px;
        }
      }
    }
  }
</style>
