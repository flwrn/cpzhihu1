<template lang="html">
  <div class="related-recommend" :style="styleObj">
    <h2 class="title">相关推荐</h2>
    <ul class="recommend-list">
      <li class="recommend-item" v-for="(item, index) of recommendList" :key="index">
        <a class="item-link clearfix">
          <div class="item-img fleft">
            <img src="" alt="">
          </div>
          <p class="item-title">
            相关推荐的标题
          </p>
          <div class="item-info">
            相关推荐的内容
          </div>
        </a>

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RelatedRecommend',
  data() {
    return {
      recommendList: [
        {},
        {},
        {}
      ],
      styleObj: {
        // position: '',
        // top: '',
        // left: ''
      }
    }
  },
  methods: {
    onscroll() {
      const bottom = document.querySelector('.related-questions').getBoundingClientRect().bottom
      if (bottom <= 50) {
        this.styleObj.position = 'fixed'
      } else {
        this.styleObj.position = ''
      }
    },
    setLeft() {
      this.styleObj.left = (document.querySelector('.related-questions').getBoundingClientRect().left-10)+'px'
      this.onscroll()
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/layout.scss';
a {
  display: block;
}
.related-recommend {
  background: #fff;
  margin: 10px 0 0 10px;
  box-shadow: 0 1px 3px #ccc;
  width: 290px;
  position: sticky;
  top: 60px;
  .title {
    font-size: 16px;
    font-weight: 700;
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  .recommend-list {
    padding: 0 15px;
    .recommend-item {
      font-size: 14px;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      .item-link {
        .item-img {
          width: 80px;
          height: 64px;
          background: #eee;
          border-radius: 5px;
        }
        .item-title {
          margin-left: 90px;
        }
        .item-info {
          margin-left: 90px;
          color: $gray1;
        }
      }
      .item-link:hover {
        .item-title {
          color: $darkBlue1;
        }
      }
    }
    .recommend-item:last-child {
      border-bottom: 0;
    }
  }
}
</style>
