import request from '@/utils/request'

// 查询物料新件重检列表信息
export function reCheckList(data) {
  return request({
    url: '/material/zero_in/reCheck_list',
    method: 'post',
    data: data
  })
}

// 重检新件
export function reCheck(data) {
  return request({
    url: '/material/zero_in/reCheck',
    method: 'post',
    data: data
  })
}

