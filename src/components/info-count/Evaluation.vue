<template>
    <div class="row">
        <div class="col-xs-6">
            <div class="box" style="height:600px;">
                <div class="box-header">企业用人情况统计</div>
                <div class="box-body">
                    <el-table :data="comEmployee" border stripe>
                        <el-table-column
                            label="公司名称">
                        </el-table-column>
                        <el-table-column
                            label="用人情况/人">
                        </el-table-column>
                        <el-table-column
                            label="占比">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="col-xs-6">
            <div class="box" style="height:600px;">
                <div class="box-header">企业对毕业生评价统计</div>
                <div class="box-body">
                    <ve-chart ></ve-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Evaluation',
  data () {
    return {
      comEmployee: [],
      evaluations: {},
      chartData: {
        columns: [],
        rows: []
      },
      chartSettings: {
      }
    }
  }
}
</script>

<style>

</style>
