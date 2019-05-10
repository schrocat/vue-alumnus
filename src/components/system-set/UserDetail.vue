<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-body">
          <el-table :data="users"  stripe>
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
                  label="学院"
                  prop="academy">
              </el-table-column>
              <el-table-column
                  label="系"
                  prop="major">
              </el-table-column>
              <el-table-column
                  label=""
                  width="100px">
                  <template slot-scope="scope">
                      <div class="pull-right">
                         <button type="button" class="btn btn-default btn-sm" @click="edit_form(users[scope.$index])">
                              <i class="fa fa-edit"></i>
                          </button>
                          <button type="button" class="btn btn-defalut btn-sm" @click="openbox(users[scope.$index].id)">
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
            <el-form :model="form" :rules="rules" label-width="80px">
              <el-form-item label="账号" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="密码"  prop="password">
                <el-input v-model="form.password" show-password></el-input>
              </el-form-item>
              <el-form-item label="确认密码"  prop="surePwd">
                <el-input v-model="form.surePwd" show-password></el-input>
              </el-form-item>
              <el-form-item label="学院" prop="academyId">
                <el-select v-model="form.academyId">
                  <el-option v-for="academy in academies"
                    :key="academy.id"
                    :label="academy.name"
                    :value="academy.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="系" prop="majorId">
                <el-select v-model="form.majorId">
                  <el-option v-for="major in majors"
                    :key="major.id"
                    :value="major.id"
                    :label="major.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer">
              <el-button @click="dialogFormVisible = false,clear_form">取 消</el-button>
              <el-button type="primary" @click="update_admin" v-if="isEdit">修改</el-button>
              <el-button type="primary" @click="insert_admin" v-else>确定</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="box-footer">
          <el-button  icon="el-icon-refresh" size="mini" style="padding:7px;margin-left:0px;" @click="refresh()"></el-button>
          <el-button type="primary" @click="add" plain class="pull-right" size="mini">新增管理员</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAdmins, getMajors, getAcademies, updateAdmin, insertAdmin, deleteAdmin } from '@/api'
import { checksuper } from '@/utils'
export default {
  name: 'UserDetail',
  props: ['message'],
  data () {
    var validatePwd = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      users: [],
      dialogFormVisible: false,
      form: {
        email: '',
        password: '',
        academyId: '',
        majorId: ''
      },
      surePwd: '',
      academies: [],
      majors: [],
      isEdit: false,
      editId: '',
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
        academyId: {
          required: true,
          message: '请选择学院',
          trigger: 'blur'
        },
        majorId: {
          required: true,
          type: 'number',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    setRules (flag) {
      this.rules.password[0].required = flag
      this.rules.surePwd[0].required = flag
      this.rules.academyId.required = flag
      this.rules.majorId.required = flag
    },
    clear_form () {
      this.form.email = ''
      this.form.password = ''
      this.form.surePwd = ''
      this.form.academyId = ''
      this.form.majorId = ''
      this.surePwd = ''
    },
    edit_form (params) {
      if (!checksuper()) {
        this.$alert('对不起，您不是超级管理员')
        return
      }
      this.setRules(false)
      this.editId = params.id
      this.isEdit = true
      this.dialogFormVisible = true
      this.form.email = params.email
      this.form.academyId = params.academyId
      this.form.majorId = params.majorId
    },
    async get_majors () {
      const data = await getMajors()
      if (data.code === 0) {
        this.majors = data.data
      }
    },
    async get_academies () {
      const data = await getAcademies()
      if (data.code === 0) {
        this.academies = data.data
      }
    },
    async get_admins () {
      const data = await getAdmins()
      if (data.code === 0) {
        this.users = data.data
      }
    },
    async update_admin () {
      this.dialogFormVisible = false
      const data = await updateAdmin(this.editId, this.form)
      if (data.code === 0) {
        this.$message.success('修改成功')
      } else {
        this.$message.warning(`修改失败：${data.msg}`)
      }
      this.clear_form()
      this.get_admins()
    },
    async insert_admin () {
      // this.setRules(true)
      // if (this.hasOneBlank(this.form)) {
      //   this.$message.warning('账号信息不能为空')
      //   return
      // }
      this.dialogFormVisible = false
      const data = await insertAdmin(this.form)
      if (data.code === 0) {
        this.$message.success('新增成功')
      } else {
        this.$message.warning(`新增失败：${data.msg}`)
      }
      this.clear_form()
      this.get_admins()
    },
    async delete_admin (id) {
      const data = await deleteAdmin(id)
      if (data.code === 0) {
        this.$message.success('删除成功')
      } else {
        this.$message.warning(`删除失败：${data.msg}`)
      }
      this.get_admins()
    },
    async refresh () {
      const data = await getAdmins()
      if (data.code === 0) {
        this.users = data.data
        this.$message.success('刷新成功')
      }
    },
    openbox (id) {
      if (!checksuper()) {
        this.$alert('对不起，您不是超级管理员')
        return
      }
      this.$confirm('确定删除？', '提示')
        .then(() => {
          this.delete_admin(id)
        })
        .catch(e => {})
    },
    add () {
      if (!checksuper()) {
        this.$alert('对不起，您不是超级管理员')
        return
      }
      this.dialogFormVisible = true
      this.isEdit = false
      this.setRules(true)
    }
  },
  mounted () {
    this.get_admins()
    this.get_majors()
    this.get_academies()
  }
}
</script>
