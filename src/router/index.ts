import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
//import Home from '../views/Home.vue'

import Landing from '../views/Landing.vue'
import OrphanagesMap from '../views/OrphanagesMap.vue'
import CreateOrphanage from '../views/CreateOrphanage.vue'
import Orphanage from '../views/Orphanage.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/',
    name: 'home',
    component: Landing
  },
  {
    path: '/app',
    name: 'map',
    component: OrphanagesMap
  },
  {
    path: '/orphanages/create',
    name: 'create',
    component: CreateOrphanage
  },
  {
    path: '/orphanages/:id',
    name: 'show',
    component: Orphanage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router