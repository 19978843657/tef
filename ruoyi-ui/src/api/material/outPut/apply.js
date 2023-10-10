import request from '@/utils/request'

//查询出库申请信息列表数据
export function list(query) {
    return request({
      url: '/material/apply/list',
      method: 'get',
      params: query
    })
  }