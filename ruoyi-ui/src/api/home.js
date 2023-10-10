import request from '@/utils/request'

// 库龄Top10
export function getAgeTopTenlist(data) {
  return request({
    url: '/material/home_info/getAgeTopTenlist',
    method: 'post',
    data: data
  })
}
// 月度金额统计列表
export function getMonthStatTopTenlist(data) {
  return request({
    url: '/material/home_info/getMonthStatTopTenlist',
    method: 'post',
    data: data
  })
}
// 库存Top10
export function getStoreTopTenlist(data) {
  return request({
    url: '/material/home_info/getStoreTopTenlist',
    method: 'post',
    data: data
  })
}
