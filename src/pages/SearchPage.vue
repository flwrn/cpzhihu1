<template lang="html">
  <div class="search-page">
    <div class="container">
      <div class="header">
        <SearchHeader/>
      </div>
      <div class="center">
        <div class="left">
          <ResultListPanel/>
        </div>
        <div class="right">
          <RelatedSearch/>
        </div>
      </div>
      <ScrollToTop/>
    </div>
  </div>
</template>

<script>
import SearchHeader from './SearchPage/SearchHeader.vue'
import ResultListPanel from './SearchPage/ResultListPanel.vue'
import RelatedSearch from './SearchPage/RelatedSearch.vue'
import ScrollToTop from '../common/ScrollToTop.vue'

import axios from 'axios'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'SearchPage',
  components: {
    SearchHeader,
    ResultListPanel,
    RelatedSearch,
    ScrollToTop
  },
  data() {
    return {
      pagingStatus: {
        currentPage: 0,
        totalLimit: 10,
        augLimit: 10,
        augSkip: 0,
        augSearchFinished: false,
        apiLimit: 0,
        apiOffset: 0
      }
    }
  },
  computed: {

  },
  methods: {
    ...mapActions('searchPage', {
      makeNewSearch: 'makeNewSearch',
      loadMoreQuestions: 'loadMoreQuestions'
    })
  },
  created() {
    const query = this.$route.query.q || ''
    if (query !== '') {
      this.makeNewSearch(query)
    }
    document.title = `cpzhihu - ${query}`
  },
  mounted() {
    document.querySelector('div.container').addEventListener('scroll', () => {
      if (document.querySelector('div.result-list-panel').getBoundingClientRect().bottom < window.innerHeight + 500 && !this.isLoadingMoreQuestion) {
        this.loadMoreQuestions()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.search-page {
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
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
    }
    .center {
      margin: 10px auto 80px auto;
      max-width: 1000px;
      min-height: 1000px;
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
  .search-page {
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
