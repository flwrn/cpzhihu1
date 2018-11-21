export default {
  namespaced: true,
  state: {
    isPopupDisplayed: false,
    currentPopup: {
      type: '',
      data: null
    }
  },
  mutations: {
    // setIsPopupDisplayed(state, value) {
    //   state.isPopupDisplayed = value
    // },
    // setCurrentPopup(state, value) {
    //   state.currentPopup = value
    // },
    changePopupState(state, values) {
      for (let key in values) {
        state[key] = values[key]
      }
    }
  }
}
