
<template>
  <div style="position:absolute;width: 100%;height:100%">
    <div class="map3d"  id="map3d" style="width:100%;height: calc(100% + 1rem);position:absolute;z-index:0;"></div>

    <div style="position: absolute;left: 6rem;height:1rem;width:8rem;display:none;">
      <!--右侧按钮-->
      <div class="btn-map-box">
        <a href="#" class="btn-yhys active">用户用水</a>
        <a href="#" class="btn-yhqf">用户欠费</a>
        <a href="#" class="btn-yhjf">用户收益</a>
        <a href="#" class="btn-yhld">用户来电</a>
      </div>
      <!--右侧按钮//-->
    </div>
    <transition
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
      :duration="800"
    >
      <div v-show="!zoomed" class="pull-left data-left" style="position: absolute">
        <div class="business-menu">
          <ul class="list-business">
            <li>
              <router-link to="/charge/arrear/Index">
                <span class="number" style="padding-top:0;">01</span>
                <span class="name">欠费用户分析</span>
              </router-link>
            </li>
            <li>
              <router-link to="/charge/water/Index">
                <span class="number" style="padding-top:0;">02</span>
                <span class="name">用户用水分析</span>
              </router-link>
            </li>
            <li>
              <router-link to="/charge/income/Index">
                <span class="number" style="padding-top:0;">03</span>
                <span class="name">收益分析</span>
              </router-link>
            </li>
            <li>
              <router-link to="/charge/call/Index">
                <span class="number" style="padding-top:0;">04</span>
                <span class="name">客户来电分析</span>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="data-wrap business-chart">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r" style="z-index:3 !important"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <div class="title">
            小区欠费人数
            <div id="app" class="input-group-btn"></div>
          </div>
          <div class="chart-box">
            <div ref="communityCountRadar" style="height: 2.3rem;width: 100%"></div>
          </div>
        </div>

        <div class="data-wrap business-chart">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <!--四个装饰角//-->
          <div class="title">
            来电次数最多小区排行
          </div>
          <div ref="communityCallTopTen" style="width: 100%;height: 2.4rem"></div>
          <!-- <div class="chart-box"><img src="../../assets/img/chart08.png" /></div> -->
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
        style="position: absolute; left: 25%;top: 5.85rem"
      >
        <div class="data-wrap business-chart">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <div class="title">
            最高收益地区占比
            <!-- <a class="more">更多</a> -->
          </div>
          <div class="cont">
            <ul class="list-syzb">
              <li>
                <div ref="top1" style="width: 100%;height:  2.5rem"></div>
              </li>
              <li>
                <div ref="top2" style="width: 100%;height:  2.5rem"></div>
              </li>
              <li>
                <div ref="top3" style="width: 100%;height:  2.5rem"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <transition
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
      :duration="800"
    >
      <div v-show="!zoomed" class="pull-right data-left" style="position: absolute; left: 75%">
        <div class="data-wrap business-menu">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <div class="title">
            欠费最多地域前5排行
            <div id="app" class="input-group-btn"></div>
            <!-- /btn-group -->
          </div>
          <div
            ref="ArrearCommunityCount"
            id="ArrearCommunityCount"
            style="width: 100%;height: 2rem"
          ></div>
        </div>

        <div class="data-wrap business-chart">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <div class="title">
            水价类型收益
            <div id="app" class="input-group-btn">
              <select
                class="form-control search-select"
                v-model="communityCode2"
                @change="find02IndexIncomeTop6Statistics()"
              >
                <option
                  v-for="(item, index) in communityList"
                  :key="index"
                  :value="item.communityCode"
                >{{item.communityName}}</option>
              </select>
            </div>
            <!-- <a class="more">更多</a> -->
          </div>
          <div class="chart-box">
            <div ref="incomeTop6Statistics" style="width:100%;height: 100%;"></div>
          </div>
        </div>

        <div class="data-wrap business-chart">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <div class="title" ref="imageWrapper">
            小区用水量
          </div>
          <div class="chart-box">
            <div ref="UseWaterRank" style="width: 100%;height: 100%"></div>
          </div>
        </div>
      </div>
    </transition>

    <a :class="{'btn-zoomOut':!zoomed,'btn-zoomIn':zoomed}" @click="zoomPanel"></a>
    <carousel :community="popCommunity" :isShow="isShowPopCommunity" async></carousel>
  </div>
</template>

<style scoped>
.tap{
    position: absolute;
    background-color: MidnightBlue;
    background-color:rgba(0,10,40);
    border-top-left-radius: 10px;
    border-bottom-right-radius:10px;
    opacity: 0.5;
    font-size: 4px;
    color: aqua;
    width: 36px;
    height: 44px;
    padding: 1px 1px 1px;
}
[class^="ellipse-"] {
  z-index: 1;
}
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
.map3d {
  width: 100%;
  height: 10.4rem;
  position: absolute;
  top: -1rem;
  left: 0;
  /*
  background: url(../../assets/img/bgpanel.png) no-repeat;
  background-size: 100% 100%;*/
}
.panel3d {
  background: none;
  /* background: url(../../assets/img/panel.png) no-repeat;
  background-size: 100% 100%; */
  position: absolute;
  width: 450px;
  height: 286px;
  top: 100px;
  left: 400px;
  position: relative;
  padding: 15px;
}

.panel3d >>> table {
  width: 100%;
  margin: 0;
  padding: 0;
}
.panel3d >>> .title {
  color: #00ddfa;
  font-weight: bold;
  text-align: left;
}
.panel3d >>> .panelTitle {
  text-align: center;
  font-size: 12px;
}
.panel3d >>> .itemTitle {
  color: #00ddfa;
  text-align: left;
  font-size: 10px;
}
.panel3d >>> .itemValue {
  color: #edc00c;
  text-align: left;
  font-size: 10px;
}
</style>
<script>
import { ThreeLayer } from "maptalks.three";
import * as THREE from "three";
import * as maptalks from "maptalks";
import "maptalks/dist/maptalks.css";
import { compressImage } from '@/utils/compressImage'
import { setstore, getstore } from '@/utils/auth'


// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入折线图
require("echarts/lib/chart/line");
require("echarts/lib/chart/radar");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/gauge");
require("echarts/lib/component/timeline");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/graphic");

import animate from "animate.css";
import { getCommunityCallTopTen } from "@/api/chargeCall";
import { getCommunityUseWaterRank } from "@/api/chargeWater";

import texture1 from "@/assets/texture/circle1.png";
import texture2 from "@/assets/texture/circle2.png";
import texturePanelText from "@/assets/texture/rotatePanel.png";

import texture_face1 from "@/assets/texture/top-min.png";
import texture_face2 from "@/assets/texture/slide1.png";


// import texture_face3 from "@/assets/texture/slide2-min.png";
// import texture_face4 from "@/assets/texture/slide3-min.png";
// import texture_face5 from "@/assets/texture/slide4-min.png";
// import texture_face6 from "@/assets/texture/down-min.png";
import moment from "moment";
// import texturePanel from "@/assets/texture/panel.png";
import axios from "axios";
// import html2canvas from "html2canvas";
import {
  getArrearCommunityCountList,
  getArrearCommunityCountRadar,
  get02IndexIncomeTop6Statistics,
  getCommunitySelectInfo,
  get01IndexIncomeTop3Statistics,
  getBusinessMapInfo,
  getBusinessMapInfoImgUrl
} from "@/api/charge";

import { getBusinessGeoInfo } from "@/api/chargeWater";
import _ from "lodash";
// import { setTimeout } from "timers";
import carousel from "@/components/charge/carousel";
var ival = 0;
var threeLayer = null;
var alarmPlane = [];
var planeContainer = [];
var planeContainer2 = [];
var pivotPointContainer = [];
//var features = []; //建筑物数组
var stop = null;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
export default {
  name: "chargeIndex",
  components: {
    carousel
  },
  data() {
    return {
      intervalId : null,
      stop: null,
      map: null,
      level: 17.3, //地图当前级别，
      x1: 0, //左上角经度
      y1: 0, //左上角纬度
      x2: 0, //右下角经度
      y2: 0, //右下角纬度

      menuIndex: 3,
      communityCode: "", //
      communityCode2: "", // 用水性质收益小区CODE
      communityList: [],
      zoomed: false,

      materialIndex: 0,
      panelLoaded: [], //已加载的面板
      material1Arr: [],
      panelData: [],
      building_materials: [],
      features: Object.freeze([]),
      popCommunity: null,
      isShowPopCommunity: false,
      getCommunityCallTopTen: {},
      getCommunityUseWaterRank: {},
      getArrearCommunityCountRadar: {},
      getArrearCommunityCountList: {},
      get01IndexIncomeTop3Statistics: {}
    };
  },
  created() {
    alarmPlane = [];
    planeContainer = [];
    planeContainer2 = [];
    pivotPointContainer = [];

    this.panelLoaded = []; //已加载的面板
    this.material1Arr = [];
    this.panelData = [];
    this.building_materials = [];
    this.loadBuildingMaterial();
    this.loadMaterial();
  },
  mounted() {
    this.initMap();
    this.findCommunityCallTopTen(); // 来电次数最多小区排行
    this.findArrearCommunityCountList(); // 欠费最多的地域前5
    this.findCommunitySelectInfo(); // 获取小区信息
    this.find02IndexIncomeTop6Statistics(); // 获取用水性质收益
    this.find01IndexIncomeTop3Statistics(); // 最高收益地区占比
    this.findArrearCommunityCountRadars(); // 用水性质欠费人数
    this.findCommunityUseWaterRank(); //用水性质用水量
  },
  methods: {
    cleanMaterial(material) {
      material.dispose();
      for (const key of Object.keys(material)) {
        const value = material[key];
        if (value && typeof value === "object" && "minFilter" in value) {
          value.dispose();
        }
      }
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
    findCommunitySelectInfo() {
      getCommunitySelectInfo().then(response => {
        let data = response.data;
        data.unshift({ communityCode: "", communityName: "==请选择==" });
        this.communityList = data;
      });
    },
    findCommunityUseWaterRank() {
      if(!getstore('getCommunityUseWaterRank')){
        getCommunityUseWaterRank().then(r => {
          this.getCommunityUseWaterRank = r.data
          setstore('getCommunityUseWaterRank',r.data)
          this.findCommunity()
        });
      }else{
        this.getCommunityUseWaterRank = JSON.parse(getstore('getCommunityUseWaterRank'))
        this.findCommunity()
      }
    },
    findCommunity(){
      let el = echarts.init(this.$refs.UseWaterRank);
        let indicators = [];
        this.getCommunityUseWaterRank.comName.forEach(x => {
          indicators.push({ text: x });
        });
        let option = {
          radar: [
            {
              indicator: indicators,
              center: ["50%", "50%"],
              radius: 55,
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
          confine: true,
          formatter: (value, index)=>{
            let str_formatter_value = ''
            value.value.forEach((v,i)=>{
              str_formatter_value += indicators[i].text +':' + v + '吨</br>'
            })
            return str_formatter_value
          }
          },
          series: [
            {
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
                  value: this.getCommunityUseWaterRank.powers,
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
    },
    findArrearCommunityCountRadars() {
      if(!getstore('getArrearCommunityCountRadar')){
        getArrearCommunityCountRadar().then(r => {
          this.getArrearCommunityCountRadar = r.data
          setstore('getArrearCommunityCountRadar',r.data)
          this.findArrear()
        });
      } else{
        this.getArrearCommunityCountRadar = JSON.parse(getstore('getArrearCommunityCountRadar'))
        this.findArrear()
      }
    },
    findArrear(){
      let el = echarts.init(this.$refs.communityCountRadar);
      let indicators = [];
      this.getArrearCommunityCountRadar.communityNames.forEach(x => {
        indicators.push({ text: x });
      });
      let option = {
        radar: [
          {
            indicator: indicators,
            center: ["50%", "50%"],
            radius: 55,
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
        confine: true,
        formatter: (value, index)=>{
          let str_formatter_value = ''
          value.value.forEach((v,i)=>{
            str_formatter_value += indicators[i].text +':' + v + '人</br>'
          })
          return str_formatter_value
        }
        },
        series: [
          {
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
                value: this.getArrearCommunityCountRadar.counts,
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
    },
    find02IndexIncomeTop6Statistics() {
      if(!getstore('get02IndexIncomeTop6Statistics')){
        get02IndexIncomeTop6Statistics({communityCode: this.communityCode2}).then(r => {
          this.get02IndexIncomeTop6Statistics = r.data
          setstore('get02IndexIncomeTop6Statistics',r.data)
          this.find02IndexIncomeTop()
        });
      }else{
        this.get02IndexIncomeTop6Statistics = JSON.parse(getstore('get02IndexIncomeTop6Statistics'))
        this.find02IndexIncomeTop()
      }
    },
    find02IndexIncomeTop(){
      let el = echarts.init(this.$refs.incomeTop6Statistics);
      let indicators = [];
      this.get02IndexIncomeTop6Statistics.indicatorData.forEach(x => {
        indicators.push({ text: x });
      });
      let option = {
        radar: [
          {
            indicator: indicators,
            center: ["50%", "50%"],
            radius: 55,
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
        confine: true,
        formatter: (value, index)=>{
          let str_formatter_value = ''
          value.value.forEach((v,i)=>{
            str_formatter_value += indicators[i].text +':' + v + '元</br>'
          })
          return str_formatter_value
        }
        },
        series: [
          {
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
                value: this.get02IndexIncomeTop6Statistics.seriesData,
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
    },
    findCommunityCallTopTen() {
      if(!getstore('getCommunityCallTopTen')){
        getCommunityCallTopTen().then(r => {
          this.getCommunityCallTopTen = r.data.barMap
          setstore('getCommunityCallTopTen',r.data.barMap)
          this.findCommun()
        });
      }else{
        this.getCommunityCallTopTen = JSON.parse(getstore('getCommunityCallTopTen'))
        this.findCommun()
      }
    },
    findCommun(){
      let el = echarts.init(this.$refs.communityCallTopTen);
      let option = {
        tooltip: {
        confine: true,
        formatter: '{b}: {c}人/次'
        },
        grid: {
          top: 10,
          bottom: 60,
          left: 30,
          right: 0
        },
        textStyle: {
          color: "#FFFFFF"
        },
        xAxis: {
          type: "category",
          data: this.getCommunityCallTopTen.comName,
          axisLabel: {
            rotate: 45
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.getCommunityCallTopTen.count,
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
    },
    findArrearCommunityCountList() {
      let searchItem = {
        areaId: "",
        communityName: this.communityCode,
        flag: "1"
      };
      if(!getstore('getArrearCommunityCountList')){
        getArrearCommunityCountList(searchItem).then(r => {
          this.getArrearCommunityCountList = r.data
          setstore('getArrearCommunityCountList',r.data)
          this.htiosje()
        });
      }else{
        this.getArrearCommunityCountList = JSON.parse(getstore('getArrearCommunityCountList'))
        this.htiosje()
      }
    },
    htiosje(){
      let el = echarts.init(this.$refs.ArrearCommunityCount);
      let optionData = {};
      optionData.month = [];
      optionData.datas = [];
      optionData.communityNames = [];
      this.getArrearCommunityCountList.forEach((value, index) => {
        optionData.month.push(
          value.month.substring(0, value.month.length - 2) +
            "-" +
            value.month.substring(value.month.length - 2, value.month.length)
        );
        let total = 0;
        let communityName = []; // 定义小区名称
        let d = {
          series: [{ data: [] }, { data: [] }]
        };
        value.values.forEach((v, i) => {
          total += parseInt(v.totalMoney) + 1;
          d.series[1].data.push(v.totalMoney);
          communityName.push(v.communityName);
        });
        d.series[0].data = [total, total, total, total, total];
        d.series[1].data = d.series[1].data.reverse(); // 数组顺序反向
        optionData.datas.push(d);
        optionData.communityNames.push(communityName.reverse());
      });

      let options = {
        baseOption: {
          timeline: {
            // axisType: 'category',
            autoPlay: true,
            left: 20,
            right: 20,
            data: optionData.month,
            lineStyle: {
              color: "#00F4FF"
            },
            label: {
              show: true,
              color: "#00F4FF",
              formatter: function() {
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
            bottom: 35,
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
            {
              emphasis: {
                itemStyle: {
                  opacity: 0
                }
              },
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
              animation: false
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
                    position: "right",
                    formatter: function(params) {
                      return "￥" + params.data;
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
    },
    find01IndexIncomeTop3Statistics() {
      if(!getstore('get01IndexIncomeTop3Statistics')){
        get01IndexIncomeTop3Statistics().then(r => {
          this.get01IndexIncomeTop3Statistics = r.data
          setstore('get01IndexIncomeTop3Statistics',r.data)
          this.findIndexIncomeTop()
        });
      } else {
        this.get01IndexIncomeTop3Statistics = JSON.parse(getstore('get01IndexIncomeTop3Statistics'))
        this.findIndexIncomeTop()
      }
    },
    findIndexIncomeTop(){
      let tolel = 0;
      this.get01IndexIncomeTop3Statistics.seriesData.forEach((value, index) => {
        tolel += value;
      });
      var that = this
      for (let i = 0; i < 3; i++) {
        let el = echarts.init(this.$refs["top" + (i + 1)]);
        let option = {
          grid: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          },
          graphic: [
            {
              type: "group",
              left: "center",
              bottom: 33,
              children: [
                {
                  type: "text",
                  z: 100,
                  left: "center",
                  top: "middle",
                  style: {
                    fill: "#00EDEF",
                    text: that.get01IndexIncomeTop3Statistics.indicatorData[i],
                    font: "14px Microsoft YaHei"
                  }
                }
              ]
            }
          ],
          textStyle: {
            color: "#FFFFFF"
          },
          tooltip: {
        confine: true,
            formatter: function(value){
              // console.log(value)
              return `${that.get01IndexIncomeTop3Statistics.indicatorData[i]}</br>${value.value}%`
            }
          },
          series: [
            {
              radius: "80%",
              axisLine: {
                show: true,
                lineStyle: {
                  width: 2,
                  color: [[0.1, "#0CF00F"], [0.8, "#1E90FF"], [1, "#DC4B13"]]
                }
              },
              splitLine: {
                show: true,
                length: 12
              },
              axisTick: {
                show: true,
                length: 8,
                lineStyle: {}
              },
              pointer: {
                length: "70%",
                width: 5
              },
              detail: {
                show: false
              },
              title: {
                color: "#FFFFFF",
                fontSize: 12
              },
              axisLabel: {},
              name: "业务指标",
              type: "gauge",
              detail: {
                formatter: function(value, index) {
                  return that.get01IndexIncomeTop3Statistics.seriesData[i] + "%";
                },
                width: 8,
                height: 10,
                color: "#FFFFFF",
                backgroundColor: "#419CF8",
                borderColor: "#FFFFFF",
                borderWidth: 1,
                fontSize: 15
              },
              data: [
                {
                  value: that.get01IndexIncomeTop3Statistics.seriesData[i],
                  name: "%"
                }
              ]
            }
          ]
        };
        el.setOption(option);
      }
    },
    zoomPanel: function() {
      this.$store.commit('app/SET_LEFTMEUNSHOWFLAG', false)
      if (this.zoomed) {
      } else {
        this.addRotatePanelAll();
      }
      this.zoomed = !this.zoomed;
    },
    // getMapStatus() {
    //   let extent = this.map.getExtent();
    //   let postData = {
    //     //level: this.map.getZoom(),
    //     x1: extent.xmin.toFixed(5),
    //     x2: extent.xmax.toFixed(5),
    //     y1: extent.ymax.toFixed(5),
    //     y2: extent.ymin.toFixed(5)
    //   };
    //   getBusinessMapInfo(postData)
    //     .then(res => {
    //       return this.bindPanelData(res);
    //     })
    //     .then(data => {
    //       this.addRotatePanel();
    //     });
    // },
    loadPanelData() {
      let extent = this.map.getExtent();
      let postData = {
        //level: this.map.getZoom(),
        x1: extent.xmin.toFixed(5),
        x2: extent.xmax.toFixed(5),
        y1: extent.ymax.toFixed(5),
        y2: extent.ymin.toFixed(5)
      };
      getBusinessMapInfoImgUrl(postData)
        .then(res => {
          return this.bindPanelData(res);
        })
        .then(data => {
          this.addRotatePanel();
        });
    },
    bindPanelData(res) {
      var that = this;
      return new Promise(function(resolve, reject) {
        if (res.code == 200) {
          that.panelData = res.data;
        }
        resolve(res);
      });
    },
    thisimgdt(e){
      compressImage(e, {
        width: 10, // 压缩后图片的宽
      }).then(result => {
          return result
      })
    },
    initMap: function() {
      var that = this;
      this.map = new maptalks.Map("map3d", {
        center: [123.209351, 41.200379],
        zoom: this.level,
        pitch: 40,
        minZoom: 1,
        maxZoom: 19,
        spatialReference: {
          projection: "baidu"
        },
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate: "http://online{s}.map.bdimg.com/onlinelabel/?size=0.1&qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1&ak=murqvIRayvQcLVNIhWYLRNHl30mlMwiA",
          subdomains: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          attribution: "&copy; sunray",
          cssFilter: "sepia(20%) invert(90%) saturate(150%) "
        })
      });
      that.map.on("zoomend moveend", this.loadPanelData);
      this.initThreeJsLayer().then(res => {
        this.loadBuilding();
        this.loadPanelData();
        this.animate();
      });
      this.map.on("click", e => {
        this.mapClick(e);
      });
      if(this.$store.state.app.loading){
        this.$store.dispatch('app/closeLoading')
      }
    },
    loadBuilding: function() {
      let postData = {
        level: 15,
        x1: "123.12420",
        x2: "124.00000",
        y1: "42.00000",
        y2: "41.00000"
      };
      if (!getstore('GEOJSONDATA') || JSON.parse(getstore('GEOJSONDATA')).features.length === 0) {
        getBusinessGeoInfo(postData).then(res => {
          if (res.code == 200) {
            setstore('GEOJSONDATA', res.data);
            this.renderBuilding(res.data);
          }
        });
      } else {
        this.renderBuilding(JSON.parse(getstore('GEOJSONDATA')));
      }
    },
    Buildingfigure(e){
      // compressImage(e, {
      //   width: 4, // 压缩后图片的宽、
      //   height: 4,
      // }).then(result => {
        var texture_pic = new THREE.TextureLoader().load(e);
        texture_pic.wrapS = THREE.RepeatWrapping;
        texture_pic.wrapT = THREE.RepeatWrapping;
        texture_pic.repeat.x = 1;
        texture_pic.repeat.y = 1;
        this.building_materials.push(
          new THREE.MeshBasicMaterial({
            map: texture_pic,
            overdraw: true
          })
        );
      // })
    },
    // Buildingfigure2(e){
    //   compressImage(e, {
    //     width: 10, // 压缩后图片的宽
    //     height: 10, // 压缩后图片的高，宽高若只传一个，则按图片原比例进行压缩
    //   }).then(result => {
    //     var texture_pic = new THREE.TextureLoader().load(result);
    //     texture_pic1.wrapS = THREE.RepeatWrapping;
    //     texture_pic1.wrapT = THREE.RepeatWrapping;
    //     this.building_materials.push(
    //       new THREE.MeshBasicMaterial({
    //         map: texture_pic,
    //         overdraw: true
    //       })
    //     );
    //   })
    // },
    loadBuildingMaterial() {
      this.Buildingfigure(texture_face1)
      this.Buildingfigure(texture_face2)
      // this.compressImages(texture_face3)
      // this.compressImages(texture_face4)
      // this.compressImages2(texture_face5)
      // this.compressImages2(texture_face6)
    },
    //初始化
    initThreeJsLayer: function() {
      return new Promise((resolve, reject) => {
        var that = this;
        threeLayer = new ThreeLayer("t", {
          drawImmediate: true,
          forceRenderOnMoving: true,
          forceRenderOnRotating: true
        });
        threeLayer.prepareToDraw = function(gl, scene, camera) {
          var fo = scene.fog;
          scene.fog = new THREE.Fog(0x993366, 1, 100);
          that.initLight(gl, scene, camera);
          resolve("init............");
        };
        threeLayer.draw = function(gl, view, scene, camera) {
        };
        threeLayer.addTo(this.map);
      });
    },
    renderBuilding(featureData) {
      let that = this;
      let faceMaterial = this.building_materials;
      featureData.features.forEach(b => {
        this.features = this.features.concat(b);
      });

      let me = this;
      let scene = threeLayer.getScene();
      let buildingCount = 0;
      this.features.forEach(function(g) {
        buildingCount += 1;
        var heightPerLevel = 4;
        var levels = g.properties.LOUCENG || 15;
        if (!levels || levels < 1) levels = 1;
        if (g.geometry.coordinates) {
          var color = that.getColor(levels);
          var m = faceMaterial;
          try {
            var mesh = threeLayer.toExtrudeMesh(
              maptalks.GeoJSON.toGeometry(g),
              levels * heightPerLevel,
              m,
              levels * heightPerLevel
            );

            if (Array.isArray(mesh)) {
              scene.add.apply(scene, mesh);
            } else {
              scene.add(mesh);
            }
          } catch (e) {
            // console.log(e);
            // console.log(g.id);
          }
        }
      });
      threeLayer.redraw();
    },
    loadGeoJson: function() {
    },
    initLight: function(gl, scene, camera) {
      let axesHelper = new THREE.AxesHelper(60);
      var v = threeLayer.coordinateToVector3(this.map.getCenter());
      axesHelper.position.set(35716.58222546227, -13060.174130714422, v.z);
      var light = new THREE.PointLight(new THREE.Color("#fff"));
      light.intensity = 1;
      var light = new THREE.DirectionalLight(new THREE.Color("#fff"), 1);
      light.position.set(0, 3, 0);
    },
    getColor: function(level) {
      if (level < 4) {
        return "#FFFAFF";
      } else if (level >= 2 && level <= 5) {
        return "#FFFAFF";
      } else {
        return "#BABAB5";
      }
    },
    //添加闪动预警圆圈
    addAlarm: function(community) {
      alarmPlane = [];
      var v = threeLayer.coordinateToVector3(
        new maptalks.Coordinate(community.longitude, community.latitude)
      );

      var baseMaterial = new THREE.MeshBasicMaterial({
        color: 0x181835,
        side: THREE.DoubleSide
      });
      var geo = new THREE.PlaneGeometry(0.8, 0.8, 32);
      var plane1 = new THREE.Mesh(geo, baseMaterial);
      // plane1.position.set(v.x, v.y, v.z);
      alarmPlane.push(plane1);
      threeLayer.getScene().add(plane1);
    },
    addRotatePanel() {
      this.addRotatePanelAll();
    },
    async addRotatePanelAll() {
      if (this.panelData && this.panelData.length > 0 && threeLayer !== null) {
        for (var i = 0; i < this.panelData.length; i++) {
          let c = this.panelData[i];
          if (_.indexOf(this.panelLoaded, c.communityCode) < 0) {
            this.panelLoaded.push(c.communityCode);
            this.addAlarm(c);
            if(!/.(png|jpg|jpeg|gif)$/g.test(c.content.arrear)||
              !/.(png|jpg|jpeg|gif)$/g.test(c.content.call)||
              !/.(png|jpg|jpeg|gif)$/g.test(c.content.income)||
              !/.(png|jpg|jpeg|gif)$/g.test(c.content.water)||
                c.content.arrear === ""||
                c.content.call === ""||
                c.content.income === ""||
                c.content.water === ""){
            }else{
              var that = this
              var imgReady = (function () {
                var list = [];
                // 用来执行队列
                var tick = function () {
                  var i = 0;
                  for (; i < list.length; i++) {
                    list[i].end ? list.splice(i--, 1) : list[i]();
                  };
                  !list.length && stop();
                },
                // 停止所有定时器队列
                stop = function () {
                  clearInterval(that.intervalId);
                  that.intervalId = null;
                };
                return function (url, ready, load, error) {
                  var onready, width, height, newWidth, newHeight,
                  img = new Image();
                  img.src = url;
                  // 如果图片被缓存，则直接返回缓存数据
                  if (img.complete) {
                    ready.call(img);
                    load && load.call(img);
                    return;
                  };
                  width = img.width;
                  height = img.height;
                  // 加载错误后的事件
                  img.onerror = function () {
                    error && error.call(img);
                    onready.end = true;
                    img = img.onload = img.onerror = null;
                  };
                  // 图片尺寸就绪
                  onready = function () {
                    newWidth = img.width;
                    newHeight = img.height;
                    if (newWidth !== width || newHeight !== height ||newWidth * newHeight > 1024) {
                    // 如果图片已经在其他地方加载可使用面积检测
                      ready.call(img);
                      onready.end = true;
                    };
                  };
                  onready();
                  // 完全加载完毕的事件
                  img.onload = function () {
                    // onload在定时器时间差范围内可能比onready快
                    // 这里进行检查并保证onready优先执行
                    !onready.end && onready();
                    load && load.call(img);
                    // IE gif动画会循环执行onload，置空onload即可
                    img = img.onload = img.onerror = null;
                  };
                  // 加入队列中定期执行
                  if (!onready.end) {
                    list.push(onready);
                    // 无论何时只允许出现一个定时器，减少浏览器性能损耗
                    if (that.intervalId === null) that.intervalId = setInterval(tick, 40);
                  };
                };
              })(); 
              imgReady(c.content.arrear, function () {
                // if(this.width > 0 && this.height > 0){
                //   imgReady(c.content.call, function () {
                //     if(this.width > 0 && this.height > 0){
                //       imgReady(c.content.income, function () {
                //         if(this.width > 0 && this.height > 0){
                //           imgReady(c.content.water, function () {
                            if(this.width > 0 && this.height > 0 && threeLayer !== null){
                              that.addRotatePanelOne(c);
                            }
                //           });
                //         }
                //       });
                //     }
                //   });
                // }
              });
            }
          }
        }
      }
    },
    validateImage(url){    
        var xmlHttp ;
        if (window.ActiveXObject){
             xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
         }else if (window.XMLHttpRequest){
             xmlHttp = new XMLHttpRequest();
         } 
        xmlHttp.open("Get",url,false);
        xmlHttp.send();
        return (xmlHttp.status==404)?false:true;
    },
    addRotatePanelOne(community) {
      if(threeLayer === null){
        return false
      }
      var v = threeLayer.coordinateToVector3(
        new maptalks.Coordinate(community.longitude, community.latitude)
      );
      let sphereMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.01, 1, 1),
        new THREE.MeshLambertMaterial({
          color: 0xff00ff,
          transparent: true,
          opacity: 0
        })
      );
      sphereMesh.position.set(v.x, v.y, 1);
      var pivotPoint = new THREE.Object3D();
      sphereMesh.add(pivotPoint);

      var pivotPoint2 = new THREE.Object3D();


      var light4 = new THREE.DirectionalLight();
          light4.position.set(0, 0.6, 0);//点光源位置，注意：这里与相机的位置是一致的
          pivotPoint2.add(light4);
      var hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);
          hemiLight.position.set(0, 100, 0); //这个也是默认位置
          pivotPoint2.add(hemiLight);
      var generateSprite = function (color) {  
          var canvas = document.createElement('canvas');  
          canvas.width = 16;  
          canvas.height = 16;  
          var context = canvas.getContext('2d');  
          var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);  
          gradient.addColorStop(0, 'rgba(' + color + ',1)');  
          gradient.addColorStop(0.2, 'rgba(' + color + ',0.4)');  
          gradient.addColorStop(0.4, 'rgba(' + color + ',0.2)');  
          gradient.addColorStop(1, 'rgba(0,0,0,0)');  
          context.fillStyle = gradient;  
          context.fillRect(0, 0, canvas.width, canvas.height);  
          return canvas;  
      };
      var dom = document.getElementById("map3d");
      var camera = new THREE.PerspectiveCamera(20, dom.clientWidth||'100wh' / dom.clientHeight||'100vh', 1, 1000);  
          camera.position.set(0, 0, 400);
      var meshMaterial = new THREE.Sprite(new THREE.SpriteMaterial({  
          map: new THREE.CanvasTexture(generateSprite('38,125,255')),  
          blending: THREE.AdditiveBlending  
      }));  
      meshMaterial.scale.x = meshMaterial.scale.y = meshMaterial.scale.z = 0.2;
      meshMaterial.position.set(0, 0.6, 0);
      pivotPoint2.add(meshMaterial);
      planeContainer2.push(pivotPoint2);



      var phongMaterial = new THREE.MeshPhongMaterial({
        color: 0x0c52a6,
        specular: 0x092d5f,
        emissive: 0x0c6dc0,
        shininess: 10,
        shading: THREE.FlatShading
      });
      var geometryYRepeat = 100;
      var geometry = new THREE.TorusGeometry(0.6, 0.005, 100, geometryYRepeat);
      var torusKnot = new THREE.Mesh(geometry, phongMaterial);
      pivotPoint2.add(torusKnot);


      sphereMesh.add(pivotPoint2);
      sphereMesh.name = `rotateCube${community.communityCode}`;
      let p1 = this.addRotateSinglePanel(
      "communityWater",
      community,
      0,
      pivotPoint,
      community.content.water
      );
      let p2 = this.addRotateSinglePanel(
        "communityCall",
        community,
        1,
        pivotPoint,
        community.content.call
      );
      let p3 = this.addRotateSinglePanel(
        "communityIncome",
        community,
        2,
        pivotPoint,
        community.content.income
      );
      let p4 = this.addRotateSinglePanel(
        "communityArrear",
        community,
        3,
        pivotPoint,
        community.content.arrear
      );
      Promise.all([p1, p2, p3, p4]).then(res => {});
      threeLayer.getScene().add(sphereMesh);
      pivotPointContainer.push(pivotPoint);
    },
    async addRotateSinglePanel(
      prefix,
      community,
      panelIndex,
      pivotPoint,
      imgUrl
    ) {
      if(process.env.NODE_ENV !== "development" && !this.validateImage(imgUrl)){
        return null
      }
      let panelH = 0.6;
      let panelW = panelH * 1.572;
      let psi = 0.6;

      let panelName = `${prefix}_${community.communityCode}`;
      var loader = new THREE.TextureLoader();
      var texture_line;
      if (process.env.NODE_ENV == "development") {
        // compressImage(texturePanelText, {
        //   width: 700, // 压缩后图片的宽
        //   quality: 1
        // }).then(result => {
          texture_line = loader.load(texturePanelText);
          this.Communitywatermap(texture_line,pivotPoint,community,panelIndex,panelW,psi,panelH,panelName)
        // })
      } else {
        texture_line = loader.load(imgUrl);
        this.Communitywatermap(texture_line,pivotPoint,community,panelIndex,panelW,psi,panelH,panelName)
      }
    },
    Communitywatermap(texture_line,pivotPoint,community,panelIndex,panelW,psi,panelH,panelName){
      texture_line.wrapS = THREE.RepeatWrapping;
      texture_line.wrapT = THREE.RepeatWrapping;
      texture_line.repeat.x = 1;
      texture_line.repeat.y = 1;
      texture_line.needsUpdate = true;
      texture_line.generateMipmaps = false;
      texture_line.magFilter = THREE.LinearFilter;
      texture_line.minFilter = THREE.LinearFilter;
      var material1 = new THREE.MeshBasicMaterial();
      material1.transparent = false;
      material1.map = texture_line;
      material1.side = THREE.DoubleSide;
      let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(panelW, panelH, 1),
        material1
      );
      /*设置物体位置*/
      if (panelIndex == 0) {
        plane.position.set(0, psi, 0);
      }
      if (panelIndex == 1) {
        plane.position.set(0, -psi, 0);
      }
      if (panelIndex == 2) {
        plane.position.set(psi, 0, 0);
      }
      if (panelIndex == 3) {
        plane.position.set(-psi, 0, 0);
      }
      plane.name = panelName;
      plane.latitude = community.latitude;
      plane.longitude = community.longitude;
      plane.rotateX(Math.PI / 2);
      /* 创建线条模型*/ 
      pivotPoint.add(plane);
      planeContainer.push(plane);
    },
  loadMaterial() {
    compressImage(texture1, {
        width: 200, // 压缩后图片的宽
      }).then(result => {
        var texture_line = new THREE.TextureLoader().load(result);
            texture_line.wrapS = THREE.RepeatWrapping;
            texture_line.wrapT = THREE.RepeatWrapping;
            texture_line.repeat.x = 1;
            texture_line.repeat.y = 1;
            var material1 = new THREE.MeshBasicMaterial();
            material1.transparent = true;
            material1.map = texture_line;
            material1.side = THREE.DoubleSide;
            this.material1Arr.push(material1);
      })
    compressImage(texture2, {
        width: 200, // 压缩后图片的宽
      }).then(result => {
        var texture_line2 = new THREE.TextureLoader().load(result);
            texture_line2.wrapS = THREE.RepeatWrapping;
            texture_line2.wrapT = THREE.RepeatWrapping;
            texture_line2.repeat.x = 1;
            texture_line2.repeat.y = 1;
            var material12 = new THREE.MeshBasicMaterial();
            material12.transparent = true;
            material12.map = texture_line2;
            material12.side = THREE.DoubleSide;
            this.material1Arr.push(material12);
      })
    },
    mapClick(event) {
      let coordinate = event.coordinate.toFixed(5).toArray();
      let coordinate_x = Number(coordinate[0]);
      let coordinate_y = Number(coordinate[1]);
      let distanceArr = [];
      this.panelData.forEach(data => {
        let latitude = Number(data.latitude);
        let longitude = Number(data.longitude);
        let d =
          Math.pow(Math.abs(coordinate_x - longitude), 2) +
          Math.pow(Math.abs(coordinate_y - latitude), 2); //计算距离
        distanceArr.push({
          distance: d,
          community: data
        });
      });
      //排序委托
      let compare = function(property) {
        return function(a, b) {
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
        };
      };
      distanceArr.sort(compare("distance"));
      if (distanceArr.length > 0) {
        let first = distanceArr[0];
        if (first.distance < 0.00001) {
          let communityCode = distanceArr[0].community.communityCode;
          this.showPopCommunity(communityCode);
        }
      }
    },
    showPopCommunity(communityCode) {
      this.popCommunity = this.panelData.find(
        item => item.communityCode == communityCode
      );
      if(!/.(png|jpg|jpeg|gif)$/g.test(this.popCommunity.content.arrear)||
      !/.(png|jpg|jpeg|gif)$/g.test(this.popCommunity.content.call)||
      !/.(png|jpg|jpeg|gif)$/g.test(this.popCommunity.content.income)||
      !/.(png|jpg|jpeg|gif)$/g.test(this.popCommunity.content.water)||
        this.popCommunity.content.arrear === ""||
        this.popCommunity.content.call === ""||
        this.popCommunity.content.income === ""||
        this.popCommunity.content.water === ""){
        return false
      }else{
        var that = this
        var imgReady = (function () {
            var list = [];
            // 用来执行队列
            var tick = function () {
              var i = 0;
              for (; i < list.length; i++) {
                list[i].end ? list.splice(i--, 1) : list[i]();
              };
              !list.length && stop();
            },
            // 停止所有定时器队列
            stop = function () {
              clearInterval(that.intervalId);
              that.intervalId = null;
            };
            return function (url, ready, load, error) {
              var onready, width, height, newWidth, newHeight,
              img = new Image();
              img.src = url;
              if (img.complete) {
                ready.call(img);
                load && load.call(img);
                return;
              };
              width = img.width;
              height = img.height;
              img.onerror = function () {
                error && error.call(img);
                onready.end = true;
                img = img.onload = img.onerror = null;
              };
              onready = function () {
                newWidth = img.width;
                newHeight = img.height;
                if (newWidth !== width || newHeight !== height ||newWidth * newHeight > 1024) {
                  ready.call(img);
                  onready.end = true;
                };
              };
              onready();
              img.onload = function () {
                !onready.end && onready();
                load && load.call(img);
                img = img.onload = img.onerror = null;
              };
              // 加入队列中定期执行
              if (!onready.end) {
                list.push(onready);
                if (that.intervalId === null) that.intervalId = setInterval(tick, 40);
              };
            };
          })();
        imgReady(this.popCommunity.content.arrear, function () {
          if(this.width > 0 && this.height > 0){
            compressImage(that.popCommunity.content.arrear, {
              width: 450, // 压缩后图片的宽
            }).then(result => {
              that.popCommunity.content.arrear = result // result即为压缩后的结果
            })
            compressImage(that.popCommunity.content.call, {
              width: 450, // 压缩后图片的宽
            }).then(result => {
              that.popCommunity.content.call = result // result即为压缩后的结果
            })
            compressImage(that.popCommunity.content.income, {
              width: 450, // 压缩后图片的宽
            }).then(result => {
              that.popCommunity.content.income = result // result即为压缩后的结果
            })
            compressImage(that.popCommunity.content.water, {
              width: 450, // 压缩后图片的宽
            }).then(result => {
              that.popCommunity.content.water = result // result即为压缩后的结果
            })
            that.isShowPopCommunity = true;
          }
        });
      }
    },
    hidePopCommunity() {
      this.isShowPopCommunity = false;
    },
    animate: function() {
      if(this.$route.fullPath.startsWith('/charge/index')){
        stop = requestAnimationFrame(this.animate);
        ival += 1;
        if (ival == 1000) ival = 0;
        if (threeLayer) {
          threeLayer.redraw();
          if (ival % 5 == 0) {
            if (this.material1Arr.length > 0) {
              this.materialIndex += 1;
              if (this.materialIndex >= this.material1Arr.length)
                this.materialIndex = 0;
              let material = this.material1Arr[this.materialIndex];
              if (alarmPlane.length > 0) {
                alarmPlane.forEach(pnl => {
                  pnl.material = material;
                });
              }
            }
          }
          if (this.panelData) {
            this.panelData.forEach(c => {
              if (threeLayer && threeLayer.getScene()) {
                let cube = threeLayer
                  .getScene()
                  .getObjectByName(`rotateCube${c.communityCode}`);
                if (cube) {
                  cube.rotation.z += 0.01;
                  cube.rotation.y = 0.15;
                  cube.rotation.x = 0.2;
                }
              }
            });
          }
          if (planeContainer) {
            planeContainer.forEach(p => {
              p.rotation.y -= 0.01;
              p.rotation.z = 0.15;
              // p.rotation.y -= 0.01;
              // p.rotation.z = 0.15;
            });
          }
          if (planeContainer2) {
            planeContainer2.forEach(p => {
              p.rotation.z += 0.07;
            });
          }
        }
      } else {
        cancelAnimationFrame(stop);
        this.destroyEcharts();
        this.panelLoaded = null;
        this.material1Arr = null;
        this.panelData = null;
        this.building_materials = null;
        this.features = null;
        if(threeLayer === null){
          return false
        }
        threeLayer.getThreeRenderer().dispose();
        threeLayer.getScene().traverse(object => {
          if (!object.isMesh) return;
          object.geometry.dispose();

          if (object.material.isMaterial) {
            this.cleanMaterial(object.material);
          } else {
            for (const material of object.material) this.cleanMaterial(material);
          }
          object = null;
        });
        threeLayer.getScene().traverse(object => {
          object = null;
        });
        let s = threeLayer.getScene();
        s = null;
        let r = threeLayer.getThreeRenderer();
        r = null;
        threeLayer = null;
        this.features = null;
        stop = null;
        alarmPlane = null;
        ival = 0;
        planeContainer = null;
        planeContainer2 = null;
        pivotPointContainer = null;
        clearInterval(this.intervalId);
        this.intervalId = null;
        if (this.map) {
          this.map.remove();
        }
        this.animate = null
        this.map = null;
      }
    },
    destroyEcharts() {
      let useWaterRank = echarts.getInstanceByDom(this.$refs.UseWaterRank);
      if (useWaterRank) {
        useWaterRank.clear();
        echarts.dispose(useWaterRank);
      }
      let communityCountRadar = echarts.getInstanceByDom(this.$refs.getArrearCommunityCountRadar);
      if (communityCountRadar) {
        communityCountRadar.clear();
        echarts.dispose(communityCountRadar);
      }
      let incomeTop6Statistics = echarts.getInstanceByDom(
        this.$refs.incomeTop6Statistics
      );
      if (incomeTop6Statistics) {
        incomeTop6Statistics.clear();
        echarts.dispose(incomeTop6Statistics);
      }

      let communityCallTopTen = echarts.getInstanceByDom(
        this.$refs.communityCallTopTen
      );
      if (communityCallTopTen) {
        communityCallTopTen.clear();
        echarts.dispose(communityCallTopTen);
      }

      let ArrearCommunityCount = echarts.getInstanceByDom(
        this.$refs.ArrearCommunityCount
      );
      if (ArrearCommunityCount) {
        ArrearCommunityCount.clear();
        echarts.dispose(ArrearCommunityCount);
      }
    }
  }
};
</script>
