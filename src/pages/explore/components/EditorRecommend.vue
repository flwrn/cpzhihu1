<template lang="html">
  <div class="editor-recommend">
    <div class="title-bar">
      <h2 class="title-bar-title">编辑推荐</h2>
      <a class="title-bar-link">更多推荐</a>
    </div>
    <div class="recommend-list">
      <div class="recommend-first-item with-pic clearfix">
        <h3 class="item-title">
          <a class="item-title-link">问题的标题</a>
        </h3>
        <a class="author-avatar fleft">
          <img src="" alt="">
        </a>
        <div class="author-info">
          <a class="author-name">回答者</a>
          <a class="author-badge">回答者的头衔</a>
          <a class="author-bio">回答者的介绍</a>
        </div>
        <div class="item-content">
          <div class="content-img fleft">

          </div>
          <p class="content-text">具体的回答内容，具体的回答内容，具体的回答内容，具体的回答内容，具体的回答内容，具体的回答内容，具体的回答内容，具体的回答内容，具体的回答内容。</p>
        </div>
      </div>
      <div class="recommend-item">
        <a class="item-title">问题的标题</a>
        <span class="item-meta">备注</span>
      </div>
      <div class="recommend-item">
        <a class="item-title">问题的标题</a>
        <span class="item-meta">备注</span>
      </div>
      <div class="recommend-item">
        <a class="item-title">问题的标题</a>
        <span class="item-meta">备注</span>
      </div>
      <div class="recommend-item">
        <a class="item-title">问题的标题</a>
        <span class="item-meta">备注</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditorRecommend'
}
</script>

<style lang="scss" scoped>
@import '../../../css/variables.scss';
@import '../../../css/layout.scss';
a, span {
  display: block;
}
.editor-recommend {
  .title-bar {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    .title-bar-title {
      color: $gray2;
      font-size: $large;
      font-weight: 400;
    }
    .title-bar-link {
      color: $gray1;
      font-size: $small;
    }
  }
  .recommend-list {
    // padding-bottom: 20px;
    .recommend-first-item {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      // position: relative;
      .item-title {
        margin: 5px 0;
        // position: absolute;
        // top: 0;
        // left: 0;
        // line-height: 30px;
        // height: 30px;
        .item-title-link {
          display: inline-block;
          color: $darkBlue1;
          font-weight: 700;
          font-size: $large;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .author-avatar {
        // position: absolute;
        width: 38px;
        height: 38px;
        margin-top: 3px;
        // top: 40px;
        // left: 0;
        background: #ccc;
        border-radius: 3px;
      }
      .author-info {
        // position: absolute;
        // top: 40px;
        // left: 50px;
        // margin: 0 0 0 50px;
        margin-left: 50px;
        display: flex;
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
      .item-content {
        // position: absolute;
        margin: 5px 0 0 50px;
        font-size: $middle;
        .content-img {
          display: none;
        }
        .content-text {
          // margin: 0 0 0 210px;
        }
      }
    }
    .recommend-first-item.with-pic {
      .item-content {
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
    .recommend-item {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      .item-title {
        font-weight: 700;
        color: $darkBlue1;
        font-size: $large;
        &:hover {
          text-decoration: underline;
        }
      }
      .item-meta {
        font-size: $middle;
        color: $gray1;
      }
    }
    .recommend-item:last-child {
      border-bottom: 0;
    }
  }
}
</style>
