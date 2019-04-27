<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header with-border">
                        <el-select v-model="sel_val" placeholder="审核状态">
                            <el-option label="已审核" value="1"></el-option>
                            <el-option label="未审核" value="2"></el-option>
                        </el-select>
                    </div>
                    <div class="box-body">
                        <el-table
                            :data="tableData"
                            style="width: 100%">
                            <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="单位名称">
                                        <span>{{ props.row.name }}</span>
                                    </el-form-item>
                                    <el-form-item label="单位地址">
                                        <span>{{ props.row.addr }}</span>
                                    </el-form-item>
                                    <el-form-item label="工商注册号">
                                        <span>{{ props.row.reg_no }}</span>
                                    </el-form-item>
                                    <el-form-item label="联系人">
                                        <span>{{ props.row.plink }}</span>
                                    </el-form-item>
                                    <el-form-item label="证明文件">
                                      <a href="http://schrocat.oss-cn-shenzhen.aliyuncs.com/avatar.png" target="_blank">
                                      http://schrocat.oss-cn-shenzhen.aliyuncs.com/avatar.png
                                    </a>
                                    </el-form-item>
                                </el-form>
                                <el-button  @click="ex_status" size="mini" type="success" plain>审核通过</el-button>
                                <el-button  @click="ex_status" size="mini" type="danger" plain>审核驳回</el-button>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="编号"
                            type="index"
                            :index="gindex">
                            </el-table-column>
                            <el-table-column
                            label="单位名称"
                            prop="name">
                            </el-table-column>
                            <el-table-column
                            label="工商注册号"
                            prop="reg_no">
                            </el-table-column>
                            <el-table-column
                            label="审核状态">
                            <span>
                                未审核
                                <!-- <i class="el-icon-sort" @click="ex_status"></i> -->
                            </span>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="box-footer">
                        <div class="block pull-right">
                            <el-pagination
                                layout="prev, pager, next"
                                :total="total" background>
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
export default {
  data () {
    return {
      tableData: [{
        name: 'double 6',
        addr: 'stu',
        reg_no: 't2333',
        plink: 'dou'
      }, {
        name: 'double 6',
        addr: 'stu',
        reg_no: 't2333',
        plink: 'dou'
      }, {
        name: 'double 6',
        addr: 'stu',
        reg_no: 't2333',
        plink: 'dou'
      }, {
        name: 'double 6',
        addr: 'stu',
        reg_no: 't2333',
        plink: 'dou'
      }, {
        name: 'double 6',
        addr: 'stu',
        reg_no: 't2333',
        plink: 'dou'
      }, {
        name: 'double 6',
        addr: 'stu',
        reg_no: 't2333',
        plink: 'dou'
      }, {
        name: 'double 6',
        addr: 'stu',
        reg_no: 't2333',
        plink: 'dou'
      }, {
        name: 'double 6',
        addr: 'stu',
        reg_no: 't2333',
        plink: 'dou'
      }, {
        name: 'double 6',
        addr: 'stu',
        reg_no: 't2333',
        plink: 'dou'
      }, {
        name: 'double 6',
        addr: 'stu',
        reg_no: 't2333',
        plink: 'dou'
      }],
      sel_val: '',
      total: 30
    }
  },
  methods: {
    gindex (index) {
      return index + 1
    },
    ex_status () {
      this.$confirm('是否确认审核通过该信息？', '提示', {
        confirmButtomText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    }
  }
}
</script>
