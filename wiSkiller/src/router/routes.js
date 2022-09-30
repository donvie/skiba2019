
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'Skiba',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/earning',
        name: 'Earning',
        component: () => import('pages/Earning.vue')
      },
      {
        path: '/history',
        name: 'History',
        component: () => import('pages/History.vue')
      },
      {
        path: '/account',
        name: 'Account',
        component: () => import('pages/Account.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/Login.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
