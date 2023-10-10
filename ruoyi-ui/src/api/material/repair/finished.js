import request from '@/utils/request'

// 查询物料新件完成入库列表信息
export function finishedList(data) {
  return request({
    url: '/material/repair/complete_list',
    method: 'post',
    data: data
  })
}

