<template lang="html">
  <div class="top-question">
    <div class="tabs clearfix">
      <ul>
        <li><a class="top-today f-l">今日最热</a></li>
        <li><a class="top-month f-l">本月最热</a></li>
      </ul>
    </div>
    <div class="question-list">
      <ul>
        <li class="clearfix" v-for="(question, index) in vTopQuestionList.questionList" v-on:mouseenter="mouseenter(question)" v-on:mouseleave="mouseleave(question)">
          <a href="#/question" class="question"><h4>{{question.question}}</h4></a>
          <a class="likes f-l">{{question.likes}}</a>
          <div class="author">
            <a class="name"><h4>{{question.author.name}}</h4></a>
            <a class="field">{{question.author.field}}</a>
            <p class="info">{{question.author.info}}</p>
          </div>
          <p class="answer">{{question.answer}}</p>
          <div class="btns clearfix">
            <ul class="clearfix f-l">
              <li class="f-l"><a class="follow-btn">关注问题</a></li>
              <li class="f-l"><a v-on:click="showComments(question, index)" class="comments">{{question.comments}}条评论</a></li>
            </ul>
            <ul class="clearfix f-l" v-if="!(question.hover || question.showComments)">
              <li class="f-l"><a class="ask-repost">申请转载</a></li>
            </ul>
            <ul class="clearfix f-l" v-if="(question.hover || question.showComments)">
              <li class="f-l"><a class="thank">感谢</a></li>
              <li class="f-l"><a class="share">分享</a></li>
              <li class="f-l"><a class="favorite">收藏</a></li>
              <li class="f-l"><a class="helpless">没有帮助</a></li>
              <li class="f-l"><a class="">举报</a></li>
              <li class="f-l"><a class="no-repost">禁止转载</a></li>
            </ul>
          </div>
          <comments style="display:none;"></comments>
        </li>
      </ul>
    </div>
    <a class="more" v-on:click="showMoreQuestions">更多</a>
  </div>
</template>

<script>
import Comments from './Comments.vue'

export default {
  props: ['vTopQuestionList'],
  components: {
    'comments': Comments
  },
  // computed: {
  //   questionList: function() {
  //     return this.vTopQuestionList.questionList
  //   }
  // },
  data() {
    return {
      comments: [],
      questionList: this.vTopQuestionList.questionList
      // questionList: [
      //   {
      //     question: '一个问题1',
      //     likes: 6661,
      //     author: {
      //       name: '作者名字1',
      //       field: '，某某问题的优秀回答者1',
      //       info: '信息介绍1'
      //     },
      //     answer: '回答的具体内容...1',
      //     comments: 2331,
      //     hover: false
      //   },
      //   {
      //     question: '一个问题2',
      //     likes: 6662,
      //     author: {
      //       name: '作者名字2',
      //       field: '，某某问题的优秀回答者2',
      //       info: '信息介绍2'
      //     },
      //     answer: '回答的具体内容...2',
      //     comments: 2332,
      //     hover: false
      //   },
      //   {
      //     question: '一个问题3',
      //     likes: 6663,
      //     author: {
      //       name: '作者名字3',
      //       field: '，某某问题的优秀回答者3',
      //       info: '信息介绍3'
      //     },
      //     answer: '回答的具体内容...3',
      //     comments: 2333,
      //     hover: false
      //   },
      //   {
      //     question: '一个问题4',
      //     likes: 6664,
      //     author: {
      //       name: '作者名字4',
      //       field: '，某某问题的优秀回答者4',
      //       info: '信息介绍4'
      //     },
      //     answer: '回答的具体内容...4',
      //     comments: 2334,
      //     hover: false
      //   }
      // ]
    }
  },
  methods: {
    showList() {
      console.log(this.list)
    },
    initQuestionList() {
      this.questionList.forEach((question) => {
        if (question.hover === undefined) {
          question.hover = false
        }
        if (question.commentsShown === undefined) {
          question.commentsShown = false
        }
      })
      this.comments = document.querySelectorAll('.comments-wrapper')
    },
    mouseenter(question) {
      question.hover = true
      console.log(question.hover)
    },
    mouseleave(question) {
      question.hover = false
      // console.log(question.hover)
    },
    showComments(question, index) {
      if (question.commentsShown) {
        this.comments[index].style.display = 'none'
        question.commentsShown = false
      } else {
        this.comments[index].style.display = 'block'
        question.commentsShown = true
      }
    },
    showMoreQuestions() {
      for (let i=0; i<4; i++) {
        this.questionList.push({
          question: '一个问题',
          likes: 666,
          author: {
            name: '作者名字',
            field: '，某某问题的优秀回答者',
            info: '信息介绍'
          },
          answer: '回答的具体内容...',
          comments: 233,
          hover: false
        })
      }
      this.initQuestionList()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initQuestionList()
    })
  },
  updated() {
    this.$nextTick(() => {
      this.initQuestionList()
    })
  },
  computed: {
    list() {
      return document.querySelectorAll('.top-question .question-list > ul > li')
    }
  }
}
</script>

<style lang="scss" scoped>
  .top-question {
    margin: 10px;
    // width: 100%;
    // box-sizing: border-box;
    .tabs {
      margin: 10px 0;
      a {
        margin-right: 5px;
        padding: 5px 10px;
        border-radius: 2px 2px 0 0;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        border-top: 1px solid #ddd;
        color: #666;
      }
    }
    .question-list {
      &>ul>li {
        margin: 10px 0;
        border-bottom: 1px solid #ccc;
        &:last-of-type {
          border-bottom: 0;
        }
      }
      .question {
        color: #06c;
        margin: 5px 0;
      }
      .likes {
        background: #eff;
        color: #009;
        border-radius: 2px;
        padding: 5px;
      }
      .author, .answer, .btns {
        margin: 5px 0 5px 50px;
      }
      .author {
        * {
          display: inline;
          color: #000;
        }
      }
      .btns {
        a {
          padding: 0 5px;
          color: #666;
        }
      }
    }
    .more {
      background: #eee;
      text-align: center;
      height: 40px;
      color: #999;
      line-height: 40px;
      border-radius: 2px;
      border: 1px solid #ccc;
      box-shadow: 0 0 5px #ccc;
      margin: 10px;
    }
  }
</style>
