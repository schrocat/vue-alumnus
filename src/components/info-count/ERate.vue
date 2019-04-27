<template>
    <div class="row">
        <div class="col-xs-6">
            <div class="box" style="height:529px;">
                <div class="box-header">就业率</div>
                <div class="box-body">
                    <ve-line :data="cdata"></ve-line>
                </div>
            </div>
        </div>
        <div class="col-xs-6">
            <div class="box" style="height:529px;">
                <div class="box-header">
                    毕业去向
                    <el-button class="pull-right" circle size="mini" @click="change_chart">
                        <i v-bind:class="[!isclick ? 'fa fa-bar-chart' : 'fa fa-pie-chart']"></i>
                    </el-button>
                </div>
                <div class="box-body">
                    <ve-chart :data = "chartData" :settings="chartSettings"></ve-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    this.typeArr = ['histogram', 'pie']
    this.index = 0
    return {
      active: '1',
      isclick: true,
      cdata: {
        columns: ['年份', '毕业生', '未就业毕业生', '就业率'],
        rows: [
          { '年份': '2014', '毕业生': 1393, '未就业毕业生': 93, '就业率': 0.32 },
          { '年份': '2015', '毕业生': 3530, '未就业毕业生': 30, '就业率': 0.26 },
          { '年份': '2016', '毕业生': 2923, '未就业毕业生': 23, '就业率': 0.76 },
          { '年份': '2017', '毕业生': 1723, '未就业毕业生': 23, '就业率': 0.49 },
          { '年份': '2018', '毕业生': 3792, '未就业毕业生': 92, '就业率': 0.323 },
          { '年份': '2019', '毕业生': 4593, '未就业毕业生': 93, '就业率': 0.78 }
        ]
      },
      chartData: {
        columns: ['日期', '就业形式人数'],
        rows: [
          { '日期': '签约', '就业形式人数': 1523 },
          { '日期': '签合同', '就业形式人数': 1223 },
          { '日期': '升学', '就业形式人数': 2123 },
          { '日期': '出国', '就业形式人数': 4123 },
          { '日期': '创业', '就业形式人数': 3123 },
          { '日期': '其他', '就业形式人数': 7123 }
        ]
      },
      chartSettings: { type: this.typeArr[this.index] }
    }
  },
  methods: {
    change_chart () {
      this.isclick = !this.isclick
      this.index++
      if (this.index >= this.typeArr.length) { this.index = 0 }
      this.chartSettings = { type: this.typeArr[this.index] }
    }
  }
}
</script>

<style>

</style>
