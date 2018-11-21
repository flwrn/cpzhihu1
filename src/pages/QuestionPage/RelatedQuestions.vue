<template lang="html">
  <div class="related-questions" :class="{'fixed':isFixed}">
    <h2 class="title">相关问题</h2>
    <ul class="question-list">
      <li class="question-item" v-for="(item, index) of relatedQuestionList" :key="index">
        <a class="question-title" :href="item.url" target="_blank">{{item.title}}</a>
        <span class="answer-number">{{numberFormat(item.answer_count, 'comma')}} 个回答</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import utils from '../../store/utils.js'
import { mapState } from 'vuex'

export default {
  name: 'RelatedQuestions',
  data() {
    return {
      relatedQuestionList: [],
      isFixed: false
    }
  },
  computed: {
    ...mapState({
      hostname: 'hostname'
    })
  },
  methods: {
    ...utils,
    async loadRelatedQuestions(questionId) {
      try {
        const response = await axios.get(`${this.hostname}/api/question/${questionId}/similar-questions`)
        this.relatedQuestionList = response.data.similarQuestionList.map((item) => {
          item.url = `/question/${item.id}`
          return item
        })
      } catch (error) {
        console.log(error)
      }
    },
    // checkFixed() {
    //   if (window.innerWidth > 1000) {
    //     const downloadZhihuRect = document.querySelector('.download-zhihu').getBoundingClientRect()
    //     if (downloadZhihuRect.bottom < 50 && !this.isFixed) {
    //       this.isFixed = true
    //     }
    //     if (downloadZhihuRect.bottom >= 50 && this.isFixed) {
    //       this.isFixed = false
    //     }
    //   } else if (this.isFixed) {
    //     this.isFixed = false
    //   }
    // }
  },
  created() {
    this.loadRelatedQuestions(this.$route.params.id)
  },
  // mounted() {
  //   document.querySelector('div.container').addEventListener('scroll', this.checkFixed)
  // }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
a {
  color: $darkBlue1;
}
.related-questions.fixed {
  position: fixed;
  top: 50px;
  width: 290px;
}
.related-questions {
  background: #fff;
  margin: 10px 0 0 10px;
  box-shadow: 0 1px 3px #ccc;
  position: sticky;
  top: 60px;
  .title {
    font-size: $px16;
    font-weight: 700;
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  .question-list {
    padding: 15px;
    font-size: $px14;
    .question-item:first-child {
      margin-top: 0;
    }
    .question-item {
      margin-top: 5px;
      .question-title {
        color: $darkBlue1;
      }
      .question-title:hover {
        text-decoration: underline;
      }
      .answer-number {
        color: $gray1;
        margin-left: 3px;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .related-questions {
    margin-left: 0;
  }
}
</style>
