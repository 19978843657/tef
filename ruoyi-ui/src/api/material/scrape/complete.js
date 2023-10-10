import request from '@/utils/request'

// 查询物料报废信息列表
export function completeList(data) {
  return request({
    url: '/material/scrape/complete_list',
    method: 'post',
    data: data
  })
}
  export function updateScrapea(data) {
    return request({
      url: '/material/scrape/updateScrape',
      method: 'post',
      data: data
    })

  }
