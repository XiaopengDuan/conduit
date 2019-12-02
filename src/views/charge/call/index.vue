<template>
  <div class="content-box">
    <div
      id="container3d"
      style="width:100%;height: calc(100% + 1rem);position:absolute;top:0;z-index:99;"
      v-if="$route.path=='/charge/arrear/Index'||$route.path=='/charge/water/Index'||$route.path=='/charge/call/Index'||$route.path=='/charge/income/Index'"
      ></div>
    <div style="position: relative;height: auto;overflow: hidden;">
      <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft" :duration="800">
        <div v-show="!zoomed" class="pull-left data-left" style="z-index:101;position: relative;">
          <div class="data-wrap question-ranking">
            <!--四个装饰角-->
            <div class="top-horn-l"></div>
            <div class="top-horn-r"></div>
            <div class="bottom-horn-l"></div>
            <div class="bottom-horn-r"></div>
            <!--四个装饰角//-->
            <div class="title">来电反映的问题排行</div>
            <ul class="list-question">
              <li v-for="(item, index) in communityReactionTop" :key="index">
                <div class="name" v-text="item.name">投诉-缴费业务</div>
                <div class="number">
                  <span v-text="item.value.replace(/个/g,'')"></span>
                  <small>个</small>
                </div>
              </li>
            </ul>
          </div>
          <div class="data-wrap question-number">
            <!--四个装饰角-->
            <div class="top-horn-l"></div>
            <div class="top-horn-r"></div>
            <div class="bottom-horn-l"></div>
            <div class="bottom-horn-r"></div>
            <!--四个装饰角//-->
            <div class="title">
              小区长期反应的问题数量前10
              <div class="input-group-btn">
                <el-select
                  clearable
                  :value="communityChronicProblemsTopTenVal"
                  @change="loadCommunityChronicProblemsTopTen"
                  style="width: 90px;"
                  placeholder="小区"
                >
                  <el-option
                    v-for="item in communitys"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </div>
              <!-- /btn-group -->
            </div>
            <ul class="list-number" style="width:100%;height:calc(100% - .62rem);box-sizing: border-box;">
              <li v-for="(item, index) in communityChronicProblemsTopTen" :key="index">
                <div class="name">
                  <span class="number" v-text="item.order"></span>
                  <span v-text="item.name"></span>
                </div>
                <div class="line-box">
                    <span> <div :deta-title="item.count" :class="item.lineClass" :style="{width:item.width}"></div></span>
                </div>
              </li>
            </ul>
          </div>
          <div class="data-wrap question-chart">
            <!--四个装饰角-->
            <div class="top-horn-l"></div>
            <div class="top-horn-r"></div>
            <div class="bottom-horn-l"></div>
            <div class="bottom-horn-r"></div>
            <!--四个装饰角//-->
            <div class="title">
              小区长期出现问题变化曲线
              <div class="input-group-btn">
                <el-select
                  clearable
                  :value="communityChronicProblemsChangeCurveVal"
                  @change="loadCommunityChronicProblemsChangeCurve"
                  style="width: 90px;"
                  placeholder="小区"
                >
                  <el-option
                    v-for="item in communitys"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </div>
              <!-- /btn-group -->
            </div>
            <!-- <div class="chart-box" style="height: 220px;"> -->
              <div id="echartsCommunityChronicProblemsChangeCurve" style="width:100%;height:calc(100% - .62rem)"></div>
              <!--          <div class="chart-box"><img src="../../../assets/img/chart06.jpg" /></div>-->
            <!-- </div> -->
          </div>
        </div>
      </transition>
      <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown" :duration="800">
        <div v-show="!zoomed" class="pull-left data-middle" style="position: absolute; left: 25%;bottom: 0rem;z-index:100;">
          <div class="data-wrap question-user">
            <!--四个装饰角-->
            <div class="top-horn-l"></div>
            <div class="top-horn-r"></div>
            <div class="bottom-horn-l"></div>
            <div class="bottom-horn-r"></div>
            <!--四个装饰角//-->
            <div class="title">
              小区用户反应问题数量
              <div class="input-group-btn">
                <el-select
                  clearable
                  :value="communityReactionCountVal"
                  @change="loadCommunityReactionCount"
                  style="width: 90px;"
                  class="input-group-select"
                  placeholder="小区"
                >
                  <el-option
                    v-for="item in communitys"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </div>
              <!-- /btn-group -->
              <a class="more">更多</a>
            </div>
            <div class="chart-box" style="height: 200px;">
              <div id="echartsCommunityReactionCount" style="width:100%;height:100%;"></div>
              <!--          <div class="chart-box"><img src="../../../assets/img/chart07.png" /></div>-->
            </div>
          </div>
        </div>
      </transition>
      <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight" :duration="800">
        <div v-show="!zoomed" class="pull-right data-left" style="z-index:100;position: relative;">
          <div class="data-wrap question-phone">
            <!--四个装饰角-->
            <div class="top-horn-l"></div>
            <div class="top-horn-r"></div>
            <div class="bottom-horn-l"></div>
            <div class="bottom-horn-r"></div>
            <!--四个装饰角//-->
            <div class="title">小区来电问题排行</div>
            <!-- <div class="chart-box" style="height: 160px;"> -->
              <div id="echartsCommunityCallTopTen" style="width:100%;height:calc(100% - .62rem)"></div>
              <!--          <div class="chart-box"><img src="../../../assets/img/chart08.png" /></div>-->
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
              不同用水用户反应问题占比
              <div class="input-group-btn">
                <el-select
                  clearable
                  v-model="communityReactionPropVal"
                  @change="loadCommunityReactionProp"
                  style="width: 90px;"
                  placeholder="小区"
                >
                  <el-option
                    v-for="item in communitys"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </div>
              <!-- /btn-group -->
            </div>
            <!-- <div class="chart-box" style="height: 180px;"> -->
              <!--          <img src="../../../assets/img/chart09.png"/>-->
              <div id="echartsCommunityReactionProp" style="width:100%;height:calc(100% - .62rem)"></div>
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
              小区问题处理情况
              <a class="more">更多</a>
            </div>
            <!-- <div class="chart-box" style="height: 200px;"> -->
              <!--           <img src="../../../assets/img/chart10.png"/>-->
              <div id="echartsCommunityProblemsProcessingState" style="width:100%;height:calc(100% - .62rem)"></div>
            <!-- </div> -->
          </div>
        </div>
      </transition>
    </div>
    <a :class="{'btn-zoomOut':!zoomed,'btn-zoomIn':zoomed}" @click="zoomPanel" style="z-index: 300;"></a>
    <area3dMap :mapType="3"></area3dMap>
  </div>
</template>
<style scoped>
.list-number li .name {
  float: left;
  width: 2rem;
  font-size: 14px;
}

.list-number li .line-box {
  padding-left: 2rem;
}

.el-select > .el-input {
  height: 30px !important;
}
</style>
<script>
import animate from "animate.css";

import { getArrearSelectValue, getMapPolygon } from "@/api/charge";
import {
  getCommunityReactionTop,
  getCommunityChronicProblemsTopTen,
  getCommunityChronicProblemsChangeCurve,
  getCommunityProblemsProcessingState,
  getCommunityReactionCount,
  getCommunityCallTopTen,
  getCommunityReactionProp
} from "@/api/chargeCall";
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入折线图
require("echarts/lib/chart/line");
require("echarts/lib/chart/radar");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
require("echarts/lib/component/timeline");
require("echarts/lib/component/tooltip");
import area3dMap from "../../../components/charge/area3dMap";

export default {
  components: {
    area3dMap
  },
  data() {
    return {
      sliderVal: [0, 100],
      map: null, //地图对象,
      communitys: [],
      communityReactionTop: [],
      communityChronicProblemsTopTen: [],
      communityReactionCountVal: "",
      communityReactionPropVal: "",
      polygonInfoWindow: null,
      communityChronicProblemsTopTenVal: "",
      communityChronicProblemsChangeCurveVal: "",
      polygonEm: require("../../../assets/img/polygon_em.png"),
      polygonTitle: require("../../../assets/img/polygon_title.png"),
      metadata: {
        communityChronicProblemsTopTen: [
          {
            name: "",
            order: "01",
            width: "100%",
            lineClass: "line-orange"
          },
          {
            name: "",
            order: "02",
            width: "90%",
            lineClass: "line-orangeyellow"
          },
          {
            name: "",
            order: "03",
            width: "80%",
            lineClass: "line-yellow"
          },
          {
            name: "",
            order: "04",
            width: "70%",
            lineClass: "line-green"
          },
          {
            name: "",
            order: "05",
            width: "60%",
            lineClass: "line-green2"
          },
          {
            name: "",
            order: "06",
            width: "50%",
            lineClass: "line-green3"
          },
          {
            name: "",
            order: "07",
            width: "40%",
            lineClass: "line-blue"
          },
          {
            name: "",
            order: "08",
            width: "30%",
            lineClass: "line-blue2"
          },
          {
            name: "",
            order: "09",
            width: "20%",
            lineClass: "line-blue3"
          },
          {
            name: "",
            order: "10",
            width: "10%",
            lineClass: "line-blue4"
          }
        ]
      },
      zoomed: this.$store.state.app.leftMeunShowFlag
    };
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
    this.destroyEcharts();
  },
  mounted() {
    this.init();
    this.loadCommunityReactionTop();
    this.loadCommunityCallTopTen();
    this.loadCommunityReactionProp();
    this.loadCommunityReactionCount();
    this.loadCommunityChronicProblemsTopTen();
    this.loadCommunityProblemsProcessingState();
    this.loadCommunityChronicProblemsChangeCurve();
  },
  computed: {},
  methods: {
    init() {
      getArrearSelectValue().then(res => {
        if (res.code === 200) {
          this.communitys = res.data.selectValue.communitys;
        }
      });
    },
    zoomPanel: function() {
      this.$store.commit('app/SET_LEFTMEUNSHOWFLAG', !this.zoomed)
      this.zoomed = !this.zoomed;
    },
    loadWaterMapInfo: function(opt) {
      opt = opt || {};
      let that = this;
      getCustomerCallMap(opt)
        .then(response => {
          let arr = response.data;
          for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            let tmp = [];
            tmp.push(item.points);
            let polygon = new maptalks.Polygon(tmp, {
              visible: true,
              editable: true,
              cursor: "pointer",
              shadowBlur: 0,
              shadowColor: "black",
              draggable: false,
              dragShadow: false, // display a shadow during dragging
              drawOnAxis: null, // force dragging stick on a axis, can be: x, y
              symbol: {
                lineWidth: 1,
                polygonOpacity: 0.6,
                lineColor: item.style.lineColor,
                polygonFill: item.style.polygonFill
              }
            })
              .on("mouseenter", function(e) {
                if (that.polygonInfoWindow) that.polygonInfoWindow.hide();

                e.target.updateSymbol({
                  polygonFill: "rgb(188,23,51)"
                });

                that.polygonInfoWindow = new maptalks.ui.InfoWindow({
                  autoOpenOn: null, //set to null if not to open window when clicking on map
                  single: false,
                  width: 1833,
                  height: 1051,
                  custom: true,
                  dx: -3,
                  dy: -12,
                  content:
                    '<div style="color: #fff;width: 120px;height: 140px;background-color: #051127;border: 1px solid #0c2c45;">' +
                    '<div style="float: left;padding-left: 10px;width: 110px;height: 36px;line-height: 36px; background: url(' +
                    that.polygonTitle +
                    '); font-weight: bold; font-size: 16px;">' +
                    item.area.name +
                    "</div>" +
                    '<div style="float: left; width: 100%; height: 30px; margin: 0 10px; line-height: 36px;">汇报数:' +
                    item.area.value.totalCount +
                    "</div><br>" +
                    '<div style="float: left; width: 100%; height: 30px; margin: 0 10px; line-height: 36px;">已处理:' +
                    item.area.value.dealCount +
                    "</div><br>" +
                    '<div style="float: left; width: 100%; height: 30px; margin: 0 10px; line-height: 36px;">未处理:' +
                    item.area.value.unDealCount +
                    "</div>" +
                    '<div style="display: block; width: 17px; height: 10px; background: url(' +
                    that.polygonEm +
                    ') no-repeat; position: absolute; left: 50%; margin-left: -5px; bottom: -10px;"></div>' +
                    "</div>"
                }).addTo(that.map);
                that.polygonInfoWindow.show(e.coordinate);
              })
              .on("mouseout", function(e) {
                e.target.updateSymbol({
                  polygonFill: item.style.polygonFill
                });
                that.polygonInfoWindow.hide();
              });
            new maptalks.VectorLayer(`vector_${item.area.code}`, polygon).addTo(
              that.map
            );
          }
        })
        .catch(err => {});
    },

    //来电反映的问题排行
    loadCommunityReactionTop() {
      getCommunityReactionTop().then(res => {
        if (200 === res.code) {
          this.communityReactionTop = res.data;
        }
      });
    },
    //首页小区长期反应的问题数量前10
    loadCommunityChronicProblemsTopTen(e) {
      getCommunityChronicProblemsTopTen({
        communityCode: e || ""
      }).then(res => {
        if (200 === res.code) {
          let list = [];
          let communityChronicProblemsTopTen = JSON.parse(
            JSON.stringify(this.metadata.communityChronicProblemsTopTen)
          );
          let xAxis = res.data.barMap.xAxis;
          let yAxis = res.data.barMap.yAxis[0].list;
          let sum = yAxis.reduce(
            (prev, curr, idx, arr) => parseFloat(prev) + parseFloat(curr)
          );
          let max = Math.floor((parseFloat(Math.max(...yAxis)) / sum) * 100);
          for (let i = 0; i < xAxis.length; i++) {
            if (xAxis[i]) {
              let obj = communityChronicProblemsTopTen[i];
              let width = Math.floor((parseFloat(yAxis[i]) / sum) * 100);
              obj.width = `${Math.floor(width * (100 / max))}%`;
              obj.name = xAxis[i];
              obj.count = yAxis[i]
              list.push(obj);
            }
          }
          this.communityChronicProblemsTopTenVal = e;
          this.communityChronicProblemsTopTen = list;
          
        }
      });
    },
    //小区长期出现问题变化曲线
    loadCommunityChronicProblemsChangeCurve(e) {
      getCommunityChronicProblemsChangeCurve({
        communityCode: e || ""
      }).then(res => {
        if (200 === res.code) {
          this.communityChronicProblemsChangeCurveVal = e;

          let data = res.data.barMap;
          let xData = data.months;
          let series = data.datas;
          let container = document.getElementById(
            "echartsCommunityChronicProblemsChangeCurve"
          );
          echarts.init(container).setOption({
            // legend: {
            //   data: [
            //     series[0].name,
            //     series[1].name,
            //     series[2].name,
            //     series[3].name
            //   ],
            //   top: "5%",
            //   icon: "rect",
            //   textStyle: {
            //     color: "#FFFFFF"
            //   }
            // },
            grid: {
              top: 20,
              bottom: 30,
              left: 40,
              right: 40
            },
           tooltip: {
              confine: true,
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#6a7985"
                }
              }
            },
            xAxis: {
              axisLabel: {
                color: "#FFFFFF"
              },
              axisLine: {
                lineStyle: {
                  color: "#FFFFFF"
                }
              },
              axisTick: {
                alignWithLabel: true,
                inside: true,
                lineStyle: {
                  color: "#FFFFFF"
                }
              },
              nameLocation: "middle",
              data: xData
            },
            yAxis: [
              {
                type: "value",
                axisLabel: {
                  color: "#FFFFFF"
                },
                splitLine: {
                  lineStyle: {
                    color: "#284D65",
                    type: "dashed"
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: "#FFFFFF"
                  }
                },
                axisTick: {
                  inside: true,
                  lineStyle: {
                    color: "#FFFFFF"
                  }
                }
              },
              {
                type: "value",
                axisLabel: {
                  color: "#FFFFFF"
                },
                splitLine: {
                  lineStyle: {
                    color: "#284D65",
                    type: "dashed"
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: "#FFFFFF"
                  }
                },
                axisTick: {
                  inside: true,
                  lineStyle: {
                    color: "#FFFFFF"
                  }
                }
              }
            ],
            series: [
              {
                name: series[0].name,
                data: series[0].list,
                type: "line",
                itemStyle: {
                  color: "#0F79DA",
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
                        color: "#0F79DA" // 0% 处的颜色
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
                name: series[1].name,
                data: series[1].list,
                type: "line",
                yAxisIndex: 1,
                itemStyle: {
                  color: "#00C451",
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
                        color: "#00C451" // 0% 处的颜色
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
                name: series[2].name,
                data: series[2].list,
                type: "line",
                yAxisIndex: 1,
                itemStyle: {
                  color: "#00C451",
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
                        color: "#00C451" // 0% 处的颜色
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
                name: series[3].name,
                data: series[3].list,
                type: "line",
                yAxisIndex: 1,
                itemStyle: {
                  color: "#00C451",
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
                        color: "#00C451" // 0% 处的颜色
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
        }
      });
    },
    //小区用户反应问题数量
    loadCommunityReactionCount(e) {
      getCommunityReactionCount({
        communityCode: e || ""
      }).then(res => {
        if (200 === res.code) {
          this.communityReactionCountVal = e;
          let container = document.getElementById(
            "echartsCommunityReactionCount"
          );
          echarts.init(container).setOption({
            grid: {
              top: 10,
              bottom: 60,
              left: 50,
              right: 0
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
              type: "value"
            },
            series: [
              {
                data: res.data.barMap.yAxis,
                type: "bar",
                barWidth: 20,
                barMaxWidth: 25,
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
          });
        }
      });
    },
    //首页小区问题处理情况
    loadCommunityProblemsProcessingState() {
      getCommunityProblemsProcessingState().then(res => {
        if (200 === res.code) {
          let container = document.getElementById(
            "echartsCommunityProblemsProcessingState"
          );
          let yAxis = res.data.barMap.yAxis;
          echarts.init(container).setOption({
            color: [
              "#00F2FF",
              "#FFCB00",
              "#ED7C30",
              "#80FF80",
              "#FF8096",
              "#800080"
            ],
            tooltip: {
            confine: true,
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },
            // legend: {
            //   data: [
            //     yAxis[0].name,
            //     yAxis[1].name,
            //     yAxis[2].name,
            //     yAxis[3].name,
            //     yAxis[4].name,
            //     yAxis[5].name
            //   ],
            //   textStyle: {
            //     fontSize: 14, //字体大小
            //     color: "#ffffff" //字体颜色
            //   }
            // },
            grid: {
              top: 20,
              left: 50,
              right: 20,
              bottom: 30,
              // containLabel: true
            },
            xAxis: [
              {
                type: "category",
                data: res.data.barMap.xAxis,
                axisLine: {
                  lineStyle: {
                    color: "#fff"
                  }
                }
              }
            ],
            axisLabel: {
              show: true,
              textStyle: {
                color: "#ffffff", //更改坐标轴文字颜色
                fontSize: 14 //更改坐标轴文字大小
              }
            },
            yAxis: {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#fff"
                }
              }
            },
            series: [
              {
                type: "bar",
                name: yAxis[0].name,
                data: yAxis[0].list
              },
              {
                type: "bar",
                name: yAxis[1].name,
                data: yAxis[1].list
              },
              {
                type: "bar",
                name: yAxis[2].name,
                data: yAxis[2].list
              },
              {
                type: "bar",
                name: yAxis[3].name,
                data: yAxis[3].list
              },
              {
                type: "bar",
                name: yAxis[4].name,
                data: yAxis[4].list
              },
              {
                type: "bar",
                name: yAxis[5].name,
                data: yAxis[5].list
              }
            ]
          });
        }
      });
    },
    //不同用水用户反应问题占比
    loadCommunityReactionProp() {
      getCommunityReactionProp({
        communityCode: this.communityReactionPropVal
      }).then(res => {
        if (200 === res.code) {
          let legendData = [],
            seriesData = res.data.itemList;
          let container = document.getElementById(
            "echartsCommunityReactionProp"
          );
          for (let i = 0; i < seriesData.length; i++) {
            // legendData.push(seriesData[i].name);
            // console.log(legendData)
          }
          echarts.init(container).setOption({
            grid: {
              top: 10,
              bottom: 10,
              left: 10,
              right: 10
            },
            color: ["#4472C5", "#ED7C30", "#80FF80", "#FF8096", "#800080"],
            tooltip: {
            confine: true,
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },
            tooltip: {
              confine: true,
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#6a7985"
                }
              }
            },
            // legend: {
            //   type: "scroll",
            //   left: 'left',
            //   orient: "vertical",
            //   data: legendData,
            //   textStyle: {
            //     fontSize: 14, //字体大小
            //     color: "#ffffff" //字体颜色
            //   }
            // },
            series: [
              {
                name: "",
                type: "pie",
                radius: "50%",
                center: ["50%", "50%"],
                data: seriesData,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ]
          });
        }
      });
    },
    //小区来电问题排行
    loadCommunityCallTopTen(e) {
      getCommunityCallTopTen().then(res => {
        if (200 === res.code) {
          let container = document.getElementById("echartsCommunityCallTopTen");
          echarts.init(container).setOption({
            grid: {
              top: 20,
              bottom: 60,
              left: 40,
              right: 10
            },
           tooltip: {
          confine: true,
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },
            textStyle: {
              color: "#FFFFFF"
            },
            xAxis: {
              type: "category",
              axisLabel: {
                rotate: 45
              },
              data: res.data.barMap.comName
            },
            yAxis: {
              type: "value"
            },
            series: [
              {
                data: res.data.barMap.count,
                type: "bar",
                barWidth: 20,
                barMaxWidth: 25,
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
          });
        }
      });
    },
    destroyEcharts() {
      // console.log("destroy echarts");
      let echartsCommunityChronicProblemsChangeCurve = echarts.getInstanceByDom(
        document.getElementById("echartsCommunityChronicProblemsChangeCurve")
      );
      if (echartsCommunityChronicProblemsChangeCurve) {
        echartsCommunityChronicProblemsChangeCurve.clear();
        echarts.dispose(echartsCommunityChronicProblemsChangeCurve);
      }

      let echartsCommunityReactionCount = echarts.getInstanceByDom(
        document.getElementById("echartsCommunityReactionCount")
      );
      if (echartsCommunityReactionCount) {
        echartsCommunityReactionCount.clear();
        echarts.dispose(echartsCommunityReactionCount);
      }

      let echartsCommunityProblemsProcessingState = echarts.getInstanceByDom(
        document.getElementById("echartsCommunityProblemsProcessingState")
      );
      if (echartsCommunityProblemsProcessingState) {
        echartsCommunityProblemsProcessingState.clear();
        echarts.dispose(echartsCommunityProblemsProcessingState);
      }

      let echartsCommunityReactionProp = echarts.getInstanceByDom(
        document.getElementById("echartsCommunityReactionProp")
      );
      if (echartsCommunityReactionProp) {
        echartsCommunityReactionProp.clear();
        echarts.dispose(echartsCommunityReactionProp);
      }

      let echartsCommunityCallTopTen = echarts.getInstanceByDom(
        document.getElementById("echartsCommunityCallTopTen")
      );
      if (echartsCommunityCallTopTen) {
        echartsCommunityCallTopTen.clear();
        echarts.dispose(echartsCommunityCallTopTen);
      }
    }
  }
};
</script>
