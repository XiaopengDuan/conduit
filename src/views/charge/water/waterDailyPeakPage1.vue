<template>
  <div style="flex: 1 1;">
    <div class="title">
      日高峰用水分析
      <div class="input-group-btn">
        <el-select  @change="findDayPeakWaterAnalysisPage1" v-model="communityCode" placeholder="请选择地域">
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
    <div style="height: 7rem;width: 100%">
       <div ref="myEchart" style="height: 80%;width: 100%">
       </div>
    </div>
  </div>
</template>

<script>
  let echarts = require("echarts");
  import { getCommunityAll, getUserNoAndNameByNoName } from '@/api/usercenter'
  import { getDayPeakWaterAnalysisPage1 } from '@/api/chargeWater'
  export default {

    name: "waterDailyPeakPage1",
    data(){
      return {
        communityCode: '',
        communityOption: [],
        username: '',
        userno: ''
      }
    },
    mounted() {
      this.communityCode = this.$route.params.communityCode
      this.getCommunitySelectInfo()
      // this.drawEcharts()
      this.findDayPeakWaterAnalysisPage1()
    },
    methods: {
      handleSelect(item){
        if(item.type === 'userName'){
          this.userno = item.code
        } else {
          this.username= item.code
        }

        this.findDayPeakWaterAnalysisPage1()
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
      drawEcharts(xAxisData,maxdata, mindata){
        let e1 = echarts.init(this.$refs.myEchart);
        let option = {
          title: {
            text: '单位：吨',
            textStyle: {
              color: '#FFFFFF'
            }
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#FFFFFF'
                }
              },
              axisTick: {
                show: false
              },
              // data : ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','34',]
              data : xAxisData
            }
          ],
          yAxis : [
            {
              type : 'value',
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
            }
          ],
          series : [
            {
              name:'夜间最小流量',
              type:'line',
              stack: '总量',
              areaStyle: {},
              data: mindata,
              lineStyle: {
                color: '#008DDC'
              },
              itemStyle: {
                opacity: 0
              },
              areaStyle: {
                opacity: 0
              }
            },
            {
              name:'夜间最大流量',
              type:'line',
              stack: '总量',
              areaStyle: {
                color: '#008DDC'
              },
              itemStyle: {
                opacity: 0
              },
              lineStyle: {
                color: '#008DDC'
              },
              data:maxdata
            }
          ]
        };
        e1.setOption(option);
      },
      findDayPeakWaterAnalysisPage1(){
        this.$store.dispatch('app/openLoading')
        getDayPeakWaterAnalysisPage1({
          "communityCode": this.communityCode,
          "userName": this.username,
          "userNo": this.userno
        }).then(r=>{
          this.$store.dispatch('app/closeLoading')
          this.drawEcharts(r.data.days,r.data.maxs,r.data.mins)
        })
      }
    }

  }
</script>

<style scoped>

</style>
