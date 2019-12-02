import request from '@/utils/request'
const uaBaseUrl = "http://39.152.209.97:10004"

//专题--查询采集数据量统计
export function getWaterMeterDataCount(data) {
  return request({
    url: '/wma/water/V1/getWaterMeterDataCount',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}
//首页-获取昨日所有信息
export function getAllWaterMeterInfo(data) {
  return request({
    url: '/wma/water/V1/getAllWaterMeterInfo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//获取采集数据报表
export function getCollectDataReportList(data) {
  return request({
    url: '/wma/water/V1/getCollectDataReportList',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}


//获取数据报表查询
export function getDataReportListSearch(data) {
  return request({
    url: '/wma/water/V1/getDataReportListSearch',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//首页-数据采集
export function getWaterMeterDataCollect(data) {
  return request({
    url: '/wma/water/V1/getWaterMeterDataCollect',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}
//首页-数据采集以及占比
export function getWaterMeterDataCollectProp(data) {
  return request({
    url: '/wma/water/V1/getWaterMeterDataCollectProp',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//首页-数据量占比
export function getWaterMeterDataCountProp(data) {
  return request({
    url: '/wma/water/V1/getWaterMeterDataCountProp',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}


//首页-数据占比
export function getWaterMeterDataProp(data) {
  return request({
    url: '/wma/water/V1/getWaterMeterDataProp',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//专题--查询采集数据比率统计
export function getWaterMeterDataRate(data) {
  return request({
    url: '/wma/water/V1/getWaterMeterDataRate',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//首页-获取近三十一天的水表准确与采集率
export function getWaterMeterNearly31DayInfo(data) {
  return request({
    url: '/wma/water/V1/getWaterMeterNearly31DayInfo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

export function getCountDataByTimeLine(data) {
  return request({
    url: '/wma/water/V1/getCountDataByTimeLine',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

export function getRateDataByTimeLine(data) {
  return request({
    url: '/wma/water/V1/getRateDataByTimeLine',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

export function getCollectDataReportListExport(data) {
  return request({
    url: '/wma/water/V1/getCollectDataReportListExport',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

export function getDataReportListSearchExport(data) {
  return request({
    url: '/wma/water/V1/getDataReportListSearchExport',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}


