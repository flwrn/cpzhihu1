import Vue from 'vue'
import Router from 'vue-router'
import ExplorePage from '../pages/ExplorePage'
import QuestionPage from '../pages/QuestionPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ExplorePage',
      component: ExplorePage
    },
    {
      path: '/question',
      name: 'QuestionPage',
      component: QuestionPage
    }
  ]
})
