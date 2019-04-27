<template>
    <div class="row">
        <div class="col-md-4">
            <el-card :body-style="{ padding: '0px' }" shadow="never">
                <el-table :data="c_data" border stripe height="600">
                    <el-table-column
                        label="地区">
                    </el-table-column>
                    <el-table-column
                        label="人数">
                    </el-table-column>
                    <el-table-column
                        label="占比">
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <div class="col-md-8">
            <baidu-map class="map" :center="{lng: 105.000, lat: 38.000}" :zoom="5">
                <bm-point-collection :points="c_points"  color="red" size="BMAP_POINT_SIZE_SMALL"></bm-point-collection>
            </baidu-map>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      c_data: [],
      c_points: [{
        lng: 116.00,
        lat: 23.00
      }, {
        lng: 110.00,
        lat: 13.00
      }, {
        lng: 112.00,
        lat: 16.00
      }, {
        lng: 116.00,
        lat: 23.00
      }, {
        lng: 121.00,
        lat: 23.00
      }, {
        lng: 130.00,
        lat: 25.00
      }, {
        lng: 134.00,
        lat: 33.00
      }, {
        lng: 143.00,
        lat: 24.00
      }, {
        lng: 156.00,
        lat: 29.00
      }, {
        lng: 130.00,
        lat: 43.00
      }, {
        lng: 122.00,
        lat: 29.00
      }, {
        lng: 119.00,
        lat: 33.00
      }]
    }
  }
}
</script>

<style>
.map {
  width: 100%;
  height: 600px;
}
</style>
