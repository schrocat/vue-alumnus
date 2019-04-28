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
                <td>{{index}}</td>
                <td>{{user.email}}</td>
                <td>{{user.password}}</td>
                <td>{{user.academy}}</td>
                <td>{{user.major}}</td>
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
            title="修改用户信息"
            :visible.sync="dialogFormVisible"
            @close="dialogFormVisible = false">
            <el-form :model="form">
              <el-form-item label="账号" label-width="10%">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" label-width="10%">
                <el-input v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" label-width="10%">
                <el-input v-model="surePwd"></el-input>
              </el-form-item>
              <el-form-item label="学院" label-width="10%">
                <el-select v-model="form.academy" :remote="true">
                  <el-option v-for="academy in academies"
                    :key="academy.id"
                    :value="academy.id"
                    :label="academy.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="系" label-width="10%">
                <el-select v-model="form.major" :remote="true">
                  <el-option v-for="major in majors"
                    :key="major.id"
                    :value="major.id"
                    :label="major.name">
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
import { getAdmins, getMajors, getAcademies } from '@/api'
export default {
  name: 'UserDetail',
  props: ['message'],
  data () {
    return {
      users:[],
      dialogFormVisible: false,
      form: {
        username: '',
        email: '',
        password: '',
        academy: '',
        major: ''
      },
      surePwd: '',
      academies: [],
      majors: []
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
    async get_admins () {
      const data = await getAdmins()
      if (data.code === 0) {
        this.users = data.data
      }
    }
  },
  mounted () {
    this.get_admins()
    this.get_majors()
    this.get_academies()
  }
}
</script>
