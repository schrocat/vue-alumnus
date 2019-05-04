<template>
    <div class="box">
        <div class="box-header with-border">
            <h3 class="box-title">新建信息</h3>
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
            <div class="btn btn-default btn-file">
                <i class="fa fa-paperclip"></i>附件
                <input type="file" ref="attachment" name="attachment" multiple="multiple" @change="upload_file">
            </div>
            <a class="help-block" v-for="file in files" :key="file.name">{{file.name}}</a>
            <div class="pull-right">
                <button type="submit" class="btn btn-primary" @click="postOa()">
                    <i class="fa fa-envelope-o"></i>&nbsp;&nbsp;&nbsp;&nbsp;发布&nbsp;&nbsp;&nbsp;&nbsp;
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import E from 'wangeditor'
import sso from '@/utils/oss.js'
import { postOa, getAcademies } from '@/api'
import { Loading } from 'element-ui'
import store from '@/store'
export default {
  name: 'CreateInfo',
  data () {
    return {
      form: {
        title: '',
        type: '',
        content: '',
        userId: '',
        academyId: '',
        files: []
      },
      files: [],
      text: '',
      academies: []
    }
  },
  methods: {
    async postOa () {
      const user = store.getters.user
      this.form.userId = user.id
      this.form.content = this.w_editor.txt.html()
      this.form.type = parseInt(this.form.type)
      this.form.academyId = parseInt(this.form.academyId)
      var option = {text: '发布中'}
      var loading = Loading.service(option)
      postOa(this.form)
        .then(res => {
          var data = res.data
          if (data.code === 0) {
            this.$nextTick(() => {
              loading.close()
            })
            this.$message({
              message: '发布成功！',
              type: 'success'
            })
            this.initForm()
            this.w_editor.txt.clear()
          }
        })
        .catch(err => {
          this.$nextTick(() => {
            loading.close()
          })
          this.$message({
            message: `发布失败!原因：${err}`,
            type: 'warning'
          })
        })
    },
    async upload_file () {
      this.files = this.$refs.attachment.files
      this.form.files = await sso.uploadMutilLocalFiles(this.files)
    },
    initForm () {
      const user = store.getters.user
      this.form = {
        title: '',
        type: '',
        content: '',
        userId: user.id,
        academyId: '',
        files: []
      }
    },
    async getAcademies_t () {
      const data = await getAcademies()
      this.academies = data.data
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
  }
}
</script>

<style>
.placeholder{
  color: gray;
  display: none;
}
</style>
