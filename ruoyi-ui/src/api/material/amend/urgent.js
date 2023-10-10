import request from '@/utils/request'

// 查询维修流程信息列表
export function urgencyList(data) {
  return request({
    url: '/material/amend_flow/urgencyList',
    method: 'post',
    data: data
  })
}

// 分拣维修信息
export function confirmUrgent(data) {
  return request({
    url: '/material/amend_flow/confirmUrgent',
    method: 'post',
    data: data
  })
}

