<template>
    <div class="row">
        <div class="col-xs-6">
            <div class="box" style="height:529px;">
                <div class="box-header">
                  就业率
                  <el-tooltip content="展示过去五年内的就业率,默认是今年" placement="right" effect="dark">
                    <el-date-picker
                      v-model="syear"
                      type="year"
                      placeholder="年份"
                      value-format="yyyy"
                      class="pull-right"
                      @change="getERate">
                    </el-date-picker>
                  </el-tooltip>
                </div>
                <div class="box-body">
                    <ve-line :data="cdata" :settings="lineSetting" :extend="lineExtend"></ve-line>
                </div>
            </div>
        </div>
        <div class="col-xs-6">
            <div class="box" style="height:529px;">
                <div class="box-header">
                    毕业去向
                    <el-button style="padding:0px;" @click="change_chart">
                        <i v-bind:class="[!isclick ? 'fa fa-bar-chart' : 'fa fa-pie-chart']"></i>
                    </el-button>
                    <el-date-picker
                      v-model="cyear"
                      type="year"
                      placeholder="年份"
                      value-format="yyyy"
                      class="pull-right"
                      @change="getModus">
                    </el-date-picker>
                </div>
                <div class="box-body">
                    <ve-chart :data ="chartData" :settings="chartSettings"></ve-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { eRate, modus } from '@/api'
// import { formatFloat } from '@/utils'
export default {
  data () {
    this.typeArr = ['pie', 'histogram']
    this.index = 0
    return {
      active: '1',
      isclick: true,
      syear: null,
      cyear: null,
      cdata: {
        columns: ['year', 'total', 'noWork', 'eRate'],
        rows: []
      },
      chartData: {
        columns: ['nowStatus', 'num'],
        rows: []
      },
      chartSettings: {
        type: this.typeArr[this.index],
        radius: 169,
        offsetY: 225,
        labelMap: {
          'nowStatus': '就业形式',
          'num': '就业形式人数'
        }
      },
      lineSetting: {
        axisSite: {right: ['eRate']},
        yAxisType: ['normal', 'percent'],
        yAxisName: ['人数', '比率'],
        labelMap: {
          'year': '年份',
          'total': '毕业生总数',
          'noWork': '已就业毕业生人数',
          'eRate': '就业率'
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
      }
    }
  },
  methods: {
    change_chart () {
      this.isclick = !this.isclick
      this.index++
      if (this.index >= this.typeArr.length) { this.index = 0 }
      this.chartSettings.type = this.typeArr[this.index]
    },
    async getERate () {
      const data = await eRate(this.syear)
      if (data.code === 0) {
        this.cdata.rows = data.data
      }
    },
    async getModus () {
      const data = await modus(this.cyear)
      if (data.code === 0) {
        this.chartData.rows = data.data
      }
    }
  },
  mounted () {
    this.getERate()
    this.getModus()
  }
}
</script>

<style>

</style>
