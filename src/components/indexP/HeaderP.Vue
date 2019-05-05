<template>
    <header class="main-header skin-black">
      <a class="logo" href="#">
        <span class="logo-mini">
          <b>毕</b>
        </span>
        <span class="logo-lg">
          <b>毕业生追踪平台</b>
        </span>
      </a>
      <nav class="navbar navbar-static-top" role="navigation">
        <a href="#" class="sidebar-toggle"  data-toggle="push-menu" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <li class="dropdown user user-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img :src="user.avatar" class="user-image" alt="User Image">
                <span class="hidden-xs">{{user.email}}</span>
              </a>
              <ul class="dropdown-menu">
                <li class="user-header">
                  <img :src="user.avatar" class="img-circle" alt="User Image">
                  <p style="font-size:16px">{{user.email}}</p>
                  <p style="font-size:16px">{{user.role===8?'超级管理员':'学校管理员'}}</p>
                  <!-- <p style="font-size:16px" v-else>用户身份：学校管理员</p> -->
                </li>
                <li class="user-body">
                  <p>真实姓名:{{user.name?user.name:'不愿意透露姓名的人'}}</p>
                  <p>昵称:{{user.nickName?user.nickName:'连nickname都没有的人'}}</p>
                  <p>性别:{{user.gender===1?'男':'女'}}</p>
                  <p>年龄:{{user.age?user.age:'年龄是个秘密'}}</p>
                  <p>生日:{{user.birthTime?user.birthTime:'神秘一点好'}}</p>
                  <p>学院:{{academy}}</p>
                  <p>专业:{{major}}</p>
                  <p>个性签名:{{user.personSign?user.personSign:'这个人什么都没写...'}}</p>
                </li>
                <li class="user-footer">
                  <div class="pull-left">
                    <a class="btn btn-default btn-flat" href="/home" target="_blank">修改资料</a>
                  </div>
                  <div class="pull-right">
                    <a class="btn btn-default btn-flat" @click="logout()">注销</a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
</template>

<script>
import store from '@/store'
import { deleteCookie } from '@/utils'
import { showAcademy, showMajor } from '@/api'
export default {
  name: 'Header',
  data () {
    return {
      user: {},
      academy: '无',
      major: '无'
    }
  },
  methods: {
    setUser () {
      this.user = store.getters.user
      this.setAcademy(this.user.academyId)
      this.setMajor(this.user.majorId)
    },
    async setAcademy (id) {
      const data = await showAcademy(id)
      if (data.code === 0) {
        const a = data.data
        if (a) {
          this.academy = a.name
        }
      }
    },
    async setMajor (id) {
      const data = await showMajor(id)
      if (data.code === 0) {
        const m = data.data
        if (m) {
          this.major = m.name
        }
      }
    },
    logout () {
      deleteCookie('auth_token')
      localStorage.removeItem('isLogin')
      store.commit('setUser', null)
      store.commit('loginStatus', false)
      window.location.href = '/'
    }
  },
  mounted () {
    this.setUser()
  }
}
</script>

<style>

</style>
