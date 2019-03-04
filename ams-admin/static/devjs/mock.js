const Mock = require('mockjs')

Mock.mock('/ability', 'get', {
  'success': true,
  'content': {
    'errorCode': 200,
    'errorMsg': 'OK',
    'data': {
      'proposer': {
        'id': 100003,                                // 申请人id
        'name': '周一',                   // 花名
        'dept': '技术部',                   // 部门
        'pLevel': 'M9',                   // P级
        'position': '资深CEO',                   // 职位
        'position_type': '技术',                   // 职别
        'status': 'ING',  // 申请人状态,ING:进行中
        'gmt_create': 1464775200000,
        'gmt_modify': 1464775200000
      },
      'juryGroupList': [{  // 评委组列表
        'id': 100022,
        'name': '自评',                   // 评委组名
        'juryType': 'SELF',   // 是否是自评
        'juryList': [{                   // 评委列表
          'id': 1000082,
          'name': '周一',
          'submitted': true    // 是否已提交
        }]
      }, {
        'id': 100023,
        'name': '上级评委',
        'juryType': 'OTHER',
        'juryList': [{
          'id': 1000003,
          'name': '叮当',
          'submitted': false
        }, {
          'id': 1000002,
          'name': '蒙太奇',
          'submitted': true
        }]
      }]
    }
  }
})
Mock.mock('/subject', 'get', {
  'success': true,
  'content': {
    'errorCode': 200,
    'errorMsg': 'OK',
    'data': {
      'name': '能力认定评分表',
      'children': [{
        'name': '任职资格',
        'children': [{
          'name': '专业能力',
          'children': [{
            'name': '常规运营',
            'children': [{
              'name': '日常运营',
              'children': [{
                'name': '日常巡店',
                'description': '非天猫平台爆款价格监控',
                'children': [{
                  'id': 100004,
                  'name': '没做过，或严重失误带来店铺损失',
                  'point': 0
                }, {
                  'id': 100005,
                  'name': '需要在上级或同事的辅导下完成，或出现多次检查疏漏',
                  'point': 1
                }, {
                  'id': 100006,
                  'name': '自己独立完成，较少或没有出现检查疏漏/返工',
                  'point': 2
                }, {
                  'id': 100007,
                  'name': '能提出减少工作疏漏/返工的可行性建议，获得上级采纳',
                  'point': 3
                }]
              }]
            }]
          }]
        }]
      }]
    }
  }
})
