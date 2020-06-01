import Vue from 'vue'
import App from './App.vue'
import VueI18n from 'vue-i18n'
import router from './router'
import store from './store'
import i18n from './../../assets/i18n'

Vue.config.productionTip = false
Vue.use(VueI18n)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')