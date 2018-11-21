import { set } from './common-mutations.js'

export default {
  namespaced: true,
  state: {
    currentQuery: '',
    searchLimit: '',
    searchAugSkip: '',
    searchApiOffset: '',
    isLoadingMoreQuestion: false
  },
  mutations: {
    set: set
  }
}
