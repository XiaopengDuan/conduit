<template>
  <div style="height:100%" v-loading="loading">
    <!--右上角按钮-->
    <a class="btn-back" @click="$router.go(-1)">
      <span>返回上一级</span>
    </a>
    <!--右上角按钮//-->
    <div class="list-ys-box list-yhmes-box chart-wrap-box">
      <div class="up-box">
        <div class="title">
          用户预缴费使用曲线
          <div class="chart-wrap-mes">
            <p>单位：元</p>
          </div>
        </div>
        <div class="chart-wrap">
          <div id="echarts2" style="width: 100%;height: 100%"></div>
          <!--          <img width="100%" height="100%" src="../../assets/img/chart02.png" />-->
        </div>
      </div>
      <div class="report-form" style="color: #FFFFFF">
        <div class="title">用户欠费来电次数统计</div>
        <div class="chart-wrap">
          <div id="echarts1" style="width: 100%;height: 100%"></div>
        </div>
      </div>
    </div>
    <!--右侧page-->
    <rightNav :menuIndex="6"></rightNav>
    <!--右侧page//-->
    <!--右侧切换按钮-->
    <router-link :to="{ name: 'detail_p6_2' }" class="btn-switch" name="切换"></router-link>
    <!--右侧切换按钮//-->
  </div>
</template>
<script>
let echarts = require("echarts");
import rightNav from "../../components/userCenter/rightNav";
import { getUserPrePayCurve, getUserArrearsCallCount } from "@/api/usercenter";
export default {
  components: {
    rightNav
  },
  data() {
    return {
      loading: false,
      myEChars: {},
      myEChars2: {},
      maxCount: 400
    };
  },
  mounted() {
    if (this.$route.params.userNo) {
      // 绘制Echars图
      this.drawUserPrePayCurveEchars(this.$route.params.userNo);
      this.drawUserArrearsCallCountEchars(this.$route.params.userNo);
    }
  },
  methods: {
    // 加载用户缴费曲线数据
    initUserPrePayCurveEchars(xData, data) {
      this.myEChars = echarts.init(document.getElementById("echarts2"));
      let option = {
        title: {},
        grid: {
          left: 80,
          top: 40,
          right: 40,
          bottom: 40
        },
       tooltip: {
          confine: true,},
        xAxis: {
          data: xData,
          boundaryGap: false, // 刻度留白策略
          axisLine: {
            show: false,
            color: "#ffff21"
          },
          axisLabel: {
            color: "#ffffff"
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          offset: 15,
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
        series: [
          {
            radius: "100%",
            name: "销量",
            type: "line",
            smooth: true,
            label: {
              show: true,
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
            data: data
          }
        ]
      };
      this.myEChars.setOption(option);
    },
    // 加载用户来电数据
    initUserArrearsCallCountEchars(data) {

      let total = 60; //最大温度数据单独出来定义，方便环形总数的修改
      let placeHolderStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      };
      this.myEChars2 = echarts.init(document.getElementById("echarts1"));
      let option = {
       tooltip: {
          confine: true,
          show: true,
          trigger: "item", //提示框触发类型，item数据项图形触发，主要应用于无类目轴的图表（散点图、饼形图等）
          formatter: function(params, ticket, callback) {
            //第一个参数数据集、第二个参数是异步回调标志、第三个参数是异步回调
            if (params.color === "#395667") {
              return params.seriesName + ": " + (total - params.value) + "通"; //系列名称：数据值
            } else {
              return params.seriesName + ": " + params.value + "通"; //系列名称：数据值
            }
          }
        },

        polar: {},
        //极坐标系的角度轴
        angleAxis: {
          boundaryGap: ["0%", "0%"],
          min: 0,
          max: 60,
          interval: 5,
          startAngle: 90,
          axisLine: {
            show: false
          },
          axisTick: {
            lineStyle: {
              color: "#2B4964"
            }
          },
          axisLabel: {
            margin: 5,
            color: "#ffffff"
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#2B4964"
            }
          }
        },
        ////极坐标系的径向轴
        radiusAxis: {
          min: 0,
          max: 10,
          interval: 0
        },
        color: ["#86F2FF", "#ECD834", "#FF6D00", "#0085FF", "#08923F"], //调色盘颜色列表，默认情况下图例和饼形环图颜色使用
        legend: {
          // data: ['咨询', '投诉', '报修', '报漏', '欠费'],//图例的数据数组
          data: data.reTypes, //图例的数据数组
          textStyle: {
            color: "#fff"
          },
          x: "right",
          selectedMode: true, //图例选择模式
          orient: "vertical"
        },
        series: [
          {
            name: data.reTypes[0],
            type: "pie",

            hoverAnimation: false, //鼠标移入变大
            radius: ["71%", "79%"],
            itemStyle: placeHolderStyle,
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: data.counts[0],
                itemStyle: {
                  normal: {
                    color: "#86F2FF"
                  }
                }
              },
              {
                value: total - data.counts[0],
                itemStyle: {
                  normal: {
                    color: "#395667"
                  }
                }
              }
            ]
          },
          {
            name: data.reTypes[1],
            type: "pie",

            hoverAnimation: false, //鼠标移入变大
            radius: ["59%", "66%"],
            itemStyle: placeHolderStyle,
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: data.counts[1],
                itemStyle: {
                  normal: {
                    color: "#ECD834"
                  }
                }
              },
              {
                value: total - data.counts[1],
                itemStyle: {
                  normal: {
                    color: "#395667"
                  }
                }
              }
            ]
          },
          {
            name: data.reTypes[2],
            type: "pie",

            hoverAnimation: false, //鼠标移入变大
            radius: ["46%", "54%"],
            itemStyle: placeHolderStyle,
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: data.counts[2],
                itemStyle: {
                  normal: {
                    color: "#FF6D00"
                  }
                }
              },
              {
                value: total - data.counts[2],
                itemStyle: {
                  normal: {
                    color: "#395667"
                  }
                }
              }
            ]
          },
          {
            name: data.reTypes[3],
            type: "pie",

            hoverAnimation: false, //鼠标移入变大
            radius: ["33%", "41%"],
            itemStyle: placeHolderStyle,
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: data.counts[3],
                itemStyle: {
                  normal: {
                    color: "#0085FF"
                  }
                }
              },
              {
                value: total - data.counts[3],
                itemStyle: {
                  normal: {
                    color: "#395667"
                  }
                }
              }
            ]
          },
          {
            name: data.reTypes[4],
            type: "pie",

            hoverAnimation: false, //鼠标移入变大
            radius: ["20%", "28%"],
            itemStyle: placeHolderStyle,
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: data.counts[4],
                itemStyle: {
                  normal: {
                    color: "#08923F"
                  }
                }
              },
              {
                value: total - data.counts[4],
                itemStyle: {
                  normal: {
                    color: "#395667"
                  }
                }
              }
            ]
          }
        ]
      };
      this.myEChars2.setOption(option);
    },
    // 绘制用户缴费图
    drawUserPrePayCurveEchars(userNo) {
      let nowDate = new Date(); // 获取当前事件

      // 获取当前事件12个月前的数据
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1;
      let startMonth =
        month == 12
          ? "" + (year - 1) + month
          : "" + (year - 1) + (12 - month > 9 ? 12 - month : "0" + 12 - month);
      var that = this;
      that.loading = true;
      getUserPrePayCurve({
        endMonth: "" + year + month,
        startMonth: startMonth,
        userNo: userNo
      })
        .then(r => {
          let xData = [year];
          let yData = [];
          if (r.data.months.length > 0) {
            xData = [];
            r.data.months.forEach(function(value, index) {
              if (value.length === 6 && value.endsWith("01")) {
                xData.push(value.substr(0, value.length - 2));
              } else {
                xData.push(
                  parseInt(value.substr(value.length - 2, value.length)) + "月"
                );
              }
            });
            yData = r.data.powers;
          }
          this.initUserPrePayCurveEchars(xData, yData);
          that.loading = false;
        })
        .catch(res => {
          that.loading = false;
        });
    },
    // 绘制用户来电数据
    drawUserArrearsCallCountEchars(userNo) {
      getUserArrearsCallCount({
        userNo: userNo
      }).then(r => {
        this.initUserArrearsCallCountEchars(r.data);
      });
    }
  }
};
</script>
