const homeRoute = [{
    path: '/home',
    name: 'Home',
    component: () => import('../../components/Home.vue')
  },
  {
    path: '/public/detailsPage.html',
    name: 'About',
    component: () => import('../../components/Lang.vue')
  }
];

export default homeRoute;