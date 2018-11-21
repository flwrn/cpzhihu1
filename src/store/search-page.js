import axios from 'axios'

export default {
  namespaced: true,
  state: {
    currentQuery: '',
    searchLimit: 20,
    searchAugSkip: 0,
    searchApiOffset: 0,
    isAugSearchingFinished: true,
    isLoadingMoreQuestion: false,
    resultList: []
  },
  mutations: {
    // setCurrentQuery(state, value) {
    //   state.currentQuery = value
    // },
    // setSearchLimit(state, value) {
    //   state.searchLimit = value
    // },
    // setSearchAugSkip(state, value) {
    //   state.searchAugSkip = value
    // },
    // setSearchApiOffset(state, value) {
    //   state.searchApiOffset = value
    // },
    // setIsAugSearchingFinished(state, value) {
    //   state.isAugSearchingFinished = value
    // },
    // setIsLoadingMoreQuestion(state, value) {
    //   state.isLoadingMoreQuestion = value
    // },
    // setResultList(state, value) {
    //   state.resultList = value
    // }
    changeLoadingState(state, value) {
      state.isLoadingMoreQuestion = value
    },
    changeSearchParameter(state, values) {
      for (let key in values) {
        state[key] = values[key]
      }
    },
    changeResultList(state, resultList) {
      state.resultList = resultList
    }
  },
  actions: {
    // Search the databases for questions with query string
    async searchQuestions({ rootState }, { query, database, limit, offset }) {
      const encodedQuery = encodeURIComponent(query)
      try {
        const response = await axios.get(`${rootState.hostname}/api/search?q=${encodedQuery}&database=${database}&limit=${limit}&offset=${offset}`)
        // if (response) {
        //   const resultList = response.data.resultList
        //   return resultList
        // }
        if (response.data.resultList) {
          const resultList = response.data.resultList.map((item) => {
            const regex1 = /https:\/\/(pic[0-9])\.zhimg\.com\/([^.]*)\.(jpg|png|gif)/g
            const sub1 = `${rootState.hostname}/api/image/$1/$2.$3`
            const regex2 = /src[^ ]+data:image[^ ]+ /g
            const sub2 = ' '
            const regex3 = /data-actualsrc/g
            const sub3 = 'src'
            item.author.avatar_url = item.author.avatar_url.replace(regex1, sub1)
            item.content = item.content.replace(regex1, sub1)
            item.content = item.content.replace(regex2, sub2)
            item.content = item.content.replace(regex3, sub3)
            return item
          })
          return resultList
        } else {
          return []
        }
      } catch (error) {
        console.log(error)
      }
    },

    // Load more results of the current search
    async loadMoreQuestions({ state, commit, dispatch }) {
      if (!state.isLoadingMoreQuestion) {
        // commit('setIsLoadingMoreQuestion', true)
        commit('changeLoadingState', true)
        const data = {
          currentQuery: state.currentQuery,
          searchLimit: state.searchLimit,
          searchAugSkip: state.searchAugSkip,
          searchApiOffset: state.searchApiOffset,
          isAugSearchingFinished: state.isAugSearchingFinished
        }
        if (!data.isAugSearchingFinished) {
          data.augResultList = await dispatch('searchQuestions', {
            query: data.currentQuery,
            database: 'aug',
            limit: data.searchLimit,
            offset: data.searchAugSkip
          })
          // commit('setSearchAugSkip', state.searchAugSkip + data.augResultList.length)
          data.searchAugSkip += data.augResultList.length
          if (data.augResultList.length < data.searchLimit) {
            // commit('setIsAugSearchingFinished', true)
            // commit('changeIsAugSearchingFinished', true)
            data.isAugSearchingFinished = true
            data.apiResultList = await dispatch('searchQuestions', {
              query: data.currentQuery,
              database: 'api',
              limit: data.searchLimit - data.augResultList.length,
              offset: data.searchApiOffset
            })
            // commit('setSearchApiOffset', state.searchApiOffset + data.apiResultList.length)
            data.searchApiOffset += data.apiResultList.length
          } else {
            data.apiResultList = []
          }
        } else {
          data.augResultList = []
          data.apiResultList = await dispatch('searchQuestions', {
            query: data.currentQuery,
            database: 'api',
            limit: data.searchLimit,
            offset: data.searchApiOffset
          })
          // commit('setSearchApiOffset', state.searchApiOffset + data.apiResultList.length)
          data.searchApiOffset += data.apiResultList.length
        }
        data.resultList = data.augResultList.concat(data.apiResultList)
        data.resultList = state.resultList.concat(data.resultList)
        commit('changeResultList', data.resultList)
        commit('changeSearchParameter', {
          searchAugSkip: data.searchAugSkip,
          searchApiOffset: data.searchApiOffset,
          isAugSearchingFinished: data.isAugSearchingFinished
        })
        commit('changeLoadingState', false)
      }
    },

    // Change the current query string to make a new search
    async makeNewSearch({ commit, dispatch }, query) {
      // commit('setCurrentQuery', query)
      // commit('setResultList', [])
      // commit('setSearchLimit', 10)
      // commit('setSearchAugSkip', 0)
      // commit('setSearchApiOffset', 0)
      // commit('setIsAugSearchingFinished', true)
      commit('changeSearchParameter', {
        currentQuery: query,
        searchAugSkip: 0,
        searchApiOffset: 0,
        isAugSearchingFinished: true
      })
      commit('changeResultList', [])
      await dispatch('loadMoreQuestions')
    }
  }
}
