import request from '@/utils/request'

// 查询列表
export function listMateriallibrary(query) {
  return request({
    url: '/material/materiallibrary/list',
    method: 'get',
    params: query
  })
}
export function listMateriallibrarya() {
  return request({
    url: '/material/materiallibrary/lista',
    method: 'post'
  })
}
// 查询详细
// export function getMateriallibrary(data) {
//   // console.log(uUid)
//   return request({
//     url: '/material/materiallibrary/upd',
//     method: 'PUT',
//     data: data
//   })
// }

// 新增
export function addMateriallibrary(data) {
  return request({
    url: '/material/materiallibrary',
    method: 'post',
    data: data
  })
}
// 延长有效天数
export function addMateriallibrarys(data) {
  return request({
    url: '/material/materiallibrary/upd',
    method: 'post',
    data: data
  })
}
// 修改
export function updateMateriallibrary(data) {
  return request({
    url: '/material/materiallibrary/updsta',
    method: 'post',
    data: data
  })
}
export function defca(){
  return request({
    url: '/material/materiallibrary/defc',
    method: 'post'
  })
}

// 删除
export function delMateriallibrary(uUid) {
  return request({
    url: '/material/materiallibrary/' + uUid,
    method: 'delete'
  })
}
