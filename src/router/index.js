import Vue from 'vue'
import Router from 'vue-router'
import store from '@/stores'

Vue.use(Router)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
    meta: {}
  },
  {
    path: '/lostPassWord',
    component: () => import('@/views/lostPassWord'),
    hidden: true,
    meta: {}
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // { path: '/', redirect: '/login', hidden: true }
]

export const asyncRoutes = [
  { 
    path: '/',
    name: 'userCenter',
    alwaysShow: true,
    component: () => import('@/views/userCenter/index.vue'),
    redirect: {name: store.getters.thispath},
    meta: {
      title: "大数据管理平台-用户",
      permissionCode: 'USERCENTER'
    },
    children: [
      {
        path: 'list',
        name: 'userList',
        component: () => import('@/views/userCenter/list.vue'),
        meta: {
          title: "大数据管理平台-用户列表",
          permissionCode: 'USERCENTER.LIST',
        }
      },
      {
        path: 'map',
        name: 'map',
        component: () => import('@/views/userCenter/map.vue'),
        meta: {
          title: "大数据管理平台-用户大数据",
          permissionCode: 'USERCENTER.MAP',
        }
      },
      {
        path: 'defaultDetail/:userNo',
        name: 'defaultDetail',
        component: () => import('@/views/userCenter/defaultDetail.vue'),
        meta: {
          title: "大数据管理平台-用户违约",
          permissionCode: 'USERCENTER.DEFAULTDETAIL'
        }
      },
      {
        path: 'userCenter/detail/:userNo',
        name: 'userDetail',
        component: () => import('@/views/userCenter/detail.vue'),
        // redirect: '/userCenter/detail/:userNo/index', //跳转到详细默认页方式一
        redirect: {name: 'detail_p1_1'},//跳转到详细默认页方式二
        meta: {
          title: "大数据管理平台-用户详情",
          permissionCode: 'USERCENTER.USERDETAIL'
        },
        children: [
          {
            path: "",
            component: () => import('@/views/userCenter/detail_p1_2.vue'),
            meta: {permissionCode: 'USERCENTER.USERDETAIL.DETAIL_P1_1'}
          },
          {
            path: "index",
            name: 'detail_p1_1',
            component: () => import('@/views/userCenter/detail_p1_1.vue'),
            meta: {permissionCode: 'USERCENTER.USERDETAIL.DETAIL_P1_1'}
          },
          {
            path: "defaultList",
            name: 'defaultList',
            component: () => import('@/views/userCenter/defaultList.vue'),
            meta: {permissionCode: 'USERCENTER.USERDETAIL.DEFAULTLIST'}
          },
          {
            path: "p1_2",
            name: 'detail_p1_2',
            component: () => import('@/views/userCenter/detail_p1_2.vue'),
            meta: {permissionCode: 'USERCENTER.USERDETAIL.DETAIL_P1_2'}
          },
          {
            path: "p2_1",
            name: 'detail_p2_1',
            component: () => import('@/views/userCenter/detail_p2_1.vue'),
            meta: {permissionCode: 'USERCENTER.USERDETAIL.DETAIL_P2_1'}
          },
          {
            path: "p2_1_info",
            name: 'detail_p2_1_info',
            component: () => import('@/views/userCenter/detail_p2_1_info.vue'),
            meta: {permissionCode: 'USERCENTER.USERDETAIL.DETAIL_P2_1'}
          },
          {
            path: "p2_2",
            name: 'detail_p2_2',
            component: () => import('@/views/userCenter/detail_p2_2.vue'),
            meta: {permissionCode: 'USERCENTER.USERDETAIL.DETAIL_P2_1'}
          }
          ,
          {
            path: "p3_1",
            name: 'detail_p3_1',
            component: () => import('@/views/userCenter/detail_p3_1.vue'),
            meta: {permissionCode: 'USERCENTER.USERDETAIL.DETAIL_P3_1'}
          },
          {
            path: "p3_2",
            name: 'detail_p3_2',
            component: () => import('@/views/userCenter/detail_p3_2.vue'),
            meta: {permissionCode: 'USERCENTER.USERDETAIL.DETAIL_P3_1'}
          }
          ,
          {
            path: "p4_1",
            name: 'detail_p4_1',
            component: () => import('@/views/userCenter/detail_p4_1.vue'),
            meta: {permissionCode: 'USERCENTER.USERDETAIL.DETAIL_P4_1'}
          },
          {
            path: "p4_2",
            name: 'detail_p4_2',
            component: () => import('@/views/userCenter/detail_p4_2.vue'),
            meta: {permissionCode: 'USERCENTER.USERDETAIL.DETAIL_P4_1'}
          }
          ,
          {
            path: "p5_1",
            name: 'detail_p5_1',
            component: () => import('@/views/userCenter/detail_p5_1.vue'),
            meta: {permissionCode: 'USERCENTER.USERDETAIL.DETAIL_P5_1'}
          },
          {
            path: "p5_2",
            name: 'detail_p5_2',
            component: () => import('@/views/userCenter/detail_p5_2.vue'),
            meta: {permissionCode: 'USERCENTER.USERDETAIL.DETAIL_P5_1'}
          }
          ,
          {
            path: "p6_1",
            name: 'detail_p6_1',
            component: () => import('@/views/userCenter/detail_p6_1.vue'),
            meta: {permissionCode: 'USERCENTER.USERDETAIL.DETAIL_P6_1'}
          },
          {
            path: "p6_2",
            name: 'detail_p6_2',
            component: () => import('@/views/userCenter/detail_p6_2.vue'),
            meta: {permissionCode: 'USERCENTER.USERDETAIL.DETAIL_P6_1'}
          }
        ]
      },
      {
        path: 'userCenter/waterMonitor',
        name: 'waterMonitor',
        component: () => import('@/views/userCenter/waterMonitor.vue'),
        meta: {
          title: "大数据管理平台-用户用水实时监控",
          permissionCode: 'USERCENTER.WATERMONITOR'
        }
      },
      {
        path: 'userCenter/waterMonitorDetail/:userNo',
        name: 'waterMonitorDetail',
        component: () => import('@/views/userCenter/waterMonitorDetail.vue'),
        meta: {
          title: "大数据管理平台-监控天数据",
          permissionCode: 'USERCENTER.WATERMONITOR.WATERMONITORDETAIL'
        }
      },
      {
        path: 'userCenter/waterMonitorSingle/:userNo',
        name: 'waterMonitorSingle',
        component: () => import('@/views/userCenter/waterMonitorSingle.vue'),
        meta: {
          title: "大数据管理平台-单户监控",
          permissionCode: 'USERCENTER.WATERMONITOR.WATERMONITORSINGLE'
        }
      },
      {
        path: 'userCenter/waterMonitorHour/:userNo',
        name: 'waterMonitorHour',
        component: () => import('@/views/userCenter/waterMonitorHour.vue'),
        meta: {
          title: "大数据管理平台-实时详情",
          permissionCode: 'USERCENTER.WATERMONITOR.WATERMONITORHOUR'
        }
      },
      {
        path: 'report',
        name: 'userReport',
        component: () => import('@/views/userCenter/report.vue'),
        meta: {
          title: "大数据管理平台-报表",
          permissionCode: 'USERCENTER.USERREPORT.USERREPORT0'
        }
      },
      {
        path: 'report1',
        name: 'userReport1',
        component: () => import('@/views/userCenter/report1.vue'),
        meta: {
          title: "大数据管理平台-报表",
          permissionCode: 'USERCENTER.USERREPORT.USERREPORT1'
        }
      },
      {//居民用户用水列表
        path: 'report2',
        name: 'userReport2',
        component: () => import('@/views/userCenter/report2.vue'),
        meta: {
          title: "大数据管理平台-报表",
          permissionCode: 'USERCENTER.USERREPORT.REPORT2'
        }
      },
      {//非居民缴费用户列表
        path: 'report3',
        name: 'userReport3',
        component: () => import('@/views/userCenter/report3.vue'),
        meta: {
          title: "大数据管理平台-报表",
          permissionCode: 'USERCENTER.USERREPORT.REPORT3'
        }
      },
      {// 特种用户列表
        path: 'report4',
        name: 'userReport4',
        component: () => import('@/views/userCenter/report4.vue'),
        meta: {
          title: "大数据管理平台-报表",
          permissionCode: 'USERCENTER.USERREPORT.USERREPORT4'
        }
      },
      {
        path: 'reportDetail/p1/:userNo',
        name: 'reportDetail_p1',
        component: () => import('@/views/userCenter/reportDetail_p1.vue'),
        meta: {
          title: "大数据管理平台-报表",
          permissionCode: 'USERCENTER.REPORTDETAIL_P1'
        }
      },
      {
        path: 'reportDetail/p2/:userNo',
        name: 'reportDetail_p2',
        component: () => import('@/views/userCenter/reportDetail_p2.vue'),
        meta: {
          title: "大数据管理平台-报表",
          permissionCode: 'USERCENTER.REPORTDETAIL_P2'
        }
      },
      {
        path: 'reportDetail/p3/:userNo',
        name: 'reportDetail_p3',
        component: () => import('@/views/userCenter/reportDetail_p3.vue'),
        meta: {
          title: "大数据管理平台-报表",
          permissionCode: 'USERCENTER.REPORTDETAIL_P3'
        }
      }
    ]
  },
  {
    path: '/account/profile',
    name: 'userProfile',
    component: () => import('@/views/account/profile.vue'),
    meta: {
      title: "大数据管理平台-帐户",
      permissionCode: 'USERPROFILE'
    }
  },
  {
    path: '/charge',
    name: 'charge',
    component: () => import('@/views/charge/mater.vue'),
    meta: {
      title: "大数据管理平台-营业",
      permissionCode: 'CHARGE'
    },
    children: [
      //营业首页
      {
        path: "index",
        name: 'chargeIndex',
        meta: {
          permissionCode: 'CHARGE.CHARGEINDEX'
        }, // 缓存页面
        component: () => import('@/views/charge/index.vue'),
      },
      //=======欠费首页=======
      {
        path: "arrear/index",
        name: 'arrearIndex',
        meta: {
          keepAlive: false,
          permissionCode: 'CHARGE.ARREAR'
        }, // 缓存页面
        component: () => import('@/views/charge/arrears/index.vue'),
      },
      //欠费同比环比
      {
        path: "arrear/QoqList",
        name: 'arrearQoqList',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.ARREAR.ARREARQOQLIST'},
        component: () => import('@/views/charge/arrears/arrearQoqList.vue'),
      },
      {
        path: "arrear/IndexCurve",
        name: 'arrearIndexCurve',
        meta: {permissionCode: 'CHARGE.ARREAR.ARREARINDEXCURVE'},
        component: () => import('@/views/charge/arrears/arrearIndexCurve.vue'),
      },
      {   // 连续欠费人数
        path: "arrear/arrearContinuous",
        name: 'arrearContinuous',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.ARREAR.ARREARCONTINUOUS'}, // 缓存页面
        component: () => import('@/views/charge/arrears/arrearContinuous.vue'),
      },
      {   // 用水性质欠费人数
        path: "arrear/arrearWaterProperties",
        name: 'arrearWaterProperties',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.ARREAR.ARREARWATERPROPERTIES'}, // 缓存页面
        component: () => import('@/views/charge/arrears/arrearWaterProperties.vue'),
      },
      {   // 水价类型欠费列表
        path: "arrear/arrearWaterType",
        name: 'arrearWaterType',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.ARREAR.ARREARWATERTYPE'}, // 缓存页面
        component: () => import('@/views/charge/arrears/arrearWaterType.vue'),
      },
      {   // 欠费曲线跳转
        path: "arrear/arrearDiagram/:communityCode/:contentPriceCode/:elecTypeCode",
        name: 'arrearDiagram',
        meta: {type: 'analysis', permissionCode: 'CHARGE.ARREAR.ARREARDIAGRAM'}, // 缓存页面
        component: () => import('@/views/charge/water/waterUserCurveJump.vue'),
      },
      {   // 欠费曲线跳转
        path: "arrear/arrearQoqDiagram/:communityCode/:contentPriceCode/:elecTypeCode",
        name: 'arrearQoqDiagram',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.ARREAR.ARREARQOQDIAGRAM'}, // 缓存页面
        component: () => import('@/views/charge/arrears/arrearQoqDiagram.vue'),
      },
      {   // 用户档案列表
        path: "arrear/arrearUserInfo/:seachItems",
        name: 'arrearUserInfo',
        meta: {type: 'analysis', permissionCode: 'CHARGE.ARREAR.ARREARUSERINFO'}, // 缓存页面
        component: () => import('@/views/charge/arrears/arrearUserInfo.vue'),
      },
      {   // 用户档案列表
        path: "arrear/arrearUserListDetails/:seachItems",
        name: 'arrearUserListDetails',
        meta: {type: 'analysis', permissionCode: 'CHARGE.ARREAR.ARREARUSERLISTDETAILS'}, // 缓存页面
        component: () => import('@/views/charge/arrears/arrearUserListDetails.vue'),
      },
      {   // 小区欠费列表
        path: "arrear/arrearResidentialquarters",
        name: 'arrearResidentialquarters',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.ARREAR.ARREARRESIDENTIALQUARTERS'}, // 缓存页面
        component: () => import('@/views/charge/arrears/arrearResidentialquarters.vue'),
      }
      //=======收益分析=======
      , {
        path: "income/index",
        name: 'incomeIndex',
        meta: {keepAlive: false, permissionCode: 'CHARGE.INCOME'}, // 缓存页面
        component: () => import('@/views/charge/income/index.vue'),
      }
      //收益同比环比
      , {
        path: "income/Ratio",
        name: 'Ratio',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.INCOME.RATIO'}, // 缓存页面
        component: () => import('@/views/charge/income/incomeRatio.vue'),
      },
      //小区收益统计报表
      {
        path: "income/ResidentialUser",
        name: 'incomeResidentialUser',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.INCOME.INCOMERESIDENTIALUSER'}, // 缓存页面
        component: () => import('@/views/charge/income/incomeResidentialUser.vue'),
      },
      //小区收益图表
      {
        path: "income/ResidentialGraph/:typeCode/:typeName",
        name: 'incomeResidentialGraph',
        meta: {type: 'analysis', permissionCode: 'CHARGE.INCOME.INCOMERESIDENTIALGRAPH'}, // 缓存页面
        component: () => import('@/views/charge/income/incomeResidentialGraph.vue'),
      },
      //小区收益图表2
      {
        path: "income/ResidentialGraph2/:typeCode/:typeName",
        name: 'incomeResidentialGraph2',
        meta: {type: 'analysis', permissionCode: 'CHARGE.INCOME.INCOMERESIDENTIALGRAPH'}, // 缓存页面
        component: () => import('@/views/charge/income/incomeResidentialGraph2.vue'),
      },
      {
        path: "income/ResidentialGraph3/:typeCode/:typeName",
        name: 'incomeResidentialGraph3',
        meta: {type: 'analysis', permissionCode: 'CHARGE.INCOME.INCOMERESIDENTIALGRAPH'}, // 缓存页面
        component: () => import('@/views/charge/income/incomeResidentialGraph3.vue'),
      },

      //小区收益图表2
      {
        path: "income/ResidentialUser2/:typeName/:typeCode",
        name: 'incomeResidentialUser2',
        meta: {type: 'analysis',permissionCode: 'CHARGE.INCOME.INCOMERESIDENTIALUSER2'}, // 缓存页面
        component: () => import('@/views/charge/income/incomeResidentialUser2.vue'),
      },
      // 不同用户类型收益排行
      {
        path: "income/incomeUserType",
        name: 'incomeUserType',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.INCOME.INCOMEUSERTYPE'}, // 缓存页面
        component: () => import('@/views/charge/income/incomeUserType.vue'),
      },
      // 不同用户类型收益排行2
      {
        path: "income/incomeUserType2/:typeName/:typeCode",
        name: 'incomeUserType2',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.INCOME.INCOMEUSERTYPE2'}, // 缓存页面
        component: () => import('@/views/charge/income/incomeUserType2.vue'),
      }, // 不同水价类型收益
      {
        path: "income/incomeWaterType",
        name: 'incomeWaterType',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.INCOME.INCOMEWATERTYPE'}, // 缓存页面
        component: () => import('@/views/charge/income/incomeWaterType.vue'),
      }, // 不同水价类型收益2　
      {
        path: "income/incomeWaterType2/:typeName/:typeCode",
        name: 'incomeWaterType2',
        meta: {type: 'analysis', permissionCode: 'CHARGE.INCOME.INCOMEWATERTYPE2'},
        component: () => import('@/views/charge/income/incomeWaterType2.vue'),
      }, // 应收同比环比图
      // {
      //   path: "income/incomeQoqDiagram",
      //   name: 'incomeQoqDiagram',
      //   meta: {type: 'analysis', permissionCode: 'CHARGE.INCOME.INCOMEQOQDIAGRAM'}, // 缓存页面
      //   component: () => import('@/views/charge/income/incomeQoqDiagram.vue'),
      // }, // 用户列表跳转详情
      {
        path: "income/incomeUserListDetails/:typeCode/:typeName/:userName/:userNo",
        name: 'incomeUserListDetails',
        meta: {type: 'analysis',  permissionCode: 'CHARGE.INCOME.INCOMERESIDENTIALUSER2'}, // 缓存页面
        component: () => import('@/views/charge/income/incomeUserListDetails.vue')
      }
      //=======来电分析=======
      , {
        path: "call/index",
        name: 'callIndex',
        meta: {keepAlive: false, permissionCode: 'CHARGE.CALL'}, // 缓存页面
        component: () => import('@/views/charge/call/index.vue'),
      }
      , {
        path: "call",
        name: 'chargeCall',
        meta: {permissionCode: 'CHARGE.CALL.CHARGECALL'}, // 缓存页面
        component: () => import('@/views/charge/call/call.vue'),
      }, {
        path: "call/callListDetails",
        name: 'callListDetails',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.CALL.CALLLISTDETAILS'}, // 缓存页面
        component: () => import('@/views/charge/call/callListDetails.vue'),
      }, {
        path: "call/callStatisticsItem",
        name: 'callStatisticsItem',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.CALL.CALLSTATISTICSITEM'}, // 缓存页面
        component: () => import('@/views/charge/call/callStatisticsItem.vue'),
      },
      //  {
      //   path: "call/callQoqDiagram",
      //   name: 'callQoqDiagram',
      //   meta: {type: 'analysis',  permissionCode: 'CHARGE.CALL.CALLPROMINENTPROBLEM'}, // 缓存页面
      //   component: () => import('@/views/charge/call/callQoqDiagram.vue'),
      // },
      { // 突出问题变化曲线
        path: "call/callProminentProblem",
        name: 'callProminentProblem',
        meta: {type: 'analysis', permissionCode: 'CHARGE.CALL.CALLPROMINENTPROBLEM'}, // 缓存页面
        component: () => import('@/views/charge/call/callProminentProblem.vue'),
      },
      //客户来电分析
      {
        path: "call/Analysis",
        name: 'callAnalysis',
        meta: {type: 'analysis',  permissionCode: 'CHARGE.CALL.CALLANALYSIS'}, // 缓存页面
        component: () => import('@/views/charge/call/callAnalysis.vue'),
      },
      //=======用水分析=======
      {
        path: "water/index",
        name: 'waterIndex',
        meta: {permissionCode: 'CHARGE.WATER'},
        component: () => import('@/views/charge/water/index.vue')
      },
      //不同地域用水量
      {
        path: "water/useWater",
        name: 'analysisUseWater',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.WATER.ANALYSISUSEWATER'}, // 缓存页面
        component: () => import('@/views/charge/water/analysisUseWater.vue')
      },
      //用水同比
      {
        path: "water/QoqList",
        name: 'waterQoqList',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.WATER.WATERQOQLIST'}, // 缓存页面
        component: () => import('@/views/charge/water/QoqList.vue')
      },
      //不同用水性质用水量
      {
        path: "water/elecTypeList",
        name: 'elecTypeUseWaterList',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.WATER.ELECTYPEUSEWATERLIST'}, // 缓存页面
        component: () => import('@/views/charge/water/elecTypeUseWaterList.vue')
      },//不同水价类型用水量列表
      {
        path: "water/waterPriceType",
        name: 'waterPriceType',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.WATER.WATERPRICETYPE'}, // 缓存页面
        component: () => import('@/views/charge/water/waterPriceType.vue')
      },// 用户用水量
      {
        path: "water/waterUserRanking/:seachItems",
        name: 'waterUserRanking',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.WATER.WATERUSERRANKING'}, // 缓存页面
        component: () => import('@/views/charge/water/waterUserRanking.vue')
      },// 日高峰用水分析
      {
        path: "water/waterDailyPeakList",
        name: 'waterDailyPeakList',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.WATER.WATERDAILYPEAKLIST'}, // 缓存页面
        component: () => import('@/views/charge/water/waterDailyPeakList.vue')
      },// 日高峰用水分析
      {
        path: "water/waterDailyPeak",
        name: 'waterDailyPeak',
        meta: {type: 'analysis',  permissionCode: 'CHARGE.WATER.WATERDAILYPEAK.WATERDAILYPEAKPAGE1'}, // 缓存页面
        component: () => import('@/views/charge/water/waterDailyPeak.vue'),
        redirect: {name: 'waterDailyPeakPage1'},
        children: [
          {
            path: "water/waterDailyPeakPage1/:communityCode",
            name: 'waterDailyPeakPage1',
            meta: {
              type: 'analysis',
             
              permissionCode: 'CHARGE.WATER.WATERDAILYPEAK.WATERDAILYPEAKPAGE1'
            }, // 缓存页面
            component: () => import('@/views/charge/water/waterDailyPeakPage1.vue')
          }, {
            path: "water/waterDailyPeakPage2/:communityCode",
            name: 'waterDailyPeakPage2',
            meta: {
              type: 'analysis',
              
              permissionCode: 'CHARGE.WATER.WATERDAILYPEAK.WATERDAILYPEAKPAGE2'
            }, // 缓存页面
            component: () => import('@/views/charge/water/waterDailyPeakPage2.vue')
          }]
      },// 夜间最小用水分析
      {
        path: "water/waterMiniNightList",
        name: 'waterMiniNightList',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.WATER.WATERMININIGHTLIST'}, // 缓存页面
        component: () => import('@/views/charge/water/waterMiniNightList.vue')
      },// 夜间最小用水分析
      {
        path: "water/waterMiniNight",
        name: 'waterMiniNight',
        meta: {type: 'analysis',  permissionCode: 'CHARGE.WATER.WATERMININIGHT.WATERMININIGHTPAGE1'}, // 缓存页面
        component: () => import('@/views/charge/water/waterMiniNight.vue'),
        redirect: {name: 'waterMiniNightPage1'},
        children: [
          {
            path: "water/waterMiniNightPage1/:communityCode",
            name: 'waterMiniNightPage1',
            meta: {
              type: 'analysis',
             
              permissionCode: 'CHARGE.WATER.WATERMININIGHT.WATERMININIGHTPAGE1'
            }, // 缓存页面
            component: () => import('@/views/charge/water/waterMiniNightPage1.vue')
          }, {
            path: "water/waterMiniNightPage2/:communityCode",
            name: 'waterMiniNightPage2',
            meta: {
              type: 'analysis',
             
              permissionCode: 'CHARGE.WATER.WATERMININIGHT.WATERMININIGHTPAGE2'
            }, // 缓存页面
            component: () => import('@/views/charge/water/waterMiniNightPage2.vue')
          }]
      },
      // 用户用水同比曲线跳转


      {
        path: "water/waterQoqDiagram/:communityCode/:contentPriceCode/:elecTypeCode",
        name: 'waterQoqDiagram',
        meta: {type: 'analysis', permissionCode: 'CHARGE.WATER.WATERQOQDIAGRAM'}, // 缓存页面 
        component: () => import('@/views/charge/water/waterQoqDiagram.vue')
      },
      {
        path: "water/waterQoqDiagram/:communityCode/:contentPriceCode/:elecTypeCode",
        name: 'waterQoqDiagram2',
        meta: {type: 'analysis', permissionCode: 'CHARGE.ARREAR.ARREARDIAGRAM'}, // 缓存页面 //欠费CHARGE.ARREAR.ARREARDIAGRAM
        component: () => import('@/views/charge/water/waterQoqDiagram.vue')
      },
      {
        path: "water/waterQoqDiagram/:communityCode/:contentPriceCode/:elecTypeCode",
        name: 'waterQoqDiagram3',
        meta: {type: 'analysis', permissionCode: 'CHARGE.INCOME.INCOMEQOQDIAGRAM'}, // 缓存页面//收益CHARGE.ARREAR.ARREARQOQDIAGRAM
        component: () => import('@/views/charge/water/waterQoqDiagram.vue')
      },
      {
        path: "water/waterQoqDiagram/:communityCode/:contentPriceCode/:elecTypeCode",
        name: 'waterQoqDiagram4',
        meta: {type: 'analysis', permissionCode: 'CHARGE.CALL.CALLPROMINENTPROBLEM'}, // 缓存页面//收益CHARGE.ARREAR.ARREARQOQDIAGRAM
        component: () => import('@/views/charge/water/waterQoqDiagram.vue')
      },


      // 用户天数统计
      {
        path: "water/waterDayStatistics/:seachItems",
        name: 'waterDayStatistics',
        meta: {type: 'analysis', permissionCode: 'CHARGE.WATER.WATERDAYSTATISTICS'}, // 缓存页面
        component: () => import('@/views/charge/water/waterDayStatistics.vue')
      },// 小区用水高频波动分析
      {
        path: "water/waterHighFrequencyFluctuation",
        name: 'waterHighFrequencyFluctuation',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.WATER.WATERHIGHFREQUENCYFLUCTUATION'}, // 缓存页面
        component: () => import('@/views/charge/water/waterHighFrequencyFluctuation.vue')
      },// 用户天日历
      {
        path: "water/waterCalendarDay/:seachItems",
        name: 'waterCalendarDay',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'CHARGE.WATER.WATERCALENDARDAY'}, // 缓存页面
        component: () => import('@/views/charge/water/waterCalendarDay.vue')
      },
      // 用户用水波动分析
      {
        path: "water/analysisUnderpaidCustomers/:user_no",
        name: 'analysisUnderpaidCustomers',
        meta: {type: 'analysis', permissionCode: 'CHARGE.WATER.ANALYSISUNDERPAIDCUSTOMERS'}, // 缓存页面
        component: () => import('@/views/charge/water/analysisUnderpaidCustomers.vue')
      },
      // 用户用水波动分析
      {
        path: "water/waterCurveJump/:seachItems",
        name: 'waterCurveJump',
        meta: {type: 'analysis', permissionCode: 'CHARGE.WATER.WATERCURVEJUMP'}, // 缓存页面
        component: () => import('@/views/charge/water/waterUserCurveJump.vue')
      },
      // 用户用水波动分析
      {
        path: "water/waterUserCurveJump/:userNo/:userName/:type",
        name: 'waterUserCurveJump',
        meta: {type: 'analysis', permissionCode: 'CHARGE.WATER.WATERUSERCURVEJUMP'}, // 缓存页面
        component: () => import('@/views/charge/water/waterUserCurveJump.vue')
      },
      // 小区波动分析
      {
        path: "water/waterUnderpaidCustomers/:seachItems",
        name: 'waterUnderpaidCustomers',
        meta: {type: 'analysis', permissionCode: 'CHARGE.WATER.WATERUNDERPAIDCUSTOMERS'}, // 缓存页面
        component: () => import('@/views/charge/water/waterUserCurveJump.vue')
      }
    ]
  },
  {
    path: '/wma',
    name: 'wma',
    component: () => import('@/views/wma/mater.vue'),
    meta: {permissionCode: 'WMA'},
    children: [
      //营业首页
      {
        path: "index",
        name: 'wmaIndex',
        meta: {keepAlive: true, permissionCode: 'WMA.WMAINDEX'}, // 缓存页面
        component: () => import('@/views/wma/index.vue'),
      },
      {
        path: 'dataReport/waterMeterStatistics',
        name: 'waterMeterStatistics',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'WMA.DATAREPORT.WATERMETERSTATISTICS'},
        component: () => import('@/views/wma/dataReport/waterMeterStatistics.vue')
      },
      {
        path: 'dataReport/dataAcquisition',
        name: 'dataAcquisition',
        meta: {type: 'analysis', keepAlive: true, permissionCode: 'WMA.DATAREPORT.DATAACQUISITION'},
        component: () => import('@/views/wma/dataReport/dataAcquisition.vue')
      },
      {
        path: 'waterAcquisitionRate',
        name: 'waterAcquisitionRate',
        meta: {keepAlive: true, permissionCode: 'WMA.WATERACQUISITIONRATE'},
        component: () => import('@/views/wma/waterAcquisitionRate.vue')
      },
      {
        path: 'dataCollected',
        name: 'dataCollected',
        meta: {keepAlive: true, permissionCode: 'WMA.DATACOLLECTED'},
        component: () => import('@/views/wma/dataCollected.vue')
      }
    ]
  },
  {
    path: '/auth',
    title: '权限管理',
    name: 'auth',
    meta: {keepAlive: true, permissionCode: 'AUTH'}, // 缓存页面
    component: () => import('@/views/auth/mater.vue'),
    children: [
      {
        path: "index",
        name: 'authIndex',
        meta: {permissionCode: 'AUTH.AUTHINDEX'}, // 缓存页面
        component: () => import('@/views/auth/index.vue'),
      },
      {
        path: "menu/tree/:type/:item",
        name: 'authMenuTree',
        meta: {permissionCode: 'AUTH.MENU.AUTHMENUTREE'}, // 缓存页面
        component: () => import('@/views/auth/menu/index.vue'),
      },
      {
        path: "menu/list",
        name: 'authMenuList',
        meta: {permissionCode: 'AUTH.MENU.AUTHMENULIST'}, // 缓存页面
        component: () => import('@/views/auth/menu/list.vue'),
      },
      {
        path: "menu/list_update/:type/:item",
        name: 'authMenuListUpdate',
        meta: {permissionCode: 'AUTH.MENU.AUTHMENULISTUPDATE'}, // 缓存页面
        component: () => import('@/views/auth/menu/list_update.vue'),
      },
      {
        path: "role/update/:type/:item",
        name: 'authRoleUpdate',
        meta: {permissionCode: 'AUTH.ROLE.AUTHROLEUPDATE'}, // 缓存页面
        component: () => import('@/views/auth/role/index.vue'),
      },
      {
        path: "role/list",
        name: 'authRoleList',
        meta: {permissionCode: 'AUTH.ROLE.AUTHROLELIST'}, // 缓存页面
        component: () => import('@/views/auth/role/list.vue'),
      },
      {
        path: "user/update/:type/:item",
        name: 'authUserUpdate',
        meta: {permissionCode: 'AUTH.USER.AUTHUSERUPDATE'}, // 缓存页面
        component: () => import('@/views/auth/user/index.vue'),
      },
      {
        path: "user/changePassword",
        name: 'changePassword',
        meta: {permissionCode: 'AUTH.USER.CHANGEPASSWORD'}, // 缓存页面
        component: () => import('@/views/auth/user/changePassword.vue'),
      },
      {
        path: "user/list",
        name: 'authUserList',
        meta: {permissionCode: 'AUTH.USER.AUTHUSERLIST'}, // 缓存页面
        component: () => import('@/views/auth/user/list.vue'),
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

//************************************************************* 计算需要缓存的路由名称
let keepAliveArray = []

function findMeta(arr, arrValue) {
  arr.forEach((value, index) => {
    if (value.meta && value.meta.keepAlive && value.meta.keepAlive === true) {
      arrValue.push(value.name)
    }
    if (value.children && value.children.length > 0) {
      findMeta(value.children, arrValue)
    }
  })
}

findMeta(asyncRoutes, keepAliveArray)
// console.log('需要缓存的路由:', keepAliveArray)
store.commit('app/SET_KEEPALIVEVALUE', keepAliveArray.join())

//*************************************************************

const createRouter = () => new Router({
  mode: 'history', // require service support
  // scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})
const router = createRouter()

export function resetRouter() {
  
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
