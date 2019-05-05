<template>
  <div class="wrapper">
    <HeaderP></HeaderP>
    <!-- <a-header></a-header>
    <a-aside></a-aside> -->
    <AsideP></AsideP>
    <div class="content-wrapper">
      <div class="content_s">
        <router-view/>
      </div>
    </div>
    <FooterP></FooterP>
    <!-- <a-footer></a-footer> -->
    <div class="control-sidebar-bg"></div>
  </div>
</template>
<script>
import HeaderP from './indexP/HeaderP'
import AsideP from './indexP/AsideP'
import FooterP from './indexP/FooterP'
export default {
  name: 'Index',
  components: {FooterP, AsideP, HeaderP}
}
</script>
<style>
.content_s{
  min-height: 700px;
}
</style>
