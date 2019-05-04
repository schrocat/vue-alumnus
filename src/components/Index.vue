<template>
  <div class="wrapper">
    <Header></Header>
    <Aside></Aside>
    <div class="content-wrapper">
      <div class="content_s">
        <router-view/>
      </div>
    </div>
    <Footer></Footer>
    <div class="control-sidebar-bg"></div>
  </div>
</template>
<script>
import Footer from './index/Footer'
import Aside from './index/Aside'
import Header from './index/Header'
export default {
  name: 'Index',
  components: {Footer, Aside, Header}
}
</script>
<style>
.content_s{
  min-height: 700px;
}
</style>
