import request from '@/utils/request'

// 查询维修单据列表
export function listConfirm(query) {
  return request({
    url: '/material/confirm/list',
    method: 'get',
    params: query
  })
}

// 查询维修单据详细
export function getConfirm(id) {
  return request({
    url: '/material/confirm/' + id,
    method: 'get'
  })
}

// 新增维修单据
export function addConfirm(data) {
  return request({
    url: '/material/confirm',
    method: 'post',
    data: data
  })
}

// 修改维修单据
export function updateConfirm(data) {
  return request({
    url: '/material/confirm',
    method: 'put',
    data: data
  })
}

//提交维修单据
export function submitConfirm(query) {
  return request({
    url: '/material/confirm/submit/updateBrokenpartConfirm',
    method: 'post',
    params: query
  })
}

// 删除维修单据
export function delConfirm(id) {
  return request({
    url: '/material/confirm/' + id,
    method: 'delete'
  })
}
//报废
export function scrapea(id) {
  return request({
    url: '/material/confirm/scrap/' + id,
    method: 'post'
  })
}
//取消
export function cance(id) {
  return request({
    url: '/material/confirm/cancel/' + id,
    method: 'post'
  })
}
//查询分类列表
export function getSortNameList() {
  return request({
    url: '/material/confirm/getSortNameList',
    method: 'post'
  })
}
//是否有rfid
export function ifRfid(data) {
  return request({
    url: '/material/confirm/updateBrokenpartConfirmRepairAbleAndRfidStatus',
    method: 'put',
    data: data
  })
}

//选择是否维修


//分类与供应商维护


// 查询分类供应商信息列表
export function listSupplier(query) {
  return request({
    url: '/material/supplier/list',
    method: 'get',
    params: query
  })
}

// 查询分类供应商信息详细
export function getSupplier(sortSupplierId) {
  return request({
    url: '/material/supplier/' + sortSupplierId,
    method: 'get'
  })
}

// 新增分类供应商信息
export function addSupplier(data) {
  return request({
    url: '/material/supplier',
    method: 'post',
    data: data
  })
}

// 修改分类供应商信息
export function updateSupplier(data) {
  return request({
    url: '/material/supplier',
    method: 'put',
    data: data
  })
}

// 删除分类供应商信息
export function delSupplier(sortSupplierId) {
  return request({
    url: '/material/supplier/' + sortSupplierId,
    method: 'delete'
  })
}

//待分配维修
//查询待分配维修单
export function listDistribution(query) {
  return request({
    url: '/material/confirm/distributionList',
    method: 'get',
    params: query
  })
}
//待分配提交选择内外修
export function fixTypeSubmit(data) {
  return request({
    url: '/material/confirm/editMaterialStatus',
    method: 'post',
    data: data
  })
}
//取消待分配维修
export function cancelWait(id) {
  return request({
    url: '/material/confirm/cancelAwait/' + id,
    method: 'post'
  })
}
//根据分类查询分类供应商(下拉框)
export function queryBySortName(query) {
  return request({
    url: '/material/supplier/queryBySortName',
    method: 'post',
    params: query
  })
}
//通过物料号查询其他供应商(下拉框)
export function queryByMaterialNo(query) {
  return request({
    url: '/material/supplier/queryByMaterialNo',
    method: 'post',
    params: query
  })
}
//能否维修
export function canFix(data) {
  return request({
    url: '/material/confirm/editRepairAble',
    method: 'post',
    data: data,
  })
}

//维修流程
// 查询维修流程表列表
export function listFlow(query) {
  return request({
    url: '/material/flow/list',
    method: 'get',
    params: query
  })
}

// 查询维修流程表详细
export function getFlow(id) {
  return request({
    url: '/material/flow/' + id,
    method: 'get'
  })
}

// 新增维修流程表
export function addFlow(data) {
  return request({
    url: '/material/flow',
    method: 'post',
    data: data
  })
}

// 修改维修流程表
export function updateFlow(data) {
  return request({
    url: '/material/flow',
    method: 'put',
    data: data
  })
}

// 删除维修流程表
export function delFlow(id) {
  return request({
    url: '/material/flow/' + id,
    method: 'delete'
  })
}



//待内修
// 查询内修列表
export function listInterior(data) {
  return request({
    url: '/material/interior/list',
    method: 'get',
    data: data
  })
}

// 查询内修详细
export function getInterior(repairinId) {
  return request({
    url: '/material/interior/' + repairinId,
    method: 'get'
  })
}

// 修改更新内修
export function updateInterior(data) {
  return request({
    url: '/material/interior',
    method: 'put',
    data: data
  })
}

// 取消内修
export function cancelInterior(repairinId) {
  return request({
    url: '/material/interior/cancelInterior/' + repairinId,
    method: 'post',
  })
}
//获取维修流程(下拉框)
export function getfixFlow() {
  return request({
    url: '/material/flow/getFlowInfo',
    method: 'post'
  })
}

//更新维修流程(下拉框)
export function updatefixFlow(data) {
  return request({
    url: '/material/interior/editRepairFlow',
    method: 'post',
    data: data
  })
}




//待外修
//查询待外修
export function getawaitOutList(query) {
  return request({
    url: '/material/quotation/awaitList',
    method: 'get',
    params: query
  })
}

//去向选择类型
export function getTrackInfo() {
  return request({
    url: '/material/track/getTrackInfo',
    method: 'post'
  })
}

//去向选择类型(不包含供应商)
export function getTrackNoSupplier() {
  return request({
    url: '/material/track/getTrackInfoNoSupplier',
    method: 'post'
  })
}

//更新待外修去向
export function updateWaitOutFix(data) {
  return request({
    url: '/material/quotation/editTrack',
    method: 'post',
    data: data
  })
}

//提交外修寄件
export function submitWaitOutFix(id) {
  return request({
    url: '/material/quotation/submitAwaitQuotation/'+id,
    method: 'post',
  })
}




//外修
// 查询外修单列表
export function listQuotation(query) {
  return request({
    url: '/material/quotation/list',
    method: 'get',
    params: query
  })
}

// 查询外修单详细
export function getQuotation(id) {
  return request({
    url: '/material/quotation/' + id,
    method: 'get'
  })
}

// 更新外修单
export function updateQuotation(data) {
  return request({
    url: '/material/quotation/editQuotation',
    method: 'post',
    data: data
  })
}

//外修取消
export function cancelOutFix(id) {
  return request({
    url: '/material/quotation/cancelQuotation/'+id,
    method: 'post',
  })
}

//通过物料号获取sct/m信息
export function getSct(materialNo) {
  return request({
    url: '/material/sct/getBrokenpartSctByMaterialNo/'+materialNo,
    method: 'post',
  })
}

//通过Bomid查询信息
export function getBom(bomId) {
  return request({
    url: '/material/bom/getBrokenpartBomByBomId/'+bomId,
    method: 'post',
  })
}

//提交外修单
export function submitOutfix(id) {
  return request({
    url: '/material/quotation/submitQuotation/'+id,
    method: 'post',
  })
}



//外修测试
//查询外修测试清单
export function listFixOutTest(query) {
  return request({
    url: '/material/quotation/testList',
    method: 'get',
    params: query
  })
}

//外修测试更新
export function updateOutTest(data) {
  return request({
    url: '/material/quotation/editQuotationTest',
    method: 'post',
    data: data
  })
}

//获取外修测试(下拉框)
export function getTestLocation() {
  return request({
    url: '/material/quotation/getTestLocation',
    method: 'post',
  })
}

//提交外修测试
export function submitOutTest(data) {
  return request({
    url: '/material/quotation/submitQuotationTest',
    method: 'post',
    data: data
  })
}






//维修总清单
//查询维修总清单
export function listFixAll(query) {
  return request({
    url: '/material/master/list',
    method: 'get',
    params: query
  })
}








