import request from '@/utils/request'

// 查询新件入库列表
export function listTemp(query) {
  return request({
    url: '/material/repair/temp_list',
    method: 'get',
    params: query
  })
}

// 查询新件入库详细
export function getTemp(tempMaterialId) {
  return request({
    url: '/material/repair/' + tempMaterialId,
    method: 'get'
  })
}

// 新增新件入库
export function addTemp(data) {
  return request({
    url: '/material/repair',
    method: 'post',
    data: data
  })
}

// 修改新件入库
export function updateTemp(data) {
  return request({
    url: '/material/repair',
    method: 'put',
    data: data
  })
}

// 删除新件入库
export function delTemp(tempMaterialId) {
  return request({
    url: '/material/repair/' + tempMaterialId,
    method: 'delete'
  })
}

// 检验
export function check(data) {
  return request({
    url: '/material/repair/check',
    method: 'post',
    data: data
  })
}
