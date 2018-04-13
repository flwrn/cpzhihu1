<template lang="html">
  <div class="question-page">
    <question-page-header/>
    <question-panel/>
    <div class="main center">
      <div v-bind:class="mainColClass">
        <answer-panel/>
        <a href="#" class="write-answer">写回答</a>
      </div>
      <div v-bind:class="sideColClass">
        <download-zhihu-btn/>
        <related-question-panel/>
        <related-recommendation-panel/>
        <app-footer/>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionPageHeader from '../components/QuestionPageHeader.vue'
import QuestionPanel from '../components/QuestionPanel.vue'
import AnswerPanel from '../components/AnswerPanel.vue'
import DownloadZhihuBtn from '../components/DownloadZhihuBtn.vue'
import RelatedQuestionPanel from '../components/RelatedQuestionPanel'
import RelatedRecommendationPanel from '../components/RelatedRecommendationPanel.vue'
import AppFooter from '../components/Footer.vue'

export default {
  components: {
    'question-page-header': QuestionPageHeader,
    'question-panel': QuestionPanel,
    'answer-panel': AnswerPanel,
    'download-zhihu-btn': DownloadZhihuBtn,
    'related-question-panel': RelatedQuestionPanel,
    'related-recommendation-panel': RelatedRecommendationPanel,
    'app-footer': AppFooter
  },
  data() {
    return {
      mainColClass: {
        'col-l': true,
        'f-l': true
      },
      sideColClass: {
        'col-s': true,
        'f-r': true
      }
    }
  },
  methods: {
    resizeWidth: function() {
      if (window.innerWidth <= 1000) {
        this.mainColClass['col-l'] = false
        this.mainColClass['f-l'] = false
        this.sideColClass['col-s'] = false
        this.sideColClass['f-r'] = false
      } else {
        this.mainColClass['col-l'] = true
        this.mainColClass['f-l'] = true
        this.sideColClass['col-s'] = true
        this.sideColClass['f-r'] = true
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.onresize = () => {
        this.resizeWidth()
        // console.log(window.innerWidth)
      }
      this.resizeWidth()
    })
  }
}
</script>

<style lang="scss" scoped>
  .main {
    min-height: 500px;
    width: 100%;
  }
  .question-panel {
    margin-top: 46px;
  }
  .write-answer {
    margin: 10px;
    // border: 1px solid #000;
    text-align: center;
    background: #fff;
    padding: 10px 0;
    color: #06f;
    box-shadow: 0 0 5px #ccc;
  }
</style>
