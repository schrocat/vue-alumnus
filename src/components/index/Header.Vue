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
                <img :src="avatar_url" class="user-image" alt="User Image">
                <span class="hidden-xs">{{username}}</span>
              </a>
              <ul class="dropdown-menu">
                <li class="user-header">
                  <img :src="avatar_url" class="img-circle" alt="User Image">
                  <p style="font-size:16px">用户名：{{username}}</p>
                  <p style="font-size:16px" v-if="userType===1">超級管理员</p>
                  <p style="font-size:16px" v-else>管理员</p>
                </li>
                <li class="user-body">
                  <p>真实姓名:-_-</p>
                  <p>昵称:--_--</p>
                  <p>性别:?</p>
                  <p>年龄:99</p>
                  <p>个性签名:什么都留下</p>
                  <p>生日:1999.99.99</p>
                </li>
                <li class="user-footer">
                  <div class="pull-left">
                    <a class="btn btn-default btn-flat">修改资料</a>
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
export default {
  data () {
    return {
      avatar_url: '',
      username: 'super_admin',
      userType: 1
    }
  },
  mounted () {
    this.avatar_url = 'http://schrocat.oss-cn-shenzhen.aliyuncs.com/avatar.png'
  }
}
</script>

<style>

</style>
