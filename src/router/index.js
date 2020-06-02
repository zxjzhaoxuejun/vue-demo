import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../components/Home.vue'
import homeRoute from './routes/homeRoute'
import storeRoute from './routes/storeRoute'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
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

export default router