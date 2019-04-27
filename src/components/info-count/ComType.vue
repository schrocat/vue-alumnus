<template>
    <div class="row">
        <div class="col-md-7">
            <div class="box">
                <el-table :data="c_data" border stripe style="width:100%;">
                <el-table-column
                    type="index"
                    label="编号"
                    width="80px">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="性质">
                </el-table-column>
                <el-table-column
                    prop="num"
                    label="人数">
                </el-table-column>
                <el-table-column
                    prop="pol"
                    label="占比">
                </el-table-column>
            </el-table>
            </div>
        </div>
        <div class="col-md-5">
            <div class="box" style="height:600px;">
              <div class="box-header">工作单位性质饼图统计</div>
              <div class="box-body">
                <ve-pie :data="chartData" heigth="100%" :settings="chartSettings"></ve-pie>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    this.chartSettings = {
      radius: 169,
      offsetY: 225
    }
    return {
      c_data: [{
        type: '国企',
        num: 50,
        pol: '10%'
      }, {
        type: '公私合作',
        num: 50,
        pol: '10%'
      }, {
        type: '外企',
        num: 100,
        pol: '20%'
      }, {
        type: '私企',
        num: 100,
        pol: '20%'
      }, {
        type: '集体企业',
        num: 200,
        pol: '40%'
      }],
      chartData: {
        columns: ['date', 'user'],
        rows: [
          {'date': '国企', 'user': 50},
          {'date': '公私合作', 'user': 50},
          {'date': '外企', 'user': 100},
          {'date': '私企', 'user': 100},
          {'date': '集体企业', 'user': 200}
        ]
      }
    }
  }
}
</script>

<style>

</style>
