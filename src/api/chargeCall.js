import request from '@/utils/request'
// const baBaseUrl = "http://192.168.1.21:10001"
const baBaseUrl = "http://39.152.209.97:10001"

//客户来电分析列表
export function getCustomerCallAnalysisList(data) {
  return request({
    url: '/ba/customerCall/V1/getCustomerCallAnalysisList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
//分享表格统计-投诉问题汇总列表
export function getComplaintProblemSummaryList(data) {
  return request({
    url: '/ba/customerCall/V1/getComplaintProblemSummaryList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 分享表格统计-投诉问题处理状态列表
export function getComplaintProblemStateList(data) {
  return request({
    url: '/ba/customerCall/V1/getComplaintProblemStateList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
//  来电同比曲线图
export function getCustomerCallYtyQoqChangeCurve(data) {
  return request({
    url: '/ba/customerCall/V1/getCustomerCallYtyQoqChangeCurve',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}


//来电反映的问题排行
export function getCommunityReactionTop() {
  return request({
    url: '/ba/customerCall/V1/getCommunityReactionTop',
    method: 'post',
    baseURL: baBaseUrl,
  })
}

//首页小区长期反应的问题数量前10
export function getCommunityChronicProblemsTopTen(data) {
  return request({
    url: '/ba/customerCall/V1/getCommunityChronicProblemsTopTen',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//小区长期出现问题变化曲线
export function getCommunityChronicProblemsChangeCurve(data) {
  return request({
    url: '/ba/customerCall/V1/getCommunityChronicProblemsChangeCurve',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//小区用户反应问题数量
export function getCommunityReactionCount(data) {
  return request({
    url: '/ba/customerCall/V1/getCommunityReactionCount',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}



//不同用水用户反应问题占比
export function getCommunityReactionProp(data) {
  return request({
    url: '/ba/customerCall/V1/getCommunityReactionProp',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//  首页小区来电问题排行
export function getCommunityCallTopTen() {
  return request({
    url: '/ba/customerCall/V1/getCommunityCallTopTen',
    method: 'post',
    baseURL: baBaseUrl,
  })
}

//  首页小区问题处理情况
export function getCommunityProblemsProcessingState() {
  return request({
    url: '/ba/customerCall/V1/getCommunityProblemsProcessingState',
    method: 'post',
    baseURL: baBaseUrl,
  })
}
