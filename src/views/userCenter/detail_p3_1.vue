<template>
  <div style="height:100%" v-loading="loading">
    <!--右上角按钮-->
    <a class="btn-back" @click="$router.go(-1)">
      <span>返回上一级</span>
    </a>
    <!--右上角按钮//-->
    <div class="list-ys-box">
      <div class="title">同小区居民用水量级别 <span style="font-size: .18rem;font-weight: 400;color: #fff;">（单位：吨）</span></div>
      <div class="list-ys" id="leftChart" v-loading="loadingLeft"></div>
    </div>
    <div class="list-ys-box">
      <div class="title">同小区居民水费级别 <span style="font-size: .18rem;font-weight: 400;color: #fff;">（单位：元）</span></div>
      <div class="list-ys" id="rightChart" v-loading="loadingRight"></div>
    </div>
    <!--右侧page-->
    <rightNav :menuIndex="3"></rightNav>
    <!--右侧page//-->
    <!--右侧切换按钮-->
    <router-link :to="{name:'detail_p3_2',params:$route.params}" class="btn-switch" name="切换"></router-link>
    <!--右侧切换按钮//-->
  </div>
</template>
<style scoped>
  .list-ys-box {
    padding-right: 0;
    width: 6.98rem;
  }
</style>

<script>
  import rightNav from "../../components/userCenter/rightNav";
  import {
    getWaterProportionBar,
    getMoneyProportionBar,
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
        loadingLeft: false,
        loadingRight: false,
        leftYData: [],
        leftYBGData: [],
        leftXData: [],
        leftIndex: "", //我所在的矩形条
        myWater: 0, //我的水费

        rightYData: [],
        rightYBGData: [], //背景条
        rightXData: [],
        rightIndex: "", //我所在的矩形条
        rightIndexX: "", //我所在的矩形条
        myPay: 0, //我的水费

        comCode: "",
        waterTypeCode: "",
        payTypeCode: ""
      };
    },
    mounted() {
      this.loadUserData();
    },
    methods: {
      loadUserData: function () {
        let userNo = this.$route.params.userNo;
        let postData = {userNo: userNo};
        var that = this;
        that.loading = true;
        getUserAllInfo(postData)
          .then(response => {
            if (response.code == 200) {
              that.comCode = response.data.communityCode;
              that.waterTypeCode = response.data.elecTypeCode;
              that.payTypeCode = response.data.elecTypeCode;
              that.myWater = response.data.totalPower;
              that.myPay = response.data.totalMoney;
              that.loadChartData();
            }
            that.loading = false;
          })
          .catch(res => {
            that.loading = false;
          });
      },
      loadChartData: function () {
        var that = this;
        let postData = {
          userNo: this.$route.params.userNo,
          comCode: this.comCode,
          elecTypeCode: this.waterTypeCode
        };
        that.loadingLeft = true;
        getWaterProportionBar(postData).then(function (response) {
          if (response.code == 200) {
            that.leftYData.length = 0;
            that.leftYBGData.length = 0;
            that.leftXData.length = 0;

            that.leftYData = response.data.subsection;
            response.data.perCent.forEach(data => {
              that.leftXData.push(data.replace("%", ""));
            });
            let sub = response.data.sub;
            that.leftIndex = 0;
            for (var i = 0; i < that.leftYData.length; i++) {
              let data = that.leftYData[i];
              if (sub === data) {
                that.leftIndex = i;
                break;
              }
              that.leftYBGData.push(100);
            }
            that.drawLeftChart();
          }
          that.loadingLeft = false;
        });

        let payPostData = {
          userNo: this.$route.params.userNo,
          comCode: this.comCode,
          elecTypeCode: this.payTypeCode
        };
        that.loadingRight = true;
        getMoneyProportionBar(payPostData).then(function (response) {
          if (response.code == 200) {
            that.rightYData.length = 0;
            that.rightYBGData.length = 0;
            that.rightXData.length = 0;
            let sub = response.data.sub;
            that.rightYData = response.data.subsection;
            response.data.perCent.forEach(data => {
              that.rightXData.push(data.replace("%", ""));
            });
            that.rightIndex = 0;
            for (var i = 0; i < that.rightYData.length; i++) {
              let data = that.rightYData[i];
              if (sub === data) {
                that.rightIndex = i;
                break;
              }
              that.rightYBGData.push(100);
            }
            that.drawRightChart();
          }
          that.loadingRight = false;
        });
      },
      drawLeftChart: function () {
        var that = this;
        let myChart = echarts.init(document.getElementById("leftChart"));
        let option = {
         backgroundColor: "",
         tooltip: {
          confine: true,
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            formatter: function (values, index) {
              let str = `${values[0].name}</br>`
              values.forEach((value, index) => { 
                  str += value.seriesName === '百分比' ? `${value.seriesName}: ${value.value}%</br>` : ''
              });
              return str
            }
          },
          //设置显示间隔
          grid: {
            y: 0,
            x: 60,
            x2: 85,
            y2: 20
          },
          xAxis: {
            show: false
          },
          //Y轴 
          yAxis: [
            //左边的Y轴
            {
              type: "category",
              offset: 5,
              inverse: false,
              position: "left",
              data: this.leftYData,
              splitLine: {show: false},
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#fff",
                  type: "dashed"
                }
              },
              axisTick: {
                show: true,
                length: 10,
                inside: false,
                lineStyle: {
                  width: 2
                }
                // alignWithLabel: true 
              },
              axisLabel: {
                show: true,
                margin: 0
              }
            },
            //右边的Y轴 
            {
              type: "category",
              zlevel: 999,
              position: "right",
              offset: 30,
              data: this.leftXData,
              splitLine: {show: false},
              axisLine: {
                show: false
              },
              //间隔线
              axisTick: {
                show: false
              },
              //坐标轴刻度标签
              axisLabel: {
                formatter: function (value, index) {
                  var marker = "emptyIcon";
                  if (index == that.leftIndex) marker = "markerIcon";
                  return "{value|" + value + "%} {" + marker + "| } ";
                },
                margin: -25,
                textStyle: {
                  color: function (value, index) {//TODO 百分比颜色
                    if (index == that.leftIndex) {
                      return "#00FFFE";
                    } else {
                      return "#00B3FF";
                    }
                  }
                },
                rich: {
                  value: {
                    fontSize: 14,
                    fontWeight: "bold",
                    fontFamily: "Courier New",
                    lineHeight: 20,
                    align: "left"
                  },
                  markerIcon: {
                    height: 26,
                    align: "right",
                    backgroundColor: {
                      image: userMarker
                    }
                  },
                  emptyIcon: {}
                }
              }
            }
          ],
          series: [
            {
              name: "背景轴",
              type: "bar",
              barGap: "-100%",
              barMaxWidth: 20,
              data: this.leftYBGData,
              itemStyle: {
                normal: {
                  color: "#0C1F45"
                }
              }
            },
            {
              name: "百分比",
              type: "bar",
              barMaxWidth: 20,
              data: this.leftXData,
              itemStyle: {
                normal: {
                  //设置矩形弧度
                  barBorderRadius: [10, 10, 10, 10],
                  color: function (params) {
                    if (params.dataIndex == that.leftIndex) {
                      return "#00FF8D";//线的颜色
                    } else {
                      return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        {offset: 0, color: "#00FFFE"},
                        {offset: 0.5, color: "#00B3FF"},
                        {offset: 1, color: "#0077FF"}
                      ]);
                    }
                  }
                }
              }
            }
          ]
        };
        myChart.setOption(option);
      },
      drawRightChart: function () {
        var that = this;
        let myChart = echarts.init(document.getElementById("rightChart"));
        let option = {
          backgroundColor: "",
         tooltip: {
          confine: true,
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            formatter: function (values, index) {
              let str = `${values[0].name}</br>`
              values.forEach((value, index) => { 
                  str += value.seriesName === '百分比' ? `${value.seriesName}: ${value.value}%</br>` : ''
              });
              return str
            }
          },
          //设置显示间隔
          grid: {
            y: 0,
            x: 60,
            x2: 85,
            y2: 20
          },
          xAxis: {
            show: false
          },
          //Y轴
          yAxis: [
            //左边的Y轴
            {
              type: "category",
              offset: 5,
              inverse: false,
              position: "left",
              data: this.rightYData,
              splitLine: {show: false},
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#fff",
                  type: "dashed"
                }
              },
              axisTick: {
                show: true,
                length: 10,
                inside: false,
                lineStyle: {
                  width: 2
                }
                // alignWithLabel: true
              },
              axisLabel: {
                show: true,
                margin: 0
              }
            },
            //右边的Y轴
            {
              type: "category",
              zlevel: 999,
              position: "right",
              offset: 30,
              data: this.rightXData,
              splitLine: {show: false},
              axisLine: {
                show: false
              },
              //间隔线
              axisTick: {
                show: false
              },
              //坐标轴刻度标签
              axisLabel: {
                formatter: function (value, index) {
                  var marker = "emptyIcon";
                  if (index == that.rightIndex) marker = "markerIcon";
                  return "{value|" + value + "%} {" + marker + "| } ";
                },
                margin: -25,
                textStyle: {
                  color: function (value, index) {
                    if (index == that.rightIndex) {
                      return "#00FFFE";
                    } else {
                      return "#00B3FF";
                    }
                  }
                },
                rich: {
                  value: {
                    fontSize: 14,
                    fontWeight: "bold",
                    fontFamily: "Courier New",
                    lineHeight: 20,
                    align: "left"
                  },
                  markerIcon: {
                    height: 26,
                    align: "right",
                    backgroundColor: {
                      image: userMarker
                    }
                  },
                  emptyIcon: {}
                }
              }
            }
          ],
          series: [
            {
              name: "背景轴",
              type: "bar",
              barGap: "-100%",
              barMaxWidth: 20,
              data: this.rightYBGData,
              itemStyle: {
                normal: {
                  color: "#0C1F45"
                }
              }
            },
            {
              name: "百分比",
              type: "bar",
              barMaxWidth: 20,
              data: this.rightXData,
              itemStyle: {
                normal: {
                  //设置矩形弧度
                  barBorderRadius: [10, 10, 10, 10],
                  color: function (params) {
                    if (params.dataIndex == that.rightIndex) {
                      return "#00FF8D";
                    } else {
                      return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        {offset: 0, color: "#00FFFE"},
                        {offset: 0.5, color: "#00B3FF"},
                        {offset: 1, color: "#0077FF"}
                      ]);
                    }
                  }
                }
              }
            }
          ]
        };
        myChart.setOption(option);
      }
    }
  };
</script>
