<template lang="html">
  <div class="related-recommendation-panel">
    <p class="related-recommendation-panel-info">相关推荐</p>
    <div class="related-recommendation-list">
      <ul>
        <li v-for="(item, index) in recommendationList">
          <a href="#" class="recommendation-item clearfix" v-on:mouseenter="onmouseenter(item, index)" v-on:mouseleave="onmouseleave(item, index)">
            <div class="recommendation-pic f-l"></div>
            <p class="recommendation-title" v-bind:class="{'hover': item.hover}">{{item.title}}</p>
            <p class="recommendation-author">{{item.author}}</p>
            <p class="recommendation-info f-l">{{item.info}}</p>
            <a class="btn f-r">试听</a>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommendationList: [
        {
          title: '标题',
          author: '作者',
          info: '信息',
          hover: false
        },
        {
          title: '标题',
          author: '作者',
          info: '信息',
          hover: false
        }
      ]
    }
  },
  methods: {
    onmouseenter(item, index) {
      item.hover = true
    },
    onmouseleave(item, index) {
      item.hover = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .related-recommendation-panel {
    // min-height: 200px;
    margin: 10px;
    background: #fff;
    box-shadow: 0 0 5px #ccc;
    .related-recommendation-panel-info {
      font-weight: 700;
      padding: 15px;
      border-bottom: 1px solid #eee;
    }
    .related-recommendation-list {
      padding: 15px;
      .recommendation-pic {
        background: #ccc;
        width: 80px;
        height: 60px;
        margin: 5px 5px 5px 0;
        border-radius: 5px;
      }
      .recommendation-title {
        font-weight: 700;
        color: #000;
      }
      .recommendation-title.hover {
        color: #246;
      }
      .recommendation-author {
        color: #666;
      }
      .recommendation-info {
        color: #999;
      }
      .btn {
        padding: 0 5px;
        background: #fe3;
        color: #963;
        border-radius: 3px;
        text-align: center;
      }
      .recommendation-item {
        padding: 5px 0;
      }
      li {
        border-bottom: 1px solid #eee;
      }
      li:last-child {
        border-bottom: 0;
      }
    }
  }
</style>
