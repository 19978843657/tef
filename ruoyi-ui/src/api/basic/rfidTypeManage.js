import request from '@/utils/request'

// 查询RFID类型信息列表
export function listRfid(query) {
  return request({
    url: '/material/rfid/list',
    method: 'get',
    params: query
  })
}

// 查询RFID类型信息详细
export function getRfidtype(data) {
  return request({
    url: '/material/rfid/baserfidtype',
    method: 'post',
    data: data
  })
}
// 查询RFID类型
export function getRfid(id) {
  return request({
    url: '/material/rfid/' + id,
    method: 'get'
  })
}
// 新增RFID类型信息
export function addRfid(query) {
  return request({
    url: '/material/rfid/baserfidtype',
    method: 'post',
    params: query
  })
}

// 修改RFID类型信息
export function updateRfid(data) {
  return request({
    url: '/material/rfid',
    method: 'put',
    data: data
  })
}

// 删除RFID类型信息
export function delRfid(id) {
  return request({
    url: '/material/rfid/' + id,
    method: 'delete'
  })
}
