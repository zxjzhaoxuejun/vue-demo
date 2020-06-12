const storeRoute = [{
  path: '/vuex',
  name: 'StorePage',
  meta: {
    title: 'vuex仓库'
  },
  component: () => import('../../components/StorePage.vue')
}];

export default storeRoute