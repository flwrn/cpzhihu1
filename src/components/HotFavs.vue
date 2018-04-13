<template lang="html">
  <div class="hot-favs">
    <div class="header clearfix">
      <h4 class="f-l">热门收藏</h4>
      <a href="#" class="f-r">换一换</a>
    </div>
    <div class="fav-list">
      <ul>
        <li class="clearfix" v-for="fav in hotFavs">
          <!-- <a href="#" class="avatar f-l"></a> -->
          <a href="#" class="name">{{fav.favName}}</a>
          <p class="info">{{fav.followerNumber}}个人关注，{{fav.content}}条内容</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotFavs: [
        {
          favName: '收藏夹名字',
          followerNumber: 666,
          content: 233
        },
        {
          favName: '收藏夹名字',
          followerNumber: 666,
          content: 233
        },
        {
          favName: '收藏夹名字',
          followerNumber: 666,
          content: 233
        },
        {
          favName: '收藏夹名字',
          followerNumber: 666,
          content: 233
        },
        {
          favName: '收藏夹名字',
          followerNumber: 666,
          content: 233
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .hot-favs {
    margin: 10px;
    // width: 100%;
    // box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    .header {
      a {
        color: #999;
      }
    }
    .fav-list {
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
        .info {
          color: #999;
        }
      }
    }
  }
</style>
