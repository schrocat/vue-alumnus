<template>
    <div class="box">
      <!-- <p>{{$route.params.type}}</p> -->
      <div class="box-header with-border">
        <h3 class="box-title" >所有信息</h3>
      </div>
      <div class="box-body no-padding">
        <div class="mailbox-controls">
          <el-checkbox style="padding: 0px 0px 0px 4px;margin-right:5px;" @change="checkAll()">
          </el-checkbox>
          <el-button  icon="el-icon-delete" size="mini" style="padding:7px;" :disabled="checkedIds.length<=0" @click="deleteAllInfo()"></el-button>
          <el-button  icon="el-icon-refresh" size="mini" style="padding:7px;margin-left:0px;" @click="refresh()"></el-button>
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
                <td width="96px">
                  <a @click="rowclick(message.id)">详情</a>
                  <a>修改</a>
                  <a><i class="el-icon-delete" @click="deleteInfo(message.id)"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
</template>
<script>
import { getOas, deleteOa } from '@/api'
import { htmlToString } from '@/utils'
import { Loading } from 'element-ui'
// import { get } from 'http';
export default {
  name: 'AllInfo',
  data () {
    return {
      messages: [],
      total: 0,
      isCheckAll: false,
      checkedIds: [],
      isall: true,
      theader: ['', '发布账号', '信息标题', '信息摘要', '信息类型', '操作']
    }
  },
  methods: {
    async refresh () {
      var loading = Loading.service({text: '刷新中...'})
      const data = await getOas('all')
      if (data.code === 0) {
        this.messages = data.data
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
    // 获取所有信息列表
    getAllInfo () {
      getOas('all')
        .then(res => {
          this.messages = res.data
          this.total = this.messages.length
        })
    },
    // 截取内容再要
    shortcut (str) {
      var s = htmlToString(str)
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
    deleteInfo (id) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOa(id)
          .then(res => {
            if (res.code === 0) {
              this.$message.success('删除成功')
              this.getAllInfo()
            }
          })
      }).catch(() => {
      })
    },
    async deleteAllInfo () {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (var i = 0; i < this.checkedIds.length; i++) {
          deleteOa(this.checkedIds[i])
        }
        this.checkedIds = []
        this.$message.success('删除成功！')
        getOas('all')
          .then(res => {
            if (res.code === 0) {
              this.messages = res.data
            }
          })
      }).catch(() => {
      })
    },
    rowclick (id) {
      var r = '/index/post/showInfo/' + id
      this.$router.push(r)
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
    this.getAllInfo()
  }
}
</script>
