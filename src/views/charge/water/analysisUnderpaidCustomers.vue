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
      <a href="javaScript: void (0)" @click="$router.go(-1)" class="btn-back"><span>返回上一级</span></a>
      <div class="tablecont-box">
        <div class="title">用户用水波动分析
          <div class="title_info"> 户号：&nbsp; {{userInfo.userNo}} &nbsp;名户：&nbsp;{{userInfo.userName}} &nbsp; 联系电话：&nbsp;{{userInfo.telephone}}&nbsp; 小区：&nbsp;{{userInfo.communityName }}</div>

        </div>
        <div style="width: 100%;height: 70%">
          <div ref="myEcharts" style="width: 100%;height: 100%"></div>
        </div>
        <div style="width: 100%;height: 30%;margin-top: .2rem;">
          <div class="right-content"  style="width: 95%;margin:0 auto">
            <div class="top-triangle-l"></div>
            <div class="top-triangle-r"></div>
            <div class="bottom-triangle-l"></div>
            <div class="bottom-triangle-r"></div>
            <div class="triangle-div">
              <div class="triangle-title">结论: </div>
              <div class="triangle-conten">

                <el-row>
                   <el-col :span="6" v-for="(value, index) in resultInfos" :key="index">
                    <el-row>
                      <el-col :span="4">
                        <img src="../../../assets/img/icon_blue_circular.png" height="25" width="25"/></el-col>
                      <el-col :span="20">
                        <div>
                          <span class="conten-title">活动时间：</span>
                          <span class="conten-value">{{value.section}}</span>
                        </div>
                        <div>
                          <span class="conten-title">活动频率：</span>
                          <span class="conten-value">{{value.trend}}</span>
                        </div>
                        <div>
                          <span class="conten-title">用水性质变化概率：</span>
                          <span class="conten-value">{{value.allTrend}}</span>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  let echarts = require("echarts");
  import { getUseWaterVolatilityAnalysisByUserNo } from '@/api/chargeWater'
  import { getUserAllInfo } from '@/api/usercenter'
  export default {
    name: "analysisUnderpaidCustomers",
    data(){
     return {
       user_no: '',
       resultInfos: [],
       changeCurve: {},
       userInfo: {}
     }
    },
    mounted(){
      this.findUseWaterVolatilityAnalysisByUserNo()
      this.findUserAllInfo()
    },
    methods: {
      findUserAllInfo(){
        getUserAllInfo({userNo: this.$route.params.user_no}).then(r =>{
          this.userInfo = r.data
        })
      },
      darwEcharts(){
        let e1 = echarts.init(this.$refs.myEcharts);
        // console.log(this.changeCurve.days)
        let option = {
         tooltip: {
          confine: true,
            trigger: 'axis'
          },
          legend: {
            data:['日用水','5天平均线','1月平均线','3月平均线','2019日用水'],
            textStyle: {
              color: '#FFFFFF'
            }
          },
          grid: {
            left: '13%',
            right: '14%',
            bottom: '23%',
            containLabel: true
          },
          
          xAxis: {
            boundaryGap: false,
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: '#ffff'
            },
            axisTick: {
              show: false
            },
            type: 'category',
            boundaryGap: false,
            data: this.changeCurve.days
          },
          yAxis: {
            type: 'value',
            name: '单位人',
            offset: 10,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#FFFFFF'
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
          },
          dataZoom: [
            {
              height: '8px',
              backgroundColor: '#2E485F',
              borderColor: '#2E485F',
              fillerColor: '#0081FF',
              dataBackground:{
                areaStyle:{
                  color: '#2E485F'
                }
              },
              realtime: true,
              start: 0,
              end: 50,
              handleStyle: {
                color: '#FFFFFF',
                borderColor: '#FFFFFF'
              },
              textStyle: {
                color: '#FFFFFF'
              },
            }
          ],
          series: [
            {
              name:'日用水',
              type:'line',
              stack: '总量',
              data: this.changeCurve.day
            },
            {
              name:'5天平均线',
              type:'line',
              stack: '总量',
              data: this.changeCurve.fiveDay
            },
            {
              name:'1月平均线',
              type:'line',
              stack: '总量',
              data:this.changeCurve.oneMonth
            },
            {
              name:'3月平均线',
              type:'line',
              stack: '总量',
              data:this.changeCurve.threeMonth
            },
            {
              name:'2019日用水',
              type:'line',
              stack: '总量',
              data:this.changeCurve.dayYty
            }
          ]
        };
        e1.setOption(option);

      },
      findUseWaterVolatilityAnalysisByUserNo(){
        this.$store.dispatch('app/openLoading')
        getUseWaterVolatilityAnalysisByUserNo({userNo: this.$route.params.user_no}).then(r => {
          this.$store.dispatch('app/closeLoading')
          this.resultInfos = r.data.resultInfos
          this.changeCurve = r.data.changeCurve
          this.darwEcharts()
        })
      }
    }
  }
</script>
