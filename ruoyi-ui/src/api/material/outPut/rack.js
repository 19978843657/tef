import request from '@/utils/request'

// 查询物料出库信息列表
export function list(query) {
  return request({
    url: '/material/put_out/list',
    method: 'get',
    params: query
  })
}

// 新增物料出库信息
export function outRack(data) {
  return request({
    url: '/material/put_out/outRack',
    method: 'post',
    data: data
  })
}

