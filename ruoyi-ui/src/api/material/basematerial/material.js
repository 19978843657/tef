import request from '@/utils/request'

// 查询列表
export function listMaterial(query) {
  return request({
    url: '/material/material/list',
    method: 'get',
    params: query
  })
}

// 查询详细
export function getMaterial(sMaterialno) {
  return request({
    url: '/material/material/' + sMaterialno,
    method: 'get'
  })
}

// 新增
export function addMaterial(data) {
  return request({
    url: '/material/material/add',
    method: 'post',
    data: data
  })
}

// 修改
export function updateMaterial(data) {
  return request({
    url: '/material/material',
    method: 'put',
    data: data
  })
}

// 删除
export function delMaterial(sMaterialno) {
  return request({
    url: '/material/material/' + sMaterialno,
    method: 'delete'
  })
}
