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
                                    <el-form-item label="详细内容">
                                        <span>{{ props.row.content }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-button  @click="pass(props.row)" size="mini" type="success" plain>审核通过并发布</el-button>
                                <el-button  @click="out(props.row)" size="mini" type="danger" plain>审核驳回</el-button>
                            </template>
                            </el-table-column>
                            <el-table-column
                              label="编号"
                              type="index">
                            </el-table-column>
                            <el-table-column
                              label="标题"
                              prop="title">
                            </el-table-column>
                            <el-table-column
                              label="内容摘要">
                              <template slot-scope="scope">
                                {{shortcut(tableData[scope.$index].content)}}
                              </template>
                            </el-table-column>
                            <el-table-column
                              label="类型">
                              招聘信息
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="box-footer">
                        <div class="block pull-right">
                            <el-pagination
                                layout="prev, pager, next"
                                :total="total" background
                                @prev-click="patition"
                                @next-click="patition"
                                :page-size="pageSize"
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
import { recruitment, recTotal, updateRecruitment } from '@/my'
import { insertPosts } from '@/api'
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
    async getRecruitment () {
      const data = await recruitment(this.offset, this.pageSize)
      if (data.code === 0) {
        this.tableData = data.data
      }
      this.setTotal()
    },
    async putRecruitment (id, params) {
      const data = await updateRecruitment(id, params)
      if (data.code === 0) {
        this.$message.success('操作成功')
      } else {
        this.$message.warning(`操作失败${data.msg}`)
      }
      this.getRecruitment()
    },
    async setTotal () {
      const data = await recTotal()
      if (data.code === 0) {
        this.total = data.data[0].total
      }
    },
    async insertPost (params) {
      const posts = {
        // userId: params.userId,
        title: params.title,
        content: params.content,
        type: params.type,
        tags: []
      }
      const data = await insertPosts(posts)
      if (data.code === 0) {
        this.putRecruitment(params.id, {status: 1})
        // this.$message.success('操作成功')
      } else {
        this.$message.warning(`${data.msg}`)
      }
    },
    shortcut (s) {
      return s.slice(0, 32) + '...'
    },
    pass (params) {
      this.$confirm('确定审核通过？', '提示')
        .then(() => {
          // this.insert_comuser(user)
          this.insertPost(params)
        })
    },
    out (params) {
      const id = params.id
      this.$confirm('确定审核驳回？', '提示')
        .then(() => {
          this.putRecruitment(id, {status: 2})
        })
    },
    patition (cur) {
      this.offset = (cur - 1) * this.pageSize
      this.getRecruitment()
    }
  },
  mounted () {
    this.getRecruitment()
    this.setTotal()
  }
}
</script>
