import request from '@/utils/request'

const uaBaseUrl = "http://192.168.10.21:19998"


// 菜单新增
export function addOrModifyMenu(data) {
  return request({
    url: '/menu/addOrModifyMenu',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}
// 菜单查询
export function fuzzyQueryMenu(data) {
  return request({
    url: '/menu/fuzzyQueryMenu',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

// 菜单删除
export function deleteMenu(data) {
  return request({
    url: '/menu/deleteMenu',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}
// 用户列表
export function fuzzyQueryUser(data) {
  return request({
    url: '/user/fuzzyQueryUser',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}
// 删除用户
export function deleteUser(data) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

// 获取角色
export function fuzzyQueryRole(data) {
  return request({
    url: '/role/fuzzyQueryRole',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}
// 删除角色
export function deleteRole(data) {
  return request({
    url: '/role/deleteRole',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}
// 查询树形数据
export function menuTree(data) {
  return request({
    url: '/menu/menuTree',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

// 新增修改用户
export function addOrModifyUser(data) {
  return request({
    url: '/user/addOrModifyUser',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

// 发送验证码
export function sendVerificationCode(data) {
  return request({
    url: '/user/sendVerificationCode',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}
// 登录接口
export function toLogin(data) {
  return request({
    url: '/login/toLogin',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}
// 角色新增接口
export function addOrModifyRole(data) {
  return request({
    url: '/role/addOrModifyRole',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}
// 获取登录信息
export function getLoginfo(data) {
  return request({
    url: '/login/getLoginfo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}
// 退出登录
export function Logout(data) {
  return request({
    url: '/login/Logout',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}
//
export function changePassWord(data) {
  return request({
    url: '/user/changePassWord',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}
// 导出用户
export function exportExcelTable(data) {
  return request({
    url: '/user/exportExcelTable',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}
// 导出用户
export function initPassword(data) {
  return request({
    url: '/user/initPassword',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}
// 导出用户模板
export function excelTableForUserImportDownload(data) {
  return request({
    url: '/user/excelTableForUserImportDownload',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

