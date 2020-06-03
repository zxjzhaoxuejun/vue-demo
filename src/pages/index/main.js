import Vue from 'vue'
import App from './App.vue'
import i18n from '../../components/i18n'
import router from '../../router'
import store from '../../store'


Vue.config.productionTip = false

//系统错误捕获
Vue.config.errorHandler = function (err, vm, info) {
  console.log('进来了')
  console.error('抛出全局异常')
  console.error(vm, '---vm实例---')
  console.error(err, '---error---')
  console.error(info, '---info---')

}



new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')