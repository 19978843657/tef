import request from '@/utils/request'

// 查询盘库信息列表
export function listTaking(query) {
  return request({
    url: '/material/taking/takingList',
    method: 'get',
    params: query
  })
}
// // 查询未盘点天数
// export function noTakingDays(data) {
//   return request({
//     url: '/material/taking/noTakingDays',
//     method: 'post',
//     data: data
//   })
// }
// 查询未盘点天数
export function listat(data) {
  return request({
    url: '/material/taking/listat',
    method: 'post',
    data: data
  })
}
// 导入参照盲盘
export function blindiscs(data) {
  // console.log(data)
  return request({
    url: '/material/taking/blindisc',
    method: 'post',
    data: data
  })
}
// 盲盘参照导入
export function blindiso(data) {
  console.log(data)
  return request({
    url: '/material/taking/blindisou',
    method: 'post',
    data: data
  })
}
export function listSourc(query) {
    return request({
      url: '/material/sources/list',
      method: 'get',
      params: query
    })
  }

