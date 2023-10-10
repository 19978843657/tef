import request from '@/utils/request'

// 查询物料出库信息列表
export function list(data) {
  return request({
    url: '/material/move_storage/complete_list',
    method: 'post',
    data: data
  })
}

