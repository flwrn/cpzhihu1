import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import leancloudModule from './leancloud-module.js'
leancloudModule.init()

import user from './user.js'
import searchPage from './search-page.js'
import questionPage from './question-page.js'
import popup from './popup.js'

let hostname = ''
if (process.env.NODE_ENV === 'development') {
  hostname = 'http://192.168.1.104:3000'
}

let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'undefined'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    user: user,
    searchPage: searchPage,
    questionPage: questionPage,
    popup: popup
  },
  state: {
    hostname: hostname
  }
})
