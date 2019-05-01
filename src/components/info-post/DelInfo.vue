<template>
    <div class="box">
      <div class="box-header with-border">
        <h3 class="box-title">已删信息</h3>
      </div>
      <div class="box-body no-padding">
        <div class="mailbox-controls">
          <el-checkbox style="padding: 0px 0px 0px 4px;margin-right:5px;" @change="checkAll()">
          </el-checkbox>
          <el-button  icon="fa fa-share" size="mini" style="padding:7px;"  :disabled="checkedIds.length<=0" @click="batchReduce()"></el-button>
          <el-button  icon="el-icon-delete" size="mini" style="padding:7px;margin-left:0px;"  :disabled="checkedIds.length<=0" @click="batchDelete()"></el-button>
          <el-button  icon="el-icon-refresh" size="mini" style="padding:7px;margin-left:0px;" @click="refresh"></el-button>
        </div>
        <div class="table-responsive mailbox-messages">
          <table class="table table-hover table-striped">
            <thead>
              <tr>
                <th v-for="h in theader" :key="h" style="color:gray;">{{h}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="message in messages" :key="message.id">
                <td width="36px">
                  <el-checkbox  :value="checkedIds.indexOf(message.id)>=0" @change="checkOne(message.id)" ></el-checkbox>
                </td>
                <td width="164px">{{message.email}}</td>
                <td width="196px">{{message.title}}</td>
                <td>{{ shortcut(message.content) }}</td>
                <td width="72px">{{ messageType(message.type) }}</td>
                <td width="81px">
                  <a @click="rowclick(message.id)">详情</a>
                  <a><i class="el-icon-delete" @click="deleteInfo(message.id)"></i></a>
                  <a><i class="fa fa-share" @click="reduction(message.id)"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="box-footer">
          <div class="block pull-right">
            <el-pagination
              layout="prev, pager,next"
              :total="total" background
              @next-click="pagination"
              @current-change="pagination"
              @prev-click="pagination">
            </el-pagination>
          </div>
        </div>
    </div>
</template>
<script>
import { getOas, fDeleteOa, updateOa } from '@/api'
// import { constants } from 'fs';
import { Loading } from 'element-ui'
export default {
  name: 'DelInfo',
  data () {
    return {
      messages: [],
      total: 0,
      isCheckAll: false,
      checkedIds: [],
      isall: true,
      theader: ['', '发布账号', '信息标题', '信息摘要', '信息类型', '操作'],
      offset: 0,
      pageSize: 10
    }
  },
  methods: {
    // 截取内容再要
    shortcut (str) {
      var dd = str.replace(/<\/?.+?>/g, '')
      var s = dd.replace(/ /g, '')
      return s.slice(0, 36) + '...'
    },
    messageType (type) {
      switch (type) {
        case 1:
          return '政策'
        case 2:
          return '就业'
        case 3:
          return '新闻'
        default:
          return '其他'
      }
    },
    // 获取信息回收列表
    getDelInfo () {
      getOas('del', this.offset, this.pageSize)
        .then(res => {
          this.messages = res.data.data
          this.total = res.data.total
        })
    },
    async fDeleteInfo (id) {
      const data = await fDeleteOa(id)
      if (data.code === 0) {
        this.$message.success('永久删除成功')
      }
      this.getDelInfo()
    },
    deleteInfo (id) {
      this.$confirm('确定永久删除？', '提示')
        .then(() => {
          this.fDeleteInfo(id)
        }).catch(() => {
        })
    },
    async reduceOa (id) {
      const data = await updateOa(id, {deletedAt: null})
      if (data.code === 0) {
        this.$message.success('还原成功')
      } else {
        this.$message.warning(`还原失败:${data.msg}`)
      }
      this.getDelInfo()
    },
    reduction (id) {
      this.$confirm('确定还原该条信息？', '提示')
        .then(() => {
          this.reduceOa(id)
        })
    },
    batchDelete () {
      this.$confirm('确定删除永久删除这些信息?', '提示')
        .then(() => {
          for (var i = 0; i < this.checkedIds.length; i++) {
            fDeleteOa(this.checkedIds[i])
              .then(() => {
                this.getDelInfo()
              })
          }
          this.$message.success('删除成功!')
        })
    },
    batchReduce () {
      this.$confirm('确定还原这些信息？', '提示')
        .then(() => {
          for (var i = 0; i < this.checkedIds.length; i++) {
            updateOa(this.checkedIds[i], {deletedAt: null})
              .then(() => {
                this.getDelInfo()
              })
          }
          this.$message.success('还原成功')
        })
    },
    async refresh () {
      var loading = Loading.service({text: '刷新中...'})
      const data = await getOas('del', this.offset, this.pageSize)
      if (data.code === 0) {
        this.messages = data.data.data
        this.$nextTick(() => {
          loading.close()
        })
        this.$message.success('刷新成功')
      } else {
        this.$nextTick(() => {
          loading.close()
        })
        this.$message.warning('刷新失败')
      }
    },
    rowclick (id) {
      var r = '/index/post/showInfo/' + id
      this.$router.push(r)
    },
    // 分页
    pagination (curPage) {
      this.offset = (curPage - 1) * this.pageSize
      this.getDelInfo()
    },
    // checkbox的全选功能实现函数
    checkAll () {
      this.isCheckAll = !this.isCheckAll
      if (this.isCheckAll) {
        // 全选
        this.checkedIds = []
        this.messages.forEach(function (message) {
          this.checkedIds.push(message.id)
        }, this)
      } else {
        // 取消全选
        this.checkedIds = []
      }
      console.log(this.checkedIds)
    },
    checkOne (id) {
      // 判断信息id是否在已经被勾选的数组里面
      let cindex = this.checkedIds.indexOf(id)
      if (cindex >= 0) {
        // 如果有，则从数组中去除
        this.checkedIds.splice(cindex, 1)
      } else {
        // 否则，插入
        this.checkedIds.push(id)
      }
    }
  },
  mounted () {
    this.getDelInfo()
  }
}
</script>
