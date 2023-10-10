import request from '@/utils/request'
// 查询青岛总库存清单列表
export function list(query) {
    return request({
      url: 'https://qinp-tef-rfid.apac.bosch.com:8094/material/base/list',
      method: 'get',
      params: query
    })
  }
  // 查询用户列表
export function listUser(query) {
    return request({
      url: 'https://qinp-tef-rfid.apac.bosch.com:8094/system/user/list',
      method: 'get',
      params: query
    })
  }
  // 查询库位信息列表
export function listInfo(query) {
    return request({
      url: 'https://qinp-tef-rfid.apac.bosch.com:8094/material/store_info/list',
      method: 'get',
      params: query
    })
  }
