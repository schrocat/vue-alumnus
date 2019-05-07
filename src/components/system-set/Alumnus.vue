<template>
  <div class="row">
    <div class="col-xs-12">
        <div class="box">
            <div class="box-header">
              <el-select v-model="searchp.majorId" placeholder="系" :remote="true" class="pull-right">
                  <el-option v-for="major in majors"
                    :key="major.id"
                    :label="major.name"
                    :value="major.id">
                  </el-option>
                </el-select>
                <el-select v-model="searchp.academyId" placeholder="学院" :remote="true" class="pull-right">
                  <el-option v-for="academy in academies"
                    :key="academy.id"
                    :label="academy.name"
                    :value="academy.id">
                  </el-option>
                </el-select>
                <el-button  icon="el-icon-search"  @click="search()" class="pull-right"></el-button>
                <el-button  @click="clear()" class="pull-right">清除筛选</el-button>
            </div>
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
                    <tr v-for="(student,index) in students" :key="student.id">
                        <td>{{index+1}}</td>
                        <td>{{student.email}}</td>
                        <td>{{student.password}}</td>
                        <td>{{student.academy}}</td>
                        <td>{{student.major}}</td>
                        <td>
                        <div class="pull-right">
                            <button type="button" class="btn btn-default btn-sm" @click="edit_form(student)">
                            <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" class="btn btn-default btn-sm" @click="openMsgBox(student.id)">
                            <i class="fa fa-trash-o"></i>
                            </button>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <el-dialog
                  :visible.sync="dialogFormVisible"
                  @close="dialogFormVisible = false">
                  <el-form :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="账号" prop="email">
                      <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码"  prop="password">
                      <el-input v-model="form.password"  show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="surePwd">
                      <el-input v-model="form.surePwd" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="学院" prop="academyId">
                      <el-select v-model="form.academyId" :remote="true">
                        <el-option v-for="academy in academies"
                          :key="academy.id"
                          :value="academy.id"
                          :label="academy.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="系" prop="majorId">
                      <el-select v-model="form.majorId" :remote="true">
                        <el-option v-for="major in majors"
                          :key="major.id"
                          :label="major.name"
                          :value="major.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <span slot="footer">
                    <el-button @click="dialogFormVisible = false,clear_form">取 消</el-button>
                    <el-button type="primary" @click="update_student()" v-if="isEdit">修改</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false" v-else>确定</el-button>
                  </span>
                </el-dialog>
            </div>
            <div class="box-footer">
              <div class="block pull-right">
                <el-pagination
                  layout="prev, pager, next"
                  :total="students.length" background>
                </el-pagination>
            </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { getMajors, getAcademies, getStudents, deleteStudent, updateStudent } from '@/api'
export default {
  name: 'Alumnus',
  data () {
    var validatePwd = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      students: [],
      academies: [],
      majors: [],
      searchp: {},
      dialogFormVisible: false,
      total: 0,
      form: {
        email: '',
        password: '',
        academyId: '',
        majorId: '',
        surePwd: ''
      },
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
          // required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          min: 6,
          max: 20,
          message: '密码长度为6~20',
          trigger: 'blur'
        }],
        surePwd: [{
          // required: true,
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
    async get_students () {
      const data = await getStudents(this.searchp)
      if (data.code === 0) {
        this.students = data.data.data
        this.total = data.data.total
      }
    },
    async delete_student (id) {
      const data = await deleteStudent(id)
      if (data.code === 0) {
        this.$message.success('删除成功')
      } else {
        this.$message.warning(`删除失败：${data.msg}`)
      }
      this.get_students()
    },
    async update_student () {
      this.dialogFormVisible = false
      const data = await updateStudent(this.editId, this.form)
      if (data.code === 0) {
        this.$message.success('修改成功')
      } else {
        this.$message.warning(`修改失败：${data.msg}`)
      }
      this.clear_form()
      this.get_students()
    },
    openMsgBox (id) {
      this.$confirm('确定删除？', '提示')
        .then(() => {
          this.delete_student(id)
        })
        .catch(e => {
          this.$message.warning(e)
        })
    },
    async search () {
      this.get_students(this.searchp)
    },
    async clear () {
      this.searchp = {}
      this.get_students()
    }
  },
  mounted () {
    this.get_majors()
    this.get_academies()
    this.get_students()
    // this.get_total()
  }
}
</script>

<style>
.search{
  left: 0px;
  right: 640px;
}
</style>
