// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'ionicons/dist/css/ionicons.css'
import 'admin-lte/dist/css/skins/_all-skins.css'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'admin-lte/dist/js/adminlte.min'
import 'wangeditor/release/wangEditor.min'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import bdm from 'vue-baidu-map'
import vchart from 'v-charts'
import { setCookie } from '@/utils'
import { getLoginStatus, getUserInfo } from '@/api'

Vue.use(ElementUI)
Vue.use(bdm, {
  ak: 'HGvWdWGbxLlxvNWe7iFueKB9G5qGmY1S'
})
Vue.use(vchart)
Vue.config.productionTip = false
router.beforeEach(async (to, from, next) => {
  if (to.query.auth_token) {
    setCookie('auth_token', to.query.auth_token)
    const data = await getLoginStatus()
    // console.log(data)
    if (data.code === 0) {
      localStorage.setItem('isLogin', true)
      store.commit('loginStatus', true)
      const route = {...to, replace: true}
      delete route.query.auth_token
      next(route)
    } else {
      window.location.href = 'http://stuer.ericwu.cn/sso'
    }
  }
  const isLogin = localStorage.getItem('isLogin')
  // console.log(`isLogin=${isLogin}`)
  if (isLogin) {
    if (!store.getters.user) {
      const result = await getUserInfo()
      if (result.code === 0 && (result.data.role === 8 || result.data.role === 6)) {
        store.commit('setUser', result.data)
        store.commit('loginStatus', true)
      } else {
        localStorage.removeItem('isLogin')
        store.commit('setUser', null)
        store.commit('loginStatus', false)
        window.location.href = '/'
      }
    }
    next()
  } else {
    const data = await getLoginStatus()
    if (data.code === 0) {
      localStorage.setItem('isLogin', true)
      store.commit('loginStatus', true)
      if (!store.getters.user) {
        const rs = await getUserInfo()
        if (rs.code === 0) {
          store.commit('setUser', rs.data)
        }
      }
      next()
    } else {
      const nhref = window.location.href
      window.location.href = `http://stuer.ericwu.cn/sso?redirect=${nhref}`
    }
  }
})
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
