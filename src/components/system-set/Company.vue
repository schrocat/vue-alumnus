<template>
    <div class="row">
    <div class="col-xs-12">
        <div class="box">
            <div class="box-body">
                <el-table :data="comusers"  stripe>
                    <el-table-column
                        label="编号"
                        type="index"
                        width="50px">
                    </el-table-column>
                    <el-table-column
                        label="账号"
                        prop="email">
                    </el-table-column>
                    <el-table-column
                        label="密码"
                        prop="password">
                    </el-table-column>
                    <el-table-column
                        label="公司名称"
                        prop="company">
                    </el-table-column>
                    <el-table-column
                        label=""
                        width="100px">
                        <template slot-scope="scope">
                            <div class="pull-right">
                              <button type="button" class="btn btn-default btn-sm" @click="edit_form(comusers[scope.$index])">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button type="button" class="btn btn-defalut btn-sm" @click="openBox(comusers[scope.$index].id)">
                                    <i class="fa fa-trash-o"></i>
                                </button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog
                  :visible.sync="dialog_visible"
                  @close="dialog_visible = false">
                  <el-form :model="form" label-width="80px" :rules="rules">
                    <el-form-item label="账号" prop="email">
                      <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                      <el-input v-model="form.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="surePwd">
                      <el-input v-model="form.surePwd" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="公司" prop="company_name">
                      <el-input v-model="form.company.name"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer">
                    <el-button @click="dialog_visible = false, init_form">取 消</el-button>
                    <el-button type="primary" @click="update_comuser" v-if="isEdit">修改</el-button>
                    <el-button type="primary" @click="insert_comuser" v-else>确 定</el-button>
                  </span>
                </el-dialog>
            </div>
            <div class="box-footer">
              <el-button  icon="el-icon-refresh" size="mini" style="padding:7px;margin-left:0px;" @click="refresh()"></el-button>
              <div class="block pull-right">
                  <el-pagination
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :total="total" background
                    @prev-click="pagination"
                    @next-click="pagination"
                    @current-change="pagination">
                  </el-pagination>
              </div>
              <el-button  @click="add" size="mini" class="pull-right">新增用户</el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { getComusers, insertComuser, updateComuser, deleteComuser } from '@/api'
import { Loading } from 'element-ui'
import { checkcom, checksuper } from '@/utils'
export default {
  name: 'Company',
  data () {
    var validatePwd = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      offset: 0,
      pageSize: 9,
      total: 0,
      comusers: [],
      dialog_visible: false,
      isEdit: false,
      editId: '',
      form: {
        email: '',
        password: '',
        surePwd: '',
        company: {
          name: ''
        }
      },
      rules: {
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }, {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: ['blur', 'change']
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          min: 6,
          max: 20,
          message: '密码长度为6~20',
          trigger: 'blur'
        }],
        surePwd: [{
          required: true,
          message: '请重新输入密码',
          trigger: 'blur'
        }, {
          validator: validatePwd,
          trigger: 'change'
        }],
        company_name: {
          required: true,
          message: '请输入公司名称',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    setRules (flag) {
      this.rules.password[0].required = flag
      this.rules.surePwd[0].required = flag
      this.rules.company_name.required = flag
    },
    async get_comusers () {
      const data = await getComusers(this.offset, this.pageSize)
      if (data.code === 0) {
        this.comusers = data.data.data
        this.total = data.data.total
      }
    },
    async insert_comuser () {
      const data = await insertComuser(this.form)
      if (data.code === 0) {
        this.$message.success('新增成功')
      } else {
        this.$message.warning(`新增失败：${data.msg}`)
      }
      this.dialog_visible = false
      this.get_comusers()
      this.init_form()
    },
    async update_comuser () {
      console.log(this.form)
      const data = await updateComuser(this.editId, this.form)
      if (data.code === 0) {
        this.$message.success('更新成功')
      } else {
        this.$message.warning(`更新失败：${data.msg}`)
      }
      this.dialog_visible = false
      this.get_comusers()
      this.init_form()
    },
    async delete_comuser (id) {
      const data = await deleteComuser(id)
      if (data.code === 0) {
        this.$message.success('删除成功')
      } else {
        this.$message.warning(`删除失败：${data.msg}`)
      }
      this.get_comusers()
    },
    openBox (id) {
      if (!checkcom() && !checksuper()) {
        this.$alert('对不起，您不是超级管理员')
        return
      }
      this.$confirm('确定删除？数据将无法恢复。', '提示')
        .then(() => {
          this.delete_comuser(id)
        })
        .catch(e => {
          this.$message.warning(e)
        })
    },
    edit_form (params) {
      if (!checkcom() && !checksuper()) {
        this.$alert('对不起，您不是超级管理员')
        return
      }
      this.setRules(false)
      // console.log(params)
      this.form.email = params.email
      this.form.company.name = params.company
      this.editId = params.id
      this.isEdit = true
      this.dialog_visible = true
    },
    init_form () {
      this.form.email = ''
      this.form.password = ''
      this.form.surePwd = ''
      this.form.company.name = ''
    },
    pagination (cur) {
      this.offset = (cur - 1) * this.pageSize
      this.get_comusers()
    },
    async refresh () {
      const loading = Loading.service({text: '刷新中'})
      const data = await getComusers(this.offset, this.pageSize)
      if (data.code === 0) {
        this.comusers = data.data.data
        this.total = data.data.total
        this.$message.success('刷新成功')
      } else {
        this.$message.warning('刷新失败')
      }
      this.$nextTick(() => {
        loading.close()
      })
    },
    add () {
      if (!checkcom() && !checksuper()) {
        this.$alert('对不起，您不是超级管理员')
        return
      }
      this.setRules(true)
      this.init_form()
      this.isEdit = false
      this.dialog_visible = true
    }
  },
  mounted () {
    this.get_comusers()
  }
}
</script>
