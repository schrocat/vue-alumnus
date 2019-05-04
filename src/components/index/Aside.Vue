<template>
    <aside class="main-sidebar">
      <section class="sidebar">
        <ul class="sidebar-menu" data-widget="tree">
          <li class="treeview">
            <router-link to="/index/info/com">
              <i class="fa fa-pie-chart"></i>
              <span>信息统计</span>
            </router-link>
          </li>
          <li class="treeview">
            <router-link to="/index/post/createInfo">
              <i class="nav-icon fa fa-edit"></i>
              <span>信息发布</span>
            </router-link>
          </li>
          <li class="treeview">
            <a>
              <i class="fa fa-th"></i>
              <span>系统设置</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link to="/index/colloge">
                  <i class="fa fa-circle-o"></i>
                  院系结构管理
                </router-link>
              </li>
              <li>
                <router-link to="/index/system">
                  <i class="fa fa-circle-o"></i>
                  用户账号管理
                </router-link>
              </li>
            </ul>
          </li>
          <li class="treeview">
            <a>
                <i class="fa fa-dashboard"></i>
              <span>企业信息管理</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link to="/index/check">
                  <i class="fa fa-circle-o"></i>
                企业信息审核
                </router-link>
              </li>
              <li>
                <router-link to="/index/found">
                  <i class="fa fa-circle-o"></i>
                  企业招聘信息发布
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </aside>
</template>

<script>
export default {
  name: 'Aside'
}
</script>

<style>

</style>
