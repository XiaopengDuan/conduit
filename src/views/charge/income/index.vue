<template>
  <div class="content-box" style="max-height: initial;">
    <div id="container3d" style="width:100%;height: calc(100% + 1rem);position:absolute;top:0;z-index:0;"></div>

    <transition
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
      :duration="800"
    >
      <div v-show="!zoomed" class="pull-left data-left" style="position: absolute;z-index:1;">
        <div class="data-wrap sytj">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <div class="title">小区收益统计</div>
          <ul class="chart-sytj">
            <li style="width: 50%">
              <div id="mychart1" class="chartClass"></div>
            </li>
            <li style="width: 50%">
              <div id="mychart2" class="chartClass"></div>
            </li>
            <!-- <li>
              <div id="mychart3" class="chartClass"></div>
            </li>
            <li>
              <div id="mychart4" class="chartClass"></div>
            </li> -->
          </ul>
        </div>

        <div class="data-wrap syzg">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <div class="title">
            小区收益雷达图
            <div id="app" class="input-group-btn">
              <select
                class="form-control search-select"
                v-model="communityCode1"
                @change="getIncomeRadar()"
              >
                <option
                  v-for="(item, index) in communityList1"
                  :key="index"
                  :value="item.communityCode"
                >{{item.communityName}}</option>
              </select>
            </div>
            <!-- /btn-group -->
            <!-- <a class="more">更多</a> -->
          </div>
          <div class="chart-box">
            <div id="mychart5" class="chartClass"></div>
          </div>
        </div>

        <div class="data-wrap sy-chart">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <div class="title">
            小区收益波动曲线
            <!-- <a class="more">更多</a> -->
          </div>
          <div class="chart-box">
            <div id="mychart6" class="chartClass"></div>
          </div>
        </div>
      </div>
    </transition>
    <!-- <transition
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
      :duration="800"
    >
    <div  v-show="!zoomed" class="pull-left data-middle"  style="position: absolute; left: 25%;z-index:1;">
      <div class="data-wrap map-box all">
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <a href="#" class="btn-back">
          <span>返回上一级</span>
        </a>
        <div class="instructions">
          <el-slider
            v-model="sliderVal"
            vertical
            height="200px"
            range
            :show-tooltip="false"
            @change="getMapStatus"
          ></el-slider>
        </div>
        <div id="incomeMap" style="width:100%;height:100%;"></div>
      </div>
    </div>
    </transition>-->
    <transition
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
      :duration="800"
    >
      <div
        v-show="!zoomed"
        class="pull-right data-left"
        style="position: absolute; left: 75%;z-index:1;"
      >
        <div class="data-wrap qfpm">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <div class="title">
            用水地区欠费排名
            <!-- <a class="more">更多</a> -->
          </div>
          <div class="cont">
            <div id="mychart7"></div>
          </div>
        </div>

        <div class="data-wrap syzb">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <div class="title">
            不同用水性质收益占比
            <div id="app" class="input-group-btn">
              <select
                class="form-control search-select"
                v-model="communityCode2"
                @change="getIncomePie()"
              >
                <option
                  v-for="(item, index) in communityList2"
                  :key="index"
                  :value="item.communityCode"
                >{{item.communityName}}</option>
              </select>
            </div>
            <!-- /btn-group -->
          </div>
          <ul class="list-syzb">
            <li>
              <!--            <img src="../../../assets/img/chart13.png" />-->
              <div ref="eChartsPie01" style="width: 100%;height: 1.6rem;"></div>
            </li>
            <li>
              <div ref="eChartsPie02" style="width: 100%;height: 1.6rem;"></div>
            </li>
            <li>
              <div ref="eChartsPie03" style="width: 100%;height: 1.6rem;"></div>
            </li>
          </ul>
        </div>

        <div class="data-wrap syzb">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <div class="title">
            不同收费方式收益占比
            <div id="app" class="input-group-btn">
              <select
                class="form-control search-select"
                v-model="communityCode3"
                @change="getIncomePie2()"
              >
                <option
                  v-for="(item, index) in communityList3"
                  :key="index"
                  :value="item.communityCode"
                >{{item.communityName}}</option>
              </select>
            </div>
            <!-- /btn-group -->
          </div>
          <ul class="list-syzb">
            <li>
              <div ref="eChartsPie04" style="width: 100%;height: 1.6rem;"></div>
            </li>
            <li>
              <div ref="eChartsPie05" style="width: 100%;height: 1.6rem;"></div>
            </li>
            <li>
              <div ref="eChartsPie06" style="width: 100%;height: 1.6rem;"></div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <a :class="{'btn-zoomOut':!zoomed,'btn-zoomIn':zoomed}" @click="zoomPanel"></a>

    <area3dMap :mapType="4"></area3dMap>
  </div>
</template>

<style scoped>
.content-box{
  height: calc(100% + 1rem);
}
#mychart7 {
  height: 3rem;
}

.qfpm {
  height: 3.6rem;
}

.syzb {
  height: 2.6rem;
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

.chart-box {
  height: 2.8rem;
}
</style>
<script>
//import echarts from "echarts";
import animate from "animate.css";

// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入折线图
require("echarts/lib/chart/line");
require("echarts/lib/chart/radar");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
require("echarts/lib/component/timeline");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/graphic");
require("echarts/lib/component/legend");
require("echarts/lib/component/tooltip");

import moment from "moment";
import {
  getCommunitySelectInfo,
  get11IndexIncomeTop2Statistics,
  get18IndexIncomeTop5YearStatistics,
  get12IndexArrearsTop5Statistics,
  get23DifferentWaterPriceTypeProportion,
  get15IndexIncomeByElecTypeStatistics,
  get16IndexIncomeByChargeModeStatistics,
  getArrearCommunityCountList
} from "@/api/charge";

import area3dMap from "../../../components/charge/area3dMap";

export default {
  name: "Home",
  components: {
    area3dMap
  },
  data() {
    return {
      sliderVal: [0, 100],
      menuIndex: 4,
      pageSize: 8,
      pageNow: 1,
      polygonInfoWindow: null,
      communityCode1: "", //小区收益雷达图
      communityList1: [], //小区收益雷达图 下拉数据
      communityCode2: "", //不同用水性质收益占比
      communityList2: [], //不同用水性质收益占比 下拉数据
      communityCode3: "", //不同收费方式收益占比
      communityList3: [], //不同收费方式收益占比 下拉数据
      communityCode4: "", //小区收益和用水量排名
      communityList5: [], //小区收益和用水量排名 下拉数据
      polygonEm: require("../../../assets/img/polygon_em.png"),
      polygonTitle: require("../../../assets/img/polygon_title.png"),
      zoomed: this.$store.state.app.leftMeunShowFlag
    };
  },
  beforeDestroy(){
    this.destroyEcharts();
  },
  computed: {},
  mounted() {
    this.getCommunitys().then(res => {
      this.getIncomeRadar();
    });
    this.getIncomeLine();
    this.getIncomeBar();
    this.getIncomeQfpm();
    this.getIncomePie(); // 不同用水性质收益占比
    this.getIncomePie2(); // 不同用水性质收益占比
  },
  methods: {
    zoomPanel: function() {
      this.$store.commit('app/SET_LEFTMEUNSHOWFLAG', !this.zoomed)
      this.zoomed = !this.zoomed;
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
    loadWaterMapInfo: function(opt) {
      opt = opt || {};
      let that = this;
      get13IndexIncomeByRegionStatistics(opt)
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
                    '<div style="color: #fff;width: 190px;height: 100px;background-color: #051127;border: 1px solid #0c2c45;">' +
                    '<div style="float: left;padding-left: 10px;width: 180px;height: 36px;line-height: 36px; background: url(' +
                    that.polygonTitle +
                    '); font-weight: bold; font-size: 16px;">' +
                    item.area.name +
                    "</div>" +
                    '<div style="float: left; width: 100%; height: 30px; margin: 0 10px; line-height: 36px;">应收金额:' +
                    item.area.value.totalMoneys +
                    "</div><br>" +
                    '<div style="float: left; width: 100%; height: 30px; margin: 0 10px; line-height: 36px;">实收金额:' +
                    item.area.value.chargeMoneys +
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
    getCommunitys: function() {
      let that = this;
      return new Promise(function(resolve, reject) {
        getCommunitySelectInfo().then(response => {
          if (response.code == 200) {
            let data = response.data;
            data.unshift({ communityCode: "", communityName: "==请选择==" });
            that.communityList1 = data;
            that.communityList2 = data;
            that.communityList3 = data;
            that.communityList4 = data;
            if (response.data) {
              that.communityCode1 = response.data[0].communityCode;
              that.communityCode2 = response.data[0].communityCode;
              that.communityCode3 = response.data[0].communityCode;
              that.communityCode4 = response.data[0].communityCode;
            }
            resolve();
          }
        });
      });
    },
    getIncomeBar: function() {
      get11IndexIncomeTop2Statistics().then(response => {
        
        let data = response.data;
        // console.log('xxoo', data)
        if (data[0]) {
          let myChart = echarts.init(document.getElementById("mychart1"));
          let option = {
            title: {
              text: data[0].communityName,
              textAlign: "left",
              textStyle: {
                color: "skyblue",
                fontSize: 10
              },
              subtext: `环比:${data[0].ringRatio}%  同比:${data[0].yearOnYear}%`,
              subtextStyle: {
                color: "skyblue",
                fontSize: 15
              }
            },
            grid: {
              left: 10,
              bottom: "3%"
            },
            xAxis: {
              show: false,
              type: "category",
              data: data[0].bar1XData
            },
            yAxis: {
              show: false,
              type: "value"
            },
            series: [
              {
                data: data[0].bar1YData,
                itemStyle: {
                  normal: { color: "#014582" }
                },
                type: "bar",
                barWidth: 3
              }
            ]
          };
          myChart.setOption(option, true);
        }
        if (data[1]) {
          let myChart = echarts.init(document.getElementById("mychart2"));
          let option = {
            title: {
              text: data[1].communityName,
              textAlign: "left",
              textStyle: {
                color: "skyblue",
                fontSize: 10
              },
              subtext: `环比:${data[1].ringRatio}%  同比:${data[1].yearOnYear}%`,
              subtextStyle: {
                color: "skyblue",
                fontSize: 15
              }
            },
            grid: {
              bottom: "3%"
            },
            xAxis: {
              show: false,
              type: "category",
              data: data[1].bar2XData
            },
            yAxis: {
              show: false,
              type: "value"
            },
            series: [
              {
                data: data[1].bar2YData,
                itemStyle: {
                  normal: { color: "#014582" }
                },
                type: "bar",
                barWidth: 3
              }
            ]
          };
          myChart.setOption(option, true);
        }
        if (data[2]) {
          let myChart = echarts.init(document.getElementById("mychart3"));
          let option = {
            title: {
              text: data[2].communityName,
              textAlign: "left",
              textStyle: {
                color: "skyblue",
                fontSize: 10
              },
              subtext: data[2].ringRatio + "%",
              subtextStyle: {
                color: "skyblue",
                fontSize: 18
              }
            },
            grid: {
              bottom: "3%"
            },
            xAxis: {
              show: false,
              type: "category",
              data: data[2].bar3XData
            },
            yAxis: {
              show: false,
              type: "value"
            },
            series: [
              {
                data: data[2].bar3YData,
                itemStyle: {
                  normal: { color: "#014582" }
                },
                type: "bar",
                barWidth: 3
              }
            ]
          };
          myChart.setOption(option, true);
        }
        if (data[3]) {
          let myChart = echarts.init(document.getElementById("mychart4"));
          let option = {
            title: {
              text: data[3].communityName,
              textAlign: "left",
              textStyle: {
                color: "skyblue",
                fontSize: 10
              },
              subtext: data[3].ringRatio + "%",
              subtextStyle: {
                color: "skyblue",
                fontSize: 18
              }
            },
            grid: {
              bottom: "3%"
            },
            xAxis: {
              show: false,
              type: "category",
              data: data[3].bar4XData
            },
            yAxis: {
              show: false,
              type: "value"
            },
            series: [
              {
                data: data[3].bar4YData,
                itemStyle: {
                  normal: { color: "#014582" }
                },
                type: "bar",
                barWidth: 3
              }
            ]
          };
          myChart.setOption(option, true);
        }
      });
    },
    getIncomeRadar: function() {
      let postData = {
        communityCode: this.communityCode1
      };
      get23DifferentWaterPriceTypeProportion(postData).then(response => {
        let data = response.data;
        let myChart = echarts.init(document.getElementById("mychart5"));
        let indicators = [];
        data.indicatorData.forEach(x => {
          indicators.push({ text: x });
        });
        let option = {
          tooltip:{
            confine: true
          },
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
          series: [
            {
              name: '小区收益雷达图',
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
                  value: data.seriesData,
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
        myChart.setOption(option, true);
      });
    },
    getIncomeLine: function() {
      let postData = {
        month: moment()
          .month(moment().month() - 1)
          .format("YYYYMM")
      };
      get18IndexIncomeTop5YearStatistics(postData).then(response => {
        let data = response.data;
        let myChart = echarts.init(document.getElementById("mychart6"));
        let legendData = [];
        let xData = [];
        let seriesData = [];
        data.xData.forEach(x => {
          xData.push(moment(x, "YYYYMM").format("M月"));
        });
        data.series.forEach(x => {
          legendData.push(x.name);
          seriesData.push({
            name: x.name,
            type: "line",
            stack: "金额",
            areaStyle: {},
            data: x.data
          });
        });
        let option = {
          tooltip:{
              trigger: 'axis',
              confine: true
          },
          color: ['#00FFB7','#00E3FF', '#D7FDEE', '#DFFAC5', '#F38565','#9EEE4E','#F38565'],
          legend: {
            itemGap: 5,
            textStyle: {
              color: "#fff",
              fontSize: 8,
              top: 0
            },
            data: legendData
          },
          grid: {
            top: '30%', //
            left: "3%",
            right: "6%",
            bottom: "20%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              axisLabel: {
                color: "#fff",
                fontSize: 10,
                interval: 0,
                align: "center"
              },
              axisLine: {
                lineStyle: {
                  color: "#fff"
                }
              },
              splitLine: {
                show: false
              },
              data: xData
            }
          ],
          yAxis: [
            {
              name: "单位：元",
              nameTextStyle: {
                fontSize: 10
              },
              type: "value",
              axisLabel: {
                fontSize: 10,
                color: "#fff"
              },
              axisLine: {
                lineStyle: {
                  color: "#fff"
                }
              },
              splitLine: {
                lineStyle: {
                  type: "dotted"
                }
              }
            },
            {
              name: "小区名称",
              nameTextStyle: {
                fontSize: 10
              },
              type: "value",
              axisLabel: {
                fontSize: 10,
                color: "#fff"
              },
              axisLine: {
                lineStyle: {
                  color: "#fff"
                }
              }
            }
          ],
          series: seriesData
        };
        myChart.setOption(option, true);
      });
    },
    getIncomeQfpm: function() {
      getArrearCommunityCountList({flag: '1'}).then(r => {
        let resData = r.data;
        let el = echarts.init(document.getElementById("mychart7"));
        let optionData = {};
        optionData.month = [];
        optionData.datas = [];
        // optionData.communityNames = [];
        //
        resData.forEach((value, index) => {
          optionData.month.push(
            value.month.substring(0, value.month.length - 2) +
              "-" +
              value.month.substring(value.month.length - 2, value.month.length)
          );
          let total = 0;
          let d = { series: [{ data: [] }] }; // 定义数据
          value.values.forEach((v, i) => {
            d.series[0].data.push({name: v.communityName, value: v.totalMoney});
          });
          // d.series[0].data = [total, total, total, total, total];
          d.series[0].data = d.series[0].data.reverse(); // 数组顺序反向
          optionData.datas.push(d);
          // optionData.communityNames.push(communityName.reverse());
        });
        // console.log("optionData", optionData);
        
        let options = {
          baseOption: {
             tooltip:{
                confine: true
              },
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
              left: 0,
              right: 0,
              bottom: 25,
              top: 0,
              containLabel: true
            },
            textStyle: {
              color: "#61CBFF"
            },
            series: [
              {
                name: '',
                type: 'pie',
                center: ['50%', '40%'],
                radius: '38%'
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
          // options.baseOption.yAxis.data = optionData.communityNames[obj.currentIndex];
          el.setOption(options);
        });
      });
    },
    getIncomePie() {
      get15IndexIncomeByElecTypeStatistics({
        communityCode: this.communityCode2
      }).then(r => {
        let TotalNumber = 0;
        let options = [];
        // 累计总数
        r.data.forEach((value, index) => {
          TotalNumber += value.value;
        });

        r.data.forEach((value, index) => {
          let option = {
            grid: {
              top: 0
            },
            graphic: [
              {
                type: "text",
                left: "center",
                top: "center",
                style: {
                  text: Math.round((value.value / TotalNumber) * 100) + "%",
                  fill: "#ffffff",
                  font: 'bolder .8em "Microsoft YaHei", sans-serif'
                }
              },
              {
                type: "text",
                left: "center",
                // bottom: '0',
                bottom: "1",
                style: {
                  text: value.name,
                  fill: "#ffffff",
                  font: 'bolder .8em "Microsoft YaHei", sans-serif'
                }
              }
            ],
            series: [
              {
                name: value.name,
                type: "pie",
                radius: ["65%", "80%"],
                avoidLabelOverlap: false,
                hoverAnimation: false,
                emphasis: {
                  show: false
                },
                itemStyle: {
                  color:
                    index === 0
                      ? "#003BFF"
                      : index === 1
                      ? "#00CFFF"
                      : "#00FFA7"
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                label: {
                  show: false
                },
                data: [1]
              }
            ]
          };
          options.push(option);
        });
        echarts.init(this.$refs.eChartsPie01).setOption(options[0]);
        echarts.init(this.$refs.eChartsPie02).setOption(options[1]);
        echarts.init(this.$refs.eChartsPie03).setOption(options[2]);
      });
    },
    getIncomePie2() {
      get16IndexIncomeByChargeModeStatistics({
        communityCode: this.communityCode3
      }).then(r => {
        let TotalNumber = 0;
        let options = [];
        // 累计总数
        r.data.forEach((value, index) => {
          TotalNumber += value.value;
        });

        r.data.forEach((value, index) => {
          let option = {
            grid: {
              top: 0
            },
            graphic: [
              {
                type: "text",
                left: "center",
                top: "center",
                style: {
                  text: Math.round((value.value / TotalNumber) * 100) + "%",
                  fill: "#ffffff",
                  font: 'bolder .8em "Microsoft YaHei", sans-serif'
                }
              },
              {
                type: "text",
                left: "center",
                // bottom: '0',
                bottom: "1",
                style: {
                  text: value.name,
                  fill: "#ffffff",
                  font: 'bolder .8em "Microsoft YaHei", sans-serif'
                }
              }
            ],
            series: [
              {
                name: value.name,
                type: "pie",
                radius: ["65%", "80%"],
                avoidLabelOverlap: false,
                hoverAnimation: false,
                emphasis: {
                  show: false
                },
                itemStyle: {
                  color:
                    index === 0
                      ? "#003BFF"
                      : index === 1
                      ? "#00CFFF"
                      : "#00FFA7"
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                label: {
                  show: false
                },
                data: [1]
              }
            ]
          };
          options.push(option);
        });
        echarts.init(this.$refs.eChartsPie04).setOption(options[0]);
        echarts.init(this.$refs.eChartsPie05).setOption(options[1]);
        echarts.init(this.$refs.eChartsPie06).setOption(options[2]);
      });
    },
    destroyEcharts() {
      // console.log("destroy echarts");
      let mychart1 = echarts.getInstanceByDom(
        document.getElementById("mychart1")
      );
      if (mychart1) {
        mychart1.clear();
        echarts.dispose(mychart1);
      }

      let mychart2 = echarts.getInstanceByDom(
        document.getElementById("mychart2")
      );
      if (mychart2) {
        mychart2.clear();
        echarts.dispose(mychart2);
      }

      let mychart3 = echarts.getInstanceByDom(
        document.getElementById("mychart3")
      );
      if (mychart3) {
        mychart3.clear();
        echarts.dispose(mychart3);
      }

      let mychart5 = echarts.getInstanceByDom(
        document.getElementById("mychart5")
      );
      if (mychart5) {
        mychart5.clear();
        echarts.dispose(mychart5);
      }

      let mychart6 = echarts.getInstanceByDom(
        document.getElementById("mychart6")
      );
      if (mychart6) {
        mychart6.clear();
        echarts.dispose(mychart6);
      }

      let mychart7 = echarts.getInstanceByDom(
        document.getElementById("mychart7")
      );
      if (mychart7) {
        mychart7.clear();
        echarts.dispose(mychart7);
      }

      let eChartsPie01 = echarts.getInstanceByDom(this.$refs.eChartsPie01);
      if (eChartsPie01) {
        eChartsPie01.clear();
        echarts.dispose(eChartsPie01);
      }

      let eChartsPie02 = echarts.getInstanceByDom(this.$refs.eChartsPie02);
      if (eChartsPie02) {
        eChartsPie02.clear();
        echarts.dispose(eChartsPie02);
      }

      let eChartsPie03 = echarts.getInstanceByDom(this.$refs.eChartsPie03);
      if (eChartsPie03) {
        eChartsPie03.clear();
        echarts.dispose(eChartsPie03);
      }

      let eChartsPie04 = echarts.getInstanceByDom(this.$refs.eChartsPie04);
      if (eChartsPie04) {
        eChartsPie04.clear();
        echarts.dispose(eChartsPie04);
      }

      let eChartsPie05 = echarts.getInstanceByDom(this.$refs.eChartsPie05);
      if (eChartsPie05) {
        eChartsPie05.clear();
        echarts.dispose(eChartsPie05);
      }

      let eChartsPie06 = echarts.getInstanceByDom(this.$refs.eChartsPie06);
      if (eChartsPie06) {
        eChartsPie06.clear();
        echarts.dispose(eChartsPie06);
      }
    }
  }
};
</script>
