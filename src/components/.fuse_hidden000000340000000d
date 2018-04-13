<template lang="html">
  <div class="related-question-panel">
    <p class="related-question-panel-info">相关问题</p>
    <div class="related-question-list">
      <ul>
        <li v-for="(question) in relatedQuestionList">
          <a class="question-url">{{question.questionTitle}}</a>
          <span class="answer-number">{{question.answerNumber}}个回答</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      relatedQuestionList: [
        {
          questionTitle: '什么什么什么什么什么什么什么问题',
          answerNumber: 233
        },
        {
          questionTitle: '什么什么什么什么什么什么什么问题',
          answerNumber: 233
        },
        {
          questionTitle: '什么什么什么什么什么什么什么问题',
          answerNumber: 233
        },
        {
          questionTitle: '什么什么什么什么什么什么什么问题',
          answerNumber: 233
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .related-question-panel {
    // min-height: 200px;
    background: #fff;
    margin: 10px;
    box-shadow: 0 0 5px #ccc;
    .related-question-panel-info {
      padding: 15px;
      font-weight: 700;
      border-bottom: 1px solid #eee;
    }
    .related-question-list {
      padding: 5px 15px;
      .question-url {
        color: #06c;
        display: inline;
        &:hover {
          text-decoration: underline;
        }
      }
      .answer-number {
        color: #999;
      }
      li {
        padding: 5px 0;
      }
    }
  }
</style>
