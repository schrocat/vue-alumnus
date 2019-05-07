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
                        <th>公司名称</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(comuser,index) in comusers" :key="comuser.id">
                        <td>{{index+1}}</td>
                        <td>{{comuser.email}}</td>
                        <td>{{comuser.password}}</td>
                        <td>{{comuser.company}}</td>
                        <td>
                        <div class="pull-right">
                            <button type="button" class="btn btn-default btn-sm" @click="edit_form(comuser)">
                            <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" class="btn btn-default btn-sm" @click="openBox(comuser.id)">
                            <i class="fa fa-trash-o"></i>
                            </button>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <el-dialog
                  :visible.sync="dialog_visible"
                  @close="dialog_visible = false">
                  <el-form :model="form" label-width="80px" :rules="rules">
                    <el-form-item label="账号" prop="email">
                      <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                      <el-input v-model="form.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                      <el-input v-model="form.surePwd" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="公司">
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
              <el-button type="primary" @click="dialog_visible = true" size="mini" class="pull-right">新增用户</el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { getComusers, insertComuser, updateComuser, deleteComuser } from '@/api'
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
    async get_comusers () {
      const data = await getComusers()
      if (data.code === 0) {
        this.comusers = data.data
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
      this.$confirm('确定删除？数据将无法恢复。', '提示')
        .then(() => {
          this.delete_comuser(id)
        })
        .catch(e => {
          this.$message.warning(e)
        })
    },
    edit_form (params) {
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
    }
  },
  mounted () {
    this.get_comusers()
  }
}
</script>
