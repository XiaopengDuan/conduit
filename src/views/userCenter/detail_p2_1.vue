<template>
  <div style="height:100%" v-loading="loading">
    <!--右上角按钮-->
    <a class="btn-back" @click="$router.go(-1)">
      <span>返回上一级</span>
    </a>
    <!--右上角按钮//-->
    <div class="list-ys-box list-yhmes-box">
      <div class="up-box">
        <div class="title">
          用户基本信息
          <router-link :to="{name:'detail_p2_1_info',params:$route.params}">[查看更多]</router-link>
        </div>
        <ul class="list-yhmes">
          <li>
            <div class="mes-box">
              <div class="name">户号</div>
              <div class="mes">{{userNo}}</div>
            </div>
          </li>
          <li>
            <div class="mes-box">
              <div class="name">户名</div>
              <div class="mes">{{userName}}</div>
            </div>
          </li>
          <li>
            <div class="mes-box">
              <div class="name">地址</div>
              <div class="mes">{{userAddress}}</div>
            </div>
          </li>
          <li>
            <div class="mes-box">
              <div class="name">状态</div>
              <div class="mes">{{state}}</div>
            </div>
          </li>
          <li>
            <div class="mes-box">
              <div class="name">用户类型</div>
              <div class="mes">{{userType}}</div>
            </div>
          </li>
          <li>
            <div class="mes-box">
              <div class="name">收费方式</div>
              <div class="mes">{{chargeMode}}</div>
            </div>
          </li>
          <li>
            <div class="mes-box">
              <div class="name">联系手机</div>
              <div class="mes">{{contactMobile}}</div>
            </div>
          </li>
          <li>
            <div class="mes-box">
              <div class="name">余额</div>
              <div class="mes">¥{{money}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="report-form">
        <div class="report-form-left" @click="openUserWater" style="cursor: pointer;">
          <div class="title">用户用水变化曲线</div>
          <div id="container" class="echarts-box" style="width:100%;height:2.5rem;cursor: pointer;"></div>
        </div>
        <div class="report-form-right" @click="openUserWater2" style="cursor: pointer">
          <div class="title">用户缴费变化曲线</div>
          <!--          -->
          <div id="container2" class="echarts-box" style="width:100%;height:2.5rem;"></div>
        </div>
      </div>
    </div>
    <!--右侧page-->
    <rightNav :menuIndex="2"></rightNav>
    <!--右侧page//-->
    <!--右侧切换按钮-->
    <router-link
      :to="{name:'detail_p2_2',params:{userNo,userName,userAddress,chargeMode,state,userType,money}}"
      class="btn-switch"
      name="切换"
    ></router-link>
    <!--右侧切换按钮//-->
    <!--    弹窗-->
    <div class="model" :style="{display: UserWaterFlag?'block':'none'}">
      <div class="top-horn-l"></div>
      <div class="top-horn-r"></div>
      <div class="bottom-horn-l"></div>
      <div class="bottom-horn-r"></div>
      <div class="model-box" style="width: 13rem;height: 5rem;left: 25%;padding-bottom: .3rem;">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <!--四个装饰角//-->
        <div class="title" style="margin-top: -0.2rem;margin-left: -0.2rem">水量和水费变化曲线</div>
        <!--关闭按钮-->
        <a class="close" @click="UserWaterFlag = false"></a>
        <!--关闭按钮//-->

        <div class="content" style="margin-top: .3rem;">
          <div ref="UserWaterEcharts" style="width: 13rem;height: 4rem">
          </div>
        </div>
      </div>
    </div>
    <div class="model" :style="{display: UserWaterFlag2?'block':'none'}">
      <div class="top-horn-l"></div>
      <div class="top-horn-r"></div>
      <div class="bottom-horn-l"></div>
      <div class="bottom-horn-r"></div>
      <div class="model-box" style="width: 95%;height: 95%;left: 20%;top: -6%">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <!--四个装饰角//-->

        <!--关闭按钮-->

        <a class="close" style="right: .3rem;top: .1rem;cursor: pointer" @click="UserWaterFlag2 = false"></a>
        <!--关闭按钮//-->

        <div class="content" style="margin-top: .4rem;width: 100%;">
          <div class="relative-title">
            水量和水费
            <el-date-picker
              @change="getUserWaterData"
              v-model="elDateValue"
              value-format="yyyyMM"
              format="yyyy年MM月"
              size="mini"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </div>
          <div style="padding: 0 .3rem">
            <table class="calendar-table" cellpadding="0" cellspacing="0">
              <thead>
              <tr>
                <th>星期日</th>
                <th>星期一</th>
                <th>星期二</th>
                <th>星期三</th>
                <th>星期四</th>
                <th>星期五</th>
                <th>星期六</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(value, index) in calendarTable" :key="index">
                <td v-for="(v,i) in value" :key="i"
                    @mouseenter="mouseenterSelect(v)"
                    @mouseleave="mouseleaveSelect(v)"
                    :class="{'echarts-active-td': activeTrNumber === v}">
                  <div class="calendar-table-title" v-if="v > 0">{{v}}日</div>
                  <div class="calendar-table-title" style="color: #0275B5" v-if="v < 0">{{v * -1}}日</div>
                  <div class="calendar-table-conten" v-if="v > 0">
                    <el-tooltip class="item" effect="light" :content="calendarValue(v,'power')+'T'"
                                placement="top-start">
                      <div style="color: #00ECFF">
                        水量：{{calendarValue(v,'power')|tooltip-filter(5)}}T
                      </div>
                    </el-tooltip>

                    <el-tooltip class="item" effect="light" :content="'￥'+calendarValue(v,'money')"
                                placement="top-start">
                      <div style="color: #F5680E">
                        水费：￥{{calendarValue(v,'money')|tooltip-filter(5)}}
                      </div>
                    </el-tooltip>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div style="width: 100%">

            <div class="relative-title" style="margin-top: 0.2rem;">
              水量和水费曲线
            </div>
            <div ref="UserWaterEcharts2" style="width: 14.5rem;height: 3.5rem">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    弹窗-->
  </div>
</template>
<script>
  import rightNav from "../../components/userCenter/rightNav";
  import moment from "moment";

  var echarts = require("echarts");

  import {
    getUserWaterChangeCurve,
    getUserAllInfo,
    getUserPayChangeCurve,
    getUserWaterRangeAndAverageCurvePage2
  } from "@/api/usercenter";

  export default {
    components: {
      rightNav
    },
    mounted() {
      // 
      let m = moment()
      this.elDateValue = m.year() + '' + (m.month()>9?m.month():'0'+m.month())
      this.loadUserInfo();
      this.loadCurve();
      this.getUserWaterData();
      this.loadCurve();
      this.getUserWaterData();
    },
    data() {
      return {
        loading: false,
        UserWaterFlag: false,
        UserWaterFlag2: false,
        arrearsMoney: "",
        chargeMode: "",
        contactMobile: "",
        lastMonthMoney: "",
        lastMonthPower: "",
        money: "",
        state: "",
        userAddress: "",
        userName: "",
        userNo: "",
        userType: "",
        waterCurveX: [],
        waterCurveY: [],
        payCurveX: [],
        payCurveY: [],
        curves: {},
        calendars: [{power: ''}],
        calendarTable: [],
        elDateValue: '',
        myChart: {},
        myChart2: {},
        activeTrNumber: -1,
      };
    },
    methods: {
      mouseenterSelect(index) {
        if (index >= 0) {
          --index;
          this.activeTrNumber = index;
          this.myChart2.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index
          });
          this.myChart2.dispatchAction({
            type: 'highlight',
            seriesIndex: [0, 1],
            dataIndex: index
          });
        }
      },
      mouseleaveSelect(index) {
        if (index > 0) {
          --index;
          this.myChart2.dispatchAction({
            type: 'downplay',
            seriesIndex: [0, 1],
            dataIndex: index
          });
        }
      },


      //打开弹窗
      openUserWater() {
        this.UserWaterFlag = true
        // this.drawUserWaterLine(this.curves)
      },
      openUserWater2() {
        this.UserWaterFlag2 = true
      },
      loadUserInfo: function () {
        var that = this;
        let userNo = this.$route.params.userNo;
        let postData = {userNo: userNo};
        that.loading = true;
        getUserAllInfo(postData).then(function (res) {
          if (res.code === 200) {
            that.arrearsMoney = res.data.arrearsMoney;
            that.chargeMode = res.data.chargeModeName;
            that.contactMobile = res.data.contactMobile;
            that.lastMonthMoney = res.data.lastMonthMoney;
            that.lastMonthPower = res.data.lastMonthPower;
            that.money = res.data.money;
            that.state = res.data.stateName;
            that.userAddress = res.data.userAddress;
            that.userNo = res.data.userNo;
            that.userName = res.data.userName;
            that.userType = res.data.userTypeName;
          }
          that.loading = false;
        }).catch(res => {
          that.loading = false;
        });
      },
      loadCurve: function () {
        var that = this;
        let userNo = this.$route.params.userNo;
        let postData = {userNo: userNo};
        getUserWaterChangeCurve(postData).then(res => {
          that.waterCurveX = res.data.months;
          that.waterCurveY = res.data.powers;
          that.drawWaterLine();
        });
        getUserPayChangeCurve(postData).then(res => {
          that.payCurveX = res.data.months;
          that.payCurveY = res.data.moneys;
          that.drawPayLine();
        });
      },
      drawWaterLine() {
        let myChart = echarts.init(document.getElementById("container"));
        myChart.setOption({
          grid: {
            y: 10,
            x: 35,
            y2: 50
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.waterCurveX, //月份数据
            axisLabel: {
              rotate: 70,
              textStyle: {
                color: "#fff" //坐标值得具体的颜色
              }
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#034778", //左边线的颜色
                width: "1" //坐标线的宽度
              }
            }
          },
          yAxis: {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: "#05abc4"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#fff" //坐标值得具体的颜色
              }
            },
            axisLine: {
              show: false
            }
          },
          series: [
            {
              data: this.waterCurveY,
              type: "line",
              smooth: true,
              areaStyle: {
                normal: {
                  //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(80,141,255,0.39)"
                    },
                    {
                      offset: 0.34,
                      color: "rgba(56,155,255,0.25)"
                    },
                    {
                      offset: 1,
                      color: "rgba(38,197,254,0.00)"
                    }
                  ])
                }
              },
              itemStyle: {
                normal: {
                  color: "#05abc4", //改变折线点的颜色
                  lineStyle: {
                    color: "#05abc4", //改变折线颜色
                    width: "3"
                  }
                }
              }
            }
          ]
        });
      },
      initCalendar(data) {
        data = this.elDateValue ? this.elDateValue : '201907'
        const momentDate = moment(data, 'YYYYMM');
        const daysArr = [[], [], [], [], [], []]; // 6*7的日历数组
        let currentWeekday = momentDate.date(1).weekday(); // 获取当月1日为星期几
        currentWeekday = currentWeekday === 0 ? 7 : currentWeekday;

        const currentMonthDays = momentDate.daysInMonth(); // 获取当月天数
        const lastMonthDays = momentDate.subtract(1, 'months').daysInMonth(); // 获取上月天数
        const getDay = day => (day <= lastMonthDays ? day : (day <= (lastMonthDays + currentMonthDays)) ? day - lastMonthDays : day - (lastMonthDays + currentMonthDays)); // 日期处理
        for (let i = 1; i <= 7; i += 1) {
          let virtualDay = (lastMonthDays - currentWeekday) + i;
          for (let j = 0; j < 6; j += 1) {
            // 不是本月的转为负数
            let number = getDay(virtualDay + (j * 7));
            if (j <= 1 && number > 15) {
              number = number * -1
            }
            if (j >= 4 && number < 14) {
              number = number * -1
            }
            daysArr[j][i - 1] = number;
          }
        }
        if (daysArr[5][0] < 0) {
          daysArr.pop()
        }

        this.calendarTable = daysArr;
      },
      drawPayLine() {
        let myChart2 = echarts.init(document.getElementById("container2"));
        myChart2.setOption({
         tooltip: {
          confine: true,
            trigger: 'axis',
            // position: ['50%','50%'],
            position: [0, 0],
            backgroundColor: 'rgb(255, 255, 255, 0)',
            axisPointer: {
              type: 'none'
            },
            formatter: function () {
              return '<div style="cursor: pointer;"></div>'
            },
            // enterable: true
          },
          grid: {
            y: 10,
            x: 35,
            y2: 50
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.payCurveX,
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#034778", //左边线的颜色
                width: "1" //坐标线的宽度
              }
            },
            axisLabel: {
              rotate: 70,
              textStyle: {
                color: "#fff" //坐标值得具体的颜色
              }
            }
          },
          yAxis: {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: "#05abc4"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#fff" //坐标值得具体的颜色
              }
            },
            axisLine: {
              show: false
            }
          },
          series: [
            {
              data: this.payCurveY,
              type: "line",
              smooth: true,
              areaStyle: {
                normal: {
                  //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(80,141,255,0.39)"
                    },
                    {
                      offset: 0.34,
                      color: "rgba(56,155,255,0.25)"
                    },
                    {
                      offset: 1,
                      color: "rgba(38,197,254,0.00)"
                    }
                  ])
                }
              },
              itemStyle: {
                normal: {
                  color: "#05abc4", //改变折线点的颜色
                  lineStyle: {
                    color: "#05abc4", //改变折线颜色
                    width: "3"
                  }
                }
              }
            }
          ]
        });
      },
      getUserWaterData() {
        getUserWaterRangeAndAverageCurvePage2({month: this.elDateValue, userNo: this.$route.params.userNo}).then(r => {

          this.curves = r.data.curves;
          this.calendars = r.data.calendars;
          this.initCalendar()
          this.drawUserWaterLine(this.curves);
        })
      },
      drawUserWaterLine(data) {
        // console.log(data)
        setTimeout(() => {
          let that = this;
          this.myChart = echarts.init(this.$refs.UserWaterEcharts);
          this.myChart2 = echarts.init(this.$refs.UserWaterEcharts2);
          let option = {
            grid: {
              left: 80,
              right: 100
            },
            textStyle: {
              fontSize: 12
            },
            title: {},
           tooltip: {
          confine: true,
              trigger: 'axis',
              formatter: function (values, index) {
                that.activeTrNumber = values[0].dataIndex + 1;
                return `${values[0].marker}${values[0].seriesName}：${values[0].value}</br>${values[1].marker}${values[1].seriesName}：${values[1].value}`
              }
            },
            legend: {
              type: 'plain',
              data: ['水量', '水费'],
              textStyle: {
                color: '#FFFFFF'
              }
            },
            xAxis: {
              data: data.days,
              boundaryGap: false, // 刻度留白策略
              axisLine: {
                show: false,
                color: "#ffff21"
              },
              axisLabel: {
                color: "#ffffff",
                formatter: function (value, index) {
                  return value.substring(value.length - 2, value.length)
                }
              },
              axisTick: {
                show: false
              }
            },
            yAxis: [
              {
              name: '水量：吨',
              offset: 15,
              nameTextStyle: {
                color: '#FFFFFF'
              },
              splitLine: {
                lineStyle: {
                  color: "#50647E"
                }
              },
              axisLabel: {
                color: "#ffffff",
                formatter: function (value, index) {
                  return value === 0 ? value : value + "T";
                }
              },
              axisLine: {
                show: false
              }
            }, {
              name: '水费：元',
              offset: 15,
              nameTextStyle: {
                color: '#FFFFFF'
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "#516B83"
                }
              },
              axisLabel: {
                color: "#ffffff",
                formatter: function (value, index) {
                  return value === 0 ? value : value + "元";
                }
              },
              axisLine: {
                show: false
              }
            }],
            series: [
              {
                radius: "100%",
                name: "水费",
                type: "line",
                yAxisIndex: 1,
                smooth: true,
                itemStyle: {
                  color: "#00FEFE",
                  borderWidth: 4
                },
                lineStyle: {
                  color: "#00C3EF"
                },
                areaStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#00B8E4" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#012747" // 100% 处的颜色
                      }
                    ]
                  },
                  opacity: 0.6
                },
                data: data.moneys
              }, {
                radius: "100%",
                name: "水量",
                type: "line",
                smooth: true,
                itemStyle: {
                  color: "#00DE50",
                  borderWidth: 4
                },
                lineStyle: {
                  color: "#00DE50"
                },
                areaStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#00DE50" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#012747" // 100% 处的颜色
                      }
                    ]
                  },
                  opacity: 0.6
                },
                data: data.powers
              }
            ]
          };
          this.myChart.setOption(option);
          this.myChart2.setOption(option);
        }, 10)

      }
    },
    computed: {
      calendarValue() {
        return function (i, v) {
          i--;
          return this.calendars.length > 1 && this.calendars[i] ? this.calendars[i][v] : ''
        }
      }
    }
  };
</script>
