const homeRoute = [{
    path: '/home',
    name: 'Home',
    component: () => import('../../components/Home.vue')
  },
  {
    path: '/public/page2.html',
    name: 'About',
    component: () => import('../../components/Lang.vue')
  }
];

export default homeRoute;