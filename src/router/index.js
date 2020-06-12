import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../components/Home.vue'
import homeRoute from './routes/homeRoute'
import storeRoute from './routes/storeRoute'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: Home
  },
  ...homeRoute,
  ...storeRoute
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

//跳转前设置title
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});
//跳转后设置scroll为原点
router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router