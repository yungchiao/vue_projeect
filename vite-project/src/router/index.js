import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',

    },
    {
      path: '/login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/dashboard',
      component: () => import('../views/Dashboard.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/Product.vue'),
        }
      ]
    }, {
      path: '/material',
      name: 'material',
      component: () => import('../views/Material.vue')
    }
  ]
});

export default router;
