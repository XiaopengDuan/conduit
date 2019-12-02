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
        <div class="title">天数统计
          <div class="input-group-btn">
            <el-date-picker
              v-model="dateValue"
              @change="findUseWaterDayDataStatistical"
              type="date"
              value-format="yyyyMMdd"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="input-group-btn">
            <el-select  @change="findUseWaterDayDataStatistical" v-model="communityCode" placeholder="请选择地域">
              <el-option
                v-for="item in communityOption"
                :key="item.communityCode"
                :label="item.communityName"
                :value="item.communityCode">
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- <div class="scroll-box"> -->
          <table  class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
            <tr>
              <th scope="col">时间</th>
              <th scope="col">水量</th>
              <th scope="col">时间</th>
              <th scope="col">水量</th>
              <th scope="col">时间</th>
              <th scope="col">水量</th>
              <th scope="col">时间</th>
              <th scope="col">水量</th>
              <th scope="col">时间</th>
              <th scope="col">水量</th>
              <th scope="col">时间</th>
              <th scope="col">水量</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="number in 8">
              <tr>
              <template v-for="(value, index) in dataList.slice((number-1) * 6,number * 6)">
                  <td align="center" style="padding: .04rem" class="text-success" width="100px">{{value.time}}</td>
                  <td align="center" style="padding: .04rem" width="100px">{{value.value}}</td>
              </template>
              </tr>
            </template>
            </tbody>
          </table>
          <div style="height: 48%;margin-top:80px">
            <div ref="myEcharts" style="height: 100%;width: 90%;margin:auto"></div>
          </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import { getUseWaterDayDataStatistical } from '@/api/chargeWater'
  import { getCommunityAll } from '@/api/usercenter'
  let echarts = require("echarts");
    export default {
        name: "waterDayStatistics",
        mounted() {
          getCommunityAll().then(r => {
            this.communityOption = r.data
            // this.communityOption.unshift({communityCode: seachItems.communityCode,communityName: '查看全部'})
          })
          let seachItems = JSON.parse(this.$route.params.seachItems);
          this.dateValue = seachItems.dataValue
          this.userNo = seachItems.userNo
          this.communityCode = seachItems.communityCode
          this.findUseWaterDayDataStatistical()
        },
        data() {
            return {
              dateValue: '',
              communityCode: '',
              userNo: '',
              dataList: [
              ],
              communityOption: [],
            }
        },
        methods: {
          getCommunitySelectInfo(){
            
          },
          findUseWaterDayDataStatistical(){
            this.$store.dispatch('app/openLoading')
            getUseWaterDayDataStatistical({day: this.dateValue, communityCode: this.communityCode,userNo: this.userNo}).then(r => {
              this.$store.dispatch('app/closeLoading')
              if(r.data && r.data.table){
                this.dataList = r.data.table
                 this.drawLine(r.data)
              } else {
                this.dataList = []
                 this.drawLine({times:[],values:[]})
              }
             
            })
          },
          drawLine(value){
           let sz = []
            for(let i=0;i<48;i++){
              sz.push(Math.floor(Math.random() * 40) + 1);
            }

            let e1 = echarts.init(this.$refs.myEcharts);
            let option = {
              title: {},
              grid: {
                left: 20,
                top: 40,
                right: 20,
                bottom: 20
              },
             tooltip: {
          confine: true,},
              xAxis: {
                // data: ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'],
                data: value.times,
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
                  show: false,
                  color: "#ffffff",
                  formatter: function(value, index) {
                    return value === 0 ? value : value + "T";
                  }
                },
                axisLine: {
                  show: false
                }
              },
              series: [
                {
                  radius: "100%",
                  name: "销量",
                  type: "line",
                  // smooth: true,
                  label: {
                    show: true,
                    color: "#FFFFFF"
                  },
                  itemStyle: {
                    opacity: 0
                  },
                  lineStyle: {
                    color: "#FFFFFF",
                    width: 1
                  },
                  data: value.values
                }
              ]
            };
            e1.setOption(option);
          }
        }
    }
</script>

<style scoped>
</style>
