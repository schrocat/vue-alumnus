<template>
    <div class="row">
        <div class="col-md-6">
            <div class="box" style="height:640px;">
                <div class="box-header">
                    深造、自主创业和升职统计
                    <el-date-picker
                        type="year"
                        placeholder="年份"
                        class="pull-right"
                        value-format="yyyy"
                        v-model="dyear"
                        @change="getDeep">
                    </el-date-picker>
                </div>
                <div class="box-body">
                    <el-table :data="tdata" border stripe>
                        <el-table-column
                            label="状态"
                            prop="nowStatus">
                        </el-table-column>
                        <el-table-column
                            label="人数"
                            prop="num">
                        </el-table-column>
                        <el-table-column
                            label="占比">
                            <template slot-scope="scope">
                                {{ratio(tdata[scope.$index].num)}}
                            </template>
                        </el-table-column>
                    </el-table>
                    毕业生总数：{{total}}人
                    <ve-line :data="ldata" :settings="lineSettings" :extend="lineExtend"></ve-line>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="box" style="height:640px;">
                <div class="box-header">
                    年薪统计
                    <el-button style="padding:0px;" @click="change_chart">
                        <i v-bind:class="[!isclick ? 'fa fa-bar-chart' : 'fa fa-pie-chart']"></i>
                    </el-button>
                    <el-date-picker
                        type="year"
                        placeholder="年份"
                        class="pull-right"
                        value-format="yyyy"
                        v-model="syear"
                        @change="getYSalary">
                    </el-date-picker>
                </div>
                <div class="box-body">
                    <ve-chart :data="cdata" :settings="chartSettings"></ve-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { deepTotal, deep, ySalary } from '@/api'
import { formatFloat } from '@/utils'
export default {
  name: 'Salary',
  data () {
    this.typeArr = ['pie', 'histogram']
    this.index = 0
    return {
      total: 0,
      tdata: [],
      isclick: true,
      dyear: null,
      syear: null,
      ldata: {
        columns: ['year', 'abroad', 'business', 'promotion'],
        rows: []
      },
      lineSettings: {
        // axisSite: {right: ['eRate']},
        yAxisType: ['percent'],
        yAxisName: ['比率'],
        labelMap: {
          'year': '年份',
          'abroad': '留学深造',
          'business': '自主创业',
          'promotion': '升职'
        }
      },
      lineExtend: {
        series: {
          label: {
            normal: {
              show: true
            }
          }
        }
      },
      cdata: {
        columns: ['salary_level', 'count'],
        rows: []
      },
      chartSettings: {
        type: this.typeArr[this.index],
        radius: 169,
        offsetY: 225,
        labelMap: {
          'salary_level': '年薪水平',
          'count': '人数'
        }
      }
    }
  },
  methods: {
    async getDeepTotal () {
      const data = await deepTotal()
      if (data.code === 0) {
        this.total = data.data.total
        this.tdata = data.data.data
      }
    },
    async getDeep () {
      const data = await deep(this.dyear)
      if (data.code === 0) {
        this.ldata.rows = data.data
      }
    },
    async getYSalary () {
      const data = await ySalary(this.syear)
      if (data.code === 0) {
        this.cdata.rows = data.data
        // console.log(this.cdata.rows)
      }
    },
    ratio (count) {
      const val = count / this.total * 100
      const rs = formatFloat(val, 2) + '%'
      return rs
    },
    change_chart () {
      this.isclick = !this.isclick
      this.index++
      if (this.index >= this.typeArr.length) { this.index = 0 }
      this.chartSettings.type = this.typeArr[this.index]
    }
  },
  mounted () {
    this.getDeepTotal()
    this.getDeep()
    this.getYSalary()
  }
}
</script>

<style>

</style>
