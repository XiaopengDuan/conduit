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
      <a href="javascript: void (0)" @click="$router.go(-1)" class="btn-back"><span>返回上一级</span></a>
      <div class="bottom-table-box row mes" style="height: 50%"><!--左边表格-->
        <div class="col-6 table-wrap" >
          <div class="table-title">
            <div class="text">{{titleName}}</div>
          </div>
          <table class="table table-striped table-border-show">
            <thead>
            <tr>
              <th>日期</th>
              <th v-text="(seachItems.type === 'waterUserRanking'||seachItems.type === 'analysisUseWater') ? '用水量':'欠费额'"></th>
              <th v-if="seachItems.type === 'arrearResidentialquarters'||seachItems.type === 'analysisUseWater'">
                {{seachItems.type === 'arrearResidentialquarters' ? '人数' : (seachItems.type === 'analysisUseWater' ? (seachItems.state === 2 ? '比率' : '人数') : '')}}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr @mouseenter="mouseenterSelect(index)" @mouseleave="mouseleaveSelect(index)"  :class="{'echarts-active-tr': activeTrNumber === index}"  v-for="(value, index) in dataList.slice(0,6)" :key="index">
              <td>{{value.month}}</td>
              <td>{{(seachItems.type === 'waterUserRanking'||seachItems.type === 'analysisUseWater')? value.totalPower + 'T' : value.totalMoney}}</td>
              <td v-if="seachItems.type === 'arrearResidentialquarters'||seachItems.type === 'analysisUseWater'" style="color: #00FE72">
                {{seachItems.type === 'arrearResidentialquarters'? value.count
                :(seachItems.type === 'analysisUseWater'? (seachItems.state === 2 ? value.freq : value.count):'')}}
              </td>
            </tr>
            </tbody>
          </table>
        </div >
        <!--左边表格//-->
        <!--右边表格-->
        <div class="col-6 table-wrap" style="border-right: none">
          <div class="table-title">
            <div class="text">&nbsp;</div>
          </div>
          <table class="table table-striped table-border-show">
            <thead>
            <tr>
              <th>日期</th>
              <th v-text="(seachItems.type === 'waterUserRanking' || seachItems.type === 'analysisUseWater') ? '用水量':'欠费额'"></th>
              <th v-if="seachItems.type === 'arrearResidentialquarters'||seachItems.type === 'analysisUseWater'">
                {{seachItems.type === 'arrearResidentialquarters' ? '人数' : (seachItems.type === 'analysisUseWater' ? (seachItems.state === 2 ? '比率' : '人数') : '')}}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr @mouseenter="mouseenterSelect(index+6)" @mouseleave="mouseleaveSelect(index+6)"  :class="{'echarts-active-tr': activeTrNumber === index+6}"   v-for="(value, index) in dataList.slice(6,dataList.length)" :key="index">
              <td>{{value.month}}</td>
              <td>{{(seachItems.type === 'waterUserRanking'||seachItems.type === 'analysisUseWater')? value.totalPower + 'T' : value.totalMoney}}</td>
              <td v-if="seachItems.type === 'arrearResidentialquarters'||seachItems.type === 'analysisUseWater'" style="color: #00FE72">
                {{seachItems.type === 'arrearResidentialquarters'?value.count
                :(seachItems.type === 'analysisUseWater'? (seachItems.state === 2 ? value.freq : value.count):'')}}
              </td>
            </tr>
            </tbody>
          </table>

        </div>
        <!--右边表格//-->
      </div>
      <div style="height: 50%;width: 100%">
        <div ref="myEchart" style="width: 100%;height: 100%">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let echarts = require("echarts");
  import { getUserUseWaterChangeCurve } from '@/api/chargeWater'
  import { getArrearCountChangeCurve, getArrearCountChangeCurve2 } from '@/api/charge'
  import { getUseWaterChangeCurve,getCommunityWaterVolatilityAnalysisByComCode } from '@/api/charge'
  export default {
    name: "waterUserCurveJump",
    data(){
      return {
        seachItems: {},
        titleName: '',
        dataList: [],
        changeCurve: [],
        activeTrNumber: -1,//默认为-1
        myChart: {},
        kdata: {}
      }
    },
    created() {
      if(this.$route.params){
        this.seachItems = Object.assign({},this.$route.params);
        // console.log(this.seachItems)
        this.loadData()
      }
    },
    mounted() {
      
    },
    methods: {
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
      loadData(){
        this.$store.dispatch('app/openLoading')
        if(this.seachItems.type === 'waterUserRanking') {
          getUserUseWaterChangeCurve({userNo: this.$route.params.userNo}).then(r => {
            this.$store.dispatch('app/closeLoading')
            this.dataList = r.data.list;
            // this.titleName = r.data.title;
            this.titleName = this.$route.params.userName;
            this.changeCurve = r.data.changeCurve;
            // 绘制曲线图
            this.darwEchartsLine();
          })
        } else if(this.seachItems.type === 'arrearResidentialquarters') {
          var seachItems = {}
            seachItems.communityCode = this.seachItems.communityCode === 'null'? '':this.seachItems.communityCode
            seachItems.contentPriceCode = this.seachItems.contentPriceCode === 'null'? '':this.seachItems.contentPriceCode
            seachItems.elecTypeCode = this.seachItems.elecTypeCode === 'null'? '':this.seachItems.elecTypeCode
            this.$store.dispatch('app/openLoading')
            getArrearCountChangeCurve(seachItems).then(r => {
              this.$store.dispatch('app/closeLoading')
              this.dataList = r.data.list;
              this.titleName = r.data.title;
              this.changeCurve = r.data.changeCurve;
              // 绘制曲线图
              this.darwEchartsLine();
            })
          }else if(this.seachItems.type === 'arrearResidentialquarters2') {
          var seachItems = {}
            seachItems.communityCode = this.seachItems.communityCode === 'null'? '':this.seachItems.communityCode
            seachItems.contentPriceCode = this.seachItems.contentPriceCode === 'null'? '':this.seachItems.contentPriceCode
            seachItems.elecTypeCode = this.seachItems.elecTypeCode === 'null'? '':this.seachItems.elecTypeCode
            seachItems.startMonth = this.seachItems.startMonth||'201801'
            this.$store.dispatch('app/openLoading')
            getArrearCountChangeCurve2(seachItems).then(r => {
              this.$store.dispatch('app/closeLoading')
              this.dataList = r.data.list;
              this.titleName = r.data.title;
              this.changeCurve = r.data.changeCurve;
              // 绘制曲线图
              this.darwEchartsLine();
            })
          } else if(this.seachItems.type === 'analysisUseWater'){
            if(this.seachItems.state === 2){
              getCommunityWaterVolatilityAnalysisByComCode(JSON.parse(this.seachItems.seachItems)).then(r => {
                this.$store.dispatch('app/closeLoading')
                this.dataList = r.data.list;
                this.titleName = r.data.title;
                this.changeCurve = r.data.changeCurve;
                // 绘制曲线图
                this.darwEchartsLine();
              })
            }else{
              getUseWaterChangeCurve(JSON.parse(this.seachItems.seachItems)).then(r => {
                this.$store.dispatch('app/closeLoading')
                this.dataList = r.data.list;
                this.titleName = r.data.title;
                this.changeCurve = r.data.changeCurve;
                // 绘制曲线图
                this.darwEchartsLine();
              })
            }
          }
      },
      darwEchartsLine(){
        let that = this;
        this.myChart = echarts.init(this.$refs.myEchart);
        let option = option = {
          grid: {
            left: 80,
            top: 60,
            right: 100,
            bottom: 50
          },
          tooltip : {
            trigger: 'axis',
             formatter: function (values, index) {
                that.activeTrNumber = values[0].dataIndex;
                let str = `${values[0].name}</br>`
                values.forEach((value,index)=>{
                  if(that.seachItems.type === 'waterUserRanking') {
                    str += `${values[0].marker}${values[0].seriesName}：${values[0].value}`
                  }else if(that.seachItems.type === 'arrearResidentialquarters'||that.seachItems.type === 'arrearResidentialquarters2') {
                    str += index===0?`${value.seriesName}: ￥${value.value}</br>`: `${value.seriesName}: ${value.value}</br>`
                  }else if(that.seachItems.type === 'analysisUseWater'){
                    if(that.seachItems.state === 2){
                      str += index===0 ? `${value.seriesName}: ${value.value}T</br>`: `${value.seriesName}: ${value.value}%</br>`
                      // console.log(value)
                    }else{
                      str += index===0 ? `${value.seriesName}: ${value.value}T</br>`: `${value.seriesName}: ${value.value}人</br>`
                    }
                  }
                })
               return str
            },
            axisPointer: that.seachItems.type === 'analysisUseWater'? {} : {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            type: 'plain',
            data: that.seachItems.type === 'waterUserRanking' ? ['人数','用水量']
            : (that.seachItems.type === 'arrearResidentialquarters' ? ['人数','欠费额'] 
            : (that.seachItems.type === 'analysisUseWater' ? (that.seachItems.state === 2 ? ['用水量','比率'] : ['用水量','人数'])
            : (that.seachItems.type === 'arrearResidentialquarters2' ? ['人数','欠费额']:[]))),
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
            data: that.changeCurve.months
          }],
          yAxis: [{
            name: that.seachItems.type === 'analysisUseWater' ? '单位：T' :(that.seachItems.type === 'waterUserRanking' ? '':'单位：人'),
            type: 'value',
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
          {
            name: that.seachItems.type === 'analysisUseWater' ? (that.seachItems.state === 2 ? '单位：%' : '单位：人') : (that.seachItems.type === 'waterUserRanking'? '单位：T':'单位：元'),
            type: 'value',
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
              show: false
            }
          }],
          series: that.seachItems.type === 'arrearResidentialquarters' ? [
            {
              name: '欠费额',
              data: that.changeCurve.totalMoneys,
              type: 'line',
              yAxisIndex:1,
              smooth: true,
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
                      color: "#00FE72" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#012747" // 100% 处的颜色
                    }
                  ]
                },
                opacity: 0.4
              },
              itemStyle: {
                color: '#00FE72'
              }
            },
            {
              name: '人数',
              data: that.changeCurve.counts,
              type: 'line',
              smooth: true,
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
                      color: "#00C3EF" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#012747" // 100% 处的颜色
                    },
                  ]
                },
                opacity: 0.4
              },
              itemStyle: {
                color: '#00C3EF'
              }
            }
          ]:
          (that.seachItems.type === 'arrearResidentialquarters2'?[{
              name: '欠费额',
              data: that.changeCurve.totalMoneys,
              type: 'line',
              yAxisIndex:1,
              smooth: true,
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
                      color: "#00FE72" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#012747" // 100% 处的颜色
                    }
                  ]
                },
                opacity: 0.4
              },
              itemStyle: {
                color: '#00FE72'
              }
            },
            {
              name: '人数',
              data: that.changeCurve.counts,
              type: 'line',
              smooth: true,
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
                      color: "#00C3EF" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#012747" // 100% 处的颜色
                    },
                  ]
                },
                opacity: 0.4
              },
              itemStyle: {
                color: '#00C3EF'
              }
          }]:
          (that.seachItems.type === 'waterUserRanking' ? [{
            name: '用水量',
            data: that.changeCurve.totalPowers,
            type: 'line',
            yAxisIndex:1,
            smooth: true,
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
                    color: "#00FE72" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#012747" // 100% 处的颜色
                  },
                ]
              },
              opacity: 0.4
            },
            itemStyle: {
              color: '#00FE72'
            }
          }]:
          (that.seachItems.type === 'analysisUseWater'?[{
            name: '用水量',
            data: that.changeCurve.totalPowers,
            type: 'line',
            smooth: true,
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
                    color: "#00FE72" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#012747" // 100% 处的颜色
                  },
                ]
              },
              opacity: 0.4
            },
            itemStyle: {
              color: '#00FE72'
            }
          },
          {
            name: that.seachItems.state === 2 ? '比率':'人数',
            data: that.seachItems.state === 2 ? that.changeCurve.freqs:that.changeCurve.counts,
            type: 'line',
            smooth: true,
            yAxisIndex:1,
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
                    color: "#00C3EF" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#012747" // 100% 处的颜色
                  },
                ]
              },
              opacity: 0.4
            },
            itemStyle: {
              color: '#00C3EF'
            }
          }]:[])))
        };
        this.myChart.setOption(option);
      }
    }
  }
</script>

<style scoped>
.right-content{
  box-sizing: border-box;
  padding: 1rem 0.3rem 0.3rem 0.3rem;
}
.table-wrap{
  height: 100%
}
</style>
