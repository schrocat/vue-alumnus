<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
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
                                        <span>{{ props.row.address }}</span>
                                    </el-form-item>
                                    <el-form-item label="工商注册号">
                                        <span>{{ props.row.regNum }}</span>
                                    </el-form-item>
                                    <el-form-item label="公司业务">
                                        <span>{{ props.row.business }}</span>
                                    </el-form-item>
                                    <el-form-item label="公司性质">
                                        <span>{{ props.row.property }}</span>
                                    </el-form-item>
                                    <el-form-item label="公司人数">
                                        <span>{{ props.row.people }}</span>
                                    </el-form-item>
                                    <el-form-item label="公司介绍">
                                        <span>{{ props.row.info }}</span>
                                    </el-form-item>
                                    <el-form-item label="联系方式">
                                        <span>{{ props.row.phone }}</span>
                                    </el-form-item>
                                    <el-form-item label="联系人">
                                        <span>{{ props.row.contact }}</span>
                                    </el-form-item>
                                    <!-- <el-form-item label="证明文件">
                                      <a href="http://schrocat.oss-cn-shenzhen.aliyuncs.com/avatar.png" target="_blank">
                                      http://schrocat.oss-cn-shenzhen.aliyuncs.com/avatar.png
                                    </a>
                                    </el-form-item> -->
                                </el-form>
                                <el-button  @click="pass(props.row)" size="mini" type="success" plain>审核通过</el-button>
                                <el-button  @click="out(props.row)" size="mini" type="danger" plain>审核驳回</el-button>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="编号"
                            type="index">
                            </el-table-column>
                            <el-table-column
                            label="单位名称"
                            prop="name">
                            </el-table-column>
                            <el-table-column
                            label="工商注册号"
                            prop="regNum">
                            </el-table-column>
                            <el-table-column
                            label="公司性质"
                            prop="property">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="box-footer">
                        <div class="block pull-right">
                            <el-pagination
                                layout="prev, pager, next"
                                :total="total" background
                                :page-size="pageSize"
                                @prev-click="patition"
                                @next-click="patition"
                                @current-change="patition">
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
import { company, total, deleteCompany } from '@/my'
import { insertComuser } from '@/api'
export default {
  data () {
    return {
      tableData: [],
      total: 0,
      offset: 0,
      pageSize: 12
    }
  },
  methods: {
    async getCompany () {
      const data = await company(this.offset, this.pageSize)
      if (data.code === 0) {
        this.tableData = data.data
        this.getTotal()
      }
    },
    async getTotal () {
      const data = await total()
      if (data.code === 0) {
        this.total = data.data[0].total
      }
    },
    async delete_company (id) {
      const data = await deleteCompany(id)
      if (data.code === 0) {
        this.$message.success('操作成功')
      } else {
        this.$message.warning(`操作失败${data.msg}`)
      }
      this.getCompany()
    },
    async insert_comuser (params) {
      const user = {
        email: params.email,
        password: params.password,
        company: {
          name: params.name,
          address: params.address,
          regNum: params.regNum,
          property: params.property,
          info: params.info
        }
      }
      const data = await insertComuser(user)
      if (data.code === 0) {
        this.delete_company(params.id)
        // this.$message.success('操作成功')
      } else {
        this.$message.warning(`操作失败：${data.msg}`)
      }
      this.getCompany()
    },
    pass (params) {
      this.$confirm('确定审核通过？', '提示')
        .then(() => {
          this.insert_comuser(params)
        })
    },
    out (params) {
      const id = params.id
      this.$confirm('确定审核驳回？', '提示')
        .then(() => {
          this.delete_company(id)
        })
    },
    patition (cur) {
      this.offset = (cur - 1) * this.pageSize
      this.getCompany()
    }
  },
  mounted () {
    this.getCompany()
    // this.getTotal()
  }
}
</script>
