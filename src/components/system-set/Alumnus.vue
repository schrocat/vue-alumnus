<template>
  <div class="row">
    <div class="col-xs-12">
        <div class="box">
            <div class="box-header">
                <el-select v-model="academy" placeholder="学院">
                  <el-option v-for="item in deps"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="major" placeholder="系">
                  <el-option v-for="item in deps"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
            </div>
            <div class="box-body">
                <table id="table" class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>编号</th>
                        <th>账号</th>
                        <!-- <th>邮箱</th> -->
                        <th>密码</th>
                        <th>学院</th>
                        <th>系</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="d in ds" :key="d.no">
                        <td>{{d.no}}</td>
                        <!-- <td>{{d.username}}</td> -->
                        <td>{{d.mail}}</td>
                        <td>{{d.pass}}</td>
                        <td>{{d.acdamy}}</td>
                        <td>{{d.major}}</td>
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
                    <el-form-item label="邮箱" label-width="10%">
                      <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" label-width="10%">
                      <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="学院" label-width="10%">
                      <el-select v-model="form.academy">
                      <el-option label="工学院"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="系" label-width="10%">
                      <el-select v-model="form.major">
                        <el-option label="计算机科学与技术">
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
        <!-- /.body -->
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alumnus',
  data () {
    return {
      ds: [
        {no: '1', username: 'six', pass: 'sxi', mail: '1595336246@qq.com', acdamy: 'en', major: 'cs'},
        {no: '2', username: 'sixs', pass: 'sxi', mail: '111Alu@qq.com', acdamy: 'en', major: 'cs'}
      ],
      deps: [
        {id: '2', name: 'wen666666'},
        {id: '3', name: 'len'}
      ],
      academy: '',
      major: '',
      dialogFormVisible: false,
      form: {
        username: 'hhh',
        email: '',
        password: '',
        academy: '',
        major: ''
      }
    }
  }
}
</script>
