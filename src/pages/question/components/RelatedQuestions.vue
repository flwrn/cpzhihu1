<template lang="html">
  <div class="related-questions">
    <h2 class="title">相关问题</h2>
    <ul class="question-list">
      <li class="question-item" v-for="(item, index) of relatedQuestions" :key="index">
        <!-- <a class="question-title" :href="item.url">{{item.name}}</a> -->
        <router-link :to="relatedUrl(item.url)">{{item.name}}</router-link>
        <span class="answer-number">{{item.answerCount}} 个回答</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RelatedQuestions',
  data() {
    return {
      questionList: [
        {},
        {},
        {},
        {},
        {}
      ]
    }
  },
  computed: {
    relatedQuestions() {
      return this.$store.state.questionItem.relatedQuestions
    }
  },
  methods: {
    relatedUrl(itemUrl) {
      let questionId = itemUrl.match(/[0-9]+$/)[0]
      return `/question/${questionId}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../css/variables.scss';
a {
  color: $darkBlue1;
}
.related-questions {
  background: #fff;
  margin: 10px 0 0 10px;
  box-shadow: 0 1px 3px #ccc;
  .title {
    font-size: 16px;
    font-weight: 700;
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  .question-list {
    padding: 15px;
    font-size: 14px;
    .question-item:first-child {
      margin-top: 0;
    }
    .question-item {
      margin-top: 5px;
      .question-title {
        color: $darkBlue1;
        &:hover {
          text-decoration: underline;
        }
      }
      .answer-number {
        color: $gray1;
        margin-left: 3px;
      }
    }
  }
}
</style>
