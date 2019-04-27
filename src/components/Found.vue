<template>
    <section class="content">
        <div class="row">
            <div class="col-md-3">
                <el-menu :default-active="1" class="el-menu-vertical-demo" router="true">
                    <el-menu-item :index="1" route="">
                        <i class="fa fa-file-text-o"></i>
                        <span slot="title">未审核招聘信息</span>
                    </el-menu-item>
                    <el-menu-item :index="2" route="#">
                        <i class="fa fa-inbox"></i>
                        <span slot="title">已发布招聘信息</span>
                    </el-menu-item>
                    <el-menu-item :index="3" route="#">
                        <i class="fa fa-trash-o"></i>
                        <span slot="title">已删除招聘信息</span>
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

}
</script>

<style>

</style>
