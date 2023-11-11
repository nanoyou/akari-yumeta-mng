import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/views/layout/LayoutContainer.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/HomePage.vue')
      },
      {
        path: '/children',
        name: 'children',
        component: () => import('@/views/children/ChildrenMngPage.vue')
      },
      {
        path: '/volunteer',
        name: 'volunteer',
        component: () => import('@/views/volunteer/VolunteerMngPage.vue')
      },
      {
        path: '/contributor',
        name: 'contributor',
        component: () => import('@/views/contributor/ContributorMngPage.vue')
      },
      {
        path: '/news',
        name: 'news',
        component: () => import('@/views/news/NewsMngPage.vue')
      },
      {
        path: '/learning',
        name: 'learning',
        component: () => import('@/views/learning/LearningTasksPage.vue')
      },
      {
        path: '/personal',
        name: 'personal',
        component: () => import('@/views/personal/PersonalInfoPage.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
