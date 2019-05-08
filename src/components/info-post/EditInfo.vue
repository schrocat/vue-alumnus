<template>
    <div class="box">
        <div class="box-header with-border">
            <h3 class="box-title">修改信息</h3>
        </div>
        <div class="box-body">
            <div class="form-group">
                <input class='form-control' placeholder="标题" v-model="form.title">
            </div>
            <div class="form-group">
                <select name="info-type" id="info-type" class="form-control" v-model="form.type">
                    <option value="" selected disabled class="placeholder">- - -请选择信息类型- - -</option>
                    <option value="1">政策</option>
                    <option value="2">就业</option>
                    <option value="3">新闻</option>
                    <option value="4">其他</option>
                </select>
            </div>
            <div class="form-group">
                <select name="info-type" id="info-type" class="form-control" v-model="form.academyId">
                    <option value="" selected disabled class="placeholder">- - -请选择发布单位- - -</option>
                    <option v-for="academy in academies" :key="academy.id" :value="academy.id">{{academy.name}}</option>
                </select>
            </div>
            <div class="form-group">
                <div ref="editor" style="text-align:left;width:100%;"></div>
            </div>
        </div>
        <div class="box-footer">
            <!-- <div class="btn btn-default btn-file">
                <i class="fa fa-paperclip"></i>附件
                <input type="file" ref="attachment" name="attachment" multiple="multiple" @change="upload_file">
            </div> -->
            <!-- <a class="help-block" v-for="file in files" :key="file.name">{{file.name}}</a> -->
            <div class="pull-right">
                <button type="submit" class="btn btn-primary" @click="updateOa">
                    <i class="fa fa-envelope-o"></i>&nbsp;&nbsp;&nbsp;&nbsp;编辑&nbsp;&nbsp;&nbsp;&nbsp;
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import E from 'wangeditor'
import sso from '@/utils/oss.js'
import { getAcademies, getOaById, updateOa } from '@/api'
// import store from '@/store'
// import { parse } from 'path';
// import { Loading } from 'element-ui'
export default {
  name: 'CreateInfo',
  data () {
    return {
      form: {
        id: '',
        title: '',
        type: '',
        content: '',
        userId: 1,
        academyId: ''
        // files: []
      },
      files: [],
      text: '',
      academies: []
    }
  },
  methods: {
    async updateOa () {
      // const user = store.getters.user
      const id = this.form.id
      const params = {
        title: this.form.title,
        content: this.form.content,
        type: parseInt(this.form.type),
        academyId: parseInt(this.form.academyId)
      }
      const data = await updateOa(id, params)
      if (data.code === 0) {
        this.$message.success('编辑成功')
      }
      this.$router.push('/index/post/allInfo')
    },
    async upload_file () {
      this.files = this.$refs.attachment.files
      this.form.files = await sso.uploadMutilLocalFiles(this.files)
    },
    async getAcademies_t () {
      const data = await getAcademies()
      this.academies = data.data
    },
    getOa (id) {
      getOaById(id)
        .then(res => {
          if (res.code === 0) {
            this.form = res.data
            this.w_editor.txt.html(this.form.content)
          }
        })
    }
  },
  mounted () {
    var editor = new E(this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      this.form.content = html
    }
    editor.customConfig.menus = [
      'head',
      'bold',
      'fontSize',
      'fontName',
      'italic',
      'underline',
      'strikeThrough',
      'foreColor',
      'backColor',
      'link',
      'list',
      'justify',
      'quote',
      'emoticon',
      'table',
      'code',
      'undo',
      'redo'
    ]
    editor.create()
    this.w_editor = editor
    this.getAcademies_t()
    this.getOa(this.$route.params.id)
  }
}
</script>

<style>
.placeholder{
  color: gray;
  display: none;
}
</style>
