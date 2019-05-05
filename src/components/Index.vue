<template>
  <div class="wrapper">
    <!-- <Header></Header> -->
    <a-header></a-header>
    <a-aside></a-aside>
    <!-- <Aside></Aside> -->
    <div class="content-wrapper">
      <div class="content_s">
        <router-view/>
      </div>
    </div>
    <!-- <Footer></Footer> -->
    <a-footer></a-footer>
    <div class="control-sidebar-bg"></div>
  </div>
</template>
<script>
import HeaderP from './indexP/HeaderP'
import AsideP from './indexP/AsideP'
import FooterP from './indexP/FooterP'
export default {
  name: 'Index',
  components: {
    'a-footer': FooterP,
    'a-aside': AsideP,
    'a-header': HeaderP
  }
}
</script>
<style>
.content_s{
  min-height: 700px;
}
</style>
