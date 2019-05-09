<template>
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-body">
                  <el-table :data="majors"  stripe>
                      <el-table-column
                        label="编号"
                        type="index"
                        width="50px">
                      </el-table-column>
                      <el-table-column
                        label="专业名"
                        prop="name"
                        width="150">
                      </el-table-column>
                      <el-table-column
                        label="所属院"
                        prop="academy_name"
                        width="150">
                      </el-table-column>
                      <el-table-column
                        label="院信息"
                        prop="info">
                      </el-table-column>
                      <el-table-column
                        label=""
                        width="100px">
                        <template slot-scope="scope">
                          <div class="pull-right">
                            <button type="button" class="btn btn-default btn-sm" @click="edit_info(majors[scope.$index])">
                              <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" class="btn btn-defalut btn-sm" @click="openMessageBox(majors[scope.$index].id)">
                              <i class="fa fa-trash-o"></i>
                            </button>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-dialog
                        title= " "
                        :visible.sync="dialog_visible"
                        @close="dialog_visible = false">
                        <el-form :model="form" ref="form" label-width="80px">
                            <el-form-item label="系名">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="所属院">
                                <el-select v-model="form.academyId">
                                    <el-option v-for="academy in academys"
                                        :key="academy.id"
                                        :label="academy.name"
                                        :value="academy.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="系信息">
                                <el-input type="textarea" :rows="5" v-model="form.info" placeholder="请输入信息"></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer">
                            <el-button @click="dialog_visible = false,init_form">取 消</el-button>
                            <el-button type="primary" @click="update_major" v-if="isEdit">修改</el-button>
                            <el-button type="primary" @click="post_major" v-else>确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
                <div class="box-footer">
                    <el-button  icon="el-icon-refresh" size="mini" style="padding:7px;margin-left:0px;" @click="refresh()"></el-button>
                    <el-button type="primary" @click="dialog_visible = true;isEdit = false;" plain class="pull-right" size="mini">新增系</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { updateMajor, getMajors, deleteMajor, insertMajor, getAcademies } from '@/api'
import { Loading } from 'element-ui'
export default {
  name: 'Major',
  data () {
    return {
      dialog_visible: false,
      isEdit: false,
      editId: '',
      academys: [],
      form: {
        academyId: '',
        name: '',
        info: ''
      },
      majors: []
    }
  },
  methods: {
    edit_info (param) {
      this.dialog_visible = true
      this.isEdit = true
      this.editId = param.id
      this.form.name = param.name
      this.form.info = param.info
      this.form.academyId = param.academyId
    },
    init_form () {
      this.form.name = ''
      this.form.academyId = ''
      this.form.info = ''
    },
    async get_majors () {
      const data = await getMajors()
      if (data.code === 0) {
        this.majors = data.data
      } else {
        this.$message.warning('获取数据失败')
      }
    },
    async post_major () {
      if (this.isBlank(this.form)) {
        this.$message.warning('名称、所属院不能为空！')
        return
      }
      const data = await insertMajor(this.form)
      this.dialog_visible = false
      if (data.code === 0) {
        this.$message.success('新增成功')
      } else {
        this.$message.warning(`错误：${data.code}:${data.msg}`)
      }
      this.init_form()
      this.get_majors()
    },
    async update_major () {
      const data = await updateMajor(this.editId, this.form)
      this.dialog_visible = false
      if (data.code === 0) {
        this.$message.success('修改成功!')
      } else {
        this.$message.warning(`修改失败！${data.code}:${data.msg}`)
      }
      this.init_form()
      this.get_majors()
    },
    async delete_major (id) {
      const data = await deleteMajor(id)
      if (data.code === 0) {
        this.$message.success('删除成功')
      } else {
        this.$message.warning(`删除失败${data.code}:${data.msg}`)
      }
      this.get_majors()
    },
    async get_academys () {
      const data = await getAcademies()
      if (data.code === 0) {
        this.academys = data.data
      }
    },
    openMessageBox (id) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete_major(id)
      }).catch(() => {
      })
    },
    async refresh () {
      var loading = Loading.service({text: '刷新中……'})
      const data = await getMajors()
      if (data.code === 0) {
        this.majors = data.data
        this.$message.success('刷新成功')
      }
      this.$nextTick(() => {
        loading.close()
      })
    },
    isBlank (params) {
      return (params.name === '') || (params.academyId === '')
    }
  },
  mounted () {
    this.get_majors()
    this.get_academys()
  }
}
</script>
