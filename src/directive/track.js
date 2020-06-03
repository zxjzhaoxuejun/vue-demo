import Vue from 'vue'

Vue.directive('log', {
  bind(el, binding, vnode) {
    el.addEventListener('click', () => {
      console.log(binding)
      console.log(vnode)
    })
  }
});