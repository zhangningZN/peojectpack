<template>
<div>

   <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" >
        <el-table-column type="selection" align="left">
        </el-table-column>
        <el-table-column label="设备编码" align="left">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="设备编码" align="left">
        </el-table-column>
        <el-table-column prop="address" label="设备名称" show-overflow-tooltip align="left">
        </el-table-column>
        <el-table-column prop="address" label="设备分类" show-overflow-tooltip align="left">
        </el-table-column>
        <el-table-column prop="address" label="资产属性" show-overflow-tooltip align="left">
        </el-table-column>
        <el-table-column prop="address" label="详细配置" show-overflow-tooltip align="left">
        </el-table-column>
        <el-table-column prop="address" label="存放地点" show-overflow-tooltip align="left">
        </el-table-column>
        <el-table-column prop="address" label="保管人员" show-overflow-tooltip align="left">
        </el-table-column>
        <el-table-column prop="address" label="使用情况" show-overflow-tooltip align="left">
        </el-table-column>
        <el-table-column prop="address" label="入库时间" show-overflow-tooltip align="left">
        </el-table-column>
        <el-table-column prop="address" label="报备状况" show-overflow-tooltip align="left">
        </el-table-column>
        <el-table-column prop="address" label="上次报备时间" show-overflow-tooltip align="left">
        </el-table-column>
        <el-table-column prop="address" label="备注" show-overflow-tooltip align="left">
        </el-table-column>
      </el-table>
      <el-pagination style="text-align:right;margin-top:20px;" background layout="prev, pager, next" :total="100">
      </el-pagination>
</div>
</template>
<script>
  export default {
    data () {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市'
        }],
        multipleSelection: []
      }
    },

    methods: {
    }
  }
</script>
