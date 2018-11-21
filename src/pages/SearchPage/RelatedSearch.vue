<template lang="html">
  <div class="related-search">
    <h2 class="title">热门搜索</h2>
    <ul class="search-list">
      <li class="search-item" v-for="(item, index) of topSearchList" :key="index">
        <a class="search-query" :href="`/search?q=${item.query}`" target="_blank">{{item.display_query}}</a>
        <!-- <router-link :to="`/search?q=${item.query}`" target="_blank">{{item.query}}</router-link> -->
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'RelatedSearch',
  data() {
    return {
      topSearchList: []
    }
  },
  computed: {
    ...mapState({
      hostname: 'hostname'
    })
  },
  methods: {
    getSuggestList(query) {
      const encodedQuery = encodeURIComponent(query)
      axios.get(`${this.hostname}/api/top-search`).then((response) => {
        if (response) {
          this.topSearchList = response.data.topSearchList
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  created() {
    if (this.$route.query.q) {
      this.getSuggestList(this.$route.query.q)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
a {
  color: $darkBlue1;
}
.related-search {
  background: #fff;
  margin-left: 10px;
  box-shadow: 0 1px 3px #ccc;
  position: sticky;
  top: 60px;
  .title {
    font-size: $px16;
    font-weight: 700;
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  .search-list {
    padding: 15px;
    font-size: $px14;
    .search-item:first-child {
      margin-top: 0;
    }
    .search-item {
      margin-top: 5px;
      .search-query {
        color: $darkBlue1;
      }
      .search-query:hover {
        text-decoration: underline;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .related-search {
    margin-left: 0;
  }
}

</style>
