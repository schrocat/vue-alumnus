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
                        <!-- <th>邮箱</th> -->
                        <th>密码</th>
                        <th>公司名称</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="d in ds" :key="d.no">
                        <td>{{d.no}}</td>
                        <!-- <td>{{d.username}}</td> -->
                        <td>{{d.mail}}</td>
                        <td>{{d.pass}}</td>
                        <td>{{d.company}}</td>
                        <td>
                        <div class="pull-right">
                            <button type="button" class="btn btn-default btn-sm" @click="dialog_visible = true">
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
                  :visible.sync="dialog_visible"
                  @close="dialog_visible = false">
                  <el-form :model="form" label-width="80px">
                    <el-form-item label="账号">
                      <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                      <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                      <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="公司">
                      <el-input v-model="form.company"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer">
                    <el-button @click="dialog_visible = false">取 消</el-button>
                    <el-button type="primary" @click="dialog_visible = false">确 定</el-button>
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
  name: 'Company',
  data () {
    return {
      ds: [
        {no: '1', mail: '8888@qq.com', pass: '8888',company: '杰尔马66有限责任公司'}
      ],
      dialog_visible: false,
      form: {
        username: '',
        email: '',
        password: '',
        company: ''
      }
    }
  }
}
</script>
