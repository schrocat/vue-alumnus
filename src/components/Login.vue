<template>
    <div>
        <div class="col-md-4"></div>
        <div class="col-md-4">
            <br v-for="n in 8" :key="n">
            <el-card :body-style="{ padding: '64px' }">
                <div class="login-logo"><b>毕业生追踪平台</b></div>
                <el-form :model="d_login" ref="d_login">
                    <el-form-item>
                        <el-input v-model="d_login.email" placeholder="email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="d_login.password" type="password" placeholder="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login" style="width:100%;">{{login_label}}</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
        <div class="col-md-2"></div>
    </div>
</template>

<script>
import S from '../js/localStore.js'
export default {
  inject: ['reload'],
  data () {
    return {
      d_login: {
        email: '',
        password: ''
      },
      login_label: '登录'
    }
  },
  methods: {
    login () {
      if (this.d_login.email === '' || this.d_login.password === '') {
        this.$message({
          message: '账号、密码不能为空!!',
          type: 'warning'
        })
      } else if (!this.email_reg(this.d_login.email)) {
        this.$message({
          message: '邮箱格式不正确，请重新输入!',
          type: 'warning'
        })
      } else {
        this.login_label = '登录中……'
        this.$api.post('/api/login', this.d_login)
          .then(res => {
            var data = res.data.data
            if (data.message === 'success') {
              S.save(data.data)
              this.$router.push('/index/info/com')
              location.reload()
            } else {
              this.$message({
                message: 'login failed',
                type: 'warning'
              })
              this.login_label = '登录'
            }
          })
          .catch(err => {
            this.$message({
              message: err,
              type: 'warning'
            })
            this.login_label = '登录'
          })
      }
    },
    email_reg (email) {
      var reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      if (reg.test(email)) {
        return true
      }
      return false
    }
  }
}
</script>

<style>

</style>
