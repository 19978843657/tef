import request from '@/utils/request'

// 查询物料出库信息列表
export function listOut(data) {
  return request({
    url: '/material/put_out/putOutList',
    method: 'post',
    data: data
  })
}

// 新增物料出库信息
export function handPutOut(data) {
  return request({
    url: '/material/put_out/handPutOut',
    method: 'post',
    data: data
  })
}

