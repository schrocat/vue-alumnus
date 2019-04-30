<template>
  <div class="row">
    <div class="col-xs-12">
        <div class="box">
            <div class="box-header">
                <el-select v-model="search.academyId" placeholder="学院" :remote="true">
                  <el-option v-for="academy in academies"
                    :key="academy.id"
                    :label="academy.name"
                    :value="academy.id">
                  </el-option>
                </el-select>
                <el-select v-model="search.majorId" placeholder="系" :remote="true">
                  <el-option v-for="major in majors"
                    :key="major.id"
                    :label="major.name"
                    :value="major.id">
                  </el-option>
                </el-select>
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
                            <button type="button" class="btn btn-default btn-sm" @click="dialogFormVisible = true">
                            <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" class="btn btn-default btn-sm">
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
                  <el-form :model="form">
                    <el-form-item label="账号" label-width="10%">
                      <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" label-width="10%">
                      <el-input v-model="form.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" label-width="10%">
                      <el-input v-model="surePwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="学院" label-width="10%">
                      <el-select v-model="form.academyId" :remote="true">
                        <el-option v-for="academy in academies"
                          :key="academy.id"
                          :value="academy.id"
                          :label="academy.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="系" label-width="10%">
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
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">修改</el-button>
                  </span>
                </el-dialog>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { getMajors, getAcademies, getStudents } from '@/api'
export default {
  name: 'Alumnus',
  data () {
    return {
      students: [],
      academies: [],
      majors: [],
      search: {
        academyId: '',
        majorId: '',
        role: ''
      },
      dialogFormVisible: false,
      form: {
        email: '',
        password: '',
        academyId: '',
        majorId: ''
      },
      surePwd:''
    }
  },
  methods: {
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
      const data = await getStudents()
      if (data.code === 0) {
        this.students = data.data
      }
    }
  },
  mounted () {
    this.get_majors()
    this.get_academies()
    this.get_students()
  }
}
</script>
