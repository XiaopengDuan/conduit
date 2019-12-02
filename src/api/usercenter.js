import request from '@/utils/request'
// const uaBaseUrl="http://192.168.1.21:10000"
const uaBaseUrl = "http://39.152.209.97:20000"

//在首页获取不同用水类别的用户数
export function getUserCountByType(data) {
  return request({
    url: '/ua/user/V1/getUserCountByType',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//获取客户列表
export function getUserInfoList(data) {
  return request({
    url: '/ua/user/V1/getUserInfoList',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//获取所有小区
export function getCommunityAll(data) {
  return request({
    url: '/ua/user/V1/getCommunityAll',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//获取地图上的标点
export function getMapInfo(data) {
  return request({
    url: '/ua/user/V1/getMapInfo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//在首页根据户号和户名模糊查询户号户名
export function getUserNoAndNameByNoName(data) {
  return request({
    url: '/ua/user/V1/getUserNoAndNameByNoName',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//在首页获取用户的简要资料

export function getUserIndexDetail(data) {
  return request({
    url: '/ua/user/V1/getUserAllInfoByUserNo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//获取用户属性Page1
export function getUserProperty(data) {
  return request({
    url: '/ua/user/V1/getUserProperty',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}


//用户属性违约记录窗口Page1
export function getDefaultWindowInfoPage1(data) {
  return request({
    url: '/ua/user/V1/getDefaultWindowInfoPage1',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//用户属性用水行为窗口Page1
export function getWaterWindowInfoPage1(data) {
  return request({
    url: '/ua/user/V1/getWaterWindowInfoPage1',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}


//用户属性缴费记录窗口Page1
export function getMoneyWindowInfoPage1(data) {
  return request({
    url: '/ua/user/V1/getMoneyWindowInfoPage1',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//用户属性联系客服窗口Page1
export function getCallWindowInfoPage1(data) {
  return request({
    url: '/ua/user/V1/getCallWindowInfoPage1',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//获取客户档案列表查询下拉框值
export function getQuerySelect(data) {
  return request({
    url: '/ua/user/V1/getQuerySelect',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

export function getReportQuerySelect(data) {
  return request({
    url: '/ua/user/V1/getReportQuerySelect',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

export function getUserArrearsReportInfoList(data) {
  return request({
    url: '/ua/user/V1/getUserArrearsReportInfoList',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

export function getComTopFiveAndUserArreaCounts(data) {
  return request({
    url: '/ua/user/V1/getComTopFiveAndUserArreaCounts',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

export function getUserNormalPayReportInfoList(data) {
  return request({
    url: '/ua/user/V1/getUserNormalPayReportInfoList',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

export function getUserWaterReportInfoList(data) {
  return request({
    url: '/ua/user/V1/getUserWaterReportInfoList',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

export function getNonUserPayReportInfoList(data) {
  return request({
    url: '/ua/user/V1/getNonUserPayReportInfoList',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

export function getSpecialUserReportInfoList(data) {
  return request({
    url: '/ua/user/V1/getSpecialUserReportInfoList',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

export function getCountsCommunityTopByElecTypeCode(data) {
  return request({
    url: '/ua/user/V1/getCountsCommunityTopByElecTypeCode',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//获取用户用水变化曲线Page2
export function getUserWaterChangeCurve(data) {
  return request({
    url: '/ua/user/V1/getUserWaterChangeCurve',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//获取用户缴费变化曲线Page2
export function getUserPayChangeCurve(data) {
  return request({
    url: '/ua/user/V1/getUserPayChangeCurve',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//用户基本信息Page2
export function getUserInfo(data) {
  return request({
    url: '/ua/user/V1/getUserInfo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//用户用水变化表格
export function getUserWaterChangeTable(data) {
  return request({
    url: '/ua/user/V1/getUserWaterChangeTable',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//用户缴费表格
export function getUserPayTable(data) {
  return request({
    url: '/ua/user/V1/getUserPayTable',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//用水占比柱状图Page3
export function getWaterProportionBar(data) {
  return request({
    url: '/ua/user/V1/getWaterProportionBar',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//水费占比柱状图Page3
export function getMoneyProportionBar(data) {
  return request({
    url: '/ua/user/V1/getMoneyProportionBar',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}


//获取用户所有信息
export function getUserAllInfo(data) {
  return request({
    url: '/ua/user/V1/getUserAllInfo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//获取用户税务设置
export function getUserVatSetInfo(data) {
  return request({
    url: '/ua/user/V1/getUserVatSetInfo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//获取计费设置
export function getUserChargeSetInfo(data) {
  return request({
    url: '/ua/user/V1/getUserChargeSetInfo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//水费占比表格Page3
export function getMoneyProportionInfo(data) {
  return request({
    url: '/ua/user/V1/getMoneyProportionInfo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}


//用水占比表格Page3
export function getWaterProportionInfo(data) {
  return request({
    url: '/ua/user/V1/getWaterProportionInfo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}


// 用水水费环比表格Page5
export function getUserMoneyQopInfo(data) {
  return request({
    url: '/ua/user/V1/getUserMoneyQopInfo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

// 用水水量环比表格Page5
export function getUserWaterQopInfo(data) {
  return request({
    url: '/ua/user/V1/getUserWaterQopInfo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//用户缴费表格
// 用水水量环比柱状图Page5
export function getUserWaterQopBar(data) {
  return request({
    url: '/ua/user/V1/getUserWaterQopBar',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//用水水费同比柱状图Page4
export function getUserMoneyYtyBar(data) {
  return request({
    url: '/ua/user/V1/getUserMoneyYtyBar',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//用水水费同比表格Page4
export function getUserMoneyYtyInfo(data) {
  return request({
    url: '/ua/user/V1/getUserMoneyYtyInfo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//用水水量同比柱状图Page4
export function getUserWaterYtyBar(data) {
  return request({
    url: '/ua/user/V1/getUserWaterYtyBar',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//用水水量同比表格Page4
export function getUserWaterYtyInfo(data) {
  return request({
    url: '/ua/user/V1/getUserWaterYtyInfo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//获取用户欠费、来电次数统计Page6
export function getUserArrearsCallCount(data) {
  return request({
    url: '/ua/user/V1/getUserArrearsCallCount',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}


// 用户预缴费使用表格
export function getUserYccdTable(data) {
  return request({
    url: '/ua/user/V1/getUserYccdTable',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

// 用户预缴费使用表格
export function getUserArrearsChangeTable(data) {
  return request({
    url: '/ua/user/V1/getUserArrearsChangeTable',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}


// 获取报修、报漏、咨询、投诉最新信息
export function getRepairLeakConsultComplainInfoByUserNo(data) {
  return request({
    url: '/ua/user/V1/getRepairLeakConsultComplainInfoByUserNo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

// 获取用户预缴费使用曲线Page6
export function getUserPrePayCurve(data) {
  return request({
    url: '/ua/user/V1/getUserPrePayCurve',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

// 获取用户预缴费使用曲线Page6
export function getDefaultInfoList(data) {
  return request({
    url: '/ua/user/V1/getDefaultInfoList',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}


// heganxin --------------------------------------------------- end

export function getUserMoneyQopBar(data) {
  return request({
    url: '/ua/user/V1/getUserMoneyQopBar',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//用户用水用水范围和平均线Page1
export function getUserWaterRangeAndAverageCurvePage1(data) {
  return request({
    url: '/ua/user/V1/getUserWaterRangeAndAverageCurvePage1',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//用户用水用水范围和平均线Page2
export function getUserWaterRangeAndAverageCurvePage2(data) {
  return request({
    url: '/ua/user/V1/getUserWaterRangeAndAverageCurvePage2',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//用户用水用水范围和平均线Page3
export function getUserWaterRangeAndAverageCurvePage3(data) {
  return request({
    url: '/ua/user/V1/getUserWaterRangeAndAverageCurvePage3',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//获取用户用水实时监控列表
export function getUserWaterRealTimeMonitorList(data) {
  return request({
    url: '/ua/user/V1/getUserWaterRealTimeMonitorList',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//获取小时报表
export function getUserWaterHourReport(data) {
  return request({
    url: '/ua/user/V1/getUserWaterHourReport',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//获取用户用水监测小时数据
export function getUserWaterHourDateList(data) {
  return request({
    url: '/ua/user/V1/getUserWaterHourDateList',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//获取用户用水监测天数据
export function getUserWaterDayDateList(data) {
  return request({
    url: '/ua/user/V1/getUserWaterDayDateList',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

//正常缴费用户报表小区用费前五、用户用水量用水费与同比环比值
export function getUserNonArreaCountsAndComTopFive(data) {
  return request({
    url: '/ua/user/V1/getUserNonArreaCountsAndComTopFive',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}

export function getUserWaterRealTimeMonitorInfo(data) {
  return request({
    url: '/ua/user/V1/getUserWaterRealTimeMonitorInfo',
    method: 'post',
    baseURL: uaBaseUrl,
    data
  })
}



