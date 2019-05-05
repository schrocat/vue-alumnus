import Vue from 'vue'
import Router from 'vue-router'
import InfoCount from '@/components/InfoCount'
import InfoPost from '@/components/InfoPost'
import AllInfo from '@/components/info-post/AllInfo'
import CreateInfo from '@/components/info-post/CreateInfo'
import System from '@/components/System'
import ShowInfo from '@/components/info-post/ShowInfo'
import Colloge from '@/components/Colloge'
import Check from '@/components/Check'
import Found from '@/components/Found'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Comtype from '@/components/info-count/ComType'
import BMap from '@/components/info-count/Map'
import ERate from '@/components/info-count/ERate'
import Home from '@/components/Home'
import DelInfo from '@/components/info-post/DelInfo'
import EditInfo from '@/components/info-post/EditInfo'
import Evaluation from '@/components/info-count/Evaluation'
import Salary from '@/components/info-count/Salary'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'info',
          component: InfoCount,
          children: [
            {
              path: 'com',
              component: Comtype
            },
            {
              path: 'map',
              component: BMap
            },
            {
              path: 'erate',
              component: ERate
            },
            {
              path: 'eva',
              component: Evaluation
            },
            {
              path: 'salary',
              component: Salary
            }
          ]
        },
        {
          path: 'post',
          component: InfoPost,
          children: [
            {
              path: 'allInfo',
              component: AllInfo
            },
            {
              path: 'createInfo',
              component: CreateInfo
            },
            {
              path: 'showInfo/:id',
              component: ShowInfo
            },
            {
              path: 'delInfo',
              component: DelInfo
            },
            {
              path: 'editInfo/:id',
              component: EditInfo
            }
          ]
        },
        {
          path: 'system',
          component: System
        },
        {
          path: 'colloge',
          component: Colloge
        },
        {
          path: 'check',
          component: Check
        },
        {
          path: 'found',
          component: Found
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/index/info/com'
    },
    {
      path: '/home',
      component: Home
    }
  ]
})
