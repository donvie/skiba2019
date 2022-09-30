
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'Services',
        component: () => import('pages/Services/Index.vue')
      },
      {
        path: '/home_cleaning',
        name: 'Home Cleaning',
        component: () => import('pages/Services/HomeCleaning.vue')
      },
      {
        path: '/map',
        name: 'Map',
        component: () => import('pages/Map.vue')
      },
      {
        path: '/book_now',
        name: 'Book Now',
        component: () => import('pages/BookNow.vue')
      },
      {
        path: '/wiskillerprofile',
        name: 'Profile',
        component: () => import('pages/wiSkillerProfile.vue')
      },
      {
        path: '/favourite',
        name: 'Favourite',
        component: () => import('pages/Favourite.vue')
      },
      {
        path: '/booking',
        name: 'Booking History',
        component: () => import('pages/Booking.vue')
      },
      {
        path: '/upcoming',
        name: 'Upcoming',
        component: () => import('pages/Upcoming.vue')
      },
      {
        path: '/account',
        name: 'Account',
        component: () => import('pages/Account.vue')
      },
      {
        path: '/transaction',
        name: 'Transaction',
        component: () => import('pages/Transaction.vue')
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
