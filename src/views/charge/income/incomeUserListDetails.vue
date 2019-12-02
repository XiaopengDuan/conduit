<template>
  <div class="right">
    <div class="right-content">
      <!--四个装饰角-->
      <div class="top-horn-l"></div>
      <div class="top-horn-r"></div>
      <div class="bottom-horn-l"></div>
      <div class="bottom-horn-r"></div>
      <!--四个装饰角//-->
      <!--右上角按钮-->
      <a href="#" class="btn-back" @click="$router.go(-1)">
        <span>返回上一级</span>
      </a>
      <div class="tablecont-box">
        <div class="title">
          用户收益详情
          <div class="input-group-btn">
            <button type="button" class="btn choose-time">{{titleName}}</button>
          </div>
        </div>
        <div class="bottom-table-box row mes" style="margin-bottom:-50px;height: 100%">
          <!--左边表格-->
          <div class="col-4 table-wrap" style="width: 20%">
            <table class="table table-striped table-border-show">
              <thead>
                <tr>
                  <th>日期</th>
                  <th>应收</th>
                  <th>实收</th>
                </tr>
              </thead>
              <tbody>
                <tr @mouseenter="mouseenterSelect(index)" @mouseleave="mouseleaveSelect(index)"  :class="{'echarts-active-tr': activeTrNumber === index}" v-for="(item, index) in dataList" :key="index">
                  <td scope="row" v-text="item.month"></td>
                  <td>￥{{item.shouldMoney}}</td>
                  <td>￥{{item.chargeMoney}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--左边表格//-->
          <!--右边表格-->
          <div class="col-6" style="width: 80%">
            <div
              ref="myEchart"
              id="container"
              class="echarts-box"
              style="width:100%;height:5.8rem;"
            ></div>
          </div>
          <!--右边表格//-->
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .table-wrap{
    padding-top: 0;
    height: 100%;
  }
</style>
<script>
let echarts = require("echarts");
import { get66UserChargeAndShouldMoneyDetailStatistics } from "@/api/charge";
import { getUserAllInfo } from "@/api/usercenter";
import { debuglog } from "util";
export default {
  name: "incomeUserListDetails",
  data() {
    return {
      seachItems: {},
      titleName: "",
      dataList: [],
      changeCurve: [],
      activeTrNumber: -1,//默认为-1
      myChart: {}
    };
  },
  mounted() {
    if (this.$route.params) {
      this.seachItems = Object.assign({}, this.$route.params);
      this.loadData();
      this.getUseInfo()
    }
  },
  methods: {
    getUseInfo(){
      getUserAllInfo({userNo: this.$route.params.userNo}).then(r=>{
         this.titleName = `用户名:${r.data.chargeUserName} 户号:${r.data.chargeUserNo}  小区:${r.data.communityName}  联系电话:${r.data.contactMobile}`
      })
    },
    mouseenterSelect(index){
        // console.log(index)
        if(index>=0){
          this.activeTrNumber = index;
          this.myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index
          })
          this.myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: [0,1],
            dataIndex: index
          })
        }
      },
      mouseleaveSelect(index){
        if(index>0){
          this.myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: [0,1],
            dataIndex: index
          })
        }
      },
    loadData() {
      //var seachItems = {communityCode: '00002'};
      // seachItems.communityCode = this.seachItems.communityCode === 'null'? '':this.seachItems.communityCode
      // seachItems.contentPriceCode = this.seachItems.contentPriceCode === 'null'? '':this.seachItems.contentPriceCode
      // seachItems.elecTypeCode = this.seachItems.elecTypeCode === 'null'? '':this.seachItems.elecTypeCode
      get66UserChargeAndShouldMoneyDetailStatistics(this.seachItems).then(r => {

        if (r.code == 200) {
          this.dataList = r.data.table;
          // this.titleName = r.data.title;
          this.changeCurve = r.data;
          // 绘制曲线图
          this.initEchars();
        }
      });
    },
    //
    initEchars(xData, data) {
      let  that= this
      this.myChart = echarts.init(this.$refs.myEchart);
      let option = {
        title: {},
        legend: {
          type: "plain",
          data: ["用水量"],
          textStyle: {
            color: "#FFFFFF"
          }
        },
        dataZoom: [
          {
            height: "8px",
            backgroundColor: "#2E485F",
            borderColor: "#2E485F",
            fillerColor: "#0081FF",
            dataBackground: {
              areaStyle: {
                color: "#2E485F"
              }
            },
            realtime: true,
            start: 0,
            end: 50,
            handleStyle: {
              color: "#FFFFFF",
              borderColor: "#FFFFFF"
            },
            textStyle: {
              color: "#FFFFFF"
            }
          }
        ],
        grid: {
          left: 80,
          top: 65,
          right: 40,
          bottom: "18%"
        },
       tooltip: {
            confine: true,
            trigger: 'axis',
            formatter: function (values, index) {
              // console.log('value', values)
              // console.log('index', index)
              that.activeTrNumber = values[0].dataIndex
              let str = `${values[0].name}</br>`
              values.forEach((value,index)=>{
                str += index===0?`${value.seriesName}: ${value.value}元</br>`: `${value.seriesName}: ${value.value}元</br>`
              })
              return str
            }
          },
        xAxis: {
          data:this.changeCurve.months,
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
          name: "单位：元",
          nameGap: 40,
          offset: 5,
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
            show: false,
            lineStyle: {
              color: "#FFFFFF"
            }
          }
        },
        series: [
          {
            radius: "100%",
            name: "应收",
            type: "line",
            smooth: true,
            label: {
              show: true,
              color: "#00DA4B"
            },
            itemStyle: {
              color: "#00DA4B",
              borderWidth: 4
            },
            lineStyle: {
              color: "#00DA4B"
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
                    color: "#00DA4B" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#012747" // 100% 处的颜色
                  }
                ]
              },
              opacity: 0.6
            },
            data:this.changeCurve.shouldMoneys
          },
            {
            radius: "100%",
            name: "实收",
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
            data:this.changeCurve.chargeMoneys
          }
        ]
      };
      this.myChart.setOption(option);
    }
  }
};
</script>
