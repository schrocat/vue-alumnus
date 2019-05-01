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
                    <tr v-for="(company,index) in companys" :key="company.id">
                        <td>{{index+1}}</td>
                        <td>{{company.email}}</td>
                        <td>{{company.password}}</td>
                        <td>{{company.name}}</td>
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
                    <el-form-item label="密码">
                      <el-input v-model="form.password"></el-input>
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
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Company',
  data () {
    return {
      companys: [],
      dialog_visible: false,
      form: {
        email: '',
        password: '',
        surePwd: '',
        company: ''
      }
    }
  }
}
</script>
