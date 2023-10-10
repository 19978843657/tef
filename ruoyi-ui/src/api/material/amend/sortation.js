import request from '@/utils/request'

// 查询维修流程信息列表
export function sortationList(data) {
  return request({
    url: '/material/amend_flow/sortationList',
    method: 'post',
    data: data
  })
}

// 分拣维修信息
export function sortation(data) {
  return request({
    url: '/material/amend_flow/sortation',
    method: 'post',
    data: data
  })
}

