import request from '@/utils/request'

// 查询维修单历史记录列表
export function listMaster(query) {
  return request({
    url: '/material/master/list',
    method: 'get',
    params: query
  })
}

// 查询维修单历史记录详细
export function getMaster(maintenanceId) {
  return request({
    url: '/material/master/' + maintenanceId,
    method: 'get'
  })
}

// 新增维修单历史记录
export function addMaster(data) {
  return request({
    url: '/material/master',
    method: 'post',
    data: data
  })
}

// 修改维修单历史记录
export function updateMaster(data) {
  return request({
    url: '/material/master',
    method: 'put',
    data: data
  })
}

// 删除维修单历史记录
export function delMaster(maintenanceId) {
  return request({
    url: '/material/master/' + maintenanceId,
    method: 'delete'
  })
}
