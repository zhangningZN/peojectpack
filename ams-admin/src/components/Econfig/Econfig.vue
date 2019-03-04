<template>
<div >
    <el-row :gutter="20" style="margin-left:0px; margin-right:0px;">
        <el-col :span="10" :offset="0">
            <el-tree :data="data2" :props="defaultValue" default-expand-all @node-click="syncSelection">
            </el-tree>
        </el-col>
        <el-col :span="14" >
            <el-card>
              <el-form label-position="right" label-width="120px" :model="formLabelAlign" style="margin-top:20px" size="small">
              <el-form-item label="选项">
                <el-radio-group v-model="formLabelAlign.type">
                  <el-radio label="新建类目"></el-radio>
                  <el-radio label="修改类目"></el-radio>
                </el-radio-group>
                </el-form-item>
                <el-form-item label="上级类目" >
                   <el-cascader
                      style="width:100%"
                      placeholder="请选择上级类目"
                      :props="defaultValue"
                      :options="data2"
                      filterable
                      v-model = "formLabelAlign.parentId"
                      change-on-select
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="设备名">
                  <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="设备名备注">
                  <el-input v-model="formLabelAlign.unitName"></el-input>
                </el-form-item>
                <el-form-item label="设备简写" v-show="formLabelAlign.type === '新建类目'">
                  <el-input v-model="formLabelAlign.amsType"></el-input>
                </el-form-item>
                <el-form-item label="编码前缀(缩写)" v-show="formLabelAlign.type === '新建类目'">
                  <el-input v-model="formLabelAlign.abbreviation"></el-input>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="addCategory">创建</el-button>
                </el-form-item>
              </el-form>
            </el-card>
        </el-col>
    </el-row>
</div>
</template>

<script>
import axios from '../../../static/js/axios.js'
export default {
  data () {
    return {
      formLabelAlign: {
        name: '',
        unitName: '',
        abbreviation: '',
        amsType: '',
        parentId: [],
        type: '修改类目'
      },
      select: '',
      data: [],
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultValue: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      orginData: [],
      categoryId: ''
    }
  },
  methods: {
    syncSelection (a) {
      this.formLabelAlign.type = '修改类目'
      let id = a.id
      this.categoryId = id
      let filterData = this.orginData.filter(v => {
        return v.id === id
      })
      this.formLabelAlign.name = filterData[0]['name']
      this.formLabelAlign.unitName = filterData[0]['unitName']
      this.formLabelAlign.abbreviation = filterData[0]['abbreviation']
      this.formLabelAlign.amsType = filterData[0]['amsType']
      // this.formLabelAlign.
      this.formLabelAlign.parentId = []
      let resultArr = []
      let arrContainter = []
      function recision (id, arr1) {
        arr1.forEach(v => {
          arrContainter.push(v)
          if (v.id === id) {
            resultArr = JSON.parse(JSON.stringify(arrContainter))
          } else {
            if (v.children) {
              recision(id, v['children'])
            }
            arrContainter.pop()
          }
        })
      }
      recision(id, this.data2)
      let aa = resultArr.map(v => v.id)
      console.log(aa)
      this.formLabelAlign.parentId = aa.slice(0, aa.length - 1)
      // console.log(this.formLabelAlign.parentId)
      this.categoryId = aa[aa.length - 1]
    },
    seleckTree (tree) {
    },
    updateTree () {
      axios.categoryAll(
        res => {
          if (res.data.content.errorMsg === 'OK') {
            let arr1 = res.data.content.data
            this.orginData = arr1
            let treeArr = []
            treeArr = JSON.parse(JSON.stringify(arr1.filter(v => {
              return v.parentId === 0
            })))
            treeArr.forEach(v1 => {
              let a = JSON.parse(JSON.stringify(arr1.filter(v2 => {
                return v2.parentId === v1.id
              })))
              if (a.length) {
                v1['children'] = a
              }
            })
            treeArr.forEach(v1 => {
              if (v1['children']) {
                v1['children'].forEach(v2 => {
                  let c = JSON.parse(JSON.stringify(arr1.filter(v3 => {
                    return v3.parentId === v2.id
                  })))
                  if (c.length) {
                    v2['children'] = c
                  }
                })
              }
            })
            this.data2 = treeArr
            // alert(JSON.stringify(treeArr))
          }
        })
    },
    addCategory () {
      this.$confirm('确定更新类目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.formLabelAlign.type === '新建类目') {
          let form = new FormData()
          form.append('name', this.formLabelAlign.name)
          form.append('unitName', this.formLabelAlign.unitName)
          form.append('abbreviation', this.formLabelAlign.abbreviation)
          form.append('amsType', this.formLabelAlign.amsType)
          form.append('parentId', this.formLabelAlign.parentId[[this.formLabelAlign.parentId.length - 1]])
          axios.addCategory(form, res => {
            if (res.data.content.errorMsg === 'OK') {
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success'
              })
              this.updateTree()
            } else {
              this.$notify({
                title: '失败',
                message: res.data.content.errorMsg,
                type: 'error'
              })
            }
          })
        } else {
          let form = new FormData()
          form.append('name', this.formLabelAlign.name)
          form.append('unitName', this.formLabelAlign.unitName)
          form.append('parentId', this.formLabelAlign.parentId[[this.formLabelAlign.parentId.length - 1]])
          form.append('categoryId', this.categoryId)
          axios.updateCategory(form, res => {
            if (res.data.content.errorMsg === 'OK') {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success'
              })
              this.updateTree()
            } else {
              this.$notify({
                title: '失败',
                message: res.data.content.errorMsg,
                type: 'error'
              })
            }
          })
        }

        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted () {
    this.updateTree()
  },
  computed: {
  }
}
</script>

<style>

</style>
