<template lang="html">
  <div class="question-page">
    <div class="container">
      <div class="header">
        <QuestionHeader/>
      </div>
      <QuestionPanel/>
      <div class="center">
        <div class="left">
          <AnswerBox v-show="isAnswerBoxDisplayed"/>
          <AnswerListPanel/>
          <WriteAnswerBtn/>
        </div>
        <div class="right">
          <DownloadZhihu/>
          <RelatedQuestions/>
          <!-- <RelatedRecommend/> -->
        </div>
      </div>
      <ScrollToTop/>
    </div>
  </div>
</template>

<script>
import QuestionHeader from './QuestionPage/QuestionHeader.vue'
import QuestionPanel from './QuestionPage/QuestionPanel.vue'
import AnswerListPanel from './QuestionPage/AnswerListPanel.vue'
import WriteAnswerBtn from './QuestionPage/WriteAnswerBtn.vue'
import DownloadZhihu from './QuestionPage/DownloadZhihu.vue'
import RelatedQuestions from './QuestionPage/RelatedQuestions.vue'
// import RelatedRecommend from './QuestionPage/RelatedRecommend.vue'
import AnswerBox from './QuestionPage/AnswerBox.vue'
import ScrollToTop from '../common/ScrollToTop.vue'

// import jsonGetter from '@/backend/json-getter.js'
import axios from 'axios'
import utils from '../store/utils.js'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'QuestionPage',
  components: {
    QuestionHeader,
    QuestionPanel,
    AnswerListPanel,
    WriteAnswerBtn,
    DownloadZhihu,
    RelatedQuestions,
    // RelatedRecommend,
    AnswerBox,
    ScrollToTop
  },
  computed: {
    ...mapState({
      hostname: 'hostname'
    }),
    ...mapState('questionPage', {
      currentQuestion: 'currentQuestion',
      isAnswerBoxDisplayed: 'isAnswerBoxDisplayed'
    })
  },
  methods: {
    ...utils,
    ...mapActions('user', {
      loginWithSessionToken: 'loginWithSessionToken'
    }),
    ...mapActions('questionPage', {
      loadQuestion: 'loadQuestion',
      loadMoreAnswers: 'loadMoreAnswers',
    }),
    // checkSessionToken() {
    //   if (document.cookie !== '') {
    //     const parsedCookie = this.parseCookie(document.cookie)
    //     if (parsedCookie.sessionToken) {
    //       this.loginWithSessionToken(parsedCookie.sessionToken)
    //     }
    //   }
    // }
  },
  async created() {
    await this.loadQuestion(this.$route.params.id)
    await this.loadMoreAnswers(1)

    // Try promise
    // this.loadQuestion(this.$route.params.id).then(() => {
    //   this.loadMoreAnswers(1)
    // });
  }
}
</script>

<style lang="scss" scoped>
.question-page {
  background: #eee;
  padding-bottom: 20px;
  .container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    background: #f6f6f6;
    .header {
      // position: fixed;
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
    }
    .center {
      margin: 10px auto 80px auto;
      max-width: 1000px;
      min-height: 300px;
      display: flex;
      .left {
        flex: 7;
        max-width: 700px;
      }
      .right {
        flex: 3;
        max-width: 300px;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .question-page {
    .container {
      .center {
        flex-direction: column-reverse;
        max-width: none;
        .left {
          max-width: none;
        }
        .right {
          max-width: none;
        }
      }
    }
  }
}

</style>
