<template>
  <div class="content-box">
    <div id="container3d" style="width:100%;height:calc(100% + 1rem);position:absolute;top:0;z-index:99;"
      v-if="$route.path=='/charge/arrear/Index'||$route.path=='/charge/water/Index'||$route.path=='/charge/call/Index'||$route.path=='/charge/income/Index'"
      ></div>
    <div style="position: relative;height: auto;overflow: hidden;">
      <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft" :duration="800">
        <div v-show="!zoomed" class="pull-left data-left" style="z-index:101;position: relative">
          <div class="data-wrap question-table">
            <!--四个装饰角-->
            <div class="top-horn-l"></div>
            <div class="top-horn-r"></div>
            <div class="bottom-horn-l"></div>
            <div class="bottom-horn-r"></div>
            <!--四个装饰角//-->
            <div class="title">
              用水性质欠费人数
              <div id="app2" class="input-group-btn">
                <select
                  class="form-control search-select"
                  v-model="communityCode"
                  @change="findElecTypeArrearCount()"
                >
                  <option
                    v-for="(item, index) in communityList"
                    :key="index"
                    :value="item.communityCode"
                  >{{item.communityName}}</option>
                </select>
              </div>
              <!-- /btn-group -->
            </div>
            <!-- <div class="scroll-box"> -->
            <div ref="ElecsTypeArrearCount" style="width: 100%;height: calc(100% - .62rem)"></div>
          </div>

          <div class="data-wrap water-consumption">
            <!--四个装饰角-->
            <div class="top-horn-l"></div>
            <div class="top-horn-r"></div>
            <div class="bottom-horn-l"></div>
            <div class="bottom-horn-r"></div>
            <!--四个装饰角//-->
            <div class="title">
              各水价类型用水量
              <div class="input-group-btn">
                <select
                  class="form-control search-select"
                  v-model="communityCode2"
                  @change="findContentPriceAllTotalPower()"
                >
                  <option
                    v-for="(item, index) in communityList"
                    :key="index"
                    :value="item.communityCode"
                  >{{item.communityName}}</option>
                </select>
              </div>
              <!-- /btn-group -->
            </div>
            <div style="height: calc(100% - .62rem);width: 100%;" ref="ContentPriceAllTotalPower"></div>
          </div>
        </div>
      </transition>
      <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown" :duration="800">
        <div v-show="!zoomed" class="pull-left data-middle" style="position: absolute; left: 25%;bottom: 0rem;z-index:100">
          <div class="data-wrap question-user" style="overflow: hidden;">
            <!--四个装饰角-->
            <div class="top-horn-l"></div>
            <div class="top-horn-r"></div>
            <div class="bottom-horn-l"></div>
            <div class="bottom-horn-r"></div>
            <!--四个装饰角//-->
            <div class="title">
              小区用户欠费人数变化
              <div class="input-group-btn">
                <button type="button" class="btn choose-time">
                  盛景豪亭
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" style="display: none;">
                  <li>
                    <a>一区</a>
                  </li>
                  <li>
                    <a>二区</a>
                  </li>
                  <li>
                    <a>三区</a>
                  </li>
                  <li>
                    <a>四区</a>
                  </li>
                </ul>
              </div>
              <!-- /btn-group -->
            </div>
            <!-- <div class="chart-box"> -->
              <div ref="CommunityArrearCountChangeCurve" style="height: calc(100% - .62rem);width: 100%"></div>
            <!-- </div> -->
          </div>
        </div>
      </transition>
      <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight" :duration="800">
        <div
          v-show="!zoomed"
          class="pull-right data-left"
          style="z-index:100;position: relative"
          >
          <div class="data-wrap question-phone" style="border:none;background:none;">
            <!--四个装饰角-->
            <div class="top-horn-l"></div>
            <div class="top-horn-r"></div>
            <div class="bottom-horn-l"></div>
            <div class="bottom-horn-r"></div>
            <!--四个装饰角//-->
            <div class="title">
              小区欠费人数排行
            </div>
            <!-- <div class="chart-box"> -->
              <div ref="ArrearCommunityCount" style="width: 100%;height: calc(100% - .62rem)"></div>
            <!-- </div> -->
          </div>

          <div class="data-wrap question-proportion">
            <!--四个装饰角-->
            <div class="top-horn-l"></div>
            <div class="top-horn-r"></div>
            <div class="bottom-horn-l"></div>
            <div class="bottom-horn-r"></div>
            <!--四个装饰角//-->
            <div class="title">
              小区用水欠费人数
              <div class="input-group-btn"></div>
              <!-- /btn-group -->
            </div>
            <!-- <div class="chart-box"> -->
              <div ref="rCountComByMonth" style="height: calc(100% - .62rem);width: 100%"></div>
            <!-- </div> -->
          </div>

          <div class="data-wrap question-handle">
            <!--四个装饰角-->
            <div class="top-horn-l"></div>
            <div class="top-horn-r"></div>
            <div class="bottom-horn-l"></div>
            <div class="bottom-horn-r"></div>
            <!--四个装饰角//-->

            <div class="title">
              连续欠费人数
              <div class="input-group-btn">
                <el-date-picker
                  class="index-el"
                  @change="findContinuousUserCountFunnel"
                  size="mini"
                  v-model="ContinuousUserCountFunnelDate"
                  value-format="yyyyMM"
                  :clearable="false"
                  type="month"
                  placeholder="选择月"
                ></el-date-picker>
              </div>
              <!-- /btn-group -->
            </div>
            <!-- <div class="chart-box"> -->
              <div ref="ContinuousUserCountFunnel" style="height: calc(100% - .62rem);width: 100%"></div>
            <!-- </div> -->
          </div>
        </div>
      </transition>
    </div>
    
   
    <area3dMap :mapType="1"></area3dMap>
    <a :class="{'btn-zoomOut':!zoomed,'btn-zoomIn':zoomed}" @click="zoomPanel" style="z-index: 300;"></a>
  </div>
</template>
<script>
import animate from "animate.css";
import area3dMap from "../../../components/charge/area3dMap";
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入折线图
require("echarts/lib/chart/line");
require("echarts/lib/chart/radar");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/funnel");
require("echarts/lib/component/timeline");
require("echarts/lib/component/title");
require("echarts/lib/component/graphic");
require("echarts/lib/component/legend");
require("echarts/lib/component/tooltip");
import moment from "moment";
import {
  getCommunitySelectInfo,
  getElecTypeArrearCount,
  getContentPriceAllTotalPower,
  getArrearCommunityCountList,
  getUserCountComByMonth,
  getContinuousUserCountFunnel,
  getCommunityArrearCountChangeCurve
} from "@/api/charge";

export default {
  components: {
    area3dMap
  },
  mounted() {
    this.ContinuousUserCountFunnelDate = moment().month(moment().month() - 6).format("YYYYMM")
    this.findCommunitySelectInfo();
    this.findElecTypeArrearCount(); //用水性质欠费人数数据获取
    this.findContentPriceAllTotalPower(); //各水价类型用水量数据获取
    this.findArrearCommunityCountList(); // 小区欠费人数排行
    this.findUserCountComByMonth(); // 小区欠费人数
    this.findContinuousUserCountFunnel(); // 连续欠费人数漏斗图
    this.findCommunityArrearCountChangeCurve(); // 小区用户欠费人数变化
    // this.getMapStatus();
  },
  data() {
    return {
      sliderVal: [0, 100],
      polygonEm: require("../../../assets/img/polygon_em.png"),
      polygonTitle: require("../../../assets/img/polygon_title.png"),
      map: null, //地图对象
      polygonInfoWindow: null,
      communityList: [], // 小区LIST
      communityCode: "", // 用水性质欠费人数小区下拉框CODE
      communityCode2: "", // 各水价类型用水量小区下拉框CODE
      communityCode3: "", // 小区欠费人数小区下拉框CODE
      communityCode4: "00030", // 小区用户欠费人数变化小区下拉框CODE
      ContinuousUserCountFunnelDate: "201901", // 连续欠费人数漏斗图时间
      zoomed: this.$store.state.app.leftMeunShowFlag
    };
  },
  computed: {
    alarmLevel: function() {
      if (this.sliderVal[0] == 0 && this.sliderVal[1] == 100) return "";
      let span = 100 / 6;
      let retArr = [];
      for (var i = 0; i < 6; i++) {
        if (
          this.sliderVal[0] <= i * span &&
          this.sliderVal[1] >= (i + 1) * span
        ) {
          retArr.push(i + 1);
        }
      }
      if (this.sliderVal[0] <= span && this.sliderVal[1] <= span) {
        return "1";
      }
      if (this.sliderVal[0] >= span * 6 && this.sliderVal[1] >= span * 6) {
        return "6";
      }
      return retArr.join(",");
    }
  },
  beforeDestroy() {
    this.destroyEcharts();
  },
  watch: {},
  methods: {
    zoomPanel: function() {
      this.$store.commit('app/SET_LEFTMEUNSHOWFLAG', !this.zoomed)
      this.zoomed = !this.zoomed;
    },
    findCommunityArrearCountChangeCurve() {
      getCommunityArrearCountChangeCurve({
        communityCode: this.communityCode4
      }).then(r => {
        this.myEChars = echarts.init(
          this.$refs.CommunityArrearCountChangeCurve
        );
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
            data: r.data.months,
            // data: [
            //   "201808",
            //   "201809",
            //   "201810",
            //   "201811",
            //   "201812",
            //   "201901",
            //   "201902",
            //   "201903",
            //   "201904",
            //   "201905",
            //   "201906",
            //   "201907"
            // ],
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
                return value === 0 ? value : value;
              }
            },
            axisLine: {
              show: false
            }
          },
          series: [
            {
              radius: "100%",
              type: "line",
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
              data: r.data.arrearCommunityCountModels[0].values
            }
          ]
        };
        this.myEChars.setOption(option);
      });
    },
    findCommunitySelectInfo() {
      getCommunitySelectInfo().then(response => {
        let data = response.data;
        data.unshift({ communityCode: "", communityName: "==请选择==" });
        this.communityList = data;
      });
    },
    findElecTypeArrearCount() {
      getElecTypeArrearCount({ communityCode: this.communityCode }).then(r => {
        let el = echarts.init(this.$refs.ElecsTypeArrearCount);
        let indicators = [];
        r.data.elecTypeNames.forEach(x => {
          indicators.push({ text: x });
        });
        let option = {
          radar: [
            {
              indicator: indicators,
              center: ["50%", "50%"],
              radius: 80,
              startAngle: 90,
              splitNumber: 4,
              shape: "circle",
              name: {
                textStyle: {
                  color: "#d9d9d9"
                }
              },
              splitArea: {
                areaStyle: {
                  color: ["rgba(114, 172, 209, 0.2)"],
                  shadowColor: "rgba(0, 0, 0, 0.3)",
                  shadowBlur: 10
                }
              }
            }
          ],
         tooltip: {
          confine: true,},
          series: [
            {
              name: '用水性质欠费人数',
              type: "radar",
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 0
                  }
                },
                emphasis: {
                  lineStyle: {
                    color: "skyblue",
                    width: 4
                  }
                }
              },
              data: [
                {
                  value: r.data.counts,
                  areaStyle: {
                    normal: {
                      color: "rgba(255, 255, 255, 0.5)"
                    }
                  }
                }
              ]
            }
          ]
        };
        el.setOption(option);
      });
    },
    findContentPriceAllTotalPower() {
      getContentPriceAllTotalPower({ communityCode: this.communityCode2 }).then(
        r => {
          let el = echarts.init(this.$refs.ContentPriceAllTotalPower);
          let indicators = [];
          r.data.contentPriceNames.forEach(x => {
            indicators.push({ text: x });
          });
          let option = {
            radar: [
              {
                indicator: indicators,
                center: ["50%", "50%"],
                radius: 80,
                startAngle: 90,
                splitNumber: 4,
                shape: "circle",
                name: {
                  textStyle: {
                    color: "#d9d9d9"
                  }
                },
                splitArea: {
                  areaStyle: {
                    color: ["rgba(114, 172, 209, 0.2)"],
                    shadowColor: "rgba(0, 0, 0, 0.3)",
                    shadowBlur: 10
                  }
                }
              }
            ],
           tooltip: {
          confine: true,},
            series: [
              {
                name: '各水价类型用水量',
                type: "radar",
                itemStyle: {
                  normal: {
                    lineStyle: {
                      width: 0
                    }
                  },
                  emphasis: {
                    lineStyle: {
                      color: "skyblue",
                      width: 4
                    }
                  }
                },
                data: [
                  {
                    value: r.data.moneys,
                    areaStyle: {
                      normal: {
                        color: "rgba(255, 255, 255, 0.5)"
                      }
                    }
                  }
                ]
              }
            ]
          };
          el.setOption(option);
        }
      );
    },
    findArrearCommunityCountList() {
      let searchItem = {
        areaId: "",
        communityName: this.communityCode3,
        flag: "0"
      };
      getArrearCommunityCountList(searchItem).then(r => {
        
        let resData = r.data;
        let el = echarts.init(this.$refs.ArrearCommunityCount);
        let optionData = {};
        optionData.month = [];
        optionData.datas = [];
        optionData.communityNames = [];
        //
        resData.forEach((value, index) => {
          optionData.month.push(
            value.month.substring(0, value.month.length - 2) +
              "-" +
              value.month.substring(value.month.length - 2, value.month.length)
          );
          let total = 0;
          let d = { series: [{ data: [] }, { data: [] }] }; // 定义数据
          let communityName = []; // 定义小区名称
          value.values.forEach((v, i) => {
            total += parseInt(v.count) + 1;
            d.series[1].data.push(v.count);
            communityName.push(v.communityName);
          });

          d.series[0].data = [total, total, total, total, total];
          d.series[1].data = d.series[1].data.reverse(); // 数组顺序反向
          optionData.datas.push(d);
          optionData.communityNames.push(communityName.reverse());
        });
        // console.log("optionData", optionData);
        let options = {
          baseOption: {
            timeline: {
              orient: "horizontal",
              autoPlay: true,
              left: 20,
              right: 20,
              bottom: 25,
              data: optionData.month,
              lineStyle: {
                color: "#00F4FF"
              },
              label: {
                position: "top",
                show: true,
                color: "#00F4FF",
                formatter: function(value) {
                  return "";
                }
              },
              itemStyle: {
                color: "#00F4FF"
              },
              checkpointStyle: {
                color: "#FFFF21"
              },
              controlStyle: {
                color: "#00F4FF",
                itemSize: 20,
                borderColor: "#00F4FF"
              },
              emphasis: {
                label: { show: true, color: "#FFFFFF" },
                itemStyle: { color: "#FFFFFF" },
                controlStyle: { color: "#FFFFFF" },
                checkpointStyle: { color: "#FFFFFF" }
              }
            },
            grid: {
              left: "0",
              right: "0",
              bottom: 45,
              top: 0,
              containLabel: true
            },
            xAxis: {
              type: "value",
              show: false
            },
            yAxis: {
              type: "category",
              data: optionData.communityNames[0],
              axisLine: { show: false },
              axisTick: { show: false }
            },
            textStyle: {
              color: "#61CBFF"
            },
            series: [
              {
                hoverAnimation: false,
                legendHoverLink: false,
                barWidth: 10,
                type: "bar",
                itemStyle: {
                  normal: {
                    barBorderRadius: 0,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#2d3d69"
                      },
                      {
                        offset: 1,
                        color: "#2b3c67"
                      }
                    ]),
                    areaStyle: { type: "default" }
                  }
                },
                barGap: "-100%",
                barCategoryGap: "40%",
                animation: false,
                emphasis: {
                  itemStyle: {
                    opacity: 0
                  }
                }
                // barGap:'20%'
              },
              {
                type: "bar",
                barWidth: 10,
                itemStyle: {
                  normal: {
                    barBorderRadius: 0,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: "#0085F6"
                      },
                      {
                        offset: 1,
                        color: "#68CDFF"
                      }
                    ]),
                    areaStyle: { type: "default" },
                    label: {
                      show: true,
                      formatter: function(params) {
                        return params.data;
                      },
                      textStyle: {
                        color: "#ffffff"
                      }
                    }
                  }
                }
              }
            ]
          },
          options: optionData.datas
        };
        el.setOption(options);
        el.on("timelinechanged", function(obj) {
          options.baseOption.timeline.label.formatter = function(value, index) {
            if (index === obj.currentIndex) {
              let d = new Date(value);
              let m = d.getMonth() + 1;
              return (
                d.getFullYear().toString() +
                (m < 10 ? "0" + m.toString() : m.toString())
              );
            } else {
              return "";
            }
          };
          options.baseOption.yAxis.data =
            optionData.communityNames[obj.currentIndex];
          el.setOption(options);
        });
      });
    },
    findUserCountComByMonth() {
      getUserCountComByMonth().then(r => {
        let el = echarts.init(this.$refs.rCountComByMonth);
        let option = {
          grid: {
            top: 20,
            bottom: 70,
            left: 30,
            right: 0
          },
          textStyle: {
            color: "#FFFFFF"
          },
          xAxis: {
            type: "category",
            data: r.data.communityNames,
            axisLabel: {
              rotate: 45
            }
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: r.data.counts,
              type: "bar",
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: "top", //在上方显示
                    textStyle: {
                      //数值样式
                      color: "#FFF",
                      fontSize: 16
                    }
                  },
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#22A3E8" },
                    { offset: 1, color: "#7623DC" }
                  ])
                },
                emphasis: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#22A3E8" },
                    { offset: 0.7, color: "#2378f7" },
                    { offset: 1, color: "#7623DC" }
                  ])
                }
              }
            }
          ]
        };
        el.setOption(option);
      });
    },
    findContinuousUserCountFunnel() {
      getContinuousUserCountFunnel({
        startMonth: this.ContinuousUserCountFunnelDate
      }).then(r => {
        let sz = [];
        r.data.cucfs.forEach((value, index) => {
          sz.push({
            value: parseInt(value.count),
            name: value.continuousMonth + "月欠费"
          });
          // sz.push({value: index, name: value.continuousMonth + '月欠费'})
        });
        let el = echarts.init(this.$refs.ContinuousUserCountFunnel);
        let option = {
          calculable: true,
          series: [
            {
              name: "漏斗图",
              type: "funnel",
              left: "10%",
              top: 10,
              //x2: 80,
              bottom: 10,
              // width: '80%',
              // height: {totalHeight} - y - y2,
              // min: 0,
              // max: 100,
              minSize: "0%",
              maxSize: "100%",
              sort: "none",
              gap: 2,
              label: {
                show: true,
                formatter: "{b}:{c}",
                position: "right"
              },
              labelLine: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: "solid"
                }
              },
              itemStyle: {
                borderColor: "#fff",
                borderWidth: 1
              },
              emphasis: {
                label: {
                  fontSize: 20
                }
              },
              data: sz
            }
          ]
        };
        el.setOption(option);
      });
    },
    destroyEcharts() {
      // console.log("destroy echarts");
      let CommunityArrearCountChangeCurve = echarts.getInstanceByDom(
        this.$refs.CommunityArrearCountChangeCurve
      );
      if (CommunityArrearCountChangeCurve) {
        CommunityArrearCountChangeCurve.clear();
        echarts.dispose(CommunityArrearCountChangeCurve);
      }

      let ElecsTypeArrearCount = echarts.getInstanceByDom(
        this.$refs.ElecsTypeArrearCount
      );
      if (ElecsTypeArrearCount) {
        ElecsTypeArrearCount.clear();
        echarts.dispose(ElecsTypeArrearCount);
      }

      let ContentPriceAllTotalPower = echarts.getInstanceByDom(
        this.$refs.ContentPriceAllTotalPower
      );
      if (ContentPriceAllTotalPower) {
        ContentPriceAllTotalPower.clear();
        echarts.dispose(ContentPriceAllTotalPower);
      }

      let ArrearCommunityCount = echarts.getInstanceByDom(
        this.$refs.ArrearCommunityCount
      );
      if (ArrearCommunityCount) {
        ArrearCommunityCount.clear();
        echarts.dispose(ArrearCommunityCount);
      }

      let rCountComByMonth = echarts.getInstanceByDom(
        this.$refs.rCountComByMonth
      );
      if (rCountComByMonth) {
        rCountComByMonth.clear();
        echarts.dispose(rCountComByMonth);
      }
      let ContinuousUserCountFunnel = echarts.getInstanceByDom(
        this.$refs.ContinuousUserCountFunnel
      );
      if (ContinuousUserCountFunnel) {
        ContinuousUserCountFunnel.clear();
        echarts.dispose(ContinuousUserCountFunnel);
      }
    }
  }
};
</script>
<style scoped>
.search-select {
  background: #001e40;
  height: 25px;
  font-size: 14px;
  padding-top: 1px;
  border: 0px;
}
.question-table{
  box-sizing: border-box;
}
.question-proportion{
  height: 3.41rem;
}
.question-handle{
  height: 2.55rem;
}
.chartClass {
  width: 100%;
  min-height: 90px;
  height: 100%;
}
</style>
