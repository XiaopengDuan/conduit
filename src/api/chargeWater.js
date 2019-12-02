import request from '@/utils/request'
 //const baBaseUrl = "http://192.168.1.21:10001"
const baBaseUrl = "http://39.152.209.97:10001"

//小区用水同比环比列表
export function getRegionUseWaterYtyQoqList(data) {
  return request({
    url: '/ba/usersOfWater/V1/getRegionUseWaterYtyQoqList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

//水价类型用水同比环比列表
export function getContentPriceUseWaterYtyQoqList(data) {
    return request({
      url: '/ba/usersOfWater/V1/getContentPriceUseWaterYtyQoqList',
      method: 'post',
      baseURL: baBaseUrl,
      data
    })
  }

// 获取水价类型下拉框
export function getContentPriceSelect(data) {
    return request({
      url: '/ba/usersOfWater/V1/getContentPriceSelect',
      method: 'post',
      baseURL: baBaseUrl,
      data
    })
  }

// 获取水价类型下拉框
export function getContentPriceUseWaterList(data) {
    return request({
      url: '/ba/usersOfWater/V1/getContentPriceUseWaterList',
      method: 'post',
      baseURL: baBaseUrl,
      data
    })
  }

  //用水类别用水同比环比列表
  export function getElecTypeUseWaterYtyQoqList(data) {
    return request({
      url: '/ba/usersOfWater/V1/getElecTypeUseWaterYtyQoqList',
      method: 'post',
      baseURL: baBaseUrl,
      data
    })
  }

  //用户用水量列表
  export function getUserUseWaterList(data) {
    return request({
      url: '/ba/usersOfWater/V1/getUserUseWaterList',
      method: 'post',
      baseURL: baBaseUrl,
      data
    })
  }
  //用水同比环比曲线图
  export function getUseWaterYtyQoqChangeCurve(data) {
    return request({
      url: '/ba/usersOfWater/V1/getUseWaterYtyQoqChangeCurve',
      method: 'post',
      baseURL: baBaseUrl,
      data
    })
  }
  //小区用水高频波动排行
  export function getCommunityWaterHighFreqVolatiRank(data) {
    return request({
      url: '/ba/usersOfWater/V1/getCommunityWaterHighFreqVolatiRank',
      method: 'post',
      baseURL: baBaseUrl,
      data
    })
  }
  //首页用水地区用水量排名
  export function getCommunityUseWaterRank(data) {
    return request({
      url: '/ba/usersOfWater/V1/getCommunityUseWaterRank',
      method: 'post',
      baseURL: baBaseUrl,
      data
    })
  }
  // 用户用水天数据统计
  export function getUseWaterDayDataStatistical(data) {
    return request({
      url: '/ba/usersOfWater/V1/getUseWaterDayDataStatistical',
      method: 'post',
      baseURL: baBaseUrl,
      data
    })
  }
  // 日高峰用水分析列表
  export function getDayPeakWaterAnalysisList(data) {
    return request({
      url: '/ba/usersOfWater/V1/getDayPeakWaterAnalysisList',
      method: 'post',
      baseURL: baBaseUrl,
      data
    })
  }
  // 首页用水地区用水量排名
  export function getUseWaterRank(data) {
    return request({
      url: '/ba/usersOfWater/V1/getUseWaterRank',
      method: 'post',
      baseURL: baBaseUrl,
      data
    })
  }
  // 首页地区用水量环比
  export function getWaterPowerQoq(data) {
    return request({
      url: '/ba/usersOfWater/V1/getWaterPowerQoq',
      method: 'post',
      baseURL: baBaseUrl,
      data
    })
  }



// 首页用水量波动大用户数
export function getWaterVolatilityUserCount(data) {
  return request({
    url: '/ba/usersOfWater/V1/getWaterVolatilityUserCount',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// 首页地区用水性质环比
export function getUseWaterNaturesQoq(data) {
  return request({
    url: '/ba/usersOfWater/V1/getUseWaterNaturesQoq',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 首页月用水吨数与用水占比
export function getWaterPowerAndWaterProportion(data) {
  return request({
    url: '/ba/usersOfWater/V1/getWaterPowerAndWaterProportion',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 日高峰用水分析Page1
export function getDayPeakWaterAnalysisPage1(data) {
  return request({
    url: '/ba/usersOfWater/V1/getDayPeakWaterAnalysisPage1',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 日高峰用水分析Page2
export function getDayPeakWaterAnalysisPage2(data) {
  return request({
    url: '/ba/usersOfWater/V1/getDayPeakWaterAnalysisPage2',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 夜间最小用水分析列表
export function getNightMinWaterAnalysisList(data) {
  return request({
    url: '/ba/usersOfWater/V1/getNightMinWaterAnalysisList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 夜间最小用水分析Page1
export function getNightMinWaterAnalysisPage1(data) {
  return request({
    url: '/ba/usersOfWater/V1/getNightMinWaterAnalysisPage1',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 夜间最小用水分析Page2
export function getNightMinWaterAnalysisPage2(data) {
  return request({
    url: '/ba/usersOfWater/V1/getNightMinWaterAnalysisPage2',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 用户用水波动分析
export function getUseWaterVolatilityAnalysisByUserNo(data) {
  return request({
    url: '/ba/usersOfWater/V1/getUseWaterVolatilityAnalysisByUserNo',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

  // 小区月每日用水量用水费
export function getCommunityMonthPreDayPowerMoney(data) {
  return request({
    url: '/ba/usersOfWater/V1/getCommunityMonthPreDayPowerMoney',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

  // 不同用水类别用水量列表信息
export function getElecTypeUseWaterList(data) {
  return request({
    url: '/ba/usersOfWater/V1/getElecTypeUseWaterList',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
// 不同用水类别用水量列表信息
export function getUserUseWaterChangeCurve(data) {
  return request({
    url: '/ba/usersOfWater/V1/getUserUseWaterChangeCurve',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}// 小区用水波动分析
export function getCommunityWaterVolatilityAnalysisByComCode(data) {
  return request({
    url: '/ba/usersOfWater/V1/getCommunityWaterVolatilityAnalysisByComCode',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}


//首页用户用水地图信息
export function getWaterMapInfo(data) {
  return request({
    url: '/ba/usersOfWater/V1/getWaterMapInfo',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
//首页分析-地图展示用不同的颜色展示不同区域的收益情况
export function get13IndexIncomeByRegionStatistics(data) {
  return request({
    url: '/ba/incomeAnalysis/V1/get13IndexIncomeByRegionStatistics',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
//首页上月欠费地图
export function getArrearCommunityMap(data) {
  return request({
    url: '/ba/arrearUser/V1/getArrearCommunityMap',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}
export function getComXYTest(data) {
  return request({
   url: '/ba/usersOfWater/V1/getComXYTest',
    method: 'post',
    baseURL: "https://39.152.209.97:441",
    data
  })
}
//首页获取客户来电辽化地图
export function getCustomerCallMap(data) {
  return request({
    url: '/ba/customerCall/V1/getCustomerCallMap',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

// //首页获取客户来电辽化地图
// export function getCustomerCallMapdetails(data) {
//   return request({
//     url: '/ba/customerCall/V1/getCustomerCallMap',
//     method: 'post',
//     baseURL: baBaseUrl,
//     data
//   })
// }

export function getBusinessGeoInfo(data) {
  return request({
    url: '/ba/usersOfWater/V1/getBusinessGeoInfo',
    method: 'post',
    baseURL: baBaseUrl,
    data
  })
}

