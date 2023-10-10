import request from '@/utils/request'

// 查询盘点单据列表
export function listBlind(query) {
  return request({
    url: '/material/blind/list',
    method: 'get',
    params: query
  })
}

// 查询盘点单据详细
export function getBlind(blindId) {
  return request({
    url: '/material/blind/' + blindId,
    method: 'get'
  })
}

// 新增盘点单据
export function addBlind(data) {
  return request({
    url: '/material/blind',
    method: 'post',
    data: data
  })
}
// 完成盘点单据
export function seleBlind() {
  return request({
    url: '/material/taking/takin',
    method: 'post'
  })
}
// 修改盘点单据
export function updateBlind(data) {
  return request({
    url: '/material/blind',
    method: 'put',
    data: data
  })
}

// 删除盘点单据
export function delBlind(blindId) {
  return request({
    url: '/material/blind/' + blindId,
    method: 'delete'
  })
}
