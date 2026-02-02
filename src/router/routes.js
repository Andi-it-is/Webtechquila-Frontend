const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'reservation', component: () => import('pages/ReserveTable.vue') },
    ]
  },
  {
    path: '/order',
    component: () => import('layouts/CheckoutLayout.vue'),
    children: [
      { path: 'checkout', component: () => import('pages/CheckoutTable.vue') },
      { path: 'confirm', component: () => import('pages/ConfirmOrder.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
