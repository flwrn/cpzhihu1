import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questionItem: {
      url: '',
      id: '123456',
      title: '默认标题',
      keywords: [
        '默认关键词'
      ],
      answerCount: 0,
      commentCount: 0,
      dateCreated: '2018-01-01T14:00:00.000Z',
      dateModified: '2018-01-01T14:00:00.000Z',
      briefContent: '默认内容',
      answerIdList: [],
      commentIdList: []
    },
    answerList: [],
    answerStateList: [],
    commentBox: false,
    newQuestion: false,
    loginPage: false,
    loggedIn: true
  },
  mutations: {
    updateQuestion(state, data) {
      state.questionItem = data.questionItem
      state.answerList = []
      state.answerStateList = []
    },
    updateAnswer(state, data) {
      // console.log('before state updateAnswer')
      state.answerList = state.answerList.concat(data.answerList)
      let answerCountDiff = state.answerList.length - state.answerStateList.length
      for (let i=0; i<answerCountDiff; i++) {
        state.answerStateList.push({
          showComments: false,
          inScope: false
        })
      }




      console.log('after state updateAnswer')
    },
    // updateAnswerState(state) {
    // },
    toggleShowComments(state, payload) {
      state.answerStateList[payload.index].showComments = !state.answerStateList[payload.index].showComments
    },
    toggleInScope(state, payload) {
      state.answerStateList[payload.index].inScope = payload.value
    },
    toggleComments(state, value) {
      state.commentBox = value
    },
    toggleNewQuestion(state, value) {
      state.newQuestion = value
    },
    toggleLoginPage(state, value) {
      state.loginPage = value
    }
  }
})
