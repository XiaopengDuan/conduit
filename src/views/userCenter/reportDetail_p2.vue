<template>
  <div style="height:100%" v-loading="loading">
    <!--右上角按钮-->
    <a class="btn-back" @click="$router.go(-1)">
      <span>返回上一级</span>
    </a>
<!--    <a class="btn-back" style="right:2.8rem" @click="search">-->
<!--      <span style="background:none;">查询</span>-->
<!--    </a>-->
    <div class="tablecont-box">
      <div class="title">
        水费同比环比
        <div class="input-group-btn" style="width: 1.2rem">
          <el-select disabled="ture" :placeholder="currentYear" v-model="chooseYear">
            <el-option v-for="item in year" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="input-group-btn" style="width: 1.2rem">
          <el-select disabled="ture"  placeholder="01" v-model="chooseMonth">
            <el-option v-for="item in month" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div  class="input-group-btn" style="width: 2.3rem">
          <el-input disabled="ture"  v-model="fullName" :placeholder="输入用户号模糊查询"></el-input>
        </div>
      </div>
      <div style="height:100%" v-loading="loading">
        <div class="list-ys-box list-yhmes-box chart-wrap-box" style="padding-top:0;width:13rem;">
        <div class="content page2">
          <div>
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
                  <td @mouseenter="mouseenterSelect(v)" @mouseleave="mouseleaveSelect(v)" :class="{'echarts-active-td': activeTdNumber === v}" v-for="(v,i) in value" :key="i">
                    <div class="calendar-table-title" v-if="v > 0">{{v}}日</div>
                    <div
                      class="calendar-table-title"
                      style="color: #0275B5"
                      v-if="v < 0"
                    >{{v * -1}}日</div>
                    <div class="calendar-table-conten" v-if="v > 0">
                      <el-tooltip class="item" effect="light" :content="calendarValue(v,'power')+'T'" placement="top-start">
                        <div style="color: #00ECFF">水量：
                            {{calendarValue(v,'power')|tooltip-filter(5)}}T
                        </div>
                      </el-tooltip>
                      <el-tooltip class="item"  effect="light" :content="'￥'+calendarValue(v,'money')" placement="top-start">
                       <div style="color: #F5680E">水费：￥{{calendarValue(v,'money')|tooltip-filter(5)}}</div>
                      </el-tooltip>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
          <div style="padding-top: .5rem">
            <div ref="UserWaterEcharts" style="width: 100%;height:2rem"></div>
          </div>
          </div>
        </div>
        <!--右侧page-->
        <rightNav :menuIndex="2"></rightNav>
        <!--右侧page//-->
      </div>
    </div>
  </div>
</template>
<style scoped>
.page2{
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    padding:0 .2rem;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
.page2::-webkit-scrollbar
{
    width: 16px;
    height: 16px;
    background-color: #003972;
}
 
/*定义滚动条轨道 内阴影+圆角*/
.page2::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 0 rgba(0,0,0,0.3);
    border-radius: 0px;
    background-color: #003972;
}
 
/*定义滑块 内阴影+圆角*/
.page2::-webkit-scrollbar-thumb
{
    border-radius: 0;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #27629d;
}
</style>

<script>
import moment from "moment";
import rightNav from "../../components/userCenter/reportRightNav";
import {
  getUserWaterRangeAndAverageCurvePage2,
  getUserAllInfo
} from "@/api/usercenter";
import userMarker from "@/assets/img/userMarker.png";
var echarts = require("echarts");

export default {
  components: {
    rightNav
  },
  data() {
    return {
      activeTdNumber: -99,
      myChart: {},
      loading: false,
      userNo: "",
      userName: "",
      currentYear: "2019",
      chooseYear: "2019",
      chooseMonth: "07",
      month: [],
      year: [],
      curves: {},
      calendars: [{ power: "" }],
      calendarTable: []
    };
  },
  computed: {
    fullName: function() {
      return `${this.userName}(${this.userNo})`;
    },
    calendarValue() {
      return function(i, v) {
        i--;
          return this.calendars.length > 1 && this.calendars[i]
          ? this.calendars[i][v]
          : "";
      };
    }
  },
  mounted() {
     let m = moment()
      this.chooseMonth = m.format('MM')-1
    this.chooseMonth = parseInt(this.chooseMonth)>9?this.chooseMonth:'0'+this.chooseMonth
    for (var i = 1; i < 10; i++) {
      this.month.push("0" + i);
    }
    this.month.push("11");
    this.month.push("12");

    for (var i = 0; i < 5; i++) {
      let year = moment().year() - i;
      this.year.push(year);
    }
    this.currentYear = moment().year();
    this.loadUserData();
  },
  methods: {
    mouseenterSelect(index){
      if(index>0){
        this.activeTdNumber = index-1;
        this.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index-1
        })
        this.myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: [0,1],
          dataIndex: index-1
        })
      }
    },
    mouseleaveSelect(index){
      if(index>0){
        this.myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: [0,1],
          dataIndex: index-1
        })
      }
    },

    search: function() {
      this.loadChartData();
    },
    loadUserData: function() {
      let userNo = this.$route.params.userNo;
      this.userNo = this.$route.params.userNo;
      let postData = { userNo: userNo };
      var that = this;
      that.loading = true;
      getUserAllInfo(postData)
        .then(response => {
          if (response.code == 200) {
            that.userName = response.data.userName;
            that.loadChartData();
          }
          that.loading = false;
        })
        .catch(res => {
          that.loading = false;
        });
    },
    initCalendar(data) {
      data = `${this.chooseYear}${this.chooseMonth}`;
      const momentDate = moment(data, "YYYYMM");
      const daysArr = [[], [], [], [], [], []]; // 6*7的日历数组
      const currentWeekday = momentDate.date(1).weekday(); // 获取当月1日为星期几
      const currentMonthDays = momentDate.daysInMonth(); // 获取当月天数
      const lastMonthDays = momentDate.subtract(1, "months").daysInMonth(); // 获取上月天数
      const getDay = day =>
        day <= lastMonthDays
          ? day
          : day <= lastMonthDays + currentMonthDays
          ? day - lastMonthDays
          : day - (lastMonthDays + currentMonthDays); // 日期处理
      for (let i = 1; i <= 7; i += 1) {
        let virtualDay = lastMonthDays - currentWeekday + i;
        for (let j = 0; j < 6; j += 1) {
          // 不是本月的转为负数
          let number = getDay(virtualDay + j * 7);
          if (j <= 1 && number > 15) {
            number = number * -1;
          }
          if (j >= 4 && number < 14) {
            number = number * -1;
          }
          daysArr[j][i - 1] = number;
        }
      }
      if(daysArr[5][0]<0){
        daysArr.pop()
      }
      // console.log("daysArr", daysArr);
      this.calendarTable = daysArr;
    },
    loadChartData: function() {
      var that = this;
      let postData = {
        month: `${this.chooseYear}${this.chooseMonth}`,
        userNo: this.$route.params.userNo
      };

      getUserWaterRangeAndAverageCurvePage2(postData).then(r=> {
        this.curves = r.data.curves;
        this.calendars = r.data.calendars;
        this.initCalendar();
        this.drawUserWaterLine(this.curves);
      });
    },
    drawUserWaterLine(data) {
      let that = this
      this.myChart = echarts.init(this.$refs.UserWaterEcharts);
      let option = {
        textStyle: {
          fontSize: 12
        },
        grid: {
          left: 55,
          right: 60,
          bottom: 6
        },
        title: {},
       tooltip: {
          confine: true,
          trigger: 'axis',
          formatter: function (values, index) {
            // console.log('value', values)
            // console.log('index', index)
            that.activeTdNumber = values[0].dataIndex+1
            let str = `${values[0].name}</br>`
            values.forEach((value,index)=>{
              str += index===0?`${value.seriesName}: ￥${value.value}</br>`: `${value.seriesName}: ${value.value}T</br>`
            })
            return str
          }
        },
        legend: {
          type: "plain",
          data: ["水量", "水费"],
          textStyle: {
            color: "#FFFFFF"
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
            formatter: function(value, index) {
              return value.substring(value.length - 2, value.length);
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            name: "水量：吨",
            offset: 15,
            nameTextStyle: {
              color: "#FFFFFF"
            },
            splitLine: {
              lineStyle: {
                color: "#516B83"
              }
            },
            axisLabel: {
              color: "#ffffff",
              formatter: function(value, index) {
                return value === 0 ? value : value + "T";
              }
            },
            axisLine: {
              show: false
            }
          },
          {
            name: "水费：元",
            offset: 15,
            nameTextStyle: {
              color: "#FFFFFF"
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#516B83"
              }
            },
            axisLabel: {
              color: "#ffffff",
              formatter: function(value, index) {
                return value === 0 ? value : value + "元";
              }
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            radius: "100%",
            name: "水费",
            type: "line",
            yAxisIndex: 1,
            smooth: true,
            label: {
              //show: true,
              color: "#00F3F6"
            },
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
          },
          {
            radius: "100%",
            name: "水量",
            type: "line",
            smooth: true,
            label: {
             // show: true,
              color: "#00DE50"
            },
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
    }
  }
};
</script>
