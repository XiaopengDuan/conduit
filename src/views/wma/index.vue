<template>
  <!--顶部//-->
  <div class="content-box">
    <div class="pull-left data-left">
      <div class="data-wrap question-table">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <!--四个装饰角//-->
        <div class="title">数据采集</div>
        <div class="chart-box">
          <ul class="sjcj-list">
            <li class="sjcj-list01">
              接入
              <br />水表数
              <div class="number">
                {{dataCollect.meter_access_count}}
                <small v-if="dataCollect.meter_access_count_flag === '1'" style="color: #33C481">↑</small>
                <small v-if="dataCollect.meter_access_count_flag === '0'" style="color: red">↓</small>
              </div>
            </li>
            <li class="sjcj-list02">
              采集准确
              <br />水表数
              <div class="number">
                {{dataCollect.meter_correct_count}}
                <small v-if="dataCollect.meter_correct_count_flag === '1'" style="color: #33C481">↑</small>
                <small v-if="dataCollect.meter_correct_count_flag === '0'" style="color: red">↓</small>
              </div>
            </li>
            <li class="sjcj-list03">
              接入不完全
              <br />水表数
              <div class="number">
                {{dataCollect.meter_incomplete_count}}
                <small v-if="dataCollect.meter_incomplete_count_flag === '1'" style="color: #33C481">↑</small>
                <small v-if="dataCollect.meter_incomplete_count_flag === '0'" style="color: red">↓</small>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="data-wrap water-consumption">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <!--四个装饰角//-->
        <div class="title">数据采集以及占比</div>
        <div class="chart-box">
          <ul class="sjcj-list sjcjzb">
            <li class="sjcj-list01">
              <div class="circular">
                <span>{{dataCollectProp.data_correct_size}}</span>
                <div class="water water1" :style="waterStyle('01')"></div>
              </div>
              <div class="number">采集准确的数据量</div>
            </li>
            <li class="sjcj-list02">
              <div class="circular">
                <span>{{dataCollectProp.data_proportion}}</span>
                <div class="water water1" :style="waterStyle('02')"></div>
                <!-- <div class="water water2" style="top:15%;"></div>
                <div class="water water3" style="top:10%;"></div> -->
              </div>
              <div class="number">数据总量的数据占比</div>
            </li>
            <li class="sjcj-list03">
              <div class="circular">
                <span>{{dataCollectProp.data_incomplete_size}}</span>
                <div class="water water1" :style="waterStyle('03')"></div>
              </div>
              <div class="number">采集不完整的数据量</div>
            </li>
          </ul>
        </div>
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
        <!--右上角按钮-->
      
        <!--右上角按钮//-->
        <div class="watermeter-box">
          <div class="ycbsjcj-bg">
            <img src="../../assets/img/ycbsjcj_bg.png" />
            <div class="zcjsjl">
              总采集数据量
              <h3>{{meterInfo.data_collect_size }}</h3>
              <img v-if="meterInfo.data_collect_size_flag === '1'" src="../../assets/img/jiantou.png" />
              <img v-if="meterInfo.data_collect_size_flag === '0'" src="../../assets/img/jiantou_red_down.png" />
            </div>
            <ul class="ycbsjcj-list">
              <li class="list01">
                <img src="../../assets/img/ycbsjcjfx_li01.png" />
                <span>水表数</span>
                <span class="data">
                  {{meterInfo.meter_access_count }}
                 <small v-if="meterInfo.meter_access_count_flag === '1'" style="color: #33C481">↑</small>
                 <small v-if="meterInfo.meter_access_count_flag === '0'" style="color: red">↓</small>
                </span>
              </li>
              <li class="list02">
                <img src="../../assets/img/ycbsjcjfx_li03.png" />
                <span>丢失水表数</span>
                <span class="data">
                  {{meterInfo.meter_lose_count }}
                  <small v-if="meterInfo.meter_lose_count_flag === '1'" style="color: #33C481">↑</small>
                  <small v-if="meterInfo.meter_lose_count_flag === '0'" style="color: red">↓</small>
                </span>
              </li>
              <li class="list03">
                <img src="../../assets/img/ycbsjcjfx_li04.png" />
                <span>水表采集率</span>
                <span class="data">
                  {{meterInfo.meter_collect_rate }}
                   <small v-if="meterInfo.meter_collect_rate_flag === '1'" style="color: #33C481">↑</small>
                   <small v-if="meterInfo.meter_collect_rate_flag === '0'" style="color: red">↓</small>
                </span>
              </li>
              <li class="list04">
                <img src="../../assets/img/ycbsjcjfx_li07.png" />
                <span>水表丢失率</span>
                <span class="data">
                  {{meterInfo.meter_lost_rate }}
                  <small v-if="meterInfo.meter_collect_rate_flag === '1'" style="color: #33C481">↑</small>
                   <small v-if="meterInfo.meter_collect_rate_flag === '0'" style="color: red">↓</small>
               
                </span>
              </li>
              <li class="list05">
                <img src="../../assets/img/ycbsjcjfx_li06.png" />
                <span>水表异常率</span>
                <span class="data">
                  {{meterInfo.meter_abnormal_rate }}
                  <small v-if="meterInfo.meter_abnormal_rate_flag === '1'" style="color: #33C481">↑</small>
                   <small v-if="meterInfo.meter_abnormal_rate_flag === '0'" style="color: red">↓</small>
                </span>
              </li>
              <li class="list06">
                <img src="../../assets/img/ycbsjcjfx_li05.png" />
                <span>数据采集率</span>
                <span class="data">
                  {{meterInfo.data_collect_rate }}
                   <small v-if="meterInfo.data_collect_rate_flag === '1'" style="color: #33C481">↑</small>
                   <small v-if="meterInfo.data_collect_rate_flag === '0'" style="color: red">↓</small>
                </span>
              </li>
              <li class="list07">
                <img src="../../assets/img/ycbsjcjfx_li05.png" />
                <span>数据完整率</span>
                <span class="data">
                  {{meterInfo.data_complete_rate }}
                   <small v-if="meterInfo.data_complete_rate_flag === '1'" style="color: #33C481">↑</small>
                   <small v-if="meterInfo.data_complete_rate_flag === '0'" style="color: red">↓</small>
                
                </span>
              </li>
              <li class="list08">
                <img src="../../assets/img/ycbsjcjfx_li02.png" />
                <span>数据丢失率</span>
                <span class="data">
                  {{meterInfo.data_lost_rate }}
                   <small v-if="meterInfo.data_lost_rate_flag === '1'" style="color: #33C481">↑</small>
                   <small v-if="meterInfo.data_lost_rate_flag === '0'" style="color: red">↓</small>
                
                </span>
              </li>
              <li class="list09">
                <img src="../../assets/img/ycbsjcjfx_li02.png" />
                <span>数据异常率</span>
                <span class="data">
                  {{meterInfo.data_abnormal_rate }}
                   <small v-if="meterInfo.data_abnormal_rate_flag === '1'" style="color: #33C481">↑</small>
                   <small v-if="meterInfo.data_abnormal_rate_flag === '0'" style="color: red">↓</small>
                
                </span>
              </li>
            </ul>
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
        <div class="title">数据量占比</div>
        <div class="chart-box" ref="echart2" style="height: 80%;width: 100%;"></div>
      </div>
      <div class="data-wrap water-consumption">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <!--四个装饰角//-->
        <div class="title">数据占比</div>
        <div class="chart-box">
          <ul class="pie-list">
            <template v-for="(item,index) in waterMeterDataProp">
              <li class="pie01" :key="index">
                <div
                  :class="{'pull-left':index%2==0,'pull-right':index%2==1}"
                  :id="'pieChart'+ index "
                  style="width:80px;height:80px;"
                >{{initSmallPieChart(index,item)}}</div>
                <div :class="{'pull-left':index%2==0,'pull-right':index%2==1}" :style="{'float': index%2==1 ? 'left':'right'}" style="padding:5px">
                  <p :style="{'text-align': index%2==1 && 'right'}">{{item.count}}</p>
                  <p  class="mes" :style="{color:pieColorList[index*2+1],'text-align': index%2==1 && 'right'}">{{item.name}}</p>
                  <p :style="{'text-align': index%2==1 && 'right'}">{{parseFloat(item.prop.substring(0, item.prop.length-1)).toFixed(2)+'%'}}</p>
                </div>
              </li>
            </template>
            <!-- <li class="pie01">
              <div class="pie pull-left" style="transform: rotate(.6turn);"></div>
              <div class="pull-left" >
                <p>238923</p>
                <p class="mes">每天采集的水表数</p>
                <p>78%</p>
              </div>
            </li>
            <li class="pie02">
              <div class="pie pull-right"></div>
              <div class="pull-right">
                <p>238923</p>
                <p class="mes">每天采集的水表数</p>
                <p>78%</p>
              </div>
            </li>
            <li class="pie03">
              <div class="pie pull-left"></div>
              <div class="pull-left">
                <p>238923</p>
                <p class="mes">每天采集的水表数</p>
                <p>78%</p>
              </div>
            </li>-->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getWaterMeterDataCollect,
  getWaterMeterDataCollectProp,
  getAllWaterMeterInfo,
  getWaterMeterNearly31DayInfo,
  getWaterMeterDataProp,
  getWaterMeterDataCountProp
} from "@/api/wma";
import echarts from "echarts";
export default {
  name: "index",
  mounted() {
    this.loadDataCollect();
    this.loadDataCollectProp();
    this.loadMeterInfo();
    this.loadChart();
  },
  data() {
    return {
      dataCollect: {
        meter_incomplete_count: "",
        meter_access_count: "",
        meter_correct_count: ""
      },
      dataCollectProp: {
        data_proportion: "",
        data_correct_size: "",
        data_incomplete_size: ""
      },
      meterInfo: {
        meter_access_count: "",
        meter_correct_count: "",
        meter_incomplete_count: "",
        meter_collect_count: "",
        meter_lose_count: "",
        meter_abnormal_count: "",
        meter_collect_rate: "",
        meter_lost_rate: "",
        meter_abnormal_rate: "",
        data_collect_rate: "",
        data_complete_rate: "",
        data_lost_rate: "",
        data_abnormal_rate: "",
        data_collect_size: "",
        data_lost_size: "",
        data_correct_size: "",
        data_incomplete_size: ""
      },
      waterMeterDataProp: [],
      pieColorList: [
        "#2D2F44",
        "#4365F4",
        "#2D2F44",
        "#00FFF5",
        "#2D2F44",
        "#00C888"
      ]
    };
  },
  created() {
    // setstore('meterdata', 0)
  },
  methods: {
    waterStyle(type){ // 设置数据量球型水量高度样式
        let obj_style = {}
        // 数据总量的数据占比
        
        if(type==='02' && this.dataCollectProp.data_proportion){ 
            let str_def = this.dataCollectProp.data_proportion.substring(0,this.dataCollectProp.data_proportion.length-1)
            let num_def =  100 - parseInt(str_def)
            obj_style.top = num_def>80?70:num_def + '%' // 70%才会显示
        } else if(this.dataCollectProp.data_correct_size && this.dataCollectProp.data_incomplete_size){
            let num_correct = parseInt(this.dataCollectProp.data_correct_size.substring(0,this.dataCollectProp.data_correct_size.length-1))
            let incomplete =  parseInt(this.dataCollectProp.data_incomplete_size.substring(0,this.dataCollectProp.data_incomplete_size.length-1))
            if(this.dataCollectProp.data_correct_size.endsWith('万')) num_correct = num_correct * 10000
            if(this.dataCollectProp.data_incomplete_size.endsWith('万')) incomplete = incomplete * 10000
            let num_sum = num_correct + incomplete
            var num_def = 0 
            if(type==='01'){
              num_def = 100 - ((num_correct / num_sum).toFixed(2) * 100)
            } else if(type==='03'){
              num_def = 100 - ((incomplete / num_sum).toFixed(2) * 100)
            }
            obj_style.top = num_def>80?70:num_def + '%'
        }
        return obj_style
    },
    loadDataCollect() {
      getWaterMeterDataCollect().then(res => {
        if (res.code == 200) {
          this.dataCollect = res.data;
        }
      });
    },
    loadDataCollectProp() {
      getWaterMeterDataCollectProp().then(res => {
        if (res.code == 200) {
          this.dataCollectProp = res.data;
        }
      });
    },
    loadMeterInfo() {
      getAllWaterMeterInfo().then(res => {
        if (res.code == 200) {
          this.meterInfo = res.data;
        }
      });
    },
    loadChart() {
      getWaterMeterNearly31DayInfo().then(res => {
        if (res.code == 200) {
          this.initChartBox1(res.data);
        }
      });

      getWaterMeterDataProp().then(res => {
        if (res.code == 200) {
          this.waterMeterDataProp = res.data;
        }
      });

      getWaterMeterDataCountProp().then(res => {
        if (res.code == 200) {
          this.initPieChart(res.data);
        }
      });
    },
    initChartBox1(chartData) {
      let legend = [ "数据采集率","准确的水表率"];
      echarts.init(this.$refs.echart1).setOption({
       tooltip: {
          confine: true,
            trigger: 'axis',
            formatter: function (data) {
              return `${data[0].name}<br/>${data[0].marker}${data[0].seriesName}:${data[0].value}%<br/>${data[1].marker}${data[1].seriesName}:${data[1].value}%`;
            }
          },
        legend: {
          icon: "circle",
          type: "plain",
          data: legend,
          textStyle: {
            color: "#FFFFFF"
          },
          right: "40"
        },
        xAxis: [
          {
            type: "category",
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
            data: chartData.meterCollectRates,
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
            data: chartData.meterCorrectRates,
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
          }
        ]
      });
    },
    initPieChart(chartData) {
      let option = {
       tooltip: {
          confine: true,
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%"
        },
        legend: {
          x: "center",
          y: "bottom",
          data: ["实际采集数据量占比", "缺失数据量占比"],
          textStyle: {
            color: "#fff"
          }
        },

        calculable: true,
        series: [
          {
            name: "数据量占比",
            type: "pie",
            radius: [30, 60],
            center: ["50%", "40%"],
            roseType: "radius",
            itemStyle: {
              normal: {
                color: function(params) {
                  //自定义颜色
                  var colorList = ["#00BE7C", "#0091F7"];
                  return colorList[params.dataIndex];
                }
              }
            },
            label: {
              fontSize: 10
            },
            labelLine: {
              normal: {
                length: 5,
                length2: 5
              }
            },
            data: [
              {
                value: chartData.data_collect_rate,
                name: "实际采集数据量占比"
              },
              { value: chartData.data_lost_rate, name: "缺失数据量占比" }
            ]
          }
        ]
      };
      echarts.init(this.$refs.echart2).setOption(option);
    },
    initSmallPieChart(index, chartData) {
      var that = this;
      this.$nextTick(function() {
        let d1 = Number(chartData.prop.replace("%", ""));
        let d2 = 100 - d1;
        let e1 = echarts.init(document.getElementById("pieChart" + index));
        let option = {
          calculable: true,
          series: [
            {
              name: "面积模式",
              type: "pie",
              labelLine: {
                show: false
              },
              label: {
                show: false
              },
             tooltip: {
                confine: true,
                show: false,
                trigger:"none",
                triggerOn: "none"
              },
              itemStyle: {
                normal: {
                  color: function(params) {
                    //自定义颜色
                    var colorList = [
                      "#4365F4",
                      "#2D2F44",
                      "#00FFF5",
                      "#00C888",
                      "#00C888",
                      "#00C888"
                    ];
                    // console.log(colorList[index * 2 + params.dataIndex],index)
                    return colorList[index * 2 + params.dataIndex];
                  }
                }
              },
              radius: [0, 40],
              center: ["50%", "50%"],
              roseType: "radius",
              data: [{ value: d1, name: "" }, { value: d2, name: "" }]
            }
          ]
        };
        e1.setOption(option);
      });
    }
  }
};
</script>

<style scoped>
</style>
