<template>
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header">
                      <el-select v-model="status" placeholder="筛选" @change="get_posts">
                        <el-option
                          label="未通过"
                          :value="0">
                        </el-option>
                        <el-option
                          label="通过"
                          :value="1">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="box-body">
                        <el-table
                            :data="tableData">
                            <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="详细内容">
                                        <dl v-html="props.row.content"></dl>
                                    </el-form-item>
                                </el-form>
                                <el-button  @click="pass(props.row)" size="mini" type="success" plain v-if="status===0">审核通过并发布</el-button>
                                <el-button  @click="out(props.row)" size="mini" type="danger" plain v-if="status===1">审核驳回</el-button>
                            </template>
                            </el-table-column>
                            <el-table-column
                              label="编号"
                              type="index">
                              <template slot-scope="scope">
                                {{scope.$index + (cur-1)*pageSize + 1}}
                              </template>
                            </el-table-column>
                            <el-table-column
                              label="标题"
                              prop="title">
                            </el-table-column>
                            <el-table-column
                              label="内容摘要"
                              min-width="300px">
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
                        <el-button  icon="el-icon-refresh" size="mini" style="padding:7px;margin-left:0px;" @click="refresh()"></el-button>
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
import { getPosts, setPostChecked } from '@/api'
import { htmlToString } from '@/utils'
import { Loading } from 'element-ui'
export default {
  data () {
    return {
      tableData: [],
      total: 0,
      cur: 1,
      pageSize: 10,
      status: 0
    }
  },
  methods: {
    async get_posts () {
      const offset = (this.cur - 1) * this.pageSize
      const data = await getPosts(offset, this.pageSize, this.status)
      if (data.code === 0) {
        this.tableData = data.data.data
        this.total = data.data.total
      }
    },
    async set_post_checked (params, checked) {
      const data = await setPostChecked({
        id: params.id,
        checked: checked
      })
      if (data.code === 0) {
        this.$message.success('操作成功')
      } else {
        this.$message.warning(`操作失败${data.msg}`)
      }
      this.get_posts()
    },
    shortcut (s) {
      s = htmlToString(s)
      return s.slice(0, 32) + '...'
    },
    pass (params) {
      this.$confirm('确定审核通过？', '提示')
        .then(() => {
          this.set_post_checked(params, 1)
        })
    },
    out (params) {
      this.$confirm('确定审核驳回？', '提示')
        .then(() => {
          this.set_post_checked(params, 0)
        })
    },
    patition (curPage) {
      this.cur = curPage
      this.get_posts()
    },
    async refresh () {
      const loading = Loading.service({text: '刷新中'})
      const data = await getPosts(this.cur, this.pageSize, this.status)
      if (data.code === 0) {
        this.tableData = data.data.data
        this.total = data.data.total
        this.$message.success('刷新成功')
      } else {
        this.$message.warning(`刷新失败${data.msg}`)
      }
      this.$nextTick(() => {
        loading.close()
      })
    }
  },
  mounted () {
    this.get_posts(1)
  }
}
</script>
