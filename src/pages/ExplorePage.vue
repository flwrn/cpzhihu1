<template lang="html">
  <div class="explore-page">
    <explore-page-header/>
    <div class="main">
      <div class="center clearfix">
        <div class="main-col" v-bind:class="mainColClass">
          <editor-recommendation v-bind:v-editor-recommendation="pageData.editorRecommendation"/>
          <top-question-list v-bind:v-top-question-list="pageData.topQuestionList"/>

        </div>
        <div class="side-col" v-bind:class="sideColClass">
          <sign-up-zhihu/>
          <download-zhihu-btn/>
          <hot-tables v-bind:v-hot-table-list="pageData.hotTableList"/>
          <hot-topics v-bind:v-hot-topic-list="pageData.hotTopicList"/>
          <hot-favs v-bind:v-hot-fav-list="pageData.hotFavList"/>
          <app-footer/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import ExplorePageHeader from '../components/ExplorePageHeader.vue'
import SignUpZhihu from '../components/SignUpZhihu.vue'
import EditorRecommendation from '../components/EditorRecommendation.vue'
import TopQuestionList from '../components/TopQuestionList.vue'
import DownloadZhihuBtn from '../components/DownloadZhihuBtn.vue'
import HotTables from '../components/HotTables.vue'
import HotTopics from '../components/HotTopics.vue'
import HotFavs from '../components/HotFavs.vue'
import Footer from '../components/Footer.vue'

export default {
  components: {
    'explore-page-header': ExplorePageHeader,
    'sign-up-zhihu': SignUpZhihu,
    'editor-recommendation': EditorRecommendation,
    'top-question-list': TopQuestionList,
    'download-zhihu-btn': DownloadZhihuBtn,
    'hot-tables': HotTables,
    'hot-topics': HotTopics,
    'hot-favs': HotFavs,
    'app-footer': Footer
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
      },
      pageData: {
        editorRecommendation: {
          topQuestion: {
            question: '',
            author: {
              name: '',
              field: '',
              info: ''
            },
            answer: ''
          },
          questionList: [
            {
              question: '',
              tag: ''
            }
          ]
        },
        topQuestionList: {
          questionList: [
            {
              question: '',
              likes: '',
              author: {
                name: '',
                field: '',
                info: ''
              },
              answer: '',
              comments: '',
              hover: false
            }
          ]
        },
        hotTableList: {
          hotTables: [
            {
              tableName: '',
              remainingDays: '',
              followerNumber: '',
              questionNumber: ''
            }
          ]
        },
        hotTopicList: {
          hotTopics: [
            {
              topicName: '',
              followerNumber: '',
              question: ''
            }
          ]
        },
        hotFavList: {
          hotFavs: [
            {
              favName: '',
              followerNumber: '',
              content: ''
            }
          ]
        }
      }
    }
  },
  methods: {
    resizeWidth: function() {
      if (window.innerWidth <= 940) {
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
    },
    showMoreQuestions() {
      console.log(this)
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.onresize = () => {
        this.resizeWidth()
        // console.log(window.innerWidth)
      }
      this.resizeWidth()
      console.log('mounted')
      // console.log(this.editorRecommendation.topQuestion.question)
      // this.editorRecommendation.topQuestion.question = 'new question'
      // this.editorRecommendation.topQuestion.author = {
      //   name: 'new name',
      //   fields: 'new fields',
      //   info: 'new info'
      // }


      // this.editorRecommendation.topQuestion = {
      //   question: 'new question',
      //   author: {
      //     name: 'new name',
      //     fields: 'new fields',
      //     info: 'new info'
      //   },
      //   answer: 'new answer'
      // }
      // console.log(this.editorRecommendation.topQuestion.question)
      // console.log('topQuestion changed')

      var xhr = new XMLHttpRequest()
      xhr.onload = () => {
        if (xhr.status === 200) {
          // console.log(xhr.responseText)
          // console.log(xhr.responseText)
          var data = JSON.parse(xhr.responseText)
          // console.log(pageData)
          this.pageData = data
          // console.log(this.pageData)
          // this.pageData.editorRecommendation = pageData.editorRecommendation
          // this.pageData.topQuestionList = data.topQuestionList
          // this.pageData.hotTableList = pageData.hotTableList
          // this.pageData.hotTopicList = pageData.hotTopicList
          // this.pageData.hotFavList = pageData.hotFavList
        }
      }
      xhr.open('GET', 'http://localhost:3000', true)
      xhr.send()
    })
  }
}



</script>

<style lang="scss" scoped>
  .main {
    // margin: 80px 0;
    padding: 80px 0;
    background: #fff;
  }
  .main-col {
    max-width: 600px;
  }
  .side-col {
    max-width: 300px;
  }
  @media screen and (max-width: 940px) {
    .main-col {
      max-width: none;
    }
    .side-col {
      max-width: none;
    }
  }
</style>
