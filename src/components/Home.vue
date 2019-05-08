<template>
    <div style="background:#ecf0f5">
      <div class="home-container">
        <div class="home-content">
          <div class="home-header">
            <!-- <el-input  placeholder="..."></el-input> -->
            <p class="home-title">15hyxue@stu.edu.cn>>修改资料</p>
          </div>
          <div class="home-form">
            <el-form :model="formData" ref="form" label-width="90px">
              <el-form-item label="真实姓名：">
                <el-input v-model="formData.name">
                  <!-- <template slot="prepend">姓名:</template> -->
                </el-input>
              </el-form-item>
              <el-form-item label="昵称：">
                <el-input v-model="formData.nickName">
                  <!-- <template slot="prepend">昵称：</template> -->
                </el-input>
              </el-form-item>
              <el-form-item label="性别：">
                <el-select v-model="formData.gender">
                  <el-option
                    label="男"
                    :value="1">
                  </el-option>
                  <el-option
                    label="女"
                    :value="0">
                  </el-option>
                  <!-- <template slot="prepend">性别:</template> -->
                </el-select>
              </el-form-item>
              <el-form-item label="年龄：">
                <el-input-number v-model="formData.age"></el-input-number>
              </el-form-item>
              <el-form-item label="生日：">
                <el-date-picker  type="date" placeholder="选择日期时间" v-model="formData.birthTime" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <!-- <el-form-item label="院、专业：">
                <el-cascader
                  placeholder=""
                  filterable
                  change-on-select>
                </el-cascader>
              </el-form-item> -->
              <el-form-item label="个性签名：">
                <el-input type="textarea" rows="6"  placeholder="在这编写你的个性签名" v-model="formData.personSign"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="closeCurWindow">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import store from '@/store'
import { updateUserInfo } from '@/api'
export default {
  data () {
    return {
      user: {},
      formData: {}
    }
  },
  methods: {
    async setUser () {
      this.user = store.getters.user
    },
    closeCurWindow () {
      window.opener = null
      window.close()
    },
    async onSubmit () {
      const data = await updateUserInfo(this.formData)
      if (data.code === 0) {
        this.$message.success('保存成功')
      } else {
        this.$message.warning(`${data.msg}`)
      }
      this.closeCurWindow()
    }
  },
  mounted () {
    this.setUser()
    console.log(this.user)
  }
}
</script>

<style>
.home-container{
  width: 50%;
  height: 806px;
  background: white;
  margin: 0 auto;
}
.home-content{
  padding: 36px 81px 36px 81px;
}
.home-header{
  /* height: 50px; */
  width: 100%;
  border-bottom: 1px solid #ecf0f5;
}
.home-title{
  font-size: 20px;
}
.home-form{
  position: relative;
  top: 10px;
}
</style>
