import Vue from 'vue'
// import Exposure from './bv'
import Exposure from './exposure'

const exp = new Exposure();
Vue.directive('log', {
  bind(el, binding, vnode) {
    exp.add(el);
    el.addEventListener('click', () => {
      console.log(binding)
      console.log(vnode)
    })
  }
});