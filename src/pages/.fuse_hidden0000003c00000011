<template lang="html">
  <div class="explore-page">
    <explore-page-header/>
    <div class="main">
      <div class="center clearfix">
        <div class="main-col" v-bind:class="mainColClass">
          <editor-recommendation/>
          <top-question-list/>

        </div>
        <div class="side-col" v-bind:class="sideColClass">
          <sign-up-zhihu/>
          <download-zhihu-btn/>
          <hot-tables/>
          <hot-topics/>
          <hot-favs/>
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
