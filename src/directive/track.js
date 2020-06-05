import Vue from 'vue'
import Exposure from './bv'

const exp = new Exposure();
Vue.directive('log', {
  bind(el, binding, vnode) {
    exp.add({
      el: el,
      val: binding.value
    });
    el.addEventListener('click', () => {
      console.log(binding)
      console.log(vnode)
    })
  }
});