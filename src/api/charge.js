import request from '@/utils/request'

// const baBaseUrl = "http://192.168.1.21:10001"
const baBaseUrl = "http://39.152.209.97:10001"

// 首页分析-展示上月收益最高的两个区的收益以及该区同比和环比，并展示该区1年内的收益同比柱状图
export function get11IndexIncomeTop2Statistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get11IndexIncomeTop2Statistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 首页分析-展示欠费最多的5个小区列表
export function get12IndexArrearsTop5Statistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get12IndexArrearsTop5Statistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 首页分析-展示前10个收益最高小区雷达图
export function get14IndexIncomeTop10Statistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get14IndexIncomeTop10Statistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 首页分析-不同用水性质收益占比
export function get15IndexIncomeByElecTypeStatistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get15IndexIncomeByElecTypeStatistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 首页分析-不同收费方式收益占比
export function get16IndexIncomeByChargeModeStatistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get16IndexIncomeByChargeModeStatistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 首页分析-展示收益最高的收益和水量的10小区柱状图
export function get17IndexIncomeTop10IncomeAndPowerStatistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get17IndexIncomeTop10IncomeAndPowerStatistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 首页分析-展示当月收益最高的5个小区一年来收益波动曲线
export function get18IndexIncomeTop5YearStatistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get18IndexIncomeTop5YearStatistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 首页点击小区弹出页-收益按地区排行Top10
export function get21IncomeByRegion(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get21IncomeByRegion',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 首页点击小区弹出页-不同用水性质收益占比
export function get22DifferentUseWaterNatureProportion(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get22DifferentUseWaterNatureProportion',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 首页点击小区弹出页-不同水价类型收益
export function get23DifferentWaterPriceTypeProportion(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get23DifferentWaterPriceTypeProportion',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 首页点击小区弹出页-不同收费方式收益占比
export function get24DifferentCharging(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get24DifferentCharging',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 首页点击小区弹出页-水司收益和用水量，欠费变化曲线
export function get25IncomeWaterConsumptionArrearsCurve(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get25IncomeWaterConsumptionArrearsCurve',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 首页点击小区弹出页-水司收益和用水量，欠费对比图
export function get26IncomeWaterConsumptionArrearsComparisonChart(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get26IncomeWaterConsumptionArrearsComparisonChart',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 首页点击小区弹出页-收益同比
export function get27IncomeYearOnYear(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get27IncomeYearOnYear',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//小区收益统计-收益按小区统计
export function get31IncomeByCommunity(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get31IncomeByCommunity',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//小区收益统计-根据小区名称查询该小区下所有户号缴费详情
export function get32UserPayByCommunity(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get32UserPayByCommunity',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//弹出详情页-小区列表、曲线图、饼图详情
export function get33CommunityDetailStatistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get33CommunityDetailStatistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//用户列表弹出详情页-小区列表、曲线图详情
export function get34CommunityUserDetailStatistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get34CommunityUserDetailStatistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//不同用户类型收益统计-收益按用户类型统计
export function get41IncomeByUserType(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get41IncomeByUserType',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//小区收益统计-根据用户类型查询该类型下所有户号缴费详情
export function get42UserPayByUserType(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get42UserPayByUserType',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//弹出详情页-用户类型列表、曲线图、饼图详情
export function get43UserTypeDetailStatistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get43UserTypeDetailStatistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//用户列表弹出详情页-用户类型列表、曲线图详情
export function get44UserTypeUserDetailStatistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get44UserTypeUserDetailStatistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//不同价格类型收益-收益按水价类型统计
export function get51IncomeByContentPriceCode(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get51IncomeByContentPriceCode',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//不同价格类型收益-根据水价类型查询该类型下所有户号缴费详情
export function get52UserPayByContentPriceCode(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get52UserPayByContentPriceCode',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//弹出详情页-价格类型列表、曲线图、饼图详情
export function get53PriceTypeDetailStatistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get53PriceTypeDetailStatistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//用户列表弹出详情页-价格列表、曲线图详情
export function get54PriceTypeUserDetailStatistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get54PriceTypeUserDetailStatistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//实收和应收占比变化-按照小区同比和环比
export function get61ChargeAndShouldMoneyByCommunityStatistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get61ChargeAndShouldMoneyByCommunityStatistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//实收和应收占比变化-按照不同水价同比和环比
export function get62ChargeAndShouldMoneyByWaterPriceStatistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get62ChargeAndShouldMoneyByWaterPriceStatistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//实收和应收占比变化-按照用水类型同比和环比
export function get63ChargeAndShouldMoneyByUserTypeStatistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get63ChargeAndShouldMoneyByUserTypeStatistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//首页获取小区下拉框信息
export function getCommunitySelectInfo(data) {
  return request({
    url: '/ba/usersOfWater/V1/getCommunitySelectInfo',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//欠费下拉框值
export function getArrearSelectValue(data) {
  return request({
    // url: '/ba/customerCall/V1/getCustomerCallAreaMap',
    url: '/ba/arrearUser/V1/getArrearSelectValue',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//欠费同比环比曲线图
export function getArrearCountYtyQoqChangeCurve(data) {
  return request({
    url: '/ba/arrearUser/V1/getArrearCountYtyQoqChangeCurve',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}


//小区欠费 同比环比列表
export function getRegionArrearCountYtyQoqList(data) {
  return request({
    url: '/ba/arrearUser/V1/getRegionArrearCountYtyQoqList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//水价类型欠费 同比环比列表
export function getContentPriceArrearCountYtyQoqList(data) {
  return request({
    url: '/ba/arrearUser/V1/getContentPriceArrearCountYtyQoqList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//用水类别用水 同比环比列表
export function getElecTypeArrearCountYtyQoqList(data) {
  return request({
    url: '/ba/arrearUser/V1/getElecTypeArrearCountYtyQoqList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//不同地域用水量列表
export function getRegionUseWaterList(data) {
  return request({
    url: '/ba/usersOfWater/V1/getRegionUseWaterList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//客户来电分析-近几年突出问题
export function getNearlyYearProtrudeProblemList(data) {
  return request({
    url: '/ba/customerCall/V1/getNearlyYearProtrudeProblemList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//分享表格统计-四类来电同比
export function getComplaintProblemYtyQoq(data) {
  return request({
    url: '/ba/customerCall/V1/getComplaintProblemYtyQoq',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}


//小区欠费列表
export function getRegionArrearCountList(data) {
  return request({
    url: '/ba/arrearUser/V1/getRegionArrearCountList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//连续欠费人数列表
export function getContinuousUserCountList(data) {
  return request({
    url: '/ba/arrearUser/V1/getContinuousUserCountList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 用水性质欠费人数列表
export function getElecTypeArrearCountList(data) {
  return request({
    url: '/ba/arrearUser/V1/getElecTypeArrearCountList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 水价类型欠费列表
export function getContentPriceArrearCountList(data) {
  return request({
    url: '/ba/arrearUser/V1/getContentPriceArrearCountList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 欠费曲线图
export function getArrearCountChangeCurve(data) {
  return request({
    url: '/ba/arrearUser/V1/getArrearCountChangeCurve',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// l連續欠费人數曲线图
export function getArrearCountChangeCurve2(data) {
  return request({
    url: '/ba/arrearUser/V1/getContinuousUserCountChangeCurve',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 获取客户档案列表
export function getUserList(data) {
  return request({
    url: '/ba/arrearUser/V1/getUserList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 首页小区欠费人数、欠费额排行
export function getArrearCommunityCountList(data) {
  return request({
    url: '/ba/arrearUser/V1/getArrearCommunityCountList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 大首页小区欠费人数雷达图
export function getArrearCommunityCountRadar(data) {
  return request({
    url: '/ba/arrearUser/V1/getArrearCommunityCountRadar',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 用水性质收益
export function get02IndexIncomeTop6Statistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get02IndexIncomeTop6Statistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 当前收益最高的前3个地域仪表图
export function get01IndexIncomeTop3Statistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get01IndexIncomeTop3Statistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 首页用水性质欠费人数
export function getElecTypeArrearCount(data) {
  return request({
    url: '/ba/arrearUser/V1/getElecTypeArrearCount',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 首页各水价类型用水量
export function getContentPriceAllTotalPower(data) {
  return request({
    url: '/ba/arrearUser/V1/getContentPriceAllTotalPower',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 小区欠费人数
export function getUserCountComByMonth(data) {
  return request({
    url: '/ba/arrearUser/V1/getUserCountComByMonth',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 连续欠费人数漏斗图
export function getContinuousUserCountFunnel(data) {
  return request({
    url: '/ba/arrearUser/V1/getContinuousUserCountFunnel',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 首页小区用户欠费人数变化
export function getCommunityArrearCountChangeCurve(data) {
  return request({
    url: '/ba/arrearUser/V1/getCommunityArrearCountChangeCurve',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 根据户号获取用户每月欠费信息
export function getUserArrearInfoByUserNo(data) {
  return request({
    url: '/ba/arrearUser/V1/getUserArrearInfoByUserNo',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 用水曲线图
export function getUseWaterChangeCurve(data) {
  return request({
    url: '/ba/usersOfWater/V1/getUseWaterChangeCurve',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
export function getCommunityWaterVolatilityAnalysisByComCode(data) {
  return request({
    url: '/ba/usersOfWater/V1/getCommunityWaterVolatilityAnalysisByComCode',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 连续欠费用户列表
export function getContinuousUserList(data) {
  return request({
    url: '/ba/arrearUser/V1/getContinuousUserList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//价格列表、曲线图详情
export function get66UserChargeAndShouldMoneyDetailStatistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get66UserChargeAndShouldMoneyDetailStatistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

export function getBusinessMapInfo(data) {
  return request({
    url: '/ba/usersOfWater/V1/getBusinessMapInfo',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

export function getBusinessMapInfoImgUrl(data) {
  return request({
    url: '/ba/usersOfWater/V1/getBusinessMapInfoImgUrl',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}



export function getArrearCommunityAreaMap(data) {
  return request({
    url: '/ba/arrearUser/V1/getArrearCommunityAreaMap',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

export function getWaterMapAreaInfo(data) {
  return request({
    url: '/ba/usersOfWater/V1/getWaterMapAreaInfo',
    // url: '/ba/customerCall/V1/getCustomerCallAreaMap',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

export function getWaterMapAreaInfo2(data) {
  return request({
    // url: '/ba/usersOfWater/V1/getWaterMapAreaInfo',
    url: '/ba/customerCall/V1/getCustomerCallAreaMap',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

export function get13IndexIncomeAreaByRegionStatistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get13IndexIncomeAreaByRegionStatistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

export function getCustomerCallAreaMap(data) {
  return request({
    url: '/ba/customerCall/V1/getCustomerCallAreaMap',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
export function get67UserChargeAndShouldMoneyYtyQoqChangeCurve(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get67UserChargeAndShouldMoneyYtyQoqChangeCurve',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

