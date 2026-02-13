const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'reservation', component: () => import('pages/ReserveTable.vue') },
      { path: 'direction', component: () => import('pages/DirectionsPage.vue') }
      { path: 'impressum', component: () => import('pages/ImpressumPage.vue') },
      { path: 'datenschutz', component: () => import('pages/DatenschutzPage.vue') }
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
