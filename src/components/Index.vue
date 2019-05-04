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
import Footer from '@/components/index/Footer'
import Aside from '@/components/index/Aside'
import Header from '@/components/index/Header'
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
