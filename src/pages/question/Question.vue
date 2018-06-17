<template lang="html">
  <div class="question-page">
    <div class="container">
      <div class="header">
        <question-header/>
      </div>
      <question-panel/>
      <div class="center">
        <div class="left">
          <answer-list-panel/>
          <write-answer-btn/>
        </div>
        <div class="right">
          <download-zhihu/>
          <related-questions/>
          <related-recommend/>
        </div>
      </div>
    </div>
    <modal/>
  </div>
</template>

<script>
import axios from 'axios'
import QuestionHeader from './components/Header'
import QuestionPanel from './components/QuestionPanel'
import AnswerListPanel from './components/AnswerListPanel'
import WriteAnswerBtn from './components/WriteAnswerBtn'
import DownloadZhihu from './components/DownloadZhihu'
import RelatedQuestions from './components/RelatedQuestions'
import RelatedRecommend from './components/RelatedRecommend'
import Modal from './components/Modal'
export default {
  name: 'QuestionPage',
  components: {
    QuestionHeader,
    QuestionPanel,
    AnswerListPanel,
    WriteAnswerBtn,
    DownloadZhihu,
    RelatedQuestions,
    RelatedRecommend,
    Modal
  },
  data() {
    return {
      previousQuestionId: ''
    }
  },
  computed: {
    questionId() {
      return this.$route.params.id
    },
    commentBox() {
      return this.$store.state.commentBox
    }
  },
  watch: {
    questionId(value) {
      if (value !== this.previousQuestionId) {
        this.previousQuestionId = value
        this.loadQuestion()
        this.loadAnswers()
      }
    }
  },
  methods: {
    loadQuestion() {
      axios.get(`http://localhost:4000/api/question/${this.questionId}`).then((res) => {
        // console.log(`res.data: `, res.data)
        this.$store.commit('updateQuestion', res.data)
      })
    },
    loadAnswers() {
      // console.log('before axios.get')
      axios.get(`http://localhost:4000/api/question/${this.questionId}/answers`).then((res) => {
        // console.log(`res.data`, res.data)
        this.$store.commit('updateAnswer', res.data)
        // this.$store.commit('updateAnswerState')
      })
    }
  },
  mounted() {
    this.previousQuestionId = this.questionId
    this.loadQuestion();
    this.loadAnswers();
  }
}
</script>

<style lang="scss" scoped>
.question-page {
  background: #eee;
  padding-bottom: 20px;
  .container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background: #eee;
    .header {
      position: sticky;
      top: 0;
      // width: 100%;
      // left: 0;
      // right: 0;
      z-index: 10;
    }
    .center {
      margin: 10px auto 80px auto;
      width: 1000px;
      min-height: 1000px;
      display: flex;
      .left {
        width: 700px;
      }
      .right {
        width: 300px;
      }
    }
  }
  .modal {
    position: absolute;
    z-index: 20;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
