const axios = require('axios')
module.exports = {
  baseUrl: 'https://sjs.topwinchance.com/ams-main/web/api',
  // baseUrl: 'http://192.168.17.17:8080//ams-main/web/api',
  getTotal: function ({page, pageSize}, cb) {
    axios.get(`${this.baseUrl}/equipmentAllByPage?page=${page}&pageSize=${pageSize}`).then(res => {
      cb(res)
    })
  },

  selectByForm: function (params, cb) {
    axios.get(`${this.baseUrl}/selectByForm`, {
      params: params
    }).then(res => {
      cb(res)
    })
  },
  /**
   * 查看设备绑定日志
   */
  getLog: function (id, cb) {
    axios.get(`${this.baseUrl}/equipmentLog/${id}`).then(res => {
      cb(res)
    })
  },
   /**
   * 设置请求头
   */
  setToken: function (token) {
    axios.defaults.headers.common['token'] = token
  },
  upload: function (file, cb) {
    axios.post(`${this.baseUrl}/excelImport`, file).then(res => {
      cb(res)
    })
  },
  /**
   * 编辑设备
   */
  edit: function (params, cb) {
    axios.post(`${this.baseUrl}/save`, params).then(res => {
      cb(res)
    })
  },
  /**
   * 仅保存
   */
  justSave: function (params, cb) {
    axios.post(`${this.baseUrl}/adminUpdate`, params).then(res => {
      cb(res)
    })
  },
  /**
   * 入库
   */
  changeStatusToInventory: function (params, cb) {
    axios.post(`${this.baseUrl}/changeStatusToInventory`, params).then(res => {
      cb(res)
    })
  },
  /**
   * 报废
   */
  changeStatusToScrapped: function (params, cb) {
    axios.post(`${this.baseUrl}/changeStatusToScrapped`, params).then(res => {
      cb(res)
    })
  },
  /**
   * 获取所有类目
   */
  categoryAll: function (cb) {
    axios.get(`${this.baseUrl}/categoryAll`).then(res => {
      cb(res)
    })
  },
  /**
   * 新建累目
   */
  addCategory: function (params, cb) {
    axios.post(`${this.baseUrl}/addCategory`, params).then(res => {
      cb(res)
    })
  },
   /**
    * 更新类目
    */
  updateCategory: function (params, cb) {
    axios.post(`${this.baseUrl}/updateCategory`, params).then(res => {
      cb(res)
    })
  }

}
