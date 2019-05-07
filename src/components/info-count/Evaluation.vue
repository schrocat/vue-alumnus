<template>
    <div class="row">
        <div class="col-md-7">
            <div class="box" style="height:640px;overflow:auto;">
                <div class="box-header">
                    企业用人情况统计
                    <el-date-picker
                        v-model="pyear"
                        type="year"
                        placeholder="年份"
                        class="pull-right"
                        @change="getEmployment"
                        value-format="yyyy">
                    </el-date-picker>
                </div>
                <div class="box-body">
                    <el-table :data="comEmployee" border stripe>
                        <el-table-column
                            type="index"
                            label="序号"
                            :width="50">
                        </el-table-column>
                        <el-table-column
                            label="公司名称"
                            prop="company">
                        </el-table-column>
                        <el-table-column
                            label="用人情况/人"
                            prop="num">
                        </el-table-column>
                        <el-table-column
                            label="占比">
                            <template slot-scope="scope">
                                {{ratio(comEmployee[scope.$index].num)}}
                            </template>
                        </el-table-column>
                    </el-table>
                    在企业工作总人数：{{total}}人
                </div>
            </div>
        </div>
        <div class="col-md-5">
            <div class="box" style="height:640px;">
                <div class="box-header">
                    企业对毕业生评价统计
                    <el-date-picker
                        v-model="cyear"
                        type="year"
                        placeholder="年份"
                        class="pull-right"
                        @change="getEvaluate"
                        value-format="yyyy">
                    </el-date-picker>
                </div>
                <div class="box-body">
                    <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { employment, evaluate } from '@/api'
import { formatFloat } from '@/utils'
export default {
  name: 'Evaluation',
  data () {
    return {
      comEmployee: [],
      pyear: null,
      cyear: null,
      total: 0,
      chartData: {
        columns: ['evaluate', 'num'],
        rows: []
      },
      chartSettings: {
        radius: 169,
        offsetY: 225
      }
    }
  },
  methods: {
    async getEmployment () {
      const data = await employment(this.pyear)
      if (data.code === 0) {
        this.comEmployee = data.data
        this.setTotal(data.data)
      }
    },
    async getEvaluate () {
      const data = await evaluate(this.cyear)
      if (data.code === 0) {
        this.setRow(data.data)
      }
    },
    setRow (data) {
      this.chartData.rows = []
      for (let i = 0; i < data.length; i++) {
        const e = data[i]
        e.evaluate = this.switchName(e.evaluate)
        this.chartData.rows.push(e)
      }
    },
    switchName (e) {
      switch (e) {
        case 1:
          return '非常差'
        case 2:
          return '差'
        case 3:
          return '合格'
        case 4:
          return '良好'
        case 5:
          return '优秀'
      }
    },
    setTotal (data) {
      this.total = 0
      for (let i = 0; i < data.length; i++) {
        const e = data[i]
        this.total += e.num
      }
    },
    ratio (count) {
      const val = count / this.total * 100
      const rs = formatFloat(val, 2) + '%'
      return rs
    }
  },
  mounted () {
    this.getEmployment()
    this.getEvaluate()
  }
}
</script>

<style>

</style>
