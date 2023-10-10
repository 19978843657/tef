import request from '@/utils/request'

// 查询列表
export function listBindmachine(query) {
  return request({
    url: '/material/bindmachine/list',
    method: 'get',
    params: query
  })
}

// 查询详细
export function getBindmachine(uUid) {
  return request({
    url: '/material/bindmachine/' + uUid,
    method: 'get'
  })
}

// 新增
export function addBindmachine(data) {
  return request({
    url: '/material/bindmachine',
    method: 'post',
    data: data
  })
}

// 修改
export function updateBindmachine(data) {
  return request({
    url: '/material/bindmachine',
    method: 'put',
    data: data
  })
}

// 删除
export function delBindmachine(uUid) {
  return request({
    url: '/material/bindmachine/' + uUid,
    method: 'delete'
  })
}
