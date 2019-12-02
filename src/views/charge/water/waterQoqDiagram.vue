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
      <a href="#" class="btn-back" @click="$router.go(-1)"><span>返回上一级</span></a>
      <div class="bottom-table-box row mes" style="padding: 1rem 0; margin-bottom:-50px;height: 100%">
        <!--左边表格-->
        <div class="col-4 table-wrap col-6-height">
          <div class="table-title">
            <div class="text" style="padding-left:15px;">{{titleName}}</div>
          </div>
          <table class="table table-striped table-border-show">
            <thead>
            <tr>
              <th>日期</th>
              <th v-text="seachItems.type === 'arrearQoqList'?'欠费额'
              :( seachItems.type === 'incomeRatio'? '收益额' 
              :(seachItems.type === 'QoqList'?'用水量'
              :(seachItems.type === 'callAnalysis'?'人/次':'')))"></th>
              <th>同比增长率</th>
              <th>环比增长率</th>
            </tr>
            </thead>
            <tbody>
            <tr @mouseenter="mouseenterSelect(index)" @mouseleave="mouseleaveSelect(index)"
                :class="{'echarts-active-tr': activeTrNumber === index}" v-for="(item, index) in dataList" :key="index">
              <td scope="row" v-text="item.month"></td>
              <td v-html="(seachItems.type === 'callAnalysis'? item.totalCount : (seachItems.type === 'QoqList' ? item.totalPower + 'T' : '￥'+item.totalMoney))"></td>
              <td style="color: #00FE72">{{item.yty==='--'?'--':item.yty+'%'}}</td>
              <td style="color: #00FE72">{{item.qoq==='--'?'--':item.qoq+'%'}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--左边表格//-->
        <!--右边表格-->
        <div class="col-8 col-6-height" style="display: flex;align-items: center;">
          <div ref="myEchart" id="container" class="echarts-box" style="width:100%;height:5.8rem;"></div>
        </div>
        <!--右边表格//-->
      </div>
    </div>
  </div>
</template>
<style scoped>
  .col-6-height{
    height: 100%
  }
</style>

<script>
  let echarts = require("echarts");
  import { getCustomerCallYtyQoqChangeCurve } from '@/api/chargeCall'
  import { getUseWaterYtyQoqChangeCurve } from '@/api/chargeWater'
  import { getArrearCountYtyQoqChangeCurve, get67UserChargeAndShouldMoneyYtyQoqChangeCurve } from '@/api/charge'
  export default {
    name: "waterQoqDiagram",
    data() {
      return {
        seachItems: {},
        titleName: '',
        dataList: [],
        changeCurve: [],
        activeTrNumber: -1,//默认为-1
        myChart: {}
      }
    },
    mounted() {
      if (this.$route.params) {
        this.seachItems = Object.assign({}, this.$route.params);
        this.loadData();
      }
    },
    methods: {
      mouseenterSelect(index) {
        if (index >= 0) {
          this.activeTrNumber = index;
          this.myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index
          })
          this.myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: [0, 1],
            dataIndex: index
          })
        }
      },
      mouseleaveSelect(index) {
        if (index > 0) {
          this.myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: [0, 1],
            dataIndex: index
          })
        }
      },
      loadData() {
        var seachItems = {}
        if(this.seachItems.type === 'callAnalysis'){
          seachItems.communityCode = this.seachItems.communityCode ,
          seachItems.typeName = this.seachItems.name
        }else{
          seachItems.communityCode = this.seachItems.communityCode === 'null' ? '' : this.seachItems.communityCode
          seachItems.contentPriceCode = this.seachItems.contentPriceCode === 'null' ? '' : this.seachItems.contentPriceCode
          seachItems.elecTypeCode = this.seachItems.elecTypeCode === 'null' ? '' : this.seachItems.elecTypeCode
        }
        this.$store.dispatch('app/openLoading');
        if(this.seachItems.type === 'QoqList') {
          // console.log('QoqList')
          getUseWaterYtyQoqChangeCurve(seachItems).then(r => {
            this.$store.dispatch('app/closeLoading')
            this.dataList = r.data.list;
            this.titleName = r.data.title;
            this.changeCurve = r.data.changeCurve;
            // this.changeCurve = this.seachItems.datalist
            // 绘制曲线图
            this.darwEchartsLine();
          })
        }else if(this.seachItems.type === 'arrearQoqList') {
          // console.log('arrearQoqList')
          getArrearCountYtyQoqChangeCurve(seachItems).then(r => {
            this.$store.dispatch('app/closeLoading')
            this.dataList = r.data.list;
            this.titleName = r.data.title;
            this.changeCurve = r.data.changeCurve;
            // 绘制曲线图
            this.darwEchartsLine();
          })
        }else if(this.seachItems.type === 'incomeRatio') {
          // console.log('incomeRatio')
          get67UserChargeAndShouldMoneyYtyQoqChangeCurve(seachItems).then(r => {
            this.$store.dispatch('app/closeLoading')
            this.dataList = r.data.list;
            this.titleName = r.data.title;
            this.changeCurve = r.data.changeCurve;
            // 绘制曲线图
            this.darwEchartsLine();
          })
        }else if(this.seachItems.type === 'callAnalysis'){
          // console.log('callAnalysis')
          getCustomerCallYtyQoqChangeCurve(seachItems).then(r => {
            this.$store.dispatch('app/closeLoading')
            this.dataList = r.data.list;
            this.titleName = r.data.title;
            this.changeCurve = r.data.changeCurve;
            // console.log(this.changeCurve)
            // 绘制曲线图
            this.darwEchartsLine(this.changeCurve);
          })
        }
      },
      darwEchartsLine(e) {
        let that = this;
        this.myChart = echarts.init(this.$refs.myEchart);
        let option = {
         tooltip: {
          confine: true,
            trigger: 'axis',
            formatter: function (values, index) {
              that.activeTrNumber = values[0].dataIndex
              let str = `${values[0].name}</br>`
              values.forEach((value, index) => {
                if(that.seachItems.type === 'QoqList') {
                  str += index === 2 || index === 3 ? `${value.seriesName}: ${value.value}T</br>` : `${value.seriesName}: ${value.value}</br>`
                }else if(that.seachItems.type === 'arrearQoqList') {
                  str += index===3||index===2?`${value.marker}${value.seriesName}: ￥${value.value}</br>`: `${value.marker}${value.seriesName}: ${value.value==='--'?'--':value.value+'%'}</br>`
                }else if(that.seachItems.type === 'incomeRatio') {
                  str  += index===3||index===2?`${value.marker}${value.seriesName}: ￥${value.value}</br>`: `${value.marker}${value.seriesName}: ${value.value==='--'?'--':value.value+'%'}</br>`
                }else if(that.seachItems.type === 'callAnalysis'){
                  str += index===0?`${value.seriesName}: ${value.value}%</br>`: `${value.seriesName}: ${value.value}%</br>`
                }
              });
              return str
            }
          },
          grid: {
            left: '7%',
            right: '10%',
            bottom: '3%',
            containLabel: true
          },
          legend: {
            type: 'plain',
            data: that.seachItems.type === 'QoqList' ? ['同比', '环比', '同比用水量', '当前用水量'] 
            : (that.seachItems.type === 'arrearQoqList' ? ['同比','环比','同比欠费额','当前欠费额'] 
            :(that.seachItems.type === 'incomeRatio' ? ['同比','环比','当前应收金额','同比应收金额']
            :(that.seachItems.type === 'callAnalysis' ? 
            ['同比','环比',that.changeCurve.problems[0].name,that.changeCurve.problems[1].name,that.changeCurve.problems[2].name,that.changeCurve.problems[3].name,that.changeCurve.problems[4].name,]:[]))),
            // (that.seachItems.code === '咨询'?['同比','环比','其他水费咨询','水费业务','缴费业务','水表业务','其他']
            // :(that.seachItems.code === '报修'?['同比','环比','无水','停水','其他报修','水表','其他']
            // :(that.seachItems.code === '报漏'?['同比','环比','室内漏水','其他报漏','室外二次供水漏','一楼地下漏','其他']
            // :(that.seachItems.code === '投诉'?['同比','环比','无水投诉','其他投诉','工程施工投诉','水表计量','其他']:[])))):[]))),
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
            name: that.seachItems.type === 'QoqList' ? '单位：T' 
            : (that.seachItems.type === 'incomeRatio' ? '单位：元' 
            : (that.seachItems.type === 'arrearQoqList' ? '单位：元'
            : (that.seachItems.type === 'callAnalysis' ?'单位：人/次':''))),
            type: 'value',
            offset: 10,
            // nameGap: 30,
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
              name: '单位：%',
              type: 'value',
              offset: 30,
              // nameGap: 30,
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
          series:  that.seachItems.type === 'callAnalysis' ?[
            {
              name: '同比',
              data: that.changeCurve.ytys,
              type: 'line',
              smooth: true,

              itemStyle: {
                color: '#FF5500'
              }
            },{
              name: '环比',
              data: that.changeCurve.qoqs,
              type: 'line',
              yAxisIndex:1,
              smooth: true,
              itemStyle: {
                color: '#FFFFFF'
              }
            },
            {
              name: that.changeCurve.problems[0].name,
              type:'bar',
              data: that.changeCurve.problems[0].value,
              itemStyle: {
                color: 'coral'
              }
            },{
              name: that.changeCurve.problems[1].name,
              type:'bar',
              data: that.changeCurve.problems[1].value,
              itemStyle: {
                color: '#00E0FE'
              }
            },{
              name: that.changeCurve.problems[2].name,
              type:'bar',
              data: that.changeCurve.problems[2].value,
              itemStyle: {
                color: '#00FE72'
              }
            },{
              name: that.changeCurve.problems[3].name,
              type:'bar',
              data: that.changeCurve.problems[3].value,
              itemStyle: {
                color: '#003CFF'
              }
            }
            ,{
              name: that.changeCurve.problems[4].name,
              type:'bar',
              data: that.changeCurve.problems[4].value,
              itemStyle: {
                color: '#FFCB00'
              }
            }
          ]:[{
            name: '同比',
            data: that.changeCurve.ytys,
            type: 'line',
            smooth: true,
            yAxisIndex:1,
            itemStyle: {
              color: '#FF5500'
            }
          }, {
            name: '环比',
            data: that.changeCurve.qoqs,
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            itemStyle: {
              color: '#FFFFFF'
            }
          },{
            name: that.seachItems.type === 'QoqList' ? '同比用水量'
            :(that.seachItems.type === 'arrearQoqList' ? '同比欠费额'
            :(that.seachItems.type === 'incomeRatio' ? '当前应收金额'
            :'')),
            type: 'bar',
            data: that.seachItems.type === 'QoqList' ? that.changeCurve.lastTotalPowers : (that.seachItems.type === 'arrearQoqList' ? that.changeCurve.lastTotalMoneys: that.seachItems.type === 'incomeRatio' ? that.changeCurve.nowTotalMoney : ''),
            itemStyle: {
              color: '#00E0FE'
            }
          }, {
            name: that.seachItems.type === 'QoqList' ? '当前用水量' :(that.seachItems.type === 'arrearQoqList' ? '当前欠费额': (that.seachItems.type === 'incomeRatio' ? '同比应收金额':'')),
            type: 'bar',
            data: that.seachItems.type === 'QoqList' ? that.changeCurve.nowTotalPowers : (that.seachItems.type === 'arrearQoqList' ? that.changeCurve.nowTotalMoneys: (that.seachItems.type === 'incomeRatio' ? that.changeCurve.lastTotalMoney : '')),
            itemStyle: {
              color: that.seachItems.type === 'incomeRatio' ? '#FFD400' : '#00FE72'
            }
          }]
        };
        this.myChart.setOption(option);
      }
    }
  }
</script>
