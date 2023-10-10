import request from '@/utils/request'

// 查询维修流程信息列表
export function testList(data) {
  return request({
    url: '/material/amend_flow/testList',
    method: 'post',
    data: data
  })
}

// 测试维修信息确认
export function test(data) {
  return request({
    url: '/material/amend_flow/test',
    method: 'post',
    data: data
  })
}
// 测试维修信息确认
export function repair(data) {
  return request({
    url: '/material/amend_flow/repair',
    method: 'post',
    data: data
  })
}
// 上传凭证
export function uploadCertificate(data) {
  return request({
    url: '/material/amend_flow/uploadCertificate',
    method: 'post',
    data: data
  })
}

