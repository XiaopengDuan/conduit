<template>
  <div class="wap-wrap" style="padding: 0;">
    <div class="searchPanel">
      <el-select
        class="el-modification search-comunity"
        v-model="userAddress"
        @change="changeComunity">
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
          <span style="background-image:none" @click="searchs">查询</span>
        </a>
      </div>
    </div>
    <h1 class="main-title">采集的数据总量</h1>
    <div class="number">
      <template v-for="(value, index) in data_collect_size.split('')">
        <span>{{value}}</span>
      </template>
    </div>
    <ul class="list-sjcj">
      <li>
        <div class="circular_bg">
          <div class="circular">
            <span>{{data_correct_size|formatNumber}}</span>
            <div class="water water1" :style="{backgroundImage: `url(${waterBackgroundImage})`}"></div>
            <div class="water water2" :style="{backgroundImage: `url(${waterBackgroundImage})`}"></div>
            <div class="water water3" :style="{backgroundImage: `url(${waterBackgroundImage})`}"></div>
          </div>
        </div>
        <h5>采集准确数</h5>
      </li>
      <li>
        <div class="circular_bg">
          <div class="circular">
            <span>{{data_incomplete_size|formatNumber}}</span>
            <div class="water water1" :style="{backgroundImage: `url(${waterBackgroundImage})`}"></div>
            <div class="water water2" :style="{backgroundImage: `url(${waterBackgroundImage})`}"></div>
            <div class="water water3" :style="{backgroundImage: `url(${waterBackgroundImage})`}"></div>
          </div>
        </div>
        <h5>采集异常数</h5>
      </li>
      <li>
        <div class="circular_bg">
          <div class="circular">
            <span>{{data_lost_size|formatNumber}}</span>
            <div class="water water1" :style="{backgroundImage: `url(${waterBackgroundImage})`}"></div>
            <div class="water water2" :style="{backgroundImage: `url(${waterBackgroundImage})`}"></div>
            <div class="water water3" :style="{backgroundImage: `url(${waterBackgroundImage})`}"></div>
          </div>
        </div>
        <h5>丢失数据量</h5>
      </li>
      <li>
        <div class="circular_bg">
          <div class="circular">
            <span>{{data_collect_rate}}%</span>
            <div class="water water1" :style="{backgroundImage: `url(${waterBackgroundImage})`}"></div>
            <div class="water water2" :style="{backgroundImage: `url(${waterBackgroundImage})`}"></div>
            <div class="water water3" :style="{backgroundImage: `url(${waterBackgroundImage})`}"></div>
          </div>
        </div>
        <h5>数据采集率</h5>
      </li>
    </ul>
    <div class="chart-sjcj">
      <div class="chart-box" ref="echart1" style="height: 100%;width: 100%;"></div>
    </div>
    <ul class="chart-list">
      <li class="transition-left">
        <div class="chart-box" ref="echart4" style="height: 100%;width: 100%;"></div>
      </li>
      <li>
        <div class="chart-box" ref="echart2" style="height: 100%;width: 100%;"></div>
      </li>
      <li>
        <div class="chart-box" ref="echart5" style="height: 100%;width: 100%;"></div>
      </li>
      <li class="transition-right">
        <div class="chart-box" ref="echart3" style="height: 100%;width: 100%;"></div>
      </li>
    </ul>
    <div class="chart-sjcj chart-sjcj-left" style="top:1.1rem;">
      <div ref="echart0" style="height: 100%;width: 100%;"></div>
    </div>
    <div class="chart-sjcj chart-sjcj-right" style="top:1.1rem;">
      <div class="chart-box">
        <ul class="list-syzb">
          <li>
            <div ref="eChartsPie01" style="width: 100%;height: 1.6rem;"></div>
          </li>
          <li>
            <div ref="eChartsPie02" style="width: 100%;height: 1.6rem;"></div>
          </li>
          <li>
            <div ref="eChartsPie03" style="width: 100%;height: 1.6rem;"></div>
          </li>
        </ul>
        <ul class="list-syzb2">
          <li>
            <div ref="eChartsPie04" style="width: 100%;height: 1.6rem;"></div>
          </li>
          <li>
            <div ref="eChartsPie05" style="width: 100%;height: 1.6rem;"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  let echarts = require("echarts");
  import {getCommunityAll} from "@/api/usercenter";
  import {get15IndexIncomeByElecTypeStatistics} from "@/api/charge";
  import {getWaterMeterDataRate, getWaterMeterDataCount, getRateDataByTimeLine} from "@/api/wma";
  import moment from "moment";

  export default {
    name: "dataCollected",
    mounted() {
      let body = document.getElementsByTagName('body')[0];
      body.style.backgroundSize = "100% 100%";
      body.style.backgroundImage = "url(" + require("../../assets/img/sjcj_bg.jpg") + ")";

      this.syncPageData()
      // this.echartBox2()
      // this.echartBox0();
      this.loadData();
    },
    beforeRouteLeave(to, from, next) {
      let body = document.getElementsByTagName('body')[0];
      body.style.backgroundImage = "";
      body.style.backgroundSize = "";
      next();
    },
    data() {
      return {
        searchDate: moment()
          .add(-1, "day")
          .format("YYYYMMDD"),
        userAddress: "",
        data_collect_size: '',// 数据总量
        data_correct_size: '',//采集准确数据量
        data_lost_size: '', //缺失的数据量
        data_collect_rate: '', // 数据采集率
        data_incomplete_size: '',//采集异常数
        community: [],
        waterMeterDataRateData: {},
        waterBackgroundImage: require('../../assets/img/wave.png'),
      }
    },
    methods: {
      searchs() {
        this.syncPageData()
      },
      loadData() {
        getCommunityAll().then(res => {
          if (res.code === 200) {
            let data = res.data;
            data.unshift({communityCode: "", communityName: "==请选择=="});
            this.community = data;
          }
        }).catch(err => {
        });
      },
      getDate30() {
        let yesterday = moment()
          .add(-1, "day")
          .format("YYYYMMDD");

        let chooseDate = moment(
          this.searchDate ? this.searchDate : yesterday,
          "YYYYMMDD"
        );

        let end = chooseDate.format("YYYYMMDD");
        let begin = chooseDate.add(-30, "days").format("YYYYMMDD");

        return {begin, end, yesterday}
      },
      syncPageData() {
        let {begin, end, yesterday} = this.getDate30()
        let searchItems = {
          communityCode: this.userAddress,
          endTime: end,
          pageNum: "1",
          pageSize: "30",
          queryDate: "",
          rangDate: "true",
          startTime: begin
        }
        let searchItems2 = {
          communityCode: this.userAddress,
          endTime: "",
          pageNum: "",
          pageSize: "",
          queryDate: this.searchDate ? this.searchDate : yesterday,
          rangDate: "false",
          startTime: ""
        }
        let p1 = getWaterMeterDataRate(searchItems)
        let p2 = getWaterMeterDataCount(searchItems2)
        let p3 = getRateDataByTimeLine(searchItems2)
        let p4 = getWaterMeterDataCount(searchItems)
        this.$store.dispatch('app/openLoading')
        Promise.all([p1, p2, p3, p4]).then(result => {
          this.$store.dispatch('app/closeLoading')
          // console.log('res', result[2])
          let r = result[0]
          let res = {
            data_abnormal_rate: [],
            data_collect_rate: [],
            data_complete_rate: [],
            data_lost_rate: [],
            day: [],
            meter_abnormal_rate: [],
            meter_collect_rate: [],
            meter_lost_rate: []
          }
          let res2 = {
            data_collect_size: [],
            data_correct_size: [],
            data_incomplete_size: [],
            data_incomplete_size: [],
            data_lost_size: [],
            day: [],
            meter_abnormal_count: [],
            meter_access_count: [],
            meter_collect_count: [],
            meter_correct_count: [],
            meter_incomplete_count: [],
            meter_lose_count: [],
          }
          this.data_collect_size = result[1].data[0].data_collect_size  // 数据总量
          this.data_correct_size = result[1].data[0].data_correct_size // 采集准确数据量
          this.data_incomplete_size = result[1].data[0].data_incomplete_size //异常数据
          this.data_lost_size = result[1].data[0].data_lost_size // 缺失的数据量
          this.data_collect_rate = result[2].data.data_collect_rate[0] // 数据采集率
          this.waterMeterDataRateData = this.formartData(r.data, res)
          // this.waterMeterDataRateData = this.formartData(result[3].data, res2)
          let waterMeterDataCountData = this.formartData(result[3].data, res2)
          this.echartBox0()
          // console.log('result[1].data', result[1].data)
          this.eChartsPieBox(result[2].data, result[1].data) //右侧饼图数据
          this.echartBox1(waterMeterDataCountData) //数据采集总量变化接口
          this.echartBox2(waterMeterDataCountData) 
          this.echartBox5(waterMeterDataCountData) 
          this.echartBox3(waterMeterDataCountData) 
          this.echartBox4()//最近一个月的数据采集率
        })　　　　　　　　　　　　　　　　　　　　　　　　　
      },
      formartData(arry, sz) {
        arry.forEach((value, index) => {
          Object.keys(sz).forEach((v, i) => {
            sz[v].push(value[v])
          })
        })
        return sz
      },
      echartBox0(days) {
        // this.searchDate 
        let legend =  ["数据采集率", "数据采集准确率", "采集数据异常率"];
        let list = [
          this.waterMeterDataRateData.data_collect_rate,
          this.waterMeterDataRateData.data_complete_rate,
          this.waterMeterDataRateData.data_lost_rate,
        ];

        echarts.init(this.$refs.echart0).setOption({
         tooltip: {
          confine: true,
            trigger: 'axis',
            formatter: function (data) {
              return `${data[0].name}<br/>${data[0].marker}${data[0].seriesName}:${data[0].value}%<br/>${data[1].marker}${data[1].seriesName}:${data[1].value}%<br/>${data[2].marker}${data[2].seriesName}:${data[2].value}%`;
            }
          },
          legend: {
            icon: "circle",
            type: 'plain',
            data: legend,
            textStyle: {
              color: '#FFFFFF'
            }
          },
          xAxis: [{
            type: 'category',
            offset: 10,
            boundaryGap: false,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            axisTick: {
              show: false
            },
            data: this.waterMeterDataRateData.day
          }],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#FFFFFF'
                }
              },
              axisLabel: {
                formatter: function(value){
                  if (!value) return ''
                  let num = parseInt(value)
                  let r = ''
                  if(num > 9999 && num<9999999) {
                    r =  parseFloat(num/10000) + '万'
                  } else if (num> 9999999) {
                    r = parseFloat(num/10000000) + '千万'
                  } else {
                    r = num
                  }
                  return r
                }
              },
              
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: '#013966',
                }
              }
            }
          ],
          series: [
            {
              name: legend[0],
              symbol: 'none',
              smooth: true,
              data: list[0],
              type: 'line',
              itemStyle: {
                color: '#5e01ff',
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
              symbol: 'none',
              smooth: true,
              data: list[1],
              type: 'line',
              itemStyle: {
                color: '#5fb9ff',
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
              symbol: 'none',
              smooth: true,
              data: list[2],
              type: 'line',
              itemStyle: {
                color: '#04faf5',
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
            },
          ]
        });
      },
      echartBox1(data) {
        if (!data) return
        echarts.init(this.$refs.echart1).setOption({
          grid: {
            top: 20,
            bottom: 30,
            left: 60,
          },
         tooltip: {
          confine: true,
            trigger: 'axis',
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            axisTick: {
              show: false
            },
            data: data.day
          }],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#FFFFFF'
                }
              },
              axisLabel: {
                formatter: function(value){
                  if (!value) return ''
                  let num = parseInt(value)
                  let r = ''
                  if(num > 9999 && num<9999999) {
                    r =  parseFloat(num/10000) + '万'
                  } else if (num> 9999999) {
                    r = parseFloat(num/10000000) + '千万'
                  } else {
                    r = num
                  }
                  return r
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: '#013966',
                }
              }
            }
          ],
          series: [
            {
              name: '数据总量变化',
              symbol: 'none',
              smooth: true,
              data: data.data_collect_size,
              type: 'line',
              itemStyle: {
                color: '#5e01ff',
                opacity: 0
              },
              areaStyle: {
                color: {
                  type: "linear",
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
            }
          ]
        });
      },
      echartBox2(data) {
        echarts.init(this.$refs.echart2).setOption({
          grid: {
            top: 0,
            bottom: 0,
            left: 45,
          },
         tooltip: {
          confine: true,
            trigger: 'axis',
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            axisTick: {
              show: false
            },
            data: data.day
          }],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#FFFFFF'
                }
              },
              axisLabel: {
                formatter: function(value){
                  if (!value) return ''
                  let num = parseInt(value)
                  let r = ''
                  if(num > 9999 && num<9999999) {
                    r =  parseFloat(num/10000) + '万'
                  } else if (num> 9999999) {
                    r = parseFloat(num/10000000) + '千万'
                  } else {
                    r = num
                  }
                  return r
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: '#013966',
                }
              }
            }
          ],
          series: [
            {
              name: '采集数据量',
              symbol: 'none',
              smooth: true,
              data: data.data_collect_size,
              type: 'line',
              itemStyle: {
                color: '#68CBFF',
                opacity: 0
              },
              areaStyle: {
                color: {
                  type: "linear",
                  colorStops: [
                    {
                      offset: 0,
                      color: "#68CBFF" // 0% 处的颜色
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
              name: '采集准确数据量',
              symbol: 'none',
              smooth: true,
              data: data.data_correct_size,
              type: 'line',
              itemStyle: {
                color: '#22FCDB',
                opacity: 0
              },
              areaStyle: {
                color: {
                  type: "linear",
                  colorStops: [
                    {
                      offset: 0,
                      color: "#22FCDB" // 0% 处的颜色
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
              name: '丢失数据量',
              symbol: 'none',
              smooth: true,
              data: data.data_lost_size,
              type: 'line',
              itemStyle: {
                color: '#01D8F6',
                opacity: 0
              },
              areaStyle: {
                color: {
                  type: "linear",
                  colorStops: [
                    {
                      offset: 0,
                      color: "#01D8F6" // 0% 处的颜色
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
          ]
        });
      },
      echartBox3(data) {
        echarts.init(this.$refs.echart3).setOption({
          grid: {
            top: 20,
            bottom: 30,
            left: 55,
          },
         tooltip: {
          confine: true,
            trigger: 'axis',
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            data: data.day
          }],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#FFFFFF'
                }
              },
              axisLabel: {
                formatter: function(value){
                  if (!value) return ''
                  let num = parseInt(value)
                  let r = ''
                  if(num > 9999 && num<9999999) {
                    r =  parseFloat(num/10000) + '万'
                  } else if (num> 9999999) {
                    r = parseFloat(num/10000000) + '千万'
                  } else {
                    r = num
                  }
                  return r
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: '#013966',
                }
              }
            }
          ],
          series: [
            {
              name: '数据丢失量',
              data: data.data_lost_size,
              type: 'line',
              itemStyle: {
                color: '#5e01ff',
                opacity: 0
              },
              areaStyle: {
                color: {
                  type: "linear",
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
            }
          ]
        });
      },
      eChartsPieBox(dataValue, dataValue2) {
        let data = [{
          rate: dataValue2[0].data_incomplete_size,
          text: '数据错误量',
        }, {
          rate: dataValue.data_complete_rate [0] + '%',
          text: '数据次采集准确率',
        }, {
          rate: dataValue.meter_abnormal_rate[0] + '%',
          text: '数据错误率',
        }, {
          rate: dataValue.data_lost_rate[0] + '%',
          text: '数据丢失率',
        }, {
          rate: dataValue.data_collect_rate[0] + '%',
          text: '数据采集率',
        }];

        let list = [{
          dom: this.$refs.eChartsPie01,
        }, {
          dom: this.$refs.eChartsPie02,
        }, {
          dom: this.$refs.eChartsPie03,
        }, {
          dom: this.$refs.eChartsPie04,
        }, {
          dom: this.$refs.eChartsPie05,
        }];


        for (let i = 0; i < list.length; i++) {
          let item = data[i];
          let style = list[i];
          let number = parseInt(item.rate.substring(0, item.rate.length - 1));
          echarts.init(style.dom).setOption({
            graphic: [
              {
                type: "text",
                left: "center",
                top: "center",
                style: {
                  fill: "#fff",
                  left: "1%",
                  text: item.rate,
                  font: "bolder 0.5em \"Microsoft YaHei\", sans-serif"
                }
              },
              {
                type: "text",
                left: "20%",
                bottom: '18px',
                style: {
                  fill: "#fff",
                  text: item.text,
                  font: "bolder 0.5em \"Microsoft YaHei\", sans-serif"
                }
              }
            ],
            series: [
              {
                name: '',
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
                    value: number,
                    itemStyle: {
                      normal: {
                        color: "#0085FF"
                      }
                    }
                  },
                  {
                    value: i === 0 ? 0 : 100 - number,
                    itemStyle: {
                      normal: {
                        color: "#395667"
                      }
                    }
                  }
                ]
              }
            ]
          });
        }
      },
      changeComunity(e) {
        // console.log('eeeee==>>>', e);
        // console.log('userAddress==>>>', this.userAddress);
      },
      echartBox4() {
        // {value: 2.0, name: '最大值',xAxis: '一月', yAxis: 60}
        let pointArry = []
        let max = this.findMaxByArray(this.waterMeterDataRateData.data_lost_rate);
        this.waterMeterDataRateData.data_lost_rate.forEach((value, index) => {
          if (value && value.toString() !== '0')
            pointArry.push({
              value: value,
              name: '',
              xAxis: this.waterMeterDataRateData.day[index],
              yAxis: parseInt(value) + parseInt(max) / 10
            })
        })
        echarts.init(this.$refs.echart4).setOption({
          grid: {
            top: 24,
            bottom: 3,
            left: 30,
            right: 10
          },
          textStyle: {
            color: "#FFFFFF"
          },
         tooltip: {
          confine: true,
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              rotate: 0
            },
            axisLabel: {
              show: false
            },
            data: this.waterMeterDataRateData.day
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
              axisLabel: {
                formatter: function(value){
                  if (!value) return ''
                  let num = parseInt(value)
                  let r = ''
                  if(num > 9999 && num<9999999) {
                    r =  parseFloat(num/10000) + '万'
                  } else if (num> 9999999) {
                    r = parseFloat(num/10000000) + '千万'
                  } else {
                    r = num
                  }
                  return r
                }
              },
            splitLine: {
              lineStyle: {
                opacity: .3
              }
            }
          },
          series: [{
            data: this.waterMeterDataRateData.data_lost_rate,
            type: 'pictorialBar',
            symbol: 'path://m169,100c0,0 7.5,248.9 7.5,248.9c0,0 10,0 10,0c0,0 14,-248 14,-248c0,-3 -31.5,-0.9 -31.5,-0.9z',
            // type: 'bar',
            name: '丢失率',
            symbolClip: true,
            barWidth: 6,
            barMaxWidth: 6,
            markPoint: {
              symbol: '',
              symbolSize: 8,
              symbolOffset: [0, '50%'],
              itemStyle: {
                color: '#7623DC'
              },
              label: {
                show: false
              },
              data: pointArry
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: "#7623DC"},
                  {offset: 1, color: "#22A3E8"}
                ])
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: "#7623DC"},
                  {offset: 0.7, color: "#2378f7"},
                  {offset: 1, color: "#22A3E8"}
                ])
              }
            }
          }]
        });
      },
      findMaxByArray(arry) {
        let max = 0;
        arry.forEach((value, index) => {
          if (value > max) {
            max = value
          }
        })
        return max
      },
      echartBox5(data) {
        echarts.init(this.$refs.echart5).setOption({
          grid: {
            left: 45,
            top: 0,
            bottom: 0
          },
          xAxis: {
            data: data.day,
            axisLabel: {
              inside: false,
              textStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisLabel: {
                textStyle: {
                  color: '#999'
                },
                formatter: function(value){
                  if (!value) return ''
                  let num = parseInt(value)
                  let r = ''
                  if(num > 9999 && num<9999999) {
                    r =  parseFloat(num/10000) + '万'
                  } else if (num> 9999999) {
                    r = parseFloat(num/10000000) + '千万'
                  } else {
                    r = num
                  }
                  return r
                }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#83bff6'},
                      {offset: 0.5, color: '#188df0'},
                      {offset: 1, color: '#188df0'}
                    ]
                  )
                },
                emphasis: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                    ]
                  )
                }
              },
              data: data.data_collect_size
            },
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#83bff6'},
                      {offset: 0.5, color: '#188df0'},
                      {offset: 1, color: '#188df0'}
                    ]
                  )
                },
                emphasis: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                    ]
                  )
                }
              },
              data: data.data_lost_size
            }
          ]
        });
      },
    }
  }
</script>

<style scoped>
  .searchPanel {
    position: absolute;
    left: 32%;
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
    left: 5rem;
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


  .list-syzb li {
    float: left;
    width: 33.333333333%;
    padding: .3rem .2rem;
    box-sizing: border-box;
    text-align: center;
  }

  .list-syzb2 li {
    float: left;
    width: 33.333333333%;
    margin-top: -1rem;
    padding: .3rem .2rem;
    box-sizing: border-box;
    text-align: center;
  }
</style>
