const homeRoute = [{
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: () => import('../../components/Home.vue')
  },
  {
    path: '/public/detailsPage.html',
    name: 'About',
    meta: {
      title: '国际化'
    },
    component: () => import('../../components/Lang.vue')
  }, {
    path: '/shops',
    name: 'Shops',
    meta: {
      title: '商品列表'
    },
    component: () => import('../../pages/detailsPage/shops/ShopsList.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: '关于'
    },
    component: () => import('../../components/About.vue')
  }, {
    path: '/share',
    name: 'Share',
    meta: {
      title: '分享'
    },
    component: () => import('../../components/Share.vue')
  },
];

export default homeRoute;