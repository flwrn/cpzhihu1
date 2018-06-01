<template lang="html">
  <div class="explore-page">
    <div class="header">
      <explore-header/>
    </div>
    <div class="center">
      <div class="left">
        <editor-recommend/>
        <hot-questions/>
      </div>
      <div class="right">
        <download-zhihu/>
        <hot-tables/>
        <hot-topics/>
        <hot-favs/>
      </div>
    </div>
  </div>
</template>

<script>
import ExploreHeader from './components/Header'
import EditorRecommend from './components/EditorRecommend'
import HotQuestions from './components/HotQuestions'
import DownloadZhihu from './components/DownloadZhihu'
import HotTables from './components/HotTables'
import HotTopics from './components/HotTopics'
import HotFavs from './components/HotFavs'
export default {
  name: 'ExplorePage',
  components: {
    ExploreHeader,
    EditorRecommend,
    HotQuestions,
    DownloadZhihu,
    HotTables,
    HotTopics,
    HotFavs
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.center {
  max-width: 1000px;
  margin: 80px auto 80px auto;
  display: flex;
  justify-content: space-between;
  .left {
    max-width: 650px;
    flex: 1;
  }
  .right {
    max-width: 250px;
    flex: 1;
  }
}
.hot-tables, .hot-topics, .hot-favs {
  margin-top: 20px;
}
</style>
