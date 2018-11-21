import Vue from 'vue'
import Vuex from 'vuex'

import leancloudModule from './leancloud-module.js'
leancloudModule.init()
import axios from 'axios'
// axios.defaults.withCredentials = true

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    // If testing Vue project on `http://localhost:8080`, set api hostname to `http://localhost:3000`
    // If built and copied to `leandemo/cpzhihu` project, set api hostname to ``
    hostname: 'http://localhost:3000',
    // hostname: '',

    // Current user
    userState: {
      loginState: false,
      currentUser: null
    },

    // Current query string
    currentQuery: '',

    // Current search arguments
    // The variable names need changing
    searchLimit: 10,
    searchAugSkip: 0,
    searchApiOffset: 0,
    isLoadingMoreQuestion: false,

    // Search results
    questionList: [

    ],

    // States of current question
    currentQuestion: {
      type: '',
      id: 0,
      title: '',
      question_type: '',
      created: 0,
      updated_time: 0,
      url: '',
      answer_count: 0,
      visit_count: 0,
      comment_count: 0,
      follower_count: 0,
      excerpt: '',
      detail: '',
      relationship: {},
      topics: []
    },

    isLoadingMoreAnswer: false,
    currentAnswerListPage: 0,

    answerList: [],

    // If popup is displayed
    isPopupDisplayed: false,

    // What is popup is being displayed and what data it contains
    currentPopup: {
      type: '',
      data: null
    },

    // If answer box is displayed
    isAnswerBoxDisplayed: false,


  },
  getters: {
    isAnswerListLastPage(state) {
      return state.currentAnswerListPage === Math.ceil(state.currentQuestion.answer_count / 5)
    }
  },
  mutations: {
    // setCurrentQuestion(state, question) {
    //   state.currentQuestion = question
    // },
    // togglePopup(state, value) {
    //   state.isPopupDisplayed = value
    // },
    // toggleAnswerBox(state, value) {
    //   state.isAnswerBoxDisplayed = value
    // },
    // setCurrentPopup(state, popup) {
    //   state.currentPopup = popup
    // },
    // setLoginState(state, loginState) {
    //   state.user.loginState = loginState
    // },
    // setCurrentUser(state, user) {
    //   state.user.currentUser = user
    // },
    // setSessionToken(state, sessionToken) {
    //   state.user.sessionToken = sessionToken
    // },

    // Use client-side LeanCloud
    // signup(state, userInput) {
    //   leancloudModule.signup(userInput).then((user) => {
    //     if (user) {
    //       state.userState.loginState = true
    //       state.userState.currentUser = user
    //       document.cookie = `sessionToken=${user.sessionToken};max-age=86400`
    //     }
    //   })
    // },
    // login(state, userInput) {
    //   leancloudModule.login(userInput).then((user) => {
    //     if (user) {
    //       state.userState.loginState = true
    //       state.userState.currentUser = user
    //       document.cookie = `sessionToken=${user.sessionToken};max-age=86400`
    //     }
    //   })
    // },
    // loginWithSessionToken(state, sessionToken) {
    //   leancloudModule.loginWithSessionToken(sessionToken).then((user) => {
    //     if (user) {
    //       state.userState.loginState = true
    //       state.userState.currentUser = user
    //     }
    //   })
    // },
    // logout(state) {
    //   leancloudModule.logout().then(() => {
    //     state.userState.loginState = false
    //     state.userState.currentUser = null
    //   })
    // },
    //
    // updateQuestion(state, newQuestion) {
    //   axios.post(`${state.hostname}/api/update-question`, { newQuestion }).then((response) => {
    //     console.log(response.data)
    //     window.location.reload()
    //   }).catch((error) => {
    //     console.log(error)
    //   })
    // },
    // updateAnswer(state, { newAnswer, newQuestionStats }) {
    //   axios.post(`${state.hostname}/api/update-answer`, { newAnswer, newQuestionStats }).then((response) => {
    //     console.log(response.data)
    //     window.location.reload()
    //   }).catch((error) => {
    //     console.log(error)
    //   })
    // },
    // updateComment(state, { newComment, newQuestionStats, newAnswerStats, newAnswer }) {
    //   axios.post(`${state.hostname}/api/update-comment`, { newComment, newQuestionStats, newAnswerStats, newAnswer }).then((response) => {
    //     console.log(response.data)
    //     window.location.reload()
    //   }).catch((error) =>{
    //     console.log(error)
    //   })
    // },

    /*
      This can set multiple variables in one mutation. You don't need the following separated mutations.
    */
    set(state, keyValues) {
      for (let key in keyValues) {
        state[key] = keyValues[key]
      }
    },
    setEval(state, keyValues) {
      for (let key in keyValues) {
        eval(`state.${key} = keyValues[key]`)
      }
    },

    // setQuestionList(state, value) {
    //   state.setQuestionList = value
    // },
    // setQuestionStateList(state, value) {
    //   state.setQuestionStateList = value
    // }
    // setCurrentQuery(state, value) {
    //   state.currentQuery = value
    // },
    // setLimit(state, value) {
    //   state.setLimit = value
    // },
    // setAugSkip(state, value) {
    //   state.augSkip = value
    // },
    // setApiOffset(state, value) {
    //   state.apiOffset = value
    // },
    // setAugSearchingFinished(state, value) {
    //   state.augSearchingFinished = value
    // }
  },
  actions: {
    /*
    The function of searching questions has to be in Vuex for now. Maybe I will move other components functions into Vuex.

    The `actions` in Vuex store is equivalent to `methods` in components.
    */

    // Use client-side LeanCloud
    async signup({ commit }, userInput) {
      const user = await leancloudModule.signup(userInput)
      if (user) {
        commit('set', {
          userState: {
            loginState: true,
            currentUser: user
          }
        })
        document.cookie = `sessionToken=${user.sessionToken};max-age=86400`
      }
    },
    async login({ commit }, userInput) {
      const user = await leancloudModule.login(userInput)
      if (user) {
        commit('set', {
          userState: {
            loginState: true,
            currentUser: user
          }
        })
        document.cookie = `sessionToken=${user.sessionToken};max-age=86400`
      }
    },
    async loginWithSessionToken({ commit }, sessionToken) {
      const user = await leancloudModule.loginWithSessionToken(sessionToken)
      if (user) {
        commit('set', {
          userState: {
            loginState: true,
            currentUser: user
          }
        })
      }
    },
    async logout({ commit }) {
      const user = await leancloudModule.logout()
      commit('set', {
        userState: {
          loginState: false,
          currentUser: null
        }
      })
    },

    // Search the databases for questions with query string
    async searchQuestions({ commit }, { query, database, limit, offset }) {
      const encodedQuery = encodeURIComponent(query)
      try {
        const response = axios.get(`${state.hostname}/api/search?q=${encodedQuery}&database=${database}&limit=${limit}&offset=${offset}`)
        if (response) {
          const questionList = response.data.questionList
          return questionList
        }
      } catch (error) {
        console.log(error)
      }
    },

    // Load more results of the current search
    async loadMoreQuestions({ state, commit, dispatch }) {
      const data = {}
      if (!state.augSearchingFinished) {
        data.augQuestionList = await dispatch('searchQuestions', {
          query: state.currentQuery,
          database: 'aug',
          limit: state.searchLimit,
          offset: state.searchAugSkip
        })
        commit('set', {
          searchAugSkip: state.searchAugSkip + data.augQuestionList.length
        })
        if (data.augQuestionList.length < state.searchAugLimit) {
          commit('set', {
            augSearchingFinished: true
          })
          data.apiQuestionList = await dispatch('searchQuestions', {
            query: state.currentQuery,
            database: 'api',
            limit: state.searchLimit - data.augQuestionList.length,
            offset: state.searchApiOffset
          })
          commit('set', {
            apiOffset: state.searchApiOffset + data.apiQuestionList.length
          })
        }
      } else {
        data.augQuestionList = []
        data.apiQuestionList = await dispatch('searchQuestions', {
          query: state.currentQuery,
          database: 'api',
          limit: state.searchLimit,
          offset: state.searchApiOffset
        })
      }
      data.questionList = data.augQuestionList.concat(data.apiQuestionList)
      commit('set', {
        questionList: state.questionList.concat(data.questionList)
      })
    },

    // Change the current query string to make a new search
    async makeNewSearch({ commit, dispatch }, query) {
      commit('set', {
        currentQuery: query,
        questionList: [],
        augSkip: 0,
        apiOffset: 0,
        augSearchingFinished: false
      })
      await dispatch('loadMoreQuestions')
    },

    // Load a question given a questionId
    async loadQuestion({ commit }, questionId) {
      try {
        const response = await axios.get(`${this.hostname}/api/question/${questionId}`)
        if (response.data.question) {
          const regex1 = /https:\/\/(pic[0-9])\.zhimg\.com\/([0-9a-zA-Z_-]+\.)/g
          const sub1 = `${this.hostname}/api/image/$1/$2`
          const regex2 = /src[^ ]+data:image[^ ]+ /g
          const sub2 = ' '
          const regex3 = /data-actualsrc/g
          const sub3 = 'src'
          const question = response.data.question
          question.excerpt = question.excerpt.replace(regex1, sub1)
          question.excerpt = question.excerpt.replace(regex2, sub2)
          question.excerpt = question.excerpt.replace(regex3, sub3)
          question.detail = question.detail.replace(regex1, sub1)
          question.detail = question.detail.replace(regex2, sub2)
          question.detail = question.detail.replace(regex3, sub3)
          commit('set', {
            question: question,
          })
          document.title = question.title
        } else {
          return Promise.solve(null)
        }
      } catch (error) {
        console.log(error)
      }
    },

    async loadMoreAnswers({ state, commit }, page) {
      commit('set', {
        isLoadingMoreAnswer: true
      })
      const aug_answer_count = state.currentQuestion.aug_answer_count || 0
      const api_answer_count = state.currentQuestion.api_answer_count || 0
      try {
        const response = axios.get(`${this.hostname}/api/question/${this.$route.params.id}/answers?page=${page}&limit=5`)
        if (response.data.answerList) {
          const answerList = response.data.answerList.map((item) => {
            const regex1 = /https:\/\/(pic[0-9])\.zhimg\.com\/([0-9a-zA-Z_-]+\.)/g
            const sub1 = `${this.hostname}/api/image/$1/$2`
            const regex2 = /src[^ ]+data:image[^ ]+ /g
            const sub2 = ' '
            const regex3 = /data-actualsrc/g
            const sub3 = 'src'
            // const regex4 = /\{size\}/
            // const sub4 = 'l'
            item.author.avatar_url = item.author.avatar_url.replace(regex1, sub1)
            item.content = item.content.replace(regex1, sub1)
            item.content = item.content.replace(regex2, sub2)
            item.content = item.content.replace(regex3, sub3)
            return item
          })
          for (let item of answerList) {
            this.answerList.push(item)
          }
          for (let index = this.answerStateList.length; index < this.answerList.length; index++) {
            this.answerStateList.push({
              showComments: false,
              inScope: false,
              btnBarFixed: false
            })
          }
          commit('set', {
            currentAnswerListPage: state.currentAnswerListPage + 1,
            isLoadingMoreAnswer: false
          })
        }
      } catch (error) {
        console.log(error)
      }
    },

    // Update questions, answers, comments
    async updateQuestion(context, newQuestion) {
      try {
        const response = await axios.post(`${state.hostname}/api/update-question`, { newQuestion })
        console.log(response.data)
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    },
    async updateAnswer(context, { newAnswer, newQuestionStats }) {
      try {
        const response = await axios.post(`${state.hostname}/api/update-answer`, { newAnswer, newQuestionStats })
        console.log(response.data)
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    },
    async updateComment(context, { newComment, newQuestionStats, newAnswerStats, newAnswer }) {
      try {
        const response = await axios.post(`${state.hostname}/api/update-comment`, { newComment, newQuestionStats, newAnswerStats, newAnswer })
        console.log(response.data)
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    },

    
  }
})
