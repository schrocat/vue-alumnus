<template>
    <div class="row">
        <div class="col-md-4">
          <div class="box">
            <div class="box-header">
              就业地区分布统计
              <el-date-picker
                type="year"
                placeholder="年份"
                v-model="year"
                value-format="yyyy"
                class="pull-right"
                @change="getWork()">
              </el-date-picker>
            </div>
            <div class="box-body">
                <el-table :data="c_data" border stripe height="540">
                    <el-table-column
                        label="地区">
                        <template slot-scope="scope">
                        {{c_data[scope.$index].area?c_data[scope.$index].area:'未填写'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="人数">
                    </el-table-column>
                    <el-table-column
                        label="占比">
                        <template slot-scope="scope">
                        {{ratio(c_data[scope.$index].num)}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
          </div>
        </div>
        <div class="col-md-8">
            <div class="box">
              <!-- <div class="box-header">地区分布海量图</div> -->
              <div class="box-body">
                <baidu-map class="map" :center="{lng: 105.000, lat: 38.000}" :zoom="5">
                    <bm-point-collection :points="c_points"  color="red" size="BMAP_POINT_SIZE_SMALL"></bm-point-collection>
                </baidu-map>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { workLocation, workPosition } from '@/api'
import { formatFloat } from '@/utils'
export default {
  data () {
    return {
      c_data: [],
      c_points: [],
      year: null,
      total: 0
    }
  },
  methods: {
    async getWorkLocation () {
      const data = await workLocation(this.year)
      if (data.code === 0) {
        const d = data.data
        const points = []
        for (let i = 0; i < d.length; i++) {
          const e = d[i].liveLocation
          if (e) {
            points.push(JSON.parse(e))
          }
        }
        this.c_points = points
      }
    },
    async getWorkPosition () {
      const data = await workPosition(this.year)
      if (data.code === 0) {
        this.c_data = data.data
        this.setTotal(data.data)
      }
    },
    setTotal (data) {
      this.total = 0
      for (let i = 0; i < data.length; i++) {
        this.total += data[i].num
      }
    },
    ratio (count) {
      const val = count / this.total * 100
      const rs = formatFloat(val, 2) + '%'
      return rs
    },
    getWork () {
      this.getWorkLocation()
      this.getWorkPosition()
    }
  },
  mounted () {
    this.getWorkLocation()
    this.getWorkPosition()
  }
}
</script>

<style>
.map {
  width: 100%;
  height: 600px;
}
.anchorBL{
  display:none;
}
</style>
