<template>
  <div class="content-box">
    <div class="pull-left data-left">
      <div class="data-wrap question-table">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <!--四个装饰角//-->
        <div class="title">水表采集数据变化曲线</div>
        <div class="chart-box" ref="echart0" style="height: 90%;width: 100%;"></div>
      </div>

      <div class="data-wrap water-consumption">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <!--四个装饰角//-->
        <div class="title">水表采集率以及丢失率</div>
        <div ref="echart2" class="chart-box" style="width: 100%;height: 90%"></div>
      </div>
    </div>
    <div class="pull-left data-middle">
      <div class="data-wrap map-box">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <!--四个装饰角//-->
        <div class="watermeter-box" style="padding-top:20px;position: relative;">
          <div class="searchPanel">
            <el-select
              class="el-modification search-comunity"
              v-model="userAddress"
              placeholder="==请选择=="
            >
              <el-option
                v-for="item in community"
                :key="item.communityCode"
                :label="item.communityName"
                :value="item.communityCode"
              ></el-option>
            </el-select>

            <el-date-picker
              v-model="searchDate"
              class="el-modification search-date"
              type="date"
              placeholder="选择日期"
              value-format="yyyyMMdd"
            ></el-date-picker>

            <div class="search-btn">
              <a class="btn-back" @click="loadData" href="javascript:void(0)">
                <span style="background-image:none">查询</span>
              </a>
            </div>
          </div>

          <div class="sbfx-bg">
            <img src="../../assets/img/sbfx_bg.png" />
            <div class="text1">
              <div class="name">水表采集率</div>
              <div class="data">{{dataRate.meter_collect_rate }}%</div>
            </div>
            <div class="text2">
              <div class="name">水表采集总量</div>
              <div class="data">{{dataCount.data_collect_size}}</div>
              <div class="meteor-box">
                <img class="light09" src="../../assets/img/light_02.png" />
                <img class="light08" src="../../assets/img/light01_08.png" />
                <img class="light07" src="../../assets/img/light01_07.png" />
                <img class="light06" src="../../assets/img/light01_06.png" />
                <img class="light05" src="../../assets/img/light01_05.png" />
                <img class="light04" src="../../assets/img/light01_04.png" />
                <img class="light03" src="../../assets/img/light01_03.png" />
                <img class="light02" src="../../assets/img/light01_02.png" />
                <img class="light01" src="../../assets/img/light01_01.png" />
              </div>
            </div>
            <div class="text3">
              <div class="meteor-box">
                <img class="light09" src="../../assets/img/light_02.png" />
                <img class="light08" src="../../assets/img/light01_08.png" />
                <img class="light07" src="../../assets/img/light01_07.png" />
                <img class="light06" src="../../assets/img/light01_06.png" />
                <img class="light05" src="../../assets/img/light01_05.png" />
                <img class="light04" src="../../assets/img/light01_04.png" />
                <img class="light03" src="../../assets/img/light01_03.png" />
                <img class="light02" src="../../assets/img/light01_02.png" />
                <img class="light01" src="../../assets/img/light01_01.png" />
              </div>
              <div class="name">采集异常水表量</div>
              <div class="data">{{dataCount.meter_abnormal_count }}</div>
            </div>
            <div class="text4">
              <div class="meteor-box">
                <img class="light09" src="../../assets/img/light_02.png" />
                <img class="light08" src="../../assets/img/light02_08.png" />
                <img class="light07" src="../../assets/img/light02_07.png" />
                <img class="light06" src="../../assets/img/light02_06.png" />
                <img class="light05" src="../../assets/img/light02_05.png" />
                <img class="light04" src="../../assets/img/light02_04.png" />
                <img class="light03" src="../../assets/img/light02_03.png" />
                <img class="light02" src="../../assets/img/light02_02.png" />
                <img class="light01" src="../../assets/img/light02_01.png" />
              </div>
              <div class="name">采集准确水表量</div>
              <div class="data">{{dataCount.meter_correct_count }}</div>
            </div>
            <div class="text5">
              <div class="meteor-box">
                <img class="light09" src="../../assets/img/light_02.png" />
                <img class="light08" src="../../assets/img/light02_08.png" />
                <img class="light07" src="../../assets/img/light02_07.png" />
                <img class="light06" src="../../assets/img/light02_06.png" />
                <img class="light05" src="../../assets/img/light02_05.png" />
                <img class="light04" src="../../assets/img/light02_04.png" />
                <img class="light03" src="../../assets/img/light02_03.png" />
                <img class="light02" src="../../assets/img/light02_02.png" />
                <img class="light01" src="../../assets/img/light02_01.png" />
              </div>
              <div class="name">丢失水表量</div>
              <div class="data">{{dataCount.meter_lose_count }}</div>
            </div>
            <!--动画-->
            <div class="flash-box flash01">
              <div class="flash"></div>
            </div>
            <div class="flash-box flash02">
              <div class="flash"></div>
            </div>
            <div class="flash-box flash03">
              <div class="flash"></div>
            </div>
            <div class="flash-box flash04">
              <div class="flash"></div>
            </div>
            <div class="flash-box flash05">
              <div class="flash"></div>
            </div>
            <!--动画//-->
          </div>
        </div>
      </div>

      <div class="data-wrap question-user">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <!--四个装饰角//-->
        <div class="chart-box" ref="echart1" style="height: 110%;width: 100%;"></div>
      </div>
    </div>
    <div class="pull-right data-left">
      <div class="data-wrap question-table">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <!--四个装饰角//-->
        <div class="title">水表采集数据占比</div>
        <div class="chart-box">
          <div ref="echars7" style="width: 100%;height: 3rem"></div>
        </div>
      </div>
      <div class="data-wrap water-consumption">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <!--四个装饰角//-->
        <div class="title">水表采集量以及丢失量</div>
        <div class="chart-box" ref="echart3" style="width: 100%;height: 90%"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.searchPanel {
  position: absolute;
  left: 50px;
  top: 10px;
}

.searchPanel >>> .search-comunity {
  position: absolute;
  width: 2rem;
  top: 0;
  left: 0.3rem;
}

.searchPanel >>> .search-date {
  position: absolute;
  top: 0;
  left: 2.5rem;
  width: 2.5rem;
}

.searchPanel >>> .search-btn {
  position: absolute;
  top: 0;
  left: 7rem;
  width: 2rem;
}

.searchPanel >>> .btn-back {
  top: 0;
  height: 0.48rem;
  width: 1.4rem;
}

.searchPanel >>> .btn-back span {
  padding-left: 0.5rem;
  line-height: 0.36rem;
}
</style>

<script>
import {
  getWaterMeterDataCount,
  getWaterMeterDataRate,
  getCountDataByTimeLine,
  getRateDataByTimeLine
} from "@/api/wma";
import { getCommunityAll } from "@/api/usercenter";
import moment from "moment";
import echarts from "echarts";

export default {
  data() {
    return {
      searchDate: "",
      userAddress: "",
      community: [],
      dataRate: {
        data_abnormal_rate: "",
        data_collect_rate: "",
        data_complete_rate: "",
        data_lost_rate: "",
        day: "",
        meter_abnormal_rate: "",
        meter_collect_rate: "",
        meter_lost_rate: ""
      },
      dataCount: {
        data_collect_size: "",
        data_correct_size: "",
        data_incomplete_size: "",
        data_lost_size: "",
        day: "",
        meter_abnormal_count: "",
        meter_access_count: "",
        meter_collect_count: "",
        meter_correct_count: "",
        meter_incomplete_count: "",
        meter_lose_count: ""
      },
      waterDataModelRateByTimeLine: {},
      waterDataModelCountByTimeLine: {}
    };
  },
  mounted() {
    var that = this;
    getCommunityAll()
      .then(res => {
        if (res.code === 200) {
          let data = res.data;
          data.unshift({ communityCode: "", communityName: "==请选择==" });
          this.community = data;
        }
      })
      .catch(err => {});

    this.loadData();
  },
  methods: {
    loadData() {
      let yesterday = moment()
        .add(-1, "day")
        .format("YYYYMMDD");
      let postData = {
        communityCode: this.userAddress,
        endTime: "",
        pageNum: "1",
        pageSize: "10",
        queryDate: this.searchDate ? this.searchDate : yesterday,
        rangDate: "false",
        startTime: ""
      };

      getWaterMeterDataRate(postData).then(res => {
        if (res.data.length > 0) {
          this.dataRate = res.data[0];
          this.echartBox7( this.dataRate);
        }
      });
      getWaterMeterDataCount(postData).then(res => {
        if (res.data.length > 0) {
          this.dataCount = res.data[0];
        }
      });

      let chooseDate = moment(
        this.searchDate ? this.searchDate : yesterday,
        "YYYYMMDD"
      );
      let end = chooseDate.format("YYYYMMDD");
      let begin = chooseDate.add(-30, "days").format("YYYYMMDD");
      let postData2 = {
        communityCode: this.userAddress,
        endTime: end,
        pageNum: "1",
        pageSize: "30",
        queryDate: "",
        rangDate: "true",
        startTime: begin
      };

      var p1 = getCountDataByTimeLine(postData2);
      var p2 = getRateDataByTimeLine(postData2);
      Promise.all([p1, p2])
        .then(result => {
          this.waterDataModelCountByTimeLine = result[0].data;
          this.waterDataModelRateByTimeLine = result[1].data;

          this.echartBox0(
            this.waterDataModelCountByTimeLine,
            this.waterDataModelRateByTimeLine
          );
          this.echartBox1(
            this.waterDataModelCountByTimeLine,
            this.waterDataModelRateByTimeLine
          );
          this.echartBox2(
            this.waterDataModelCountByTimeLine,
            this.waterDataModelRateByTimeLine
          );
          this.echartBox3(
            this.waterDataModelCountByTimeLine,
            this.waterDataModelRateByTimeLine
          );
        })
        .catch(error => {});
    },
    echartBox0(chartData, chartRateData) {
      let legend = ['水表采集率', '水表采集准确率', '异常水表率'];
      echarts.init(this.$refs.echart0).setOption({
        grid: {
          left: 40,
        },
       tooltip: {
          confine: true,
          trigger: "axis",
          formatter: function(data) {
            return `${data[0].name}<br/>${data[0].marker}${data[0].seriesName}:${data[0].value}%<br/>${data[1].marker}${data[1].seriesName}:${data[1].value}%<br/>${data[1].marker}${data[2].seriesName}:${data[2].value}%`;
          }
        },
        legend: {
          icon: "circle",
          type: "plain",
          data: legend,
          textStyle: {
            color: "#FFFFFF"
          }
        },
        xAxis: [
          {
            type: "category",
            offset: 10,
            boundaryGap: false,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#FFFFFF"
              }
            },
            axisTick: {
              show: false
            },
            data: chartRateData.day
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false,
              lineStyle: {
                color: "#FFFFFF"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: "#013966"
              }
            },
            axisLabel: {
              formatter: "{value}%"
            }
          }
        ],
        series: [
          {
            name: legend[0],
            symbol: "none",
            smooth: true,
            data: chartRateData.data_collect_rate,
            type: "line",
            itemStyle: {
              color: "#5e01ff",
              opacity: 0
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
                    color: "#5e01ff" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#012747" // 100% 处的颜色
                  }
                ]
              },
              opacity: 0.6
            }
          },
          {
            name: legend[1],
            symbol: "none",
            smooth: true,
            data: chartRateData.data_complete_rate,
            type: "line",
            itemStyle: {
              color: "#5fb9ff",
              opacity: 0
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
                    color: "#5fb9ff" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#012747" // 100% 处的颜色
                  }
                ]
              },
              opacity: 0.6
            }
          },
          {
            name: legend[2],
            symbol: "none",
            smooth: true,
            data: chartRateData.data_abnormal_rate,
            type: "line",
            itemStyle: {
              color: "#04faf5",
              opacity: 0
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
                    color: "#04faf5" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#012747" // 100% 处的颜色
                  }
                ]
              },
              opacity: 0.6
            }
          }
        ]
      });
    },
    echartBox1(chartData, chartRateData) {
      let legend = ["采集水表量", "数据准确的水表量", "数据异常的水表量"];
      echarts.init(this.$refs.echart1).setOption({
       tooltip: {
          confine: true,
          trigger: "axis",
          formatter: function(data) {
            // console.log('data--》',data)
            return `${data[0].name}<br/>${data[0].marker}${data[0].seriesName}:${data[0].value}<br/>${data[1].marker}${data[1].seriesName}:${data[1].value}<br/>${data[2].marker}${data[2].seriesName}:${data[2].value}`;
          }
        },
        legend: {
          icon: "circle",
          type: "plain",
          data: legend,
          textStyle: {
            color: "#FFFFFF"
          }
        },
        xAxis: [
          {
            type: "category",
            offset: 10,
            boundaryGap: false,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#FFFFFF"
              }
            },
            axisTick: {
              show: false
            },
            data: chartData.day
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false,
              lineStyle: {
                color: "#FFFFFF"
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: "#013966"
              }
            }
          }
        ],
        series: [
          {
            name: legend[0],
            symbol: "none",
            smooth: true,
            data: chartData.meter_collect_count,
            type: "line",
            itemStyle: {
              color: "#c5c22c",
              opacity: 0
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
                    color: "#c5c22c" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#012747" // 100% 处的颜色
                  }
                ]
              },
              opacity: 0.6
            }
          },
          {
            name: legend[1],
            symbol: "none",
            smooth: true,
            data: chartData.meter_correct_count,
            type: "line",
            itemStyle: {
              color: "#1cf357",
              opacity: 0
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
                    color: "#1cf357" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#012747" // 100% 处的颜色
                  }
                ]
              },
              opacity: 0.6
            }
          },
          {
            name: legend[2],
            symbol: "none",
            smooth: true,
            data: chartData.meter_abnormal_count,
            type: "line",
            itemStyle: {
              color: "#11fdd9",
              opacity: 0
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
                    color: "#11fdd9" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#012747" // 100% 处的颜色
                  }
                ]
              },
              opacity: 0.6
            }
          }
        ]
      });
    },
    findMaxByArray(arry) {
      let max = 0;
      arry.forEach((value, index) => {
        if (value > max) {
          max = value;
        }
      });
      return max;
    },
    echartBox2(chartData, chartRateData) {
      let res = {
        code: 200,
        msg: "请求成功",
        data: {
          barMap: {
            yAxis: chartRateData.data_collect_rate,
            xAxis: chartRateData.day
          }
        }
      };
      let pointArry = [];
      let max = this.findMaxByArray(res.data.barMap.yAxis);
      res.data.barMap.yAxis.forEach((value, index) => {
        if (value && value.toString() !== "0")
          pointArry.push({
            value: value,
            name: "",
            xAxis: res.data.barMap.xAxis[index],
            yAxis: parseInt(value)
          });
      });
      echarts.init(this.$refs.echart2).setOption({
        grid: {
          top: 10,
          bottom: 60,
          left: 40,
          right: 15
        },
        textStyle: {
          color: "#FFFFFF"
        },
        tooltip: {
          confine: true,
          trigger: "axis",
          formatter: function(data) {
            // console.log(data)
            return `${data[0].name}<br/>
            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#7623DC;"></span>
            ${data[0].seriesName}:${data[0].value}%<br/>${data[1].marker}${data[1].seriesName}:${data[1].value}%`;
          }
        },
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 0
          },
          data: res.data.barMap.xAxis
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              opacity: 0.1
            }
          },
          axisLabel: {
            formatter: "{value}%"
          }
        },
        series: [
          {
            data: res.data.barMap.yAxis,
            name: "采集率",
            type: "pictorialBar",
            symbol:
              "path://m221.75385,29.31375c-1.01492,-1.41248 37.55215,0 37.55215,-1.41248c0,-1.41248 13.194,347.47076 13.194,348.88325c0,1.41248 -69.01476,-1.41248 -67.99984,-1.41248c1.01492,0 18.26861,-344.6458 17.25369,-346.05828z",
            // type: 'bar',
            symbolClip: true,
            barWidth: 8,
            barMaxWidth: 8,
            markPoint: {
              symbol: "",
              symbolSize: 10,
              itemStyle: {
                color: "#7623DC"
              },
              label: {
                show: false
              },
              data: pointArry
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#7623DC" },
                  { offset: 0.7, color: "#22A3E8" },
                  { offset: 1, color: "rgba(0,0,0,0.1)" }
                ])
              }
            }
          },
          {
            name: "丢失率",
            symbol: "none",
            smooth: true,
            data: chartRateData.data_lost_rate,
            type: "line",
            itemStyle: {
              color: "#1cf357",
              opacity: 0
            }
          }
        ]
      });
    },
    echartBox3(chartData, chartRateData) {
      let res = {
        code: 200,
        msg: "请求成功",
        data: {
          barMap: {
            yAxis: chartData.meter_collect_count,
            xAxis: chartData.day
          }
        }
      };
      let pointArry = [];
      let max = this.findMaxByArray(res.data.barMap.yAxis);
      res.data.barMap.yAxis.forEach((value, index) => {
        if (value && value.toString() !== "0")
          pointArry.push({
            value: value,
            name: "",
            xAxis: res.data.barMap.xAxis[index],
            yAxis: parseInt(value)
          });
      });
      echarts.init(this.$refs.echart3).setOption({
        grid: {
          top: 10,
          bottom: 60,
          left: 50,
          right: 10
        },
        textStyle: {
          color: "#FFFFFF"
        },
       tooltip: {
          confine: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 0
          },
          data: res.data.barMap.xAxis
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              opacity: 0.1
            }
          }
        },
        series: [
          {
            name: "采集量",
            data: res.data.barMap.yAxis,
            type: "pictorialBar",
            symbol:
              "path://m221.75385,29.31375c-1.01492,-1.41248 37.55215,0 37.55215,-1.41248c0,-1.41248 13.194,347.47076 13.194,348.88325c0,1.41248 -69.01476,-1.41248 -67.99984,-1.41248c1.01492,0 18.26861,-344.6458 17.25369,-346.05828z",
            // type: 'bar',
            symbolClip: true,
            barWidth: 8,
            barMaxWidth: 8,
            markPoint: {
              symbol: "",
              symbolSize: 10,
              itemStyle: {
                color: "#0D8FDA"
              },
              label: {
                show: false
              },
              data: pointArry
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#0BAFD4" },
                { offset: 0.7, color: "#0AB68E" },
                { offset: 1, color: "rgba(0,0,0,0.1)" }
              ])
            }
          },
          {
            name: "丢失量",
            symbol: "none",
            smooth: true,
            data: chartData.meter_lose_count,
            type: "line",
            itemStyle: {
              color: "#1cf357",
              opacity: 0
            }
          }
        ]
      });
    },
    echartBox7(chartData) {
      let res = {
        code: 200,
        msg: "请求成功",
        data: {
          dataList: [
            { value: Number(chartData.data_complete_rate)  , name: "水表次采集准确率" },
            { value: Number(chartData.meter_lost_rate)  , name: "水表丢失率" },
            { value: Number(chartData.meter_abnormal_rate) , name: "水表错误率" },
            { value: Number(chartData.meter_collect_rate ), name: "水表采集率" }
          ]
        }
      };
      let sum = 0;
      for (var i = 0; i < res.data.dataList.length; i++) {
        sum += res.data.dataList[i].value;
      }
      res.data.dataList.push({
        value: sum,
        name: "__other",
        itemStyle: { normal: { color: "rgba(0,0,0,0)" } }
      });
      echarts.init(this.$refs.echars7).setOption({
        color: [new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: "#0058FF"
              }, {
                  offset: 1,
                  color: '#0ce4da'
              }]),new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#f8d247'
              }, {
                  offset: 1,
                  color: "#9901FF"
              }]),new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#0ce4da'
              }, {
                  offset: 1,
                  color: "#00D0B0"
              }]),new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#0ce4da'
              }, {
                  offset: 1,
                  color: "#0058FF"
              }])],
        tooltip: {
          confine: true,
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%"
        },
        legend: {
            top: 10,
            left: 10,
            textStyle : {color:'#fff'},
            data: ['水表次采集准确率','水表丢失率','水表错误率','水表采集率']
        },
        polar: {
          center: ["50%", "100%"],
          radius: '100%',
        },
        angleAxis: {
            interval: 1,
            type: 'category',
            data: [],
            z: 10,
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#0B4A6B",
                    width: 1,
                    type: "solid"
                },
            },
            axisLabel: {
                interval: 0,
                show: true,
                color: "#0B4A6B",
                margin: 8,
                fontSize: 16
            },
        },
        radiusAxis: {
            min: 50,
            max: 210,
            // interval: 20,
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#0B3E5E",
                    width: 1,
                    type: "solid"
                },
            },
            axisLabel: {
                formatter: '{value} %',
                show: false,
                padding: [0, 0, 20, 0],
                color: "#0B3E5E",
                fontSize: 16
            },
            splitLine: {
                lineStyle: {
                    color: "#0B3E5E",
                    width: 2,
                    type: "solid"
                }
            }
        },
        calculable: true,
        series: [
          {
            name: "水表采集数据占比",
            type: "pie",
            startAngle: 180,
            radius: '100%',
            center: ["50%", "100%"],
            roseType : 'radius',
            label:{
                color: '#FFFFFF',
                formatter: function(datas){
                  // console.log('xxoo', datas)
                  return datas.name==='__other'?'':datas.name
                }
            },
            labelLine: {
              normal: {
                length: 1,
                length2: 2,
              }
            },
            data: res.data.dataList,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            // coordinateSystem: 'polar'
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
</style>
