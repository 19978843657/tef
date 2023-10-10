import request from '@/utils/request'

// 查询物料出库信息列表
export function scrapeMaterialList(data) {
  return request({
    url: '/material/scrape/scrapeMaterialList',
    method: 'post',
    data: data
  })
}

// 新增物料出库信息
export function scrapePutOut(data) {
  return request({
    url: '/material/scrape/scrapePutOut',
    method: 'post',
    data: data
  })
}

