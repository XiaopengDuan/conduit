<template>
  <div style="height:100%" v-loading="loading">
    <!--右上角按钮-->
    <a class="btn-back" @click="$router.go(-1)">
      <span>返回上一级</span>
    </a>
    <a class="btn-back" style="right:2.8rem" @click="search">
      <span style="background:none;">查询</span>
    </a>
    <div class="tablecont-box">
      <div class="title">
        水费同比环比
        <div class="input-group-btn" style="width: 1.2rem">
          <el-select :placeholder="currentYear" v-model="chooseYear">
            <el-option v-for="item in year" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="input-group-btn" style="width: 1.2rem">
          <el-select placeholder="01" v-model="chooseMonth">
            <el-option v-for="item in month" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="input-group-btn" style="width: 2.3rem">
          <el-input v-model="fullName" :placeholder="输入用户号模糊查询"></el-input>
        </div>
      </div>
      <div style="height:100%" v-loading="loading">
        <div class="list-ys-box list-yhmes-box chart-wrap-box" style="padding-top:0;">
          <div id="container1" class="echarts-box" style="width:100%;height:3rem;"></div>
          <div id="container2" class="echarts-box" style="width:100%;height:3rem; "></div>
        </div>
        <!--右侧page-->
        <rightNav :menuIndex="3"></rightNav>
        <!--右侧page//-->
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import rightNav from "../../components/userCenter/reportRightNav";
import {
  getUserWaterRangeAndAverageCurvePage3,
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
      loading: false,
      userNo: "",
      userName: "",
      currentYear: "2019",
      chooseYear: "2019",
      chooseMonth: "07",
      month: [],
      year: []
    };
  },
  computed: {
    fullName: function() {
      return `${this.userName}(${this.userNo})`;
    }
  },
  mounted() {
    let m = moment()
    // this.currentYear = m.format('yyyy')
    // this.chooseYear = m.format('yyyy')
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
    search: function() {
      this.loadChartData();
    },
    loadUserData: function() {
      let userNo = this.$route.params.userNo;
      this.userNo = this.$route.params.userNo;
      let postData = { userNo: userNo };
      var that = this;
      that.loading = true;
    // this.$store.dispatch('app/openLoading')
      getUserAllInfo(postData)
        .then(response => {
          // this.$store.dispatch('app/closeLoading')
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
    loadChartData: function() {
      var that = this;
      let postData = {
        month: `${this.chooseYear}${this.chooseMonth}`,
        userNo: this.$route.params.userNo
      };

      getUserWaterRangeAndAverageCurvePage3(postData).then(function(data) {
        let container1 = document.getElementById("container1");
        let options = {
          months: data.data.moneys.days,
          past: data.data.moneys.values,
          showTitle: true,
          title: "",
          pastTitle: "水费",

          current: data.data.moneys.valueYtys,
          currentTitle: "同比水量",

          yearOnYear: data.data.moneys.qoqs,
          yearOnYearTitle: "同比"
        };
        that.drawWaterLine(container1, options);

        let container2 = document.getElementById("container2");
        let options2 = {
          months: data.data.powers.days,
          past: data.data.powers.values,
          showTitle: true,
          title: "水量同比环比",
          pastTitle: "水量",

          current: data.data.powers.valueYtys,
          currentTitle: "同比水量",

          yearOnYear: data.data.powers.qoqs,
          yearOnYearTitle: "环比"
        };
        that.drawWaterLine(container2, options2);
      });
    },
    drawWaterLine(container, options) {
      
      echarts.init(container).setOption({
        title: {
          show: options.showTitle,
          text: options.title,
          textStyle: {
            color: "#06e8ff"
          },
          subtext: "单位：吨",
          subtextStyle: {
            color: "#fff"
          }
        },
        grid: {
         left: 60
        },
        legend: {
          show: true,
          right: 0,
          textStyle: {
            color: "#fff"
          }
        },
       tooltip: {
          trigger: 'axis',
          confine: true,
          formatter: function (values, index) {
              let str = `${values[0].name}</br>`
              values.forEach((value,index)=>{
                str += index!==2?`${value.marker}${value.seriesName}: ${value.value}T</br>`:`${value.marker}${value.seriesName}: ${value.value==='--'?'--':value.value+'%'}</br>`
              })
              return str
            }
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: options.months, //月份数据
          axisLabel: {
            formatter: function(value, index) {
              return value.substring(6);
            },
            //rotate: 70,
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
        yAxis: [{
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: "#05abc4"
            }
          },
          axisLabel: {
            formatter: "{value} T",
            textStyle: {
              color: "#fff" //坐标值得具体的颜色
            }
          },
          axisLine: {
            show: false
          }
        },{
          nameTextStyle:{
            color: '#FFFFFF'
          },
          name: '单位: %',
          type: "value",
          splitLine: {
            show: false,
            lineStyle: {
              color: "#05abc4"
            }
          },
           axisLabel: {
            formatter: "{value} %",
            textStyle: {
              color: "#fff" //坐标值得具体的颜色
            }
          },
          axisLine: {
            show: false
          }
        }],
        series: [
          {
            name: options.pastTitle,
            data: options.past,
            type: "bar",
            barGap: "0%",
            barWidth: 10,
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
          },
          {
            name: options.currentTitle,
            data: options.current,
            type: "bar",
            barGap: "0%",
            barWidth: 10,
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
                color: "#00ff84", //改变折线点的颜色
                lineStyle: {
                  color: "#00ff84", //改变折线颜色
                  width: "3"
                }
              }
            }
          },
          {
            name: options.yearOnYearTitle,
            data: options.yearOnYear,
            type: "line",
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#ffffff", //改变折线点的颜色
                lineStyle: {
                  color: "#ffffff", //改变折线颜色
                  width: "1"
                }
              }
            }
          }
        ]
      });
    }
  }
};
</script>
