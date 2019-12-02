<template>
  <div class="content-box">
    <div class="pull-left data-left">
      <div class="data-wrap sytj">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <!--四个装饰角//-->
        <div class="title">小区收益统计</div>
        <ul class="chart-sytj">
          <li>
            <div id="mychart1" class="chartClass"></div>
          </li>
          <li>
            <div id="mychart2" class="chartClass"></div>
          </li>
          <li>
            <div id="mychart3" class="chartClass"></div>
          </li>
          <li>
            <div id="mychart4" class="chartClass"></div>
          </li>
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
            <select class="form-control search-select" v-model="communityCode1" @change="getIncomeRadar()">
              <option
                v-for="(item, index) in communityList1"
                :key="index"
                :value="item.communityCode"
              >{{item.communityName}}</option>
            </select>
          </div>
          <!-- /btn-group -->
          <a class="more">更多</a>
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
          <a class="more">更多</a>
        </div>
        <div class="chart-box">
          <div id="mychart6" class="chartClass"></div>
        </div>
      </div>
    </div>
    <div class="pull-left data-middle">
      <div class="data-wrap map-box all">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <!--四个装饰角//-->
        <!--右上角按钮-->
        <a href="#" class="btn-back">
          <span>返回上一级</span>
        </a>
        <!--右上角按钮//-->
      </div>
    </div>
    <div class="pull-right data-left">
      <div class="data-wrap qfpm">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <!--四个装饰角//-->
        <div class="title">
          用水地区欠费排名
          <a class="more">更多</a>
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
            <select class="form-control search-select" v-model="communityCode2" @change="getIncomeRadar()">
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
            <img src="../../../assets/img/chart13.png" />
          </li>
          <li>
            <img src="../../../assets/img/chart14.png" />
          </li>
          <li>
            <img src="../../../assets/img/chart15.png" />
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
            <select class="form-control search-select" v-model="communityCode3" @change="getIncomeRadar()">
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
            <img src="../../../assets/img/chart13.png" />
          </li>
          <li>
            <img src="../../../assets/img/chart14.png" />
          </li>
          <li>
            <img src="../../../assets/img/chart15.png" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #mychart7{
    height: 3.0rem;
  }
  .qfpm{
    height: 3.6rem;
  }
  .syzb{
    height: 2.6rem;
  }
  .search-select {
    background: #001E40;
    height: 25px;
    font-size: 14px;
    padding-top:1px;
    border: 0px;
  }
  .chartClass{
    width: 100%;
    min-height: 90px;
    height: 100%;
  }
  .chart-box{
    height: 2.8rem;
  }
</style>
<script>
var echarts = require("echarts");
import moment from "moment";
import { 
  getCommunitySelectInfo,
  get11IndexIncomeTop2Statistics,
  get18IndexIncomeTop5YearStatistics,
  get12IndexArrearsTop5Statistics,
  get23DifferentWaterPriceTypeProportion
 } from "@/api/charge";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      menuIndex: 4,
      pageSize: 8,
      pageNow: 1,

      communityCode1: "", //小区收益雷达图
      communityList1: [], //小区收益雷达图 下拉数据
      communityCode2: "", //不同用水性质收益占比
      communityList2: [], //不同用水性质收益占比 下拉数据
      communityCode3: "", //不同收费方式收益占比 
      communityList3: [], //不同收费方式收益占比 下拉数据
      communityCode4: "", //小区收益和用水量排名
      communityList5: [], //小区收益和用水量排名 下拉数据
    };
  },
  mounted() {
    this.getCommunitys().then(res=>{
      this.getIncomeRadar();
    });
    this.getIncomeLine();
    this.getIncomeBar();
    this.getIncomeQfpm();
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    },
    getCommunitys:function(){
      let that = this;
      return new Promise(function(resolve, reject){
          getCommunitySelectInfo().then(response=>{
            if(response.code == 200){
              let data = response.data;
              data.unshift({ communityCode: "", communityName: "==请选择==" });
              that.communityList1 = data;
              that.communityList2 = data;
              that.communityList3 = data;
              that.communityList4 = data;
              if(response.data){ 
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
        if(data[0]){
          let myChart = echarts.init(document.getElementById("mychart1"));
          let option = {
            title:{
              text: data[0].communityName,
              textAlign: "left",
              textStyle:{
                color: "skyblue",
                fontSize: 10
              },
              subtext: data[0].ringRatio + "%",
              subtextStyle:{
                color: "skyblue",
                fontSize: 18
              }
            },
            grid: {
                bottom: '3%'
            },
            xAxis: {
                show: false,
                type: 'category',
                data: data[0].bar1XData
            },
            yAxis: {
                show: false,
                type: 'value'
            },
            series: [{
                data: data[0].bar1YData,
                itemStyle: {
                    normal: {color: '#014582'}
                },
                type: 'bar',
                barWidth: 3
            }]
          };
          myChart.setOption(option, true);
        }
        if(data[1]){
          let myChart = echarts.init(document.getElementById("mychart2"));
          let option = {
            title:{
              text: data[1].communityName,
              textAlign: "left",
              textStyle:{
                color: "skyblue",
                fontSize: 10
              },
              subtext: data[1].ringRatio + "%",
              subtextStyle:{
                color: "skyblue",
                fontSize: 18
              }
            },
            grid: {
                bottom: '3%'
            },
            xAxis: {
                show: false,
                type: 'category',
                data: data[1].bar2XData
            },
            yAxis: {
                show: false,
                type: 'value'
            },
            series: [{
                data: data[1].bar2YData,
                itemStyle: {
                    normal: {color: '#014582'}
                },
                type: 'bar',
                barWidth: 3
            }]
          };
          myChart.setOption(option, true);
        }
        if(data[2]){
          let myChart = echarts.init(document.getElementById("mychart3"));
          let option = {
            title:{
              text: data[2].communityName,
              textAlign: "left",
              textStyle:{
                color: "skyblue",
                fontSize: 10
              },
              subtext: data[2].ringRatio + "%",
              subtextStyle:{
                color: "skyblue",
                fontSize: 18
              }
            },
            grid: {
                bottom: '3%'
            },
            xAxis: {
                show: false,
                type: 'category',
                data: data[2].bar3XData
            },
            yAxis: {
                show: false,
                type: 'value'
            },
            series: [{
                data: data[2].bar3YData,
                itemStyle: {
                    normal: {color: '#014582'}
                },
                type: 'bar',
                barWidth: 3
            }]
          };
          myChart.setOption(option, true);
        }
        if(data[3]){
          let myChart = echarts.init(document.getElementById("mychart4"));
          let option = {
            title:{
              text: data[3].communityName,
              textAlign: "left",
              textStyle:{
                color: "skyblue",
                fontSize: 10
              },
              subtext: data[3].ringRatio + "%",
              subtextStyle:{
                color: "skyblue",
                fontSize: 18
              }
            },
            grid: {
                bottom: '3%'
            },
            xAxis: {
                show: false,
                type: 'category',
                data: data[3].bar4XData
            },
            yAxis: {
                show: false,
                type: 'value'
            },
            series: [{
                data: data[3].bar4YData,
                itemStyle: {
                    normal: {color: '#014582'}
                },
                type: 'bar',
                barWidth: 3
            }]
          };
          myChart.setOption(option, true);
        }
      });
    },
    getIncomeRadar:function(){
      let postData = {
          communityCode: this.communityCode1
      };
      get23DifferentWaterPriceTypeProportion(postData).then((response)=>{
        let data = response.data;
        let myChart = echarts.init(document.getElementById("mychart5"));
        let indicators = [];
        data.indicatorData.forEach((x)=>{
          indicators.push({text: x});
        });
        let option = {
              radar: [
                  {
                      indicator: indicators,
                      center: ['50%', '50%'],
                      radius: 80,
                      startAngle: 90,
                      splitNumber: 4,
                      shape: 'circle',
                      name: {
                          textStyle: {
                              color:'#d9d9d9'
                          }
                      },
                      splitArea: {
                          areaStyle: {
                              color: ['rgba(114, 172, 209, 0.2)'],
                              shadowColor: 'rgba(0, 0, 0, 0.3)',
                              shadowBlur: 10
                          }
                      },
                  }
              ],
              series: [
                  {
                      type: 'radar',
                      itemStyle: {
                          normal:{
                              lineStyle: {
                                  width: 0
                              }
                          },
                          emphasis: {
                              lineStyle: {
                                  color: 'skyblue',
                                  width: 4
                              }
                          }
                      },
                      data: [
                          {
                              value: data.seriesData,
                              areaStyle: {
                                  normal: {
                                      color: 'rgba(255, 255, 255, 0.5)'
                                  }
                              }
                          }
                      ]
                  },
              ]
          };
          myChart.setOption(option, true);
      })
    },
    getIncomeLine:function(){
      let postData = {
          month: moment().month(moment().month() -1).format("YYYYMM")
      };
      get18IndexIncomeTop5YearStatistics(postData).then(response=>{
        let data = response.data;
        let myChart = echarts.init(document.getElementById("mychart6"));
        let legendData = [];
        let xData = [];
        let seriesData = [];
        data.xData.forEach((x)=> {xData.push(moment(x, "YYYYMM").format("M月"));});
        data.series.forEach((x)=> {
          legendData.push(x.name);
          seriesData.push({
              name: x.name,
              type:'line',
              stack: '金额',
              areaStyle: {},
              data: x.data
          });
        });
        let option = {
              legend: {
                  itemGap: 5,
                  textStyle:{
                    color: "#fff",
                    fontSize: 8,
                    top: 0
                  },
                  data:legendData
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '20%',
                  containLabel: true
              },
              xAxis : [
                  {
                      type : 'category',
                      axisLabel:{
                        color: "#fff",
                        fontSize: 10,
                        interval: 0,
                        align: "center"
                      },
                      axisLine:{
                        lineStyle:{
                          color: "#fff"
                        }
                      },
                      splitLine:{
                        show: false
                      },
                      data : xData
                  }
              ],
              yAxis : [
                  {
                      name: "单位：元",
                      nameTextStyle:{
                        fontSize: 10
                      },
                      type : 'value',
                      axisLabel:{
                        fontSize: 10,
                        color: "#fff"
                      },
                      axisLine:{
                        lineStyle:{
                          color: "#fff"
                        }
                      },
                      splitLine:{
                        lineStyle:{
                          type: "dotted"
                        }
                      },
                  },
                  {
                      name: "小区名称",
                      nameTextStyle:{
                        fontSize: 10
                      },
                      type : 'value',
                      axisLabel:{
                        fontSize: 10,
                        color: "#fff"
                      },
                      axisLine:{
                        lineStyle:{
                          color: "#fff"
                        }
                      },
                  }
              ],
              series: seriesData
          };
          myChart.setOption(option, true);
      })
    },
    getIncomeQfpm:function(){
      get12IndexArrearsTop5Statistics().then((response)=>{
        let data = response.data;
        let myChart = echarts.init(document.getElementById("mychart7"));
        let timelineData = [];
        let seriesData = [];
        data.forEach(function(x){
          let name = Object.keys(x)[0];
          timelineData.push({ 
            name:name, 
            symbol: "image://../../assets/img/timelineitem.png",
            symbolSize: 8 
          });
          let itemdata = [];
          x[name].forEach(function(item){
            itemdata.push({
              name: item.typeName,
              value: item.totalMoney
            })
          })
          seriesData.push({
              type:'pie',
              center: ['50%', '45%'],
              radius: '50%',
              data: itemdata
          });
        });
        let option = {
              timeline : {
                  autoPlay: true,
                  left: 0,
                  right: 0,
                  data : timelineData,
                  controlStyle:{
                    showPlayBtn: false,
                    color: "#00E3F2",
                    borderColor: "#00E3F2",
                    borderWidth: 1
                    // prevIcon: "image://../../assets/img/prev.png",
                    // nextIcon: "image://../../assets/img/next.png"
                  },
                  label:{
                    show: false
                  }
              },
              options : [
                  {
                      series : seriesData
                  },
              ]
          };
          myChart.setOption(option, true);
      })
    }
  }
};
</script>