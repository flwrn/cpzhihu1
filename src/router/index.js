import Vue from 'vue'
import Router from 'vue-router'
import ExplorePage from '@/pages/explore/Explore'
import QuestionPage from '@/pages/question/Question'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ExplorePage',
      component: ExplorePage
    },
    {
      path: '/question/:id',
      name: 'QuestionPage',
      component: QuestionPage
    }
  ]
})
