<template lang="html">
  <div class="hot-questions">
    <div class="tabs">
      <a class="today-trend" :class="{'selected':displaying==='today'}" @click="display('today')">今日最热</a>
      <a class="month-trend" :class="{'selected':displaying==='month'}" @click="display('month')">本月最热</a>
    </div>
    <ul class="question-list-today" v-show="displaying==='today'">
      <li
        class="question-item clearfix"
        :class="{'with-pic':item.pic}"
        v-for="(item, index) of questionListToday"
        :key="index"
        @mouseenter="onmouseenter(item)"
        @mouseleave="onmouseleave(item)"
      >
        <h3 class="item-title">
          <a class="item-title-link">今天热门问题的标题</a>
        </h3>
        <a class="item-likes fleft">666</a>
        <div class="author-info">
          <a class="author-name">回答者</a>
          <a class="author-badge">回答者的头衔</a>
          <span class="author-bio">回答者的介绍</span>
        </div>
        <div class="brief-content clearfix" v-show="!item.expanded" @click="expand(item)">
          <div class="content-img fleft">

          </div>
          <div class="content-text">
            回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容
          </div>
        </div>
        <div class="detail-content" v-show="item.expanded">
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
        </div>
        <div class="btns">
          <a class="follow-question-btn">关注问题</a>
          <a class="comment-btn">评论</a>
          <div class="more-btns" v-show="item.hover||item.expanded">
            <a class="thank-btn">感谢</a>
            <a class="share-btn">分享</a>
            <a class="fav-btn">收藏</a>
            <a class="helpless-btn">没有帮助</a>
            <a class="report-btn">举报</a>
          </div>
          <a class="copyright-btn">回答者的版权</a>
          <a class="fold-btn" v-show="item.expanded" @click="fold(item)">收起</a>
        </div>
      </li>
    </ul>
    <ul class="question-list-month" v-show="displaying==='month'">
      <li
        class="question-item clearfix"
        :class="{'with-pic':item.pic}"
        v-for="(item, index) of questionListMonth"
        :key="index"
        @mouseenter="onmouseenter(item)"
        @mouseleave="onmouseleave(item)"
      >
        <h3 class="item-title">
          <a class="item-title-link">本月热门问题的标题</a>
        </h3>
        <a class="item-likes fleft">666</a>
        <div class="author-info">
          <a class="author-name">回答者</a>
          <a class="author-badge">回答者的头衔</a>
          <span class="author-bio">回答者的介绍</span>
        </div>
        <div class="brief-content clearfix" v-show="!item.expanded" @click="expand(item)">
          <div class="content-img fleft">

          </div>
          <div class="content-text">
            回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容
          </div>
        </div>
        <div class="detail-content" v-show="item.expanded">
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
          <p>这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容，这个是具体的内容</p>
        </div>
        <div class="btns">
          <a class="follow-question-btn">关注问题</a>
          <a class="comment-btn">评论</a>
          <div class="more-btns" v-show="item.hover||item.expanded">
            <a class="thank-btn">感谢</a>
            <a class="share-btn">分享</a>
            <a class="fav-btn">收藏</a>
            <a class="helpless-btn">没有帮助</a>
            <a class="report-btn">举报</a>
          </div>
          <a class="copyright-btn">回答者的版权</a>
          <a class="fold-btn" v-show="item.expanded" @click="fold(item)">收起</a>
        </div>
      </li>
    </ul>
    <a class="more">更多</a>
  </div>
</template>

<script>
export default {
  name: 'HotQuestions',
  data: function() {
    return {
      displaying: 'today',
      questionListToday: [
        {pic: true, hover: false, expanded: false},
        {pic: false, hover: false, expanded: false},
        {pic: true, hover: false, expanded: false},
        {pic: false, hover: false, expanded: false},
        {pic: true, hover: false, expanded: false},
        {pic: false, hover: false, expanded: false},
        {pic: true, hover: false, expanded: false},
        {pic: false, hover: false, expanded: false},
        {pic: true, hover: false, expanded: false},
        {pic: false, hover: false, expanded: false}
      ],
      questionListMonth: [
        {pic: true, hover: false, expanded: false},
        {pic: true, hover: false, expanded: false},
        {pic: true, hover: false, expanded: false},
        {pic: true, hover: false, expanded: false},
        {pic: true, hover: false, expanded: false},
        {pic: false, hover: false, expanded: false},
        {pic: false, hover: false, expanded: false},
        {pic: false, hover: false, expanded: false},
        {pic: false, hover: false, expanded: false},
        {pic: false, hover: false, expanded: false}
      ]
    }
  },
  methods: {
    display: function(which) {
      this.displaying = which
    },
    onmouseenter: function(item) {
      item.hover = true
    },
    onmouseleave: function(item) {
      item.hover = false
    },
    expand: function(item) {
      item.expanded = true
    },
    fold: function(item) {
      item.expanded = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../css/variables.scss';
@import '../../../css/layout.scss';
a {
  display: block;
}
.hot-questions {
  margin-top: 20px;
  .tabs {
    font-size: $middle;
    display: flex;
    // margin: 10px 0;
    border-bottom: 1px solid #eee;
    .today-trend {
      padding: 5px 10px;
      &:hover {
        background: #eee;
      }
    }
    .today-trend.selected {
      background: #eee;
    }
    .month-trend {
      padding: 5px 10px;
      margin-left: 5px;
      &:hover {
        background: #eee;
      }
    }
    .month-trend.selected {
      background: #eee;
    }
  }
  .question-list-today, .question-list-month {
    // margin: 10px 0;
    .question-item {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: 0;
      }
      .item-title {
        margin: 5px 0;
        .item-title-link {
          display: inline-block;
          color: $blue3;
          font-weight: 700;
          font-size: $large;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .item-likes {
        background: $lightBlue1;
        border-radius: 3px;
        color: $blue3;
        padding: 3px 5px;
        font-size: $middle;
        &:hover {
          color: #eee;
          background: $blue3;
        }
      }
      .author-info {
        display: flex;
        margin: 0 0 0 50px;
        font-size: $middle;
        .author-name {
          font-weight: 700;
        }
        .author-badge {
          margin: 0 0 0 3px;
        }
        .author-bio {
          color: $gray1;
          margin: 0 0 0 3px;
        }
      }
      .brief-content {
        margin: 5px 0 0 50px;
        cursor: pointer;
        font-size: $middle;
        .content-img {
          display: none;
        }
      }
      .detail-content {
        margin: 5px 0 0 50px;
        font-size: $middle;
      }
      .btns {
        display: flex;
        margin: 5px 0 0 50px;
        font-size: $middle;
        a {
          margin: 0 0 0 10px;
          color: $gray1;
          &:first-child {
            margin: 0;
          }
          &:hover {
            color: $blue3;
            text-decoration: underline;
          }
        }
        .more-btns {
          display: flex;
          margin-left: 10px;
        }
      }
    }
    .question-item.with-pic {
      .brief-content {
        .content-img {
          display: block;
          width: 200px;
          height: 113px;
          background: #eee;
          border-radius: 5px;
        }
        .content-text {
          margin: 0 0 0 210px;
        }
      }
    }
  }
  .more {
    margin: 50px 0;
    border: 1px solid #999;
    border-radius: 3px;
    height: 40px;
    line-height: 40px;
    font-size: $middle;
    color: #666;
    text-align: center;
    background: linear-gradient(#eee, #ddd);
    box-shadow: 0 1px 3px #ddd;
  }
}
</style>
