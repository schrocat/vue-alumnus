// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'font-awesome/css/font-awesome.css'
import 'ionicons/dist/css/ionicons.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'admin-lte/dist/css/skins/_all-skins.css'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/plugins/iCheck/all.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'admin-lte/dist/js/adminlte.min.js'
import 'wangeditor/release/wangEditor.min.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import bdm from 'vue-baidu-map'
import vchart from 'v-charts'
import Key from './js/Key'
// import { setCookie } from '@/utils/cookies'
// import { getLoginStatus } from '@/api'

Vue.use(ElementUI)
Vue.use(bdm, {
  ak: 'HGvWdWGbxLlxvNWe7iFueKB9G5qGmY1S'
})
Vue.use(vchart)
const AXIOSBASE = axios.create({
  baseURL: 'http://127.0.0.1:7001'
})

Vue.prototype.$api = AXIOSBASE
Vue.config.productionTip = false

// localStorage keys
Vue.prototype.key = Key

// router.beforeEach(async (to, from, next) => {
//   if(to.query.auto_token) {
//     setCookie('auto_token',to.query.auto_token,1)
//     const data = await getLoginStatus()
//     console.log(data)
//     if (data.code === 0) {
//       localStorage.setItem('isLogin', true)
//       store.commit('loginStatus', true)
//       const route = { ...to, replace: true}
//       delete route.query.auto_token
//       next(route)
//     }else {
//       window.location.href = 'http://stuer.ericwu.cn/sso'
//     }
//   }
//   const isLogin = localStorage.getItem('isLogin')
//   if (isLogin) {
//     store.commit('loginStatus', true)
//     if (!store.getters.user) {
//       const result = await getUserInfo();
//       if (result.code === 0) {
//         store.commit('setUser', result.data)
//       }
//     }
//     next()
//   } else {
//     if (to.meta.needLogin) {
//       const data = await getLoginStatus()
//       if (data.code === 0) {
//         localStorage.setItem('isLogin', true)
//         store.commit('loginStatus', true)
//         if (!store.getters.user) {
//           const result = await getUserInfo()
//           if (result.code === 0) {
//             store.commit('setUser', result.data)
//           }
//         }
//         next()
//       } else {
//         const nowHref = window.location.href
//         window.location.href = `http://stuer.ericwu.cn/sso?redirect=${nowHref}`
//       }
//     }else {
//       next()
//     }
//   }
// })
// router.beforeEach(async (to, from, next) => {
//   if (to.query.auth_token) {
//     setCookie('auth_token', to.query.auth_token, 1)
//   }

//   const isLogin = localStorage.getItem('isLogin')
//   // console.log(isLogin)
//   if (isLogin) {
//     store.commit('loginStatus', true)
//     next()
//   } else {
//     const data = await getLoginStatus()
//     // console.log(data)
//     if (data.code === 0) {
//       localStorage.setItem('isLogin', true)
//       next()
//     } else {
//       const nowHref = window.location.href
//       window.location.href = `http://stuer.ericwu.cn/sso?redirect=${nowHref}`
//     }
//   }
// })

/* eslint-disable no-new */
/* eslint-disable */
// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
