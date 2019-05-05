<template>
    <div class="row">
        <div class="col-md-7">
            <div class="box" style="height:600px;">
              <div class="box-header">
                <el-date-picker
                  v-model="year"
                  type="year"
                  placeholder="年份"
                  class="pull-right"
                  @change="getWorkProperty"
                  value-format="yyyy">
                </el-date-picker>
              </div>
              <div class="box-body">
                <el-table :data="c_data" border stripe style="width:100%;">
                  <el-table-column
                      type="index"
                      label="编号"
                      width="80px">
                  </el-table-column>
                  <el-table-column
                      prop="property"
                      label="性质">
                  </el-table-column>
                  <el-table-column
                      prop="count"
                      label="人数">
                  </el-table-column>
                  <el-table-column
                      label="占比">
                      <template slot-scope="scope">
                        {{ratio(c_data[scope.$index].count)}}
                      </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
        </div>
        <div class="col-md-5">
            <div class="box" style="height:600px;">
              <div class="box-header">工作单位性质统计</div>
              <div class="box-body">
                <ve-pie :data="chartData" heigth="100%" :settings="chartSettings" :extend="extend"></ve-pie>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { workProperty } from '@/api'
import { formatFloat } from '@/utils'
export default {
  data () {
    this.chartSettings = {
      radius: 169,
      offsetY: 225
    }
    return {
      c_data: [],
      total: 0,
      chartData: {
        columns: ['property', 'count'],
        rows: []
      },
      year: null,
      extend: {
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
    async getWorkProperty () {
      const data = await workProperty(this.year)
      if (data.code === 0) {
        this.c_data = data.data
        this.setTotal()
        this.chartData.rows = data.data
      }
    },
    setTotal () {
      this.total = 0
      for (let i = 0; i < this.c_data.length; i++) {
        this.total += this.c_data[i].count
      }
    },
    ratio (count) {
      const val = count / this.total * 100
      const rs = formatFloat(val, 2) + '%'
      return rs
    }
  },
  mounted () {
    this.getWorkProperty()
  }
}
</script>

<style>

</style>
