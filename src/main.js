import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/reset.css'
import './style/style-fix.css'
import '../public/fontawesome-free-5.3.1-web/css/all.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
