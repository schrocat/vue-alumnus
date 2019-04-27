<template>
  <div class="wrapper">
    <Header></Header>
    <Aside></Aside>
    <div class="content-wrapper">
      <router-view/>
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
