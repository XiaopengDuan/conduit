<template>
  <div style="height: 100%,flex: 1 1;width: 100%;height: 100%;">
    <div class="sharetitle">
      日高峰用水分析
      <div class="input-group-btn">
        <el-select  @change="findDayPeakWaterAnalysisPage2" v-model="communityCode" placeholder="请选择地域">
          <el-option
            v-for="item in communityOption"
            :key="item.communityCode"
            :label="item.communityName"
            :value="item.communityCode">
          </el-option>
        </el-select>
      </div>
      <div class="input-group-btn">
        <!-- <el-input v-model="username" @keyup.enter.native="findDayPeakWaterAnalysisPage1" placeholder="请输入用户名"></el-input> -->
        <el-autocomplete
          :debounce="600"
          v-model="username"
          popper-class="my-autocomplete"
          :fetch-suggestions="querySearchAsyncUserName"
          placeholder="请输入内容"
          @select="handleSelect"
        >
         <template slot-scope="{ item }">
          <div>{{ item.value }} - {{ item.code }}</div>
        </template>
        </el-autocomplete>
      </div>
      <div class="input-group-btn">
         <el-autocomplete
          :debounce="600"
          v-model="userno"
          popper-class="my-autocomplete"
          :fetch-suggestions="querySearchAsyncUserCode"
          placeholder="请输入内容"
          @select="handleSelect"
        >
        <template slot-scope="{ item }">
          <div>{{ item.value }} - {{ item.code }}</div>
        </template>
        </el-autocomplete>
        <!-- <el-input v-model="userno" @keyup.enter.native="findDayPeakWaterAnalysisPage1"  placeholder="请输入户号"></el-input> -->
      </div>
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
          <div class="triangle-title">结论：</div>
          <div class="triangle-conten">
            <el-row>
              <div v-for="(value, index) in resultInfos" :key="index">
                <el-col :span="6">
                  <el-row>
                    <el-col :span="4">
                      <img src="../../../assets/img/icon_blue_circular.png" height="25" width="25"/></el-col>
                    <el-col :span="20">
                      <div>
                        <span class="conten-title">高峰时段：</span>
                        <span class="conten-value">{{value.section}}</span>
                      </div>
                      <div>
                        <span class="conten-title">变化趋势：</span>
                        <span class="conten-value">{{value.trend}}</span>
                      </div>
                      <div>
                        <span class="conten-title">整体变化趋势：</span>
                        <span class="conten-value">{{value.allTrend}}</span>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </div>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let echarts = require("echarts");
  import { getCommunityAll, getUserNoAndNameByNoName } from '@/api/usercenter'
  import { getDayPeakWaterAnalysisPage2 } from '@/api/chargeWater'
  export default {

    name: "waterDailyPeakPage1",
    data(){
      return {
        communityCode: '',
        communityOption: [],
        username: '',
        userno: '',
        resultInfos: []
      }
    },
    mounted() {
      this.communityCode = this.$route.params.communityCode
      this.getCommunitySelectInfo()
      this.findDayPeakWaterAnalysisPage2()
    },
    methods: {
        handleSelect(item){
        if(item.type === 'userName'){
          this.userno = item.code
        } else {
          this.username= item.code
        }

        this.findDayPeakWaterAnalysisPage2()
      },
      querySearchAsyncUserName(queryString, cb){
        getUserNoAndNameByNoName({userName: queryString}).then(r=>{
          cb(r.data.map((n)=>{
            return {value: n.userName,code: n.userNo, type: 'userName'}
          }))
        })
      },
      querySearchAsyncUserCode(queryString, cb){
        getUserNoAndNameByNoName({userNo: queryString}).then(r=>{
          cb(r.data.map((n)=>{
            return {value:`${n.userNo}`, code: n.userName, type: 'userNo'}
          }))
        })
      },
      getCommunitySelectInfo(){
        getCommunityAll().then(r => {
          this.communityOption = r.data
          // this.communityOption.unshift({communityCode: '',communityName: '查看全部'})
          // this.$set(this.temp.seachItems, 'communityCode', this.communityOption[0].communityCode)
        })
      },
      drawEcharts(data){
        let e1 = echarts.init(this.$refs.myEcharts);
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
            left: '8%',
            right: '8%',
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
            data: data.days
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
              data: data.day
            },
            {
              name:'5天平均线',
              type:'line',
              stack: '总量',
              data: data.fiveDay
            },
            {
              name:'1月平均线',
              type:'line',
              stack: '总量',
              data: data.oneMonth
            },
            {
              name:'3月平均线',
              type:'line',
              stack: '总量',
              data: data.threeMonth
            },
            {
              name:'2019日用水',
              type:'line',
              stack: '总量',
              data: data.dayYty
            }
          ]
        };
        e1.setOption(option);
      },
      findDayPeakWaterAnalysisPage2(){
        this.$store.dispatch('app/openLoading')
        getDayPeakWaterAnalysisPage2({
          "communityCode": this.communityCode,
          "userName": this.username,
          "userNo": this.userno
        }).then(r => {
          this.$store.dispatch('app/closeLoading')
           // console.log('xxppp', r)
           this.drawEcharts(r.data.changeCurve)
           this.resultInfos = r.data.resultInfos
        })
      }
    }

  }
</script>

<style scoped>

</style>
