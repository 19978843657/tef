import request from '@/utils/request'

// 查询维修流程信息列表
export function entryList(query) {
  return request({
    url: '/material/amend_flow/entryList',
    method: 'get',
    params: query
  })
}

// 新增维修流程信息
export function addFlow(data) {
  return request({
    url: '/material/amend_flow',
    method: 'post',
    data: data
  })
}

// 新增维修流程信息
export function confirm(data) {
  return request({
    url: '/material/amend_flow/confirm',
    method: 'post',
    data: data
  })
}

// 查询维修流程信息详细
export function getFlow(materialFlowId) {
  return request({
    url: '/material/amend_flow/' + materialFlowId,
    method: 'get'
  })
}

// 修改维修流程信息
export function updateFlow(data) {
  return request({
    url: '/material/amend_flow',
    method: 'put',
    data: data
  })
}

// 删除维修流程信息
export function delFlow(materialFlowId) {
  return request({
    url: '/material/amend_flow/' + materialFlowId,
    method: 'delete'
  })
}
