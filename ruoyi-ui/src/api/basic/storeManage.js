import request from '@/utils/request'

// 查询库位信息列表
export function listInfo(query) {
  return request({
    url: '/material/store_info/list',
    method: 'get',
    params: query
  })
}

// 查询库位信息详细
export function getInfo(storeId) {
  return request({
    url: '/material/store_info/' + storeId,
    method: 'get'
  })
}

// 新增库位信息
export function addInfo(data) {
  return request({
    url: '/material/store_info',
    method: 'post',
    data: data
  })
}

// 修改库位信息
export function updateInfo(data) {
  return request({
    url: '/material/store_info',
    method: 'put',
    data: data
  })
}

// 删除库位信息
export function delInfo(storeId) {
  return request({
    url: '/material/store_info/' + storeId,
    method: 'delete'
  })
}
