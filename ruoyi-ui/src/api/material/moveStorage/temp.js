import request from '@/utils/request'

// 查询物料出库信息列表
export function listOut(data) {
  return request({
    url: '/material/move_storage/moveStorageList',
    method: 'post',
    data: data
  })
}

// 新增物料出库信息
export function movePutOut(data) {
  return request({
    url: '/material/move_storage/movePutOut',
    method: 'post',
    data: data
  })
}

