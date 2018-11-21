import Vue from 'vue'
import Router from 'vue-router'
import QuestionPage from './pages/QuestionPage.vue'
import SearchPage from './pages/SearchPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'QuestionPage',
      component: QuestionPage
    },
    {
      path: '/question/:id',
      name: 'QuestionPage',
      component: QuestionPage
    },
    {
      path: '/search',
      name: 'SearchPage',
      component: SearchPage
    }
  ]
})
