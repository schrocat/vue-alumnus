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
import Header from './indexP/Header'
import Aside from './indexP/Aside'
import Footer from './indexP/Footer'
export default {
  name: 'Index',
  components: {
    'a-footer': Footer,
    'a-aside': Aside,
    'a-header': Header
  }
}
</script>
<style>
.content_s{
  min-height: 700px;
}
</style>
