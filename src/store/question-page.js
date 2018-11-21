import axios from 'axios'

export default {
  namespaced: true,
  state: {
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
    LIMIT: 5,
    isAnswerBoxDisplayed: false

    // isPopupDisplayed: false,
    //
    // currentPopup: {
    //   type: '',
    //   data: null
    // },

  },
  getters: {
    isAnswerListLastPage(state) {
      return state.currentAnswerListPage === Math.ceil(state.currentQuestion.answer_count / state.LIMIT)
    }
  },
  mutations: {
    // setCurrentQuestion(state, value) {
    //   state.currentQuestion = value
    // },
    // setIsLoadingMoreAnswer(state, value) {
    //   state.isLoadingMoreAnswer = value
    // },
    // setCurrentAnswerListPage(state, value) {
    //   state.currentAnswerListPage = value
    // },
    // setAnswerList(state, value) {
    //   state.answerList = value
    // },
    // setIsAnswerBoxDisplayed(state, value) {
    //   state.isAnswerBoxDisplayed = value
    // }
    changeLoadingState(state, value) {
      state.isLoadingMoreAnswer = value
    },
    changeQuestion(state, question) {
      state.currentQuestion = question
    },
    changeAnswerListState(state, values) {
      for (let key in values) {
        state[key] = values[key]
      }
    },
    changeAnswerBoxState(state, value) {
      state.isAnswerBoxDisplayed = value
    }
  },
  actions: {
    async loadQuestion({ state, commit, rootState }, questionId) {
      try {
        const response = await axios.get(`${rootState.hostname}/api/question/${questionId}`)
        if (response.data.question) {
          const regex1 = /https:\/\/(pic[0-9])\.zhimg\.com\/([^.]*)\.(jpg|png|gif)/g
          const sub1 = `${rootState.hostname}/api/image/$1/$2.$3`
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
          commit('changeQuestion', question)
          document.title = question.title
        } else {
          return Promise.resolve(null)
        }
      } catch (error) {
        console.log(error)
      }
    },

    async loadMoreAnswers({ state, commit, rootState }, page) {
      if (!state.isLoadingMoreAnswer) {
        // commit('setIsLoadingMoreAnswer', true)
        commit('changeLoadingState', true)
        const aug_answer_count = state.currentQuestion.aug_answer_count || 0
        const api_answer_count = state.currentQuestion.api_answer_count || 0
        try {
          const response = await axios.get(`${rootState.hostname}/api/question/${rootState.questionPage.currentQuestion.id}/answers?page=${page}&limit=${state.LIMIT}&aug_answer_count=${aug_answer_count}&api_answer_count=${api_answer_count}`)
          if (response.data.answerList) {
            const answerList = response.data.answerList.map((item) => {
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
            // commit('setAnswerList', state.answerList.concat(answerList))
            // for (let index = state.answerStateList.length; index < state.answerList.length; index++) {
            //   state.answerStateList.push({
            //     showComments: false,
            //     inScope: false,
            //     btnBarFixed: false
            //   })
            // }
            // commit('setCurrentAnswerListPage', state.currentAnswerListPage + 1)
            commit('changeAnswerListState', {
              answerList: state.answerList.concat(answerList),
              currentAnswerListPage: state.currentAnswerListPage + 1
            })
            // commit('setIsLoadingMoreAnswer', false)
            commit('changeLoadingState', false)
          } else {
            return Promise.resolve(null)
          }
        } catch (error) {
          console.log(error)
        }
      }
    },

    async updateQuestion({ rootState }, newQuestion) {
      try {
        const response = await axios.post(`${rootState.hostname}/api/update-question`, { newQuestion })
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    },

    async updateAnswer({ rootState }, { newAnswer, newQuestionStats }) {
      try {
        const response = await axios.post(`${rootState.hostname}/api/update-answer`, { newAnswer, newQuestionStats })
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    },

    async updateComment({ rootState }, { newComment, newQuestionStats, newAnswerStats, newAnswer }) {
      try {
        const response = await axios.post(`${rootState.hostname}/api/update-comment`, { newComment, newQuestionStats, newAnswerStats, newAnswer })
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
