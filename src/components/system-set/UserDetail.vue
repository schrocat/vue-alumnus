<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-body">
          <table id="table" class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>编号</th>
                <th>账号</th>
                <th>密码</th>
                <th>学院</th>
                <th>系</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user,index) in users" :key="user.id">
                <td>{{index + 1}}</td>
                <td>{{user.email}}</td>
                <td>{{user.password}}</td>
                <td>{{user.academy}}</td>
                <td>{{user.major}}</td>
                <td>
                  <div class="pull-right">
                    <button type="button" class="btn btn-default btn-sm" @click="edit_form(user)">
                      <i class="fa fa-edit"></i>
                    </button>
                    <button type="button" class="btn btn-default btn-sm" @click="openbox(user.id)">
                      <i class="fa fa-trash-o"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <el-dialog
            title=""
            :visible.sync="dialogFormVisible"
            @close="dialogFormVisible = false">
            <el-form :model="form" :rules="rules">
              <el-form-item label="账号" label-width="12%" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="密码" label-width="12%" prop="password">
                <el-input v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" label-width="12%" prop="surePwd">
                <el-input v-model="form.surePwd" ></el-input>
              </el-form-item>
              <el-form-item label="学院" label-width="12%" prop="academyId">
                <el-select v-model="form.academyId" :remote="true">
                  <el-option v-for="academy in academies"
                    :key="academy.id"
                    :value="academy.id"
                    :label="academy.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="系" label-width="12%" prop="majorId">
                <el-select v-model="form.majorId" :remote="true">
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
          <el-button type="primary" @click="dialogFormVisible = true;isEdit = false;" plain class="pull-right" size="mini">新增管理员</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAdmins, getMajors, getAcademies, updateAdmin, insertAdmin, deleteAdmin } from '@/api'
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
          trigger: 'change',
        }],
        academyId: {
          required: true,
          message: '请选择学院',
          trigger: 'blur',
        },
        majorId: {
          required: true,
          type: 'number',
          trigger: 'blur',
        }
      }
    }
  },
  methods: {
    clear_form () {
      this.form.email = ''
      this.form.password = ''
      this.form.surePwd = ''
      this.form.academyId = ''
      this.form.majorId = ''
      this.surePwd = ''
    },
    edit_form (params) {
      this.form.email = params.email
      this.form.academyId = params.academyId
      this.form.majorId = params.majorId
      this.dialogFormVisible = true
      this.editId = params.id
      this.isEdit = true
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
      if (this.hasOneBlank(this.form)) {
        this.$message.warning('账号信息不能为空')
        return
      }
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
      if(data.code === 0) {
        this.users = data.data
        this.$message.success('刷新成功')
      }
    },
    openbox (id) {
      this.$confirm('确定删除？', '提示')
        .then(() => {
          this.delete_admin(id)
        })
    }
  },
  mounted () {
    this.get_admins()
    this.get_majors()
    this.get_academies()
  }
}
</script>
