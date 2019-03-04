<template>
  <div>
    <el-card class="tabs-container">
      <el-row>
      </el-row>
      <el-row class="tool-bar">
        <el-col :span="15" style="line-height:40px;text-align:left">
        <el-button size="small"  :class="{selected:value==item.value}" v-for="item in options" :key="item.value" @click="value=item.value" >
          {{item.label}}
        </el-button>
        <el-radio v-model="active" label="enable" size="mini" border>已激活</el-radio>
        <el-radio v-model="active" label="disable" size="mini" border>未激活</el-radio>
        </el-col>
        <el-col :span="4">
      <el-input placeholder="输入关键字查询"  v-model="input" size="mini" style="margin-top:8px;">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
        </el-col>
        <el-col :span="5"  class="icon-container"  style="line-height:40px;text-align:right">
          <div>
            <el-tooltip content="点击盘点" placement="bottom" effect="light">
              <i class="el-icon-sort" @click="changeStatusToInventory"></i>
            </el-tooltip>
            <el-tooltip content="报废设备" placement="bottom" effect="light">
              <i class="el-icon-circle-close-outline" @click="changeStatusToScrapped"></i>
            </el-tooltip>
            <el-tooltip content="添加设备" placement="bottom" effect="light">
              <i class="el-icon-plus" @click="uploadVisable=!uploadVisable"></i>
            </el-tooltip>
            <el-tooltip content="打印设备编码" placement="bottom" effect="light">
              <i class="el-icon-printer" @click="exportqr"></i>
            </el-tooltip>
            <el-tooltip content="excel导出" placement="bottom" effect="light">
              <i class="el-icon-download" @click="exportExcel"></i>
            </el-tooltip>
            <el-tooltip content="token设置" placement="bottom" effect="light">
              <i class="el-icon-setting" @click="configVisable=!configVisable"></i>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-table ref="multipleTable" :default-sort="{prop: 'gmtModify', order: 'descending'}" class="table" border @select-all="selectall"
          @select="choose2del" highlight-current-row :data="filterData" tooltip-effect="dark"
          :max-height="700" style="font-size:12px" @sort-change="order">
          <el-table-column type="selection" align="left" :fixed="true">
          </el-table-column>
          <el-table-column prop="amsEquipmentId" width="110" label="设备编码" align="center" show-overflow-tooltip sortable>
          </el-table-column>
          <el-table-column prop="equipmentName" width="120" label="设备名称" show-overflow-tooltip align="center" sortable>
          </el-table-column>
          <el-table-column prop="amsType" width="110" label="设备分类" show-overflow-tooltip align="center" sortable>
          </el-table-column>
          <el-table-column prop="owner" width="110" label="资产属性" show-overflow-tooltip align="center" sortable>
          </el-table-column>
          <el-table-column label="配置信息" width="90" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <div v-for="(item,index) in scope.row.equipmentDetailList" :key="index">
                  <span v-show="item['label']!='MAC'">{{item.label}}:{{item.value}}</span>
                </div>
                <div slot="reference" class="name-wrapper" v-show="scope.row.equipmentDetailList">
                  <el-tag size="warning">配置信息</el-tag>
                </div>
                <div slot="reference" class="name-wrapper" v-show="!scope.row.equipmentDetailList">
                  <el-tag color="#FFF">暂无</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="MAC" width="120" label="mac地址" show-overflow-tooltip align="center" resizable sortable>
          </el-table-column>
          <!-- <el-table-column prop="status" width="80" label="设备状态" align="left">
          </el-table-column> -->
          <el-table-column prop="IP" width="120" label="IP地址" show-overflow-tooltip align="center" sortable>
          </el-table-column>
          <el-table-column prop="department" width="110" label="使用部门" show-overflow-tooltip align="center" sortable='custom'>
          </el-table-column>
          <el-table-column prop="userName" width="110" label="使用人员" show-overflow-tooltip align="center" sortable>
          </el-table-column>
          <el-table-column width="120" label="使用状态" show-overflow-tooltip align="center" sortable sort-by="status">
            <template slot-scope="scope">
              <span :class="[scope.row.status=='在用'?'red':'blue']">{{scope.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="memo" width="120" label="备注" show-overflow-tooltip align="center" empty-text="-">
          </el-table-column>
          <el-table-column prop="position" width="110" label="存放地点" show-overflow-tooltip align="center" sortable>
          </el-table-column>
          <el-table-column prop="pairTime" width="110" :resizable='true' label="绑定时间" sortable :formatter="format" show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column width="50" align="center" label="编辑">
            <template slot-scope="scope">
              <i class="el-icon-edit" style="font-size:16px;cursor:pointer;" @click="showEdit(scope.row)"></i>
            </template>
          </el-table-column>
          <el-table-column prop="reportStatus" width="110" label="报备状态" show-overflow-tooltip align="center" sortable>
          </el-table-column>
          <el-table-column prop="companyName" width="110" label="公司名称" show-overflow-tooltip align="center" sortable>
          </el-table-column>
          <el-table-column prop="reportTime" width="110" :resizable='true' label="报备时间"  :formatter="format" show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column prop="gmtModify" width="110" :resizable='true' label="更新时间"  :formatter="format" show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column width="50" fixed="right" align="center" label="记录">
            <template slot-scope="scope">
              <i class="el-icon-share" style="font-size:16px;cursor:pointer;" @click="showLog(scope.row.id)"></i>
            </template>
          </el-table-column>
        </el-table>

        <p style="font-size:12px;position:absolute;right:30px">ps: &copy; 如需修改设备请输入口令</p>
        <!-- <p style="font-size:12px;position:absolute;left:30px">当前选择条数{{chooseId.length}}</p> -->
        <el-pagination :page-sizes="[36, 360, 1440, 3600]" layout="total, sizes, prev, pager, next, jumper" :total.sync="total"
          :current-page.sync="page" @size-change="sizechange" style="margin:10px 0">
        </el-pagination>

      </el-row>

    </el-card>


    <el-dialog title="编辑屏幕" :visible.sync="screenVisable" width="30%">
      <el-form label-position="left" label-width="80px" :model="screen" ref="screen">
        <el-form-item label="产品名称" prop="equipmentName">
          <el-input v-model="screen.equipmentName" placeholder="示例:dell u2417h"></el-input>
        </el-form-item>
        <el-form-item label="屏幕尺寸" prop="size">
          <el-input v-model="screen.size" placeholder="示例：23.2寸"></el-input>
        </el-form-item>
        <el-form-item label="分辨率" prop="resolving">
          <el-input v-model="screen.resolving" placeholder="示例：1920*1080"></el-input>
        </el-form-item>
        <el-form-item label="备注" v-show="isAdmin">
          <el-input v-model="screen.memo" placeholder="请填写备注"></el-input>
        </el-form-item>
        <el-form-item label="" label-width="0" style="margin-top:20px">
          <el-button type="primary" @click="submitScreen" style="width:80%;margin-top:30px">提交
            <i class="el-icon-upload"></i>
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑主机" :visible.sync="pcVisable" width="30%">
      <el-form label-position="left" label-width="80px" :model="pc" ref="pc">
        <el-form-item label="设备类型" prop="equipmentName">
          <el-select v-model="pc.equipmentName" style="width:100%" placeholder="请选择">
            <el-option label="普通主机" value="普通主机"></el-option>
            <el-option label="设计师主机" value="设计师主机"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理器" prop="cpu">
          <el-input v-model="pc.cpu" placeholder="示例:i5-7200u"></el-input>
        </el-form-item>
        <el-form-item label="内存" prop="mermory">
          <el-input v-model="pc.mermory" placeholder="示例:16G"></el-input>
        </el-form-item>
        <el-form-item label="硬盘" prop="harddick">
          <el-input v-model="pc.harddick" placeholder="示例:1TB"></el-input>
        </el-form-item>
        <el-form-item label="IP地址">
          <el-input v-model="pc.IP" placeholder="请填写IP地址,选填"></el-input>
        </el-form-item>
        <el-form-item label="显卡" prop="graphys">
          <el-input v-model="pc.graphys" placeholder="示例:GTX-1080"></el-input>
        </el-form-item>
        <el-form-item label="MAC" prop="mac">
          <el-input v-model="pc.mac" placeholder="示例：00-01-6C-06-A6-29"></el-input>
        </el-form-item>
        <el-form-item label="备注" v-show="isAdmin">
          <el-input v-model="pc.memo" placeholder="请填写备注信息"></el-input>
        </el-form-item>
        <el-form-item label="" label-width="0" style="margin-top:30px">
          <el-button type="primary" @click="submitPC" style="width:80%">提交
            <i class="el-icon-upload"></i>
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑笔记本" :visible.sync="laptopVisable" width="30%">
      <el-form label-position="left" label-width="80px" :model="laptop" ref="laptop">
        <el-form-item label="设备名称" prop="equipmentName">
          <el-input v-model="laptop.equipmentName" placeholder="示例：surface laptop"></el-input>
        </el-form-item>
        <el-form-item label="处理器" prop="cpu">
          <el-input v-model="laptop.cpu" placeholder="i5-7200u"></el-input>
        </el-form-item>
        <el-form-item label="内存" prop="mermory">
          <el-input v-model="laptop.mermory" placeholder="16G"></el-input>
        </el-form-item>
        <el-form-item label="硬盘" prop="harddick">
          <el-input v-model="laptop.harddick" placeholder="1TB"></el-input>
        </el-form-item>
        <el-form-item label="MAC" prop="mac">
          <el-input v-model="laptop.mac" placeholder="示例：00-01-6C-06-A6-29"></el-input>
        </el-form-item>
        <el-form-item label="备注" v-show="isAdmin">
          <el-input v-model="laptop.memo" placeholder="请填写备注信息"></el-input>
        </el-form-item>
        <el-form-item label="" label-width="0" style="margin-top:20px">
          <el-button type="primary" @click="submitLaptop" style="width:80%">提交
            <i class="el-icon-upload"></i>
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <el-dialog :visible.sync="uploadVisable" width="30%">
      <el-upload class="upload-demo" drag :before-upload="beforeUpload" action="123" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <el-button type="primary" style="backgroundColor:#456">
            <a style="color:#fff" href="http://sjs.topwinchance.com/ams-main/AMS设备导入模版.xlsx">点击下载模板</a>
          </el-button>
        </div>
      </el-upload>
    </el-dialog>

    <el-dialog :visible.sync="detailVisable">
      <el-table :data="detailList" :max-height="600">
        <el-table-column prop="userName" label="用户" align="center"></el-table-column>
        <el-table-column prop="type" label="操作类型" align="center"></el-table-column>
        <el-table-column prop="department" label="部门" align="center"></el-table-column>
        <el-table-column prop="description" label="描述" align="center"></el-table-column>
        <el-table-column prop="gmtCreate" label="变动时间" :formatter="format" align="center"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :visible.sync="configVisable" title='如需对设备信息进行修改，请添加口令！！！' width="30%">
      <el-row>
         <el-col :span="12" :offset="3">
          <el-input placeholder="设置口令" v-model="token"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button @click="setToken">添加口令</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- <el-dialog :visible.sync="sumarryVisiable"  title='当前数据统计' width="50%">
         <el-table
    :data="tableData6"
    border
    height="240"
    show-summary
    style="width: 100%; margin-top: 20px">
    <el-table-column
      prop="id"
      label="设备分类"
      width="180">
    </el-table-column>
    <el-table-column
      prop="count"
      label="数量">
    </el-table-column>
    <el-table-column
      prop="bind_amount"
      label="已绑定">
    </el-table-column>
    <el-table-column
      prop="unbind_amount"
      label="未绑定">
    </el-table-column>
  </el-table>
    </el-dialog> -->

  </div>
</template>

<script>
  // import using from '../Equipment/using.vue'
  import CsvExport from '../../../static/lib/CsvExport'
  import axios from '../../../static/js/axios'
  export default {
    data () {
      return {
        tableData6: [{
          id: '自有主机',
          count: '王小虎',
          bind_amount: '234',
          unbind_amount: '3.2'
        }],
        configVisable: false,
        value: '',
        token: '',
        options: [{
          value: 'amsEquipmentId',
          label: '设备编码'
        }, {
          value: 'userName',
          label: '使用人员'
        },
        {
          value: 'amsType',
          label: '设备分类'
        },
        {
          value: 'reportStatus',
          label: '报备状态'
        }, {
          value: 'status',
          label: '使用状态'
        }, {
          value: 'id',
          label: '系统设备ID'
        }, {
          value: 'department',
          label: '部门'
        }, {
          value: 'memo',
          label: '备注'
        }
        ],
        active: 'enable',
        total: 0,
        page: 1,
        table: [],
        pagesize: 36,
        chooseId: [],
        input: '',
        multipleSelection: [],
        downloadVisable: false,
        detailList: [],
        detailVisable: false,
        uploadVisable: false,
        screen: {
          size: '',
          memo: '',
          resolving: '',
          equipmentName: ''
        },
        pc: {
          equipmentName: '',
          cpu: '',
          mermory: '',
          harddick: '',
          graphys: '',
          mac: '',
          memo: ''
        },
        laptop: {
          equipmentName: '',
          cpu: '',
          mermory: '',
          harddick: '',
          mac: '',
          memo: ''
        },
        isAdmin: true,
        pcVisable: false,
        screenVisable: false,
        laptopVisable: false,
        activeData: {},
        sumarryVisiable: false
      }
    },
    computed: {
      filterData () {
        return this.table
      }
    },
    methods: {
      changeStatusToInventory () {
        let form = new FormData()
        form.append('ids', this.chooseId.map(v => v.id).join(','))
        axios.changeStatusToInventory(form, res => {
          if (res.data.content.errorMsg === 'OK') {
            this.$notify({
              title: '盘点',
              message: '盘点',
              type: 'success'
            })
            this.getAll()
          } else {
            this.$notify({
              title: '失败',
              message: res.data.content.errorMsg,
              type: 'error'
            })
          }
        })
      },
      changeStatusToScrapped () {
        let form = new FormData()
        form.append('ids', this.chooseId.map(v => v.id).join(','))
        axios.changeStatusToScrapped(form, res => {
          if (res.data.content.errorMsg === 'OK') {
            // this.
            this.$notify({
              title: '成功',
              message: '报废成功',
              type: 'success'
            })
            this.getAll()
          } else {
            this.$notify({
              title: '失败',
              message: res.data.content.errorMsg,
              type: 'error'
            })
          }
        })
      },
      setToken () {
        if (this.token) {
          axios.setToken(this.token)
          alert('设置token成功')
        } else {
          alert('不能为空')
        }
      },
      showEdit (a) {
        alert(a.amsType)
        let amsType = a.amsType

        if (amsType.indexOf(amsType) !== -1) {
          this.pcVisable = true
          if (a.equipmentDetailList) {
            a.equipmentDetailList.forEach(v => {
              if (v.label === 'CPU') {
                this.pc.cpu = v.value
              }
              if (v.label === '硬盘') {
                this.pc.harddick = v.value
              }
              if (v.label === '显卡') {
                this.pc.graphys = v.value
              }
              if (v.label === '内存') {
                this.pc.mermory = v.value
              }
              if (v.label === 'MAC') {
                this.pc.mac = v.value
              }
              if (v.label === 'IP') {
                this.pc.IP = v.value
              }
            })
          } else {
            this.pc.cpu = ''
            this.pc.harddick = ''
            this.pc.graphys = ''
            this.pc.mermory = ''
            this.pc.mac = ''
            this.pc.IP = ''
          }
          this.pc.equipmentName = a.equipmentName
          this.pc.memo = a.memo
        } else if (amsType.indexOf('显示器') !== -1) {
          this.screenVisable = true
          if (a.equipmentDetailList) {
            a.equipmentDetailList.forEach(v => {
              if (v.label === '屏幕尺寸') {
                this.screen.size = v.value
              }
              if (v.label === '分辨率') {
                this.screen.resolving = v.value
              }
            })
          } else {
            this.screen.size = ''
            this.screen.resolving = ''
          }
          this.screen.equipmentName = a.equipmentName
          this.screen.memo = a.memo
        } else {
          this.laptopVisable = true
          if (a.equipmentDetailList) {
            a.equipmentDetailList.forEach(v => {
              if (v.label === 'CPU') {
                this.laptop.cpu = v.value
              }
              if (v.label === '硬盘') {
                this.laptop.harddick = v.value
              }
              if (v.label === '内存') {
                this.laptop.mermory = v.value
              }
              if (v.label === 'MAC') {
                this.laptop.mac = v.value
              }
            })
          } else {
            this.laptop.cpu = ''
            this.laptop.harddick = ''
            this.laptop.mermory = ''
            this.laptop.mac = ''
          }
          this.laptop.equipmentName = a.equipmentName
          this.laptop.memo = a.memo
        }

        this.activeData = a
      },
      beforeUpload (file) {
        let fd = new FormData()
        fd.append('file', file)
        axios.upload(fd, res => {
          if (res.statusText === 'OK') {
            this.uploadVisable = false
            // this.
            this.$notify({
              title: '成功',
              message: '上传成功',
              type: 'success'
            })
          } else {
            this.$notify({
              title: '失败',
              message: '请检查excel格式或与管理员联系',
              type: 'error'
            })
          }
        })
        return false
      },
      selectall (param) {
        let arr = param.map(v => {
          return {
            amsEquipmentId: v.amsEquipmentId,
            owner: v.companyName,
            id: v.id
          }
        })
        // 向父组件传值
        this.chooseId = arr
      },
      choose2del (rows) {
        let arr = rows.map(v => {
          return {
            amsEquipmentId: v.amsEquipmentId,
            owner: v.companyName,
            id: v.id
          }
        })
        // 向父组件传值
        this.chooseId = arr
      },
      showLog (id) {
        axios.getLog(id, res => {
          if (res.data.content.errorMsg === 'OK') {
            this.detailList = res.data.content.data
            this.getAll()
          } else {
            this.$notify({
              title: '失败',
              message: '请检查excel格式或与管理员联系',
              type: 'error'
            })
          }
          this.detailVisable = true
        })
      },
      format (a, b, c) {
        return this.getLocalTime(c)
      },
      getLocalTime (time) {
        if (time) {
          let date = new Date(time)
          var y = date.getFullYear()
          var m = date.getMonth() + 1
          m = m < 10 ? ('0' + m) : m
          var d = date.getDate()
          d = d < 10 ? ('0' + d) : d
          var h = date.getHours()
          h = h < 10 ? ('0' + h) : h
          var minute = date.getMinutes()
          minute = minute < 10 ? ('0' + minute) : minute
          var second = date.getSeconds()
          second = second < 10 ? ('0' + second) : second
          return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
        } else {
          return '-'
        }
      },
      // 分页功能
      sizechange (val) {
        this.pagesize = val
        this.getAll()
      },
      chooseIds (arr) {
        console.log(arr)
        this.chooseId = arr
      },
      exportqr () {
        this.$router.push({
          name: 'exportQR',
          params: this.chooseId
        })
      },
      exportExcel () {
        let fields = [
          'amsEquipmentId',
          'companyName',
          'equipmentName',
          'amsType',
          'owner',
          'department',
          'userName',
          'userStatus',
          'position',
          'pairTime',
          'reportStatus',
          'reportTime',
          'memo'
        ]
        let fieldNames = [
          '设备编码',
          '公司名称',
          '设备名称',
          '设备分类',
          '资产属性',
          '使用部门',
          '使用人员',
          '使用状态',
          '存放地点',
          '绑定时间',
          '报备状态',
          '报备时间',
          '备注'
        ]
        let ids = this.chooseId.map(v => {
          return v.amsEquipmentId
        })
        if (!ids) {
          this.$notify({
            title: '导出状态',
            message: '成功',
            type: 'error'
          })
          return false
        }
        let data = this.table.filter(v => {
          return ids.includes(v.amsEquipmentId)
        })

        data.forEach(v => {
          v.pairTime = new Date(v.pairTime).toLocaleString()
          v.reportTime = new Date(v.reportTime).toLocaleString()
        })
        CsvExport(data, fields, fieldNames, new Date().toLocaleString() + '固定资产管理数据')
        // this.
        // todo
        // let arr = data
        // data.map(v => {
        //   return v.equipmentDetailList
        // })
        this.downloadVisable = false
        this.$notify({
          title: '导出状态',
          message: '成功',
          type: 'success'
        })
      },
      submitPC () {
        let form = new FormData()
        form.append('id', this.activeData.id)
        form.append('amsEquipmentId', this.activeData.amsEquipmentId)
        form.append('equipmentName', this.pc.equipmentName)
        if (this.pc.memo) {
          form.append('memo', this.pc.memo)
        }
        form.append('attrs', JSON.stringify({
          CPU: this.pc.cpu,
          '硬盘': this.pc.harddick,
          '内存': this.pc.mermory,
          '显卡': this.pc.graphys,
          'MAC': this.pc.mac,
          'IP': this.pc.IP
        }))

        axios.justSave(form, res => {
          console.log(res)
          if (res.data.content.errorMsg === 'OK') {
            this.$notify({
              title: '成功',
              message: '设备信息修改成功',
              type: 'success'
            })
            this.getAll()
            this.pcVisable = false
          } else {
            this.$notify({
              title: '失败',
              message: res.data.content.errorMsg,
              type: 'error'
            })
          }
        })
      },
      submitScreen () {
        let form = new FormData()
        form.append('id', this.activeData.id)
        form.append('amsEquipmentId', this.activeData.amsEquipmentId)
        //! todo
        form.append('equipmentName', this.screen.equipmentName)
        // form.append('amsType', this.screen.amsType)
        if (this.screen.memo) {
          form.append('memo', this.screen.memo)
        }
        form.append('attrs', JSON.stringify({
          '屏幕尺寸': this.screen.size,
          '分辨率': this.screen.resolving
        }))
        axios.justSave(form, res => {
          if (res.data.content.errorMsg === 'OK') {
            this.$notify({
              title: '成功',
              message: '设备信息修改成功',
              type: 'success'
            })
            this.getAll()
            this.screenVisable = false
          } else {
            this.$notify({
              title: '失败',
              message: res.data.content.errorMsg,
              type: 'error'
            })
          }
        })
      },
      submitLaptop () {
        let form = new FormData()
        form.append('id', this.activeData.id)
        form.append('amsEquipmentId', this.activeData.amsEquipmentId)
        form.append('equipmentName', this.laptop.equipmentName)
        if (this.laptop.memo) {
          form.append('memo', this.laptop.memo)
        }
        form.append('attrs', JSON.stringify({
          CPU: this.laptop.cpu,
          '硬盘': this.laptop.harddick,
          '内存': this.laptop.mermory,
          'MAC': this.laptop.mac
        }))
        axios.justSave(form, res => {
          if (res.data.content.errorMsg === 'OK') {
            this.$notify({
              title: '成功',
              message: '设备信息修改成功',
              type: 'success'
            })
            this.getAll()
            this.laptopVisable = false
          } else {
            this.$notify({
              title: '失败',
              message: res.data.content.errorMsg,
              type: 'error'
            })
          }
        })
      },
      getAll () {
        axios.getTotal({
          page: this.page,
          pageSize: this.pagesize
        }, res => {
          this.table = res.data.content.data.equipmentVos || []
          this.total = res.data.content.data.count
          this.table.forEach(v => {
            if (v.equipmentDetailList) {
              v.equipmentDetailList.forEach(val => {
                let key = val.label
                let value = val.value
                v[key] = value
              })
            }
          })
        })
      },
      order (prop) {
        // console.log(a)
        this.value = prop.prop
      },
      getSumarry () {
        this.sumarryVisiable = true
        let zl = this.table.filter((v, i) => {
          return v.owner === '租赁设备'
        })
        let zy = this.table.filter((v, i) => {
          return v.owner === '自有资产'
        })
        let other = this.table.filter((v, i) => {
          return v.amsType !== '显示器' && v.amsType !== '主机'
        })
        // console.log(hash)
        let zlScreen = zl.filter((v, i) => {
          return v.amsType === '显示器'
        })
        let zlZj = zl.filter((v, i) => {
          return v.amsType === '主机'
        })
        let zyScreen = zy.filter((v, i) => {
          return v.amsType === '显示器'
        })
        let zyZj = zy.filter((v, i) => {
          return v.amsType === '主机'
        })
        this.tableData6 = [
          {
            id: '自有主机',
            count: zyZj.length,
            bind_amount: zyZj.filter((v, i) => {
              return v.userName
            }).length,
            unbind_amount: zyZj.filter((v, i) => {
              return !v.userName
            }).length
          },
          {
            id: '自有显示器',
            count: zyScreen.length,
            bind_amount: zyScreen.filter((v, i) => {
              return v.userName
            }).length,
            unbind_amount: zyScreen.filter((v, i) => {
              return !v.userName
            }).length
          },
          {
            id: '租赁主机',
            count: zlZj.length,
            bind_amount: zlZj.filter((v, i) => {
              return v.userName
            }).length,
            unbind_amount: zlZj.filter((v, i) => {
              return !v.userName
            }).length
          },
          {
            id: '租赁显示器',
            count: zlScreen.length,
            bind_amount: zlScreen.filter((v, i) => {
              return v.userName
            }).length,
            unbind_amount: zlScreen.filter((v, i) => {
              return !v.userName
            }).length
          },
          {
            id: '其他',
            count: other.length,
            bind_amount: other.filter((v, i) => {
              return v.userName
            }).length,
            unbind_amount: other.filter((v, i) => {
              return !v.userName
            }).length
          }
        ]
        console.log(this.tableData6)
      },
      search () {
        if (this.value && this.input) {
          let params = {
            [this.value]: this.input,
            active: this.active
          }
          axios.selectByForm(params, res => {
            let table = res.data.content.data
            if (table) {
              this.table = table.equipmentVos
              this.table.forEach(v => {
                if (v.equipmentDetailList) {
                  v.equipmentDetailList.forEach(val => {
                    let key = val.label
                    let value = val.value
                    v[key] = value
                  })
                }
              })
              this.total = this.table.length
            } else {
              alert('未获取到数据')
            }
          })
        } else {
          this.getAll()
        }
      }

    },
    mounted () {
      // axios.setToken('087b674e2335a7237b6cdf8427ab10f1')
      // this.$http.get('/api').then()
      this.getAll()
    },
    watch: {
      page (now, old) {
        console.log(now)
        console.log(old)
        this.getAll()
      }
    }
  }
</script>

<style lang="scss">
  .tabs-container {
    .tool-bar {
      margin: 15px 0;
      .icon-container {
        font-size: 26px;
        line-height: 30px;
        color: #fff;

        .el-icon-plus {
          background-color: #f0660b;
          border-radius: 15px;
          height: 30px;
          width: 30px;
          margin-right: 10px;
          cursor: pointer;
          text-align: center;
        }
        .el-icon-printer {
          background-color: #3c65a7;
          border-radius: 15px;
          height: 30px;
          width: 30px;
          margin-right: 10px;
          cursor: pointer;
          text-align: center;

        }
        .el-icon-download {
          background-color: #0bb1db;
          border-radius: 15px;
          text-align: center;

          height: 30px;
          width: 30px;
          margin-right: 10px;
          cursor: pointer;
        }
        .el-icon-setting {
          background-color: purple;
          text-align: center;

          border-radius: 15px;
          height: 30px;
          width: 30px;
          margin-right: 10px;
          cursor: pointer;
        }
        .el-icon-document{
          background-color: rgb(243, 24, 207);
          text-align: center;

          border-radius: 15px;
          height: 30px;
          width: 30px;
          margin-right: 10px;
          cursor: pointer;
        }
        .el-icon-sort{
          background-color: cadetblue;
          border-radius: 15px;
          height: 30px;
          text-align: center;

          width: 30px;
          margin-right: 10px;
          cursor: pointer;
        }
        .el-icon-circle-close-outline{
          background-color: cornflowerblue;
          text-align: center;

          border-radius: 15px;
          height: 30px;
          width: 30px;
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
  }

  .dialog {
    text-align: left;
    .el-dialog__body {
      .el-form-item {
        margin-bottom: 0;
        .el-input {
          width: 92%;
        }
      }
      .upload-demo {
        text-align: center;
      }
    }
  }

  .el-icon-share:hover {
    color: rgb(16, 57, 238);
  }

  .table {
    .el-table td,
    .el-table th {
      padding: 2px 0 !important
    }
  }

  .el-table {
    font-size: 12px
  }

  .el-table th {
    font-size: 12px !important
  }

  .el-table td {
    font-size: 12px !important
  }

  .el-table__header-wrapper {
    font-size: 12px !important
  }

  .red {
    color: #f0a608
  }

  .blue {
    color: #4ab1a0
  }

  .el-table td,
  .el-table th {
    padding: 5px 0
  }
  .selected{
    background-color: #dcdfe6 !important;
    // color: #fff;
  }
  .spilt-line{
    border: 1px solid #dcdfe6;
    margin: 10px 0;
  }

</style>
