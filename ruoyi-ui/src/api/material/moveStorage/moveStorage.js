import request from '@/utils/request'

// 查询物料出库信息列表
export function list(query) {
  return request({
    url: '/material/move_storage/waitMoveList',
    method: 'get',
    params: query
  })
}

// 新增物料出库信息
export function moveStorage(data) {
  return request({
    url: '/material/move_storage/moveStorage',
    method: 'post',
    data: data
  })
}

