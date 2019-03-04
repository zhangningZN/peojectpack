<template>
  <div>
    <el-row class="header-container not-print">
      <el-col :span="16" style="text-align:left">
        <h3 class="name"><i class="el-icon-setting"></i> 资产管理系统</h3>
      </el-col>
      <el-col :span="8" style="text-align:right">
        <el-row>
            <h4> 杭州壹网壹创科技股份有限公司&nbsp;&nbsp;&nbsp;&nbsp;
              <!-- <el-button type="primary" size="small" style="margin:0 10px" @click="close">退出</el-button> -->
            </h4>
        </el-row>
        </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      close () {
        alert('--------------')
        window.opener = null
        window.open('', '_self')
        window.close()
      }
    }
  }
</script>

<style scoped  lang="scss">
  .header-container{
    background-color: #041a33;
    border-radius: 5px;
    padding-left:10px;
    color: #fff;
    .name{
      padding-left: 10px;
    }
  }
</style>
