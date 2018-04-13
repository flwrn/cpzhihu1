<template lang="html">
  <div class="question-panel">
    <div class="center clearfix">
      <div class="col-l f-l">
        <div class="tags">
          <ul class="clearfix">
            <li class="f-l" v-for="tag in tags"><a>{{tag.tagName}}</a></li>
          </ul>
        </div>
        <div class="question">
          <h2 class="question-title">问问题</h2>
          <p class="question-detail">问题的具体内容</p>
        </div>
        <div class="btns">
          <ul class="clearfix">
            <li class="f-l"><a class="follow">关注问题</a></li>
            <li class="f-l"><a class="write-answer">写回答</a></li>
            <li class="f-l"><a class="add-comment">添加评论</a></li>
            <li class="f-l"><a class="share">分享</a></li>
            <li class="f-l"><a class="invite">邀请回答</a></li>
          </ul>
        </div>

      </div>
      <div class="col-s f-r clearfix">
        <div class="info clearfix f-r">
          <div class="f-l">
            <p class="info-tag">关注者</p>
            <p class="number">{{'233'}}</p>
          </div>
          <div class="f-l viewed-info">
            <p class="info-tag">被浏览</p>
            <p class="number">{{'666'}}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        {
          tagName: '标签',
          url: ''
        },
        {
          tagName: '标签',
          url: ''
        },
        {
          tagName: '标签',
          url: ''
        },
        {
          tagName: '标签',
          url: ''
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .question-panel {
    background: #fff;
    box-shadow: 0 0 5px #ccc;
    // border: 1px solid #000;
    .tags {
      margin: 10px;
      a {
        margin: 0 3px;
        padding: 3px 10px;
        background: #eeeeff;
        color: #06f;
        // border: 1px solid #06f;
        border-radius: 15px;
        &:hover {
          background: #e0e0f0;
        }
      }
    }
    .question {
      margin: 10px 12px;
      .question-title {
        margin: 10px 0;
      }
      .question-detail {
        margin: 10px 0;
      }
    }
    .btns {
      margin: 10px;
      a {
        // margin: 0 3px;
        padding: 5px 15px;
        border: 1px solid #fff;
        border-radius: 3px;
        &.follow {
          border: 1px solid #06f;
          background: #06f;
          color: #fff;
          margin-right: 15px;
        }
        &.write-answer {
          border: 1px solid #06f;
          margin-right: 5px;
        }
      }
    }
    .info {
      margin: 10px;
      p {
        text-align: center;
        margin: 0 10px;
      }
      div {
        padding: 0 10px;
      }
      div:first-child {
        border-right: 1px solid #ccc;
      }
      .info-tag {
        color: #999;
      }
      .number {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
</style>
