<template>
    <div>
        <el-menu mode="horizontal" :router="true" default-active="1-1">
            <el-submenu index="1">
                <template slot="title">学生相关信息统计</template>
                <el-menu-item index="1-1" route="/index/info/com">工作单位性质统计</el-menu-item>
                <el-menu-item index="1-2" route="/index/info/map">就业地区分布统计</el-menu-item>
                <el-menu-item index="1-3" route="/index/info/erate">就业率及就业去向分布统计</el-menu-item>
            </el-submenu>
            <el-menu-item index="2" route="/index/info/eva">企业相关信息统计</el-menu-item>
        </el-menu>
        <div><router-view/></div>
    </div>
</template>
<script>
export default {
  name: 'InfoCount'
}
</script>
