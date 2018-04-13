<template lang="html">
  <div class="answer-panel">
    <div class="answer-list-info clearfix">
      <p class="answer-number f-l">几个回答</p>
      <a href="#" class="sorting-answer f-r">默认排序</a>
    </div>
    <div class="answer-list">
      <ul class="answer-list-ul">
        <li class="answer-item" v-for="(answer, index) in answerList">
          <a href="#" class="answerer-avatar f-l"></a>
          <a href="#" class="answerer-name">{{answer.answererName}}</a>
          <p class="answerer-info clearfix">{{answer.answererInfo}}</p>
          <p class="upvote-info">{{answer.upvoteNumber}}人赞同了该回答</p>
          <div class="answer-content">
            {{answer.answerContent}}
          </div>
          <p class="edit-time"></p>
          <div class="btns">
            <ul class="clearfix">
              <li class="f-l">
                <a href="#" class="upvote">赞同</a>
              </li>
              <li class="f-l">
                <a href="#" class="downvote">反对</a>
              </li>
              <li class="f-l" v-if="!answer.isCommentShown">
                <a v-on:click="showComment(answer, index)" class="comments">几条评论</a>
              </li>
              <li class="f-l" v-if="answer.isCommentShown">
                <a v-on:click="showComment(answer, index)" class="comments">收起评论</a>
              </li>
              <li class="f-l">
                <a href="#" class="share">分享</a>
              </li>
              <li class="f-l">
                <a href="#" class="fav">收藏</a>
              </li>
              <li class="f-l">
                <a href="#" class="thank">感谢</a>
              </li>
              <li class="f-r">
                <a href="#" class="foldup">收起</a>
              </li>
            </ul>
          </div>
          <comments2 style="display:none;"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Comments2 from '../components/Comments2.vue'

export default {
  components: {
    'comments2': Comments2
  },
  data() {
    return {
      comments: [],
      answerList: [
        {
          answererName: '回答者名字',
          answererInfo: '回答者信息',
          upvoteNumber: 666,
          answerContent: '回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容。',
          isCommentShown: false
        },
        {
          answererName: '回答者名字',
          answererInfo: '回答者信息',
          upvoteNumber: 666,
          answerContent: '回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容。',
          isCommentShown: false
        },
        {
          answererName: '回答者名字',
          answererInfo: '回答者信息',
          upvoteNumber: 666,
          answerContent: '回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容。',
          isCommentShown: false
        },
        {
          answererName: '回答者名字',
          answererInfo: '回答者信息',
          upvoteNumber: 666,
          answerContent: '回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容。',
          isCommentShown: false
        },
        {
          answererName: '回答者名字',
          answererInfo: '回答者信息',
          upvoteNumber: 666,
          answerContent: '回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容，回答的具体内容。',
          isCommentShown: false
        }
      ]
    }
  },
  methods: {
    initAnswerList() {
      this.answerList.forEach((answer) => {
        if (answer.isCommentShown === undefined) {
          answer.isCommentShown = false
        }
      })
      this.comments = document.querySelectorAll('.comments-wrapper')
    },
    showComment(answer, index) {
      if (answer.isCommentShown) {
        this.comments[index].style.display = 'none'
        answer.isCommentShown = false
      } else {
        this.comments[index].style.display = 'block'
        answer.isCommentShown = true
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initAnswerList()
    })
  }
}
</script>

<style lang="scss" scoped>
  .answer-panel {
    min-height: 500px;
    background: #fff;
    margin: 10px;
    padding: 20px;
    box-shadow: 0 0 5px #ccc;
    .answer-list-info {
      padding: 0 0 15px 0;
      .answer-number {
        // margin: 10px 0;
        font-weight: 700;
      }
      .sorting-answer {
        // margin: 10px 0;
        color: #999;
      }
    }
    .answer-list {
      .answer-item {
        border-top: 1px solid #eee;
        padding: 20px 0;
      }
      .answerer-avatar {
        width: 40px;
        height: 40px;
        background: #ccc;
        margin: 5px 5px 5px 0;
      }
      .answerer-name {
        // margin-top: 5px;
        color: #000;
      }
      .answerer-info {
        // margin: 0 10px;
        color: #666;
      }
      .upvote-info {
        color: #999;
      }
      .answer-content {
        margin: 10px 0;
      }
      .btns {
        a {
          margin: 0 2px;
          padding: 5px 10px;
          color: #999;
        }
        .upvote, .downvote {
          background: #eef;
          color: #06c;
          border-radius: 3px;
        }
      }
    }
  }
</style>
