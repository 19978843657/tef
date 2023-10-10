import request from '@/utils/request'

// 查询盘库信息列表
export function listTaking(query) {
  return request({
    url: '/material/taking/list',
    method: 'get',
    params: query
  })
}

// 查询盘库信息详细
export function getTaking(takingMaterialId) {
  return request({
    url: '/material/taking/' + takingMaterialId,
    method: 'get'
  })
}

// 新增盘库信息
export function addTaking(data) {
  return request({
    url: '/material/taking',
    method: 'post',
    data: data
  })
}

// 修改盘库信息
export function updateTaking(data) {
  return request({
    url: '/material/taking',
    method: 'put',
    data: data
  })
}

// 删除盘库信息
export function delTaking(takingMaterialId) {
  return request({
    url: '/material/taking/' + takingMaterialId,
    method: 'delete'
  })
}

// 查询盘库信息列表
export function istTakinga(query) {
  return request({
    url: '/material/taking/lista',
    method: 'get',
    params: query
})}
