import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from '../views/Top.vue'
import FileData from '../views/FileData.vue'
import LoginSetting from '../views/LoginSetting.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: '/fileData/:assess_num',
    name: 'FileData',
    component: FileData,
    props: true,
    
  },
  {
    path: '/loginSetting',
    name: 'LoginSetting',
    component: LoginSetting,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
