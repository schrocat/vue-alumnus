<template>
    <div class="row">
        <div class="col-md-4">
          <div class="box" style="height:640px;overflow:auto;">
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
            <div class="box-body" >
                <el-table :data="c_data" border stripe>
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
            <div class="box" style="height:640px;">
              <!-- <div class="box-header">地区分布海量图</div> -->
              <div class="box-body">
                <baidu-map class="map" :center="{lng: 105.000, lat: 38.000}" :zoom="5">
                    <!-- <bm-point-collection :points="c_points"  color="red" size="BMAP_POINT_SIZE_SMALL"></bm-point-collection> -->
                    <!-- <bml-heatmap :data="c_points" :max="100" :radius="50" :gradient="gradient"></bml-heatmap> -->
                    <bm-marker v-for="p in c_points" :key="p.id" :position="p"></bm-marker>
                    <!-- <bm-marker :position="{lng: 116.404, lat: 39.915}"></bm-marker>
                    <bm-marker :position="{lng: 25.831, lat: 114.924}"></bm-marker>
                    <bm-marker :position="{lng: 23.12, lat: 113.159 }"></bm-marker>
                    <bm-marker :position="{lng: 24.479, lat: 118.059}"></bm-marker>
                    <bm-marker :position="{ lng: 24.47, lat: 114.059 }"></bm-marker>
                    <bm-marker :position="{ lng: 23.12, lat: 113.059}"></bm-marker>
                    <bm-marker :position="{ lng: 30.25, lat: 120.05}"></bm-marker>
                    <bm-marker :position="{lng: 23.12, lat: 113.25 }"></bm-marker>
                    <bm-marker :position="{lng: 23.353, lat: 116.682}"></bm-marker>
                    <bm-marker :position="{lng: 30.27, lat: 120.15}"></bm-marker>
                    <bm-marker :position="{lng: 23.153, lat: 116.482 }"></bm-marker>
                    <bm-marker :position="{lng: 23.12, lat: 113.25}"></bm-marker>
                    <bm-marker :position="{lng: 23.02, lat: 113.15}"></bm-marker>
                    <bm-marker :position="{lng: 23.143, lat: 116.472}"></bm-marker>
                    <bm-marker :position="{lng: 30.27, lat: 120.15}"></bm-marker>
                    <bm-marker :position="{lng: 23.153, lat: 116.482}"></bm-marker>
                    <bm-marker :position="{lng: 22.532, lat: 114.059}"></bm-marker>
                    <bm-marker :position=" {lng: 22.522, lat: 114.059 }"></bm-marker> -->
                </baidu-map>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { workLocation, workPosition } from '@/api'
import { formatFloat } from '@/utils'
import { BmlHeatmap } from 'vue-baidu-map'
export default {
  components: {
    BmlHeatmap
  },
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
        this.c_points = []
        for (let i = 1; i <= d.length; i++) {
          const e = JSON.parse(d[i - 1].liveLocation)
          e.id = i
          this.c_points.push(e)
        }
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
      this.getWorkPosition()
      this.getWorkLocation()
    }
  },
  mounted () {
    this.getWorkPosition()
    this.getWorkLocation()
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
