<template>
    <div class="row">
        <div class="col-md-7">
            <div class="box" style="height:600px;">
                <div class="box-header">
                    深造、自主创业和升职统计
                    <el-date-picker
                        type="year"
                        placeholder="年份"
                        class="pull-right"
                        value-format="yyyy">
                    </el-date-picker>
                </div>
                <div class="box-body">
                    <el-table  border stripe>
                        <el-table-column
                            label="状态">
                        </el-table-column>
                        <el-table-column
                            label="人数">
                        </el-table-column>
                        <el-table-column
                            label="总人数">
                        </el-table-column>
                        <el-table-column
                            label="占比">
                        </el-table-column>
                    </el-table>
                    <ve-line></ve-line>
                </div>
            </div>
        </div>
        <div class="col-md-5">
            <div class="box" style="height:600px;">
                <div class="box-header">
                    年薪统计
                    <el-date-picker
                        type="year"
                        placeholder="年份"
                        class="pull-right"
                        value-format="yyyy">
                    </el-date-picker>
                </div>
                <div class="box-body">
                    <ve-chart></ve-chart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Salary'
}
</script>

<style>

</style>
