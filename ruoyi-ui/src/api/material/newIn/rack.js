import request from '@/utils/request'

// 查询物料新件待上架列表信息
export function rackList(data) {
  return request({
    url: '/material/new_in/reCheck_list',
    method: 'post',
    data: data
  })
}

// 上架新件
export function rack(data) {
  return request({
    url: '/material/new_in/rack',
    method: 'post',
    data: data
  })
}

