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
          <div id="container1" class="echarts-box" style="width:100%;height:5rem;"></div>
        </div>
        <!--右侧page-->
        <rightNav :menuIndex="1"></rightNav>
        <!--右侧page//-->
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import rightNav from "../../components/userCenter/reportRightNav";
import {
  getUserWaterRangeAndAverageCurvePage1,
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
    loadChartData: function() {
      var that = this;
      let postData = {
        month: `${this.chooseYear}${this.chooseMonth}`,
        userNo: this.$route.params.userNo
      };

      getUserWaterRangeAndAverageCurvePage1(postData).then(function(data) {
        let container1 = document.getElementById("container1");
        let maxData = [];
        let avgsData = [];
        for (var i = 0; i < data.data.maxs.length; i++) {
          let max = parseInt(data.data.maxs[i]);
          let min = parseInt(data.data.mins[i]);
          maxData.push(max-min);
         // maxData.push(10);
         avgsData.push(parseInt(data.data.avgs[i]));
        }
        let options = {
          months: data.data.days,
          maxs: data.data.maxs,
          mins: data.data.mins,
          avgs: data.data.avgs //data.data.avgs
        };
        that.drawWaterLine(container1, options);
      });
    },
    drawWaterLine(container, options) {
     /* echarts.init(container).setOption({
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },

        toolbox: {
          feature: {
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: options.months,
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
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: "#05abc4"
              }
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#fff" //坐标值得具体的颜色
              }
            },
            axisLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "最小值",
            type: "line",
            stack: "总量",
            symbol: "none",
            // data: options.mins,
            data: [4,7,9,12,14,18],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#125273"
                }
              }
            }
          },
          {
            name: "差值",
            type: "line",
            stack: "总量",
            symbol: "none",
            areaStyle: {
              color: "#125273"
            },
            // data: options.maxs
            data: [8,11,13,16,18,22]
          },
          {
            type: "line",
            name: "平均值",
            symbolSize: 8, //拐点大小
            // data: options.avgs,
            data: [6,9,11,14,16,20],
            itemStyle: {
              normal: {
                color:'#1AEDF8',
                lineStyle: {
                  color: "#1AEDF8"
                }
              }
            }
          }
        ]
      });*/
      echarts.init(container).setOption({
        textStyle:{
          color: '#FFFFFF'
        },
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            boundaryGap : false,
            data : options.months
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series: [
          {
            name: "最小值",
            type: "line",
            stack: "总量",
            symbol: "none",
            data: options.mins,
            // data: [4,7,9,12,14,18],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#125273"
                }
              }
            }
          },
          {
            type: "line",
            name: "平均值",
            stack: "总量",
            symbolSize: 8, //拐点大小
            data: options.avgs,
            // data: [6,9,11,14,16,20],
            areaStyle: {
              color: "#125273"
            },
            itemStyle: {
              normal: {
                color:'#1AEDF8',
                lineStyle: {
                  color: "#1AEDF8"
                }
              }
            }
          },
          {
            name: "差值",
            type: "line",
            stack: "总量",
            symbol: "none",
            areaStyle: {
              color: "#125273"
            },
            data: options.maxs
            // data: [8,11,13,16,18,22]
          }
        ]
      })
    }
  }
};
</script>
