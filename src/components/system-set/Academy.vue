<template>
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-body">
                    <el-table :data="table_items"  stripe>
                      <el-table-column
                        label="编号"
                        type="index"
                        width="50px">
                      </el-table-column>
                      <el-table-column
                        label="院名"
                        prop="name"
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
                            <button type="button" class="btn btn-default btn-sm" @click="edit_form(table_items[scope.$index])">
                              <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" class="btn btn-defalut btn-sm" @click="openMessageBox(table_items[scope.$index].id)">
                              <i class="fa fa-trash-o"></i>
                            </button>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-dialog
                        title=""
                        :visible.sync="dialogFormVisible"
                        @close="dialogFormVisible = false">
                        <el-form :model="form" ref="form" label-width="80px">
                            <el-form-item label="院名">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="院信息">
                                <el-input type="textarea" :rows="5" v-model="form.info" placeholder="请输入信息"></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer">
                            <el-button @click=" dialogFormVisible = false, init_form">取 消</el-button>
                            <el-button type="primary" @click="update_academy" v-if="isEdit">修改</el-button>
                            <el-button type="primary" @click="post_academy" v-else>确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
                <div class="box-footer">
                    <el-button  icon="el-icon-refresh" size="mini" style="padding:7px;margin-left:0px;" @click="refresh()"></el-button>
                    <el-button type="primary" plain @click="dialogFormVisible = true;isEdit = false;" class="pull-right" size="mini">新增院</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAcademies, updateAcademy, deleteAcademy, insertAcademy } from '@/api/academy'
import { Loading } from 'element-ui'
export default {
  name: 'Academy',
  data () {
    return {
      dialogFormVisible: false,
      isEdit: false,
      editId: '',
      form: {
        name: '',
        info: ''
      },
      table_items: []
    }
  },
  methods: {
    async get_academys () {
      const data = await getAcademies()
      this.table_items = data.data
    },
    async post_academy () {
      const data = await insertAcademy(this.form)
      this.dialogFormVisible = false
      if (data.code === 0) {
        this.$message.success('新增成功')
      } else {
        this.$message.warning(`错误:${data.code}，原因:${data.msg}`)
      }
      this.init_form()
      this.get_academys()
    },
    async delete_academy (id) {
      const data = await deleteAcademy(id)
      if (data.code === 0) {
        this.$message.success('删除成功')
      } else {
        this.$message.warning(`删除失败！${data.code}:${data.msg}`)
      }
      this.get_academys()
    },
    async update_academy () {
      const data = await updateAcademy(this.editId, this.form)
      this.dialogFormVisible = false
      if (data.code === 0) {
        this.$message.success('修改成功')
      } else {
        this.$message.warning(`修改失败！${data.code}：${data.msg}`)
      }
      this.init_form()
      this.get_academys()
    },
    edit_form (params) {
      this.form.name = params.name
      this.form.info = params.info
      this.editId = params.id
      this.dialogFormVisible = true
      this.isEdit = true
    },
    init_form () {
      this.form.name = ''
      this.form.info = ''
    },
    openMessageBox (id) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete_academy(id)
      }).catch(() => {
      })
    },
    async refresh () {
      var loading = Loading.service({text: '刷新中……'})
      const data = await getAcademies()
      if (data.code === 0) {
        this.table_items = data.data
        this.$message.success('刷新成功')
      }
      this.$nextTick(() => {
        loading.close()
      })
    }
  },
  mounted () {
    var loading = Loading.service({text: '数据加载中……'})
    getAcademies()
      .then(res => {
        if (res.code === 0) {
          this.table_items = res.data
        }
      })
    this.$nextTick(() => {
      loading.close()
    })
  }
}
</script>
