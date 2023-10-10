import request from '@/utils/request'

// 查询物料出库信息列表

export function waitScrapeList(query) {
  return request({
    url: '/material/scrape/waitScrapeList',
    method: 'get',
    params: query
  })
}
// 查询物料出库信息列表
export function scrapeMaterial(data) {
  return request({
    url: '/material/scrape/scrapeMaterial',
    method: 'post',
    data: data
  })
}
export function scrapeMateriala(data) {
  return request({
    url: '/material/scrape/scrapeMaterialList',
    method: 'post',
    data: data
  })
}
