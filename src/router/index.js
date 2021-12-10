import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from '../views/Top.vue'
import FileData from '../views/FileData.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: '/fileData',
    name: 'FileData',
    component: FileData
    
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
