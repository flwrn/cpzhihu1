<template lang="html">
  <div class="editor-recommendation">
    <div class="header clearfix">
      <p class="f-l">编辑推荐</p>
      <a class="f-r">更多推荐>></a>
    </div>
    <hr>
    <div class="recommendation-list">
      <div class="top-question clearfix">
        <a href="#/question" class="question"><h4>{{vEditorRecommendation.topQuestion.question}}</h4></a>
        <a class="avatar f-l"></a>
        <div class="author">
          <a class="name"><h4>{{vEditorRecommendation.topQuestion.author.name}}</h4></a>
          <a class="field">{{vEditorRecommendation.topQuestion.author.field}}</a>
          <p class="info">{{vEditorRecommendation.topQuestion.author.info}}</p>
        </div>
        <p class="answer">{{vEditorRecommendation.topQuestion.answer}}</p>
      </div>
      <ul>
        <li class="clearfix" v-for="question in vEditorRecommendation.questionList">
          <a href="#/question" class="question f-l"><h4>{{question.question}}</h4></a>
          <p class="tag f-r">{{question.tag}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['vEditorRecommendation'],
  data() {
    return {
      editorRecommendation: this.vEditorRecommendation
      // topQuestion: this.initialEditorRecommendation.topQuestion,
      // topQuestion: {
      //   question: '编辑推荐的问题',
      //   author: {
      //     name: '作者',
      //     fields: '某个领域的优秀回答者',
      //     info: '信息介绍'
      //   },
      //   answer: '具体回答的内容，具体回答的内容，具体回答的内容，具体回答的内容，具体回答的内容，具体回答的内容，具体回答的内容。'
      // },
      // questionList: this.initialEditorRecommendation.questionList
      // questionList: [
      //   {
      //     question: '其他推荐的问题',
      //     tag: '问题的标签'
      //   },
      //   {
      //     question: '其他推荐的问题',
      //     tag: '问题的标签'
      //   },
      //   {
      //     question: '其他推荐的问题',
      //     tag: '问题的标签'
      //   },
      //   {
      //     question: '其他推荐的问题',
      //     tag: '问题的标签'
      //   }
      // ]
    }
  },
  watcher: {
    // vEditorRecommendation: function(newValue, oldValue) {
    //   console.log('changed')
    //   document.querySelector('.editor-recommendation .recommendation-list .top-question .answer')
    //     .innerHTML = newValue.topQuestion.answer
    // }
  }
}
</script>

<style lang="scss" scoped>
  .editor-recommendation {
    margin: 10px;
    // width: 100%;
    // box-sizing: border-box;
    .header {
      a {
        color: #666;
      }
    }
    hr {
      margin: 10px 5px;
      background: #ccc;
      height: 1px;
      border: 0;
    }
    .recommendation-list {
      .avatar {
        height: 40px;
        width: 40px;
        background: #ccc;
        border-radius: 2px;
      }
      .author, .answer {
        margin-left: 50px;
      }
      .question {
        color: #05b;
      }
      .author {
        * {
          display: inline;
        }
        .name {
          color: #000;
        }
        .field {
          color: #000;
        }
        .info {
          color: #666;
        }
      }
      .top-question, li {
        padding: 10px 0;
      }
      li {
        border-top: 1px solid #eee;
      }
    }
  }
</style>
