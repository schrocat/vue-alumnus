<template>
    <section class="content">
        <div class="row">
            <div class="col-md-3">
                <el-menu  class="el-menu-vertical-demo" :router="true">
                    <el-menu-item index="1" route="/index/post/createInfo">
                        <i class="fa fa-file-text-o"></i>
                        <span slot="title">新建信息</span>
                    </el-menu-item>
                    <el-menu-item index="2" route="/index/post/allInfo">
                        <i class="fa fa-inbox"></i>
                        <span slot="title">所有信息</span>
                    </el-menu-item>
                    <el-menu-item index="3" route="/index/post/DelInfo">
                        <i class="fa fa-trash-o"></i>
                        <span slot="title">信息回收</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="col-md-9">
                <router-view/>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'InfoPost',
  data () {
    return {
    }
  }
}
</script>
