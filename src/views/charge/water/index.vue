<template>
  <div class="content-box">
    <div id="container3d" style="width:100%;height:100%;position:absolute;top:0;z-index:0;" v-if="$route.path=='/charge/arrear/Index'||$route.path=='/charge/water/Index'||$route.path=='/charge/call/Index'||$route.path=='/charge/income/Index'"></div>

    <transition
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
      :duration="800"
    >
      <div v-show="!zoomed" class="pull-left data-left" style="position: absolute;z-index:1;">
        <div class="data-wrap ysyl" style="height: 3.4rem">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <div class="title">
            地区用水量环比
            <!-- <div id="app" class="input-group-btn">
              <select
                class="form-control search-select"
                v-model="communityCode"
                @change="findWaterPowerQoq()"
              >
                <option
                  v-for="(item, index) in communityList"
                  :key="index"
                  :value="item.communityCode"
                >{{item.communityName}}</option>
              </select>
            </div>
           
            <a class="more">更多</a> -->
          </div>
          <div class="chart-box">
            <div ref="WaterPowerQoq" style="width: 100%;height: 2.5rem;"></div>
          </div>
         
        </div>
           
       <div class="data-wrap ysyl">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <div class="title">
            用水波动大用户数排行
            <!-- <div id="app" class="input-group-btn">
              <select
                class="form-control search-select"
                v-model="communityCode2"
                @change="findArrearCommunityCountList()"
              >
                <option
                  v-for="(item, index) in communityList"
                  :key="index"
                  :value="item.communityCode"
                >{{item.communityName}}</option>
              </select>
            </div> -->
            <!-- /btn-group -->
            <!-- <a class="more">更多</a> -->
          </div>
          <div class="chart-box">
            <div  ref="WaterVolatilityUserCount" style="height: 3.6rem;width: 100%"></div>
          </div>
        </div>
      </div>
    </transition>
    <transition
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
      :duration="800"
    >
      <div
        v-show="!zoomed"
        class="pull-left data-middle"
        style="position: absolute; left: 25%;z-index:1;"
      >
          <dl class="data-box" style="top:.5rem;">
            <dt>地区日用水吨数</dt>
            <dd>
              <span class="number01" v-for="(value, index) in totalPower" :key="index">{{value}}</span>
              <b>吨</b>
            </dd>
          </dl>
          <ul class="list-chart" style="z-index: 99;">
            <li>
              <div ref="eChartsPie01" style="width: 100%;height: 1.5rem;"></div>
            </li>
            <li>
              <div ref="eChartsPie02" style="width: 100%;height: 1.5rem;"></div>
            </li>
            <li>
              <div ref="eChartsPie03" style="width: 100%;height: 1.5rem;"></div>
            </li>
            <li>
              <div ref="eChartsPie04" style="width: 100%;height: 1.5rem;"></div>
            </li>
          </ul>
      </div>
    </transition>
    <transition
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
      :duration="800"
    >
      <div
        v-show="!zoomed"
        class="pull-right data-left"
        style="position: absolute; left: 75%;z-index:1;"
      > 
        
         <div class="data-wrap ysyl" style="height: 3.4rem">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
           <div class="title">用水地区用水量排名</div>
          <div class="cont scroll-box">
            <!-- <ul class="list-progress">
              <li v-for="(value, index) in dataList" :key="index">
                <span class="name">{{value.communityName}}</span>
                <div class="progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    aria-valuenow="1"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :style="{width: Math.round(value.totalPower/dataTotal*100) + '%'}"
                  >
                    <span class="sr-only">30%</span>
                  </div>
                </div>
                <span class="money">¥{{value.totalPower}}</span>
              </li>
            </ul> -->
          <div ref="UseWaterRank" style="width: 100%;height: 2.5rem"></div>
          </div>
        </div>

        <div class="data-wrap ysyl">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <div class="title">
            地区用水性质环比
            <div id="app" class="input-group-btn">
              <select
                class="form-control search-select"
                v-model="communityCode3"
                @change="findUseWaterNaturesQoq()"
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
          <div class="chart-box">
            <div ref="UseWaterNaturesQoq" style="width: 100%;height: 3.6rem"></div>
          </div>
        </div>
      </div>
    </transition>
    <a :class="{'btn-zoomOut':!zoomed,'btn-zoomIn':zoomed}" @click="zoomPanel"></a>

    <area3dMap :mapType="2"></area3dMap> 
  </div>
</template>
<style scoped>
.search-select {
  background: #001e40;
  height: 25px;
  font-size: 14px;
  padding-top: 1px;
  border: 0px;
}

.chartClass {
  width: 100%;
  min-height: 90px;
  height: 100%;
}
</style>

<script>
import animate from "animate.css";

// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入折线图
require("echarts/lib/chart/line");
require("echarts/lib/chart/radar");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/custom");
require("echarts/lib/chart/funnel");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/component/graphic");
require("echarts/lib/component/timeline");
require("echarts/lib/component/tooltip");
//require('echarts/lib/chart/helper/polyline');

import { getCommunitySelectInfo } from "@/api/charge";
import {
  getUseWaterRank,
  getWaterPowerQoq,
  getWaterVolatilityUserCount,
  getUseWaterNaturesQoq,
  getWaterPowerAndWaterProportion
} from "@/api/chargeWater";
import area3dMap from "../../../components/charge/area3dMap";

export default {
  components: {
    area3dMap
  },
  data() {
    return {
      sliderVal: [0, 100],
      polygonEm: require("../../../assets/img/polygon_em.png"),
      polygonTitle: require("../../../assets/img/polygon_title.png"),
      communityList: [],
      communityCode: "", // 地区用水量环比小区code
      communityCode2: "", // 用水波动大用户数排行小区code
      communityCode3: "", // 地区用水性质环比code
      dataList: [], // 用水地区用水量排名数据,
      dataTotal: 0, // 用水地区用水量排名总额
      totalPower: "", // 首页月用水吨数
      zoomed: this.$store.state.app.leftMeunShowFlag
    };
  },
  mounted() {
    this.findCommunitySelectInfo();
    this.findUseWaterRank(); //用水地区用水量排名
    this.findWaterPowerQoq(); // 用水地区用水量排名总额
    this.findWaterVolatilityUserCount(); //用水波动大的小区用户数排行
    this.findUseWaterNaturesQoq(); // 地区用水性质环比d
    this.findWaterPowerAndWaterProportion(); // 首页月用水吨数与用水占比
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
  methods: {
    zoomPanel: function() {
      this.$store.commit('app/SET_LEFTMEUNSHOWFLAG', !this.zoomed)
      this.zoomed = !this.zoomed;
    },
    findCommunitySelectInfo() {
      getCommunitySelectInfo().then(response => {
        let data = response.data;
        data.unshift({ communityCode: "", communityName: "==请选择==" });
        this.communityList = data;
      });
    },
    findUseWaterRank() {
       getUseWaterRank().then(r => {
         
        let resData = r.data;
        let el = echarts.init(this.$refs.UseWaterRank);
        let optionData = {};
        optionData.month = [];
        optionData.datas = [];
        optionData.communityNames = [];
        let max = 0
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
            if(parseInt(v.totalPower)>max){
              max = v.totalPower
            }
            total += parseInt(v.totalPower) + 1;
            d.series[1].data.push(v.totalPower);
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
              bottom: 0,
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
              bottom: 25,
              top: 10,
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
              // {
              //   hoverAnimation: false,
              //   legendHoverLink: false,
              //   barWidth: 10,
              //   type: "bar",
              //   itemStyle: {
              //     normal: {
              //       barBorderRadius: 0,
              //       color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              //         {
              //           offset: 0,
              //           color: "#2d3d69"
              //         },
              //         {
              //           offset: 1,
              //           color: "#2b3c67"
              //         }
              //       ]),
              //       areaStyle: { type: "default" }
              //     }
              //   },
              //   barGap: "-100%",
              //   barCategoryGap: "40%",
              //   animation: false,
              //   emphasis: {
              //     itemStyle: {
              //       opacity: 0
              //     }
              //   }
              //   // barGap:'20%'
              // },
              { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: {color: 'rgba(0,0,0,0.05)'}
                },
                barGap:'-100%',
                barCategoryGap:'40%',
                data: max,
                animation: false
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
    findWaterPowerQoq() {
      getWaterPowerQoq({ communityCode: this.communityCode }).then(r => {
        console.log(r)
        let el = echarts.init(this.$refs.WaterPowerQoq);
        let qoq = [];
        let customData = [];
        let dataList = [[], []];
        let nowQoqs = []
        r.data.nowQoq.forEach((value, index) => {
          let sz = [index];
          let nowQoq = r.data.nowQoq[index];
          let lastQoq = r.data.lastQoq[index];
          sz.push(parseInt(nowQoq.substring(0, nowQoq.length - 1))||0);
          sz.push(parseInt(lastQoq.substring(0, lastQoq.length - 1))||0);
          nowQoqs.push(sz)
          //
          dataList[0].push(r.data.last[index]);
          dataList[1].push(r.data.now[index]);
        });
        console.log(nowQoqs)
        
        let categoryCount = r.data.communityName.length
            for (var i = 0; i < categoryCount; i++){
              var customVal = [i];
              customVal.push(r.data.last[i])
              customVal.push(r.data.now[i])
              customData.push(customVal);
            }
        console.log(customData)
        function renderItem(params, api) {
          var xValue = api.value(0);
          var currentSeriesIndices = api.currentSeriesIndices();
          var barLayout = api.barLayout({
              barGap: '30%', barCategoryGap: '20%', count: currentSeriesIndices.length - 1
          });

          var points = [];
          for (var i = 0; i < currentSeriesIndices.length; i++) {
              var seriesIndex = currentSeriesIndices[i];
              if (seriesIndex !== params.seriesIndex) {
                  var point = api.coord([xValue, api.value(seriesIndex)]);
                  point[0] += barLayout[i - 1].offsetCenter;
                  point[1] -= 20;
                  points.push(point);
              }
          }
          var style = api.style({
              stroke: api.visual('color'),
              fill: null
          });

            return {
                type: 'polyline',
                shape: {
                    points: points
                },
                style: style
            };
        }
        let legendData = ["环比", "上月用水量", "本月用水量"];
        let option = {
         tooltip: {
          confine: true,
            trigger: "axis"
          },
          grid: {
            top: 40,
            bottom: 60,
            left: 60,
            right: 0
          },
          legend: {
            type: "plain",
            data: legendData,
            textStyle: {
              color: "#FFFFFF"
            }
          },
          textStyle: {
            color: "#FFFFFF"
          },
          xAxis: {
            type: "category",
            data: r.data.communityName,
            axisLabel: {
              rotate: 45
            }
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "环比",
              type: "custom",
              renderItem: renderItem,
              itemStyle: {
                normal: {
                  borderWidth: 2
                }
              },
              encode: {
                x: 0,
                y: [1, 2]
              },
              data: nowQoqs,
              z: 100
            }
          ].concat(
            echarts.util.map(dataList, function(data, index) {
              return {
                type: "bar",
                animation: false,
                name: legendData[index + 1],
                itemStyle: {
                  normal: {
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
                },
                data: data
              };
            })
          )
        };
        el.setOption(option);
      });
    },
    findWaterVolatilityUserCount() {
      getWaterVolatilityUserCount().then(r => {
        let el = echarts.init(this.$refs.WaterVolatilityUserCount);
        let option = {
          grid: {
            top: 10,
            bottom: 60,
            left: 50,
            right: 0
          },
          tooltip: {
          confine: true,
            trigger: "axis"
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
              barWidth: 25,
              data: r.data.counts,
              type: "bar",
              itemStyle: {
                normal: {
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
    findUseWaterNaturesQoq() {
      getUseWaterNaturesQoq({ communityCode: this.communityCode3 }).then(r => {
        let qoq = [];
        let customData = [];
        let dataList = [[], []];
        let nowQoqs = []
        r.data.nowQoq.forEach((value, index) => {
          let sz = [index];
          let nowQoq = r.data.nowQoq[index];
          let lastQoq = r.data.lastQoq[index];
          sz.push(parseInt(nowQoq.substring(0, nowQoq.length - 1))||0);
          sz.push(parseInt(lastQoq.substring(0, lastQoq.length - 1))||0);
          nowQoqs.push(sz)
          // customData.push(sz);
          dataList[0].push(r.data.last[index]);
          dataList[1].push(r.data.now[index]);
        });
        let categoryCount = r.data.elecTypeName.length
        for (var i = 0; i < categoryCount; i++){
           var customVal = [i];
           customVal.push(r.data.last[i])
           customVal.push(r.data.now[i])
           customData.push(customVal);
        }
        function renderItem(params, api) {
          var xValue = api.value(0);
          var currentSeriesIndices = api.currentSeriesIndices();
          var barLayout = api.barLayout({
              barGap: '30%', barCategoryGap: '20%', count: currentSeriesIndices.length - 1
          });

          var points = [];
          for (var i = 0; i < currentSeriesIndices.length; i++) {
              var seriesIndex = currentSeriesIndices[i];
              if (seriesIndex !== params.seriesIndex) {
                  var point = api.coord([xValue, api.value(seriesIndex)]);
                  point[0] += barLayout[i - 1].offsetCenter;
                  point[1] -= 20;
                  points.push(point);
              }
          }
          var style = api.style({
              stroke: api.visual('color'),
              fill: null
          });

            return {
                type: 'polyline',
                shape: {
                    points: points
                },
                style: style
            };
        }
        let el = echarts.init(this.$refs.UseWaterNaturesQoq);
        let legendData = ["环比", "上月用水量", "本月用水量"];
        // console.log('customData->', customData)
        // console.log('dataList->', dataList)
        // function renderItem(params, api) {
        //   var xValue = api.value(0);
        //   var currentSeriesIndices = api.currentSeriesIndices();
        //   var barLayout = api.barLayout({
        //     barGap: "30%",
        //     barCategoryGap: "20%",
        //     count: currentSeriesIndices.length - 1
        //   });

        //   var points = [];
        //   for (var i = 0; i < currentSeriesIndices.length; i++) {
        //     var seriesIndex = currentSeriesIndices[i];
        //     if (seriesIndex !== params.seriesIndex) {
        //       var point = api.coord([xValue, api.value(seriesIndex)]);
        //       point[0] += barLayout[i - 1].offsetCenter;
        //       point[1] -= 20;
        //       points.push(point);
        //     }
        //   }
        //   var style = api.style({
        //     stroke: api.visual("color"),
        //     fill: null
        //   });

        //   return {
        //     type: "polyline",
        //     shape: {
        //       points: points
        //     },
        //     style: style
        //   };
        // }
        function renderItem(params, api) {
          var xValue = api.value(0);
          var currentSeriesIndices = api.currentSeriesIndices();
          var barLayout = api.barLayout({
              barGap: '30%', barCategoryGap: '20%', count: currentSeriesIndices.length - 1
          });

          var points = [];
          for (var i = 0; i < currentSeriesIndices.length; i++) {
              var seriesIndex = currentSeriesIndices[i];
              if (seriesIndex !== params.seriesIndex) {
                  var point = api.coord([xValue, api.value(seriesIndex)]);
                  point[0] += barLayout[i - 1].offsetCenter;
                  point[1] -= 20;
                  points.push(point);
              }
          }
          var style = api.style({
              stroke: api.visual('color'),
              fill: null
          });

            return {
                type: 'polyline',
                shape: {
                    points: points
                },
                style: style
            };
        }

        let option = {
         tooltip: {
          confine: true,
            trigger: "axis"
          },
          grid: {
            top: 40,
            bottom: 60,
            left: 60,
            right: 0
          },
          legend: {
            type: "plain",
            data: legendData,
            textStyle: {
              color: "#FFFFFF"
            }
          },
          textStyle: {
            color: "#FFFFFF"
          },
          xAxis: {
            type: "category",
            data: r.data.elecTypeName,
            axisLabel: {
              rotate: 45
            }
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "环比",
              type: "custom",
              renderItem: renderItem,
              itemStyle: {
                normal: {
                  borderWidth: 2
                }
              },
              encode: {
                x: 0,
                y: [1, 2]
              },
              data: nowQoqs,
              z: 100
            }
          ].concat(
            echarts.util.map(dataList, function(data, index) {
              return {
                type: "bar",
                animation: false,
                name: legendData[index + 1],
                itemStyle: {
                  normal: {
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
                },
                data: data
              };
            })
          )
        };
        el.setOption(option);
      });
    },
    findWaterPowerAndWaterProportion() {
      getWaterPowerAndWaterProportion().then(r => {
        this.totalPower = r.data.totalPower;
        let options = [];
        let elecTypePropor = [];
        for (let key in r.data.elecTypePropor) {
          elecTypePropor.push({ name: key, vlaue: r.data.elecTypePropor[key] });
        }

        elecTypePropor.forEach((value, index) => {
          let num = value.vlaue.replace("%", "");
          let option = {
            graphic: [
              {
                type: "text",
                left: "center",
                top: "center",
                style: {
                  fill: "#fff",
                  text: value.vlaue,
                  font: 'bolder 0.8em "Microsoft YaHei", sans-serif'
                }
              },
              {
                type: "text",
                left: "center",
                bottom: "8px",
                style: {
                  fill: "#fff",
                  text: value.name,
                  font: 'bolder 0.8em "Microsoft YaHei", sans-serif'
                }
              }
            ],
            series: [
              {
                name: value.vlaue,
                type: "pie",
                hoverAnimation: false, //鼠标移入变大
                radius: ["60%", "75%"],
                label: {
                  normal: {
                    show: false
                  }
                },
                data: [
                  {
                    value: num,
                    itemStyle: {
                      normal: {
                        color:
                          index === 0
                            ? "#003BFF"
                            : index === 1
                            ? "#00CFFF"
                            : index === 2
                            ? "#00FFA7"
                            : "#CB7831"
                      }
                    }
                  },
                  {
                    value: 100 - num,
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
          options.push(option);
        });
        echarts.init(this.$refs.eChartsPie01).setOption(options[0]);
        echarts.init(this.$refs.eChartsPie02).setOption(options[1]);
        echarts.init(this.$refs.eChartsPie03).setOption(options[2]);
        echarts.init(this.$refs.eChartsPie04).setOption(options[3]);
      });
    }
  }
};
</script>
