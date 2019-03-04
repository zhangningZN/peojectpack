<template>
  <div class="container clearfloat">
    <div v-for="(item,key) in this.arr" :key="key" class="single" style="border:1px solid #333">
      <div :id="'qrcode'+key" class="left"></div>
      <div class="right" style="text-align:center">
        <img src="../../assets/dd.png" alt="" width="25px" style="vertical-align:middle;margin-top:3px">
        <p style="font-size:12px">钉钉扫码</p>
        <b style="font-size:12px;font-weight:700">绑定设备</b>
        <div style="font-size:12px">{{item.amsEquipmentId}}</div>
        <b style="font-size:12px">{{item.owner}}</b>
      </div>
    </div>
    <el-button class="not-print" style="position:absolute;width:80px;height:35px;right:30px;top:28px" @click="print">点击打印</el-button>
  </div>
</template>
<script>
  import $ from '../../../static/lib/jquery-1.11.1'
  import '../../../static/lib/jquery.qrcode'
  import '../../../static/lib/qrcode'
  import '../../../static/lib/utf'
  export default {
    data () {
      return {
        arr: []
      }
    },
    methods: {
      back () {
        this.$router.go(-1)
      },
      print () {
        window.print()
      }
    },
    mounted () {
      this.arr = this.$route.params
      // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
      try {
        this.arr.forEach((v, i) => {
          this.$nextTick(() => {
            // alert('http://mlzc.topwinchance.com/?amsEquipmentId=' + v.amsEquipmentId)
            $('#qrcode' + i).qrcode({
              render: 'canvas',
              text: 'http://mlzc.dajiaok.com/?Id=' + v.amsEquipmentId,
              width: '70',
              height: '70',
              background: '#ffffff',
              foreground: '#000000'
              // src: '../../../static/img/2.png'
            })
          })
        })
      } catch (error) {
        console.log(this.arr + '获取不到元素')
      }
    }
  }
</script>

<style scoped>
    @font-face {
      font-family: 'myFont';
      src: url(../../assets/font/ALTGOT2N.ttf)format('trueType')
    }

  *{
    margin:0;
    padding: 0;
    font-family: 'myFont'
  }
  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }

  .clearfloat {
    zoom: 1
  }

  h1 {
    color: aqua;
  }

  @media print {
    .not-print {
      display: none;
    }
  }

  .container {
    background-color: #fff;
  }

  .el-card {
    margin: 0;
    padding: 0
  }

  .single {
    width: 167px;
    margin: 3px;
    height: 100px;
    display: inline-block;
    /* background-color: crimson; */
    /* border: 2px solid #333; */
  }
  .left{
    float: left;
    margin-top:15px;
    margin-left: 10px;
  }
  .right{
    float: right;
    /* background-color: aqua; */
    margin-top: 15px;
    height: 90px;
    width: 80px;
  }
  .single:nth-of-type(n){
    box-sizing: border-box;
  }
</style>
