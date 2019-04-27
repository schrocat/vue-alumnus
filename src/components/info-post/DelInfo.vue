<template>
    <div class="box">
      <div class="box-header with-border">
        <h3 class="box-title">已删信息</h3>
      </div>
      <div class="box-body no-padding">
        <div class="mailbox-controls">
          <el-checkbox style="padding: 0px 0px 0px 4px;margin-right:5px;" @change="checkAll()">
          </el-checkbox>
          <el-button  icon="fa fa-share" size="mini" style="padding:7px;"  :disabled="checkedIds.length<=0"></el-button>
          <el-button  icon="el-icon-delete" size="mini" style="padding:7px;margin-left:0px;"  :disabled="checkedIds.length<=0"></el-button>
          <el-button  icon="el-icon-refresh" size="mini" style="padding:7px;margin-left:0px;" ></el-button>
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
                  <a><i class="fa fa-share"></i></a>
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
import { getOas } from '@/api'
export default {
  name: 'DelInfo',
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
    // 获取信息回收列表
    getDelInfo () {
      getOas('del')
        .then(res => {
          this.messages = res.data
          this.total = this.messages.length
        })
    },
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
    deleteInfo (id) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.delete_academy(id)
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
