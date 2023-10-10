import request from '@/utils/request'

// 查询总库存清单列表

export function list(query) {
  return request({
    url: '/material/base/list',
    method: 'get',
    params: query
  })
}
export function listw(query) {
  return request({
    url: '/material/base/listw',
    method: 'get',
    params: query
  })
}
export function lista(query) {
  return request({
    url: '/material/base/lista',
    method: 'get',
    params: query
  })
}
export function listab(query) {
  return request({
    url: '/material/base/listab',
    method: 'get',
    params: query
  })
}
// 补打
export function checkat(data) {
  return request({
    url: '/material/base/checkat',
    method: 'post',
    data: data
  })
}
// 查询总库存清单列表

export function query(data) {
  return request({
    url: `/material/base/getAmendMaterial`,
    method: 'post',
    data: data
  })
}

