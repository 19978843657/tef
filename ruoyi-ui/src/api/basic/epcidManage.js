import request from '@/utils/request'

// 查询EPCID编码信息列表
export function listEpcid(query) {
  return request({
    url: '/material/epcid/list',
    method: 'get',
    params: query
  })
}

// 查询EPCID编码信息详细
export function getEpcid(epcidId) {
  return request({
    url: '/material/epcid/' + epcidId,
    method: 'get'
  })
}

// 新增EPCID编码信息
export function addEpcid(data) {
  return request({
    url: '/material/epcid',
    method: 'post',
    data: data
  })
}

// 修改EPCID编码信息
export function updateEpcid(data) {
  return request({
    url: '/material/epcid',
    method: 'put',
    data: data
  })
}

// 删除EPCID编码信息
export function delEpcid(epcidId) {
  return request({
    url: '/material/epcid/' + epcidId,
    method: 'delete'
  })
}
