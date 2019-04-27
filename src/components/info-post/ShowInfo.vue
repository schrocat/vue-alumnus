<template>
    <div class="box box-primary">
      <div class="box-header">
        <el-button type="text" @click="back" icon="el-icon-back" size="middle"></el-button>
        <h3 class="box-title">信息详情</h3>
      </div>
      <div class="box-body" style="background:#eee">
        <h3 class="title">{{message.title}}</h3>
        <div class="p-gray">
          <dl v-html="message.content"></dl>
        </div>
        <div class="p-gray">
          <p v-if="files.length>0">附件：</p>
          <a v-for="file in files" :key="file.id" :href="file.url">{{file.name}}</a>
        </div>
      </div>
      <div class="box-footer"></div>
    </div>
</template>

<script>
import { getOaById } from '@/api'

export default {
  name: 'ShowInfo',
  data () {
    return {
      message: {},
      files: []
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    async getOA () {
      var id = this.$route.params.id
      const data = await getOaById(id)
      this.message = data.data
      this.files = this.message.files
    }
  },
  mounted () {
    this.getOA()
  }
}
</script>
<style scoped>
.p-gray{
  font-size: 20px;
  margin-top: 2%;
  margin-left: 8%;
  margin-right: 8%;
  white-space: pre-line;
}
.title{
  text-align:center;
  font-weight: bold;
  font-size: 32px;
}
</style>
