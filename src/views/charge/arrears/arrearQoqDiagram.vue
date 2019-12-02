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
      <div class="bottom-table-box row mes" style="padding-top: 1rem; margin-bottom:-50px;height: 100%">
        <!--左边表格-->
        <div class="col-4 table-wrap table-border-show" style="border-right:1px solid #6be9fc;height: 100%">
          <div class="table-title">
            <div class="text" style="padding-left:15px;" >{{titleName}}</div>
          </div>
          <table class="table table-striped table-border-show">
            <thead>
            <tr>
              <th>日期</th>
              <th>收益额</th>
              <th>同比增长率</th>
              <th>环比增长率</th>
            </tr>
            </thead>
            <tbody>
            <tr @mouseenter="mouseenterSelect(index)" @mouseleave="mouseleaveSelect(index)" 
            :class="{'echarts-active-tr': activeTrNumber === index}" v-for="(item, index) in dataList" :key="index">
              <td scope="row" v-text="item.month"></td>
              <td v-html="'￥' + item.totalMoney"></td>
              <td style="color: #00FE72">{{item.yty==='--'?'--':item.yty+'%'}}</td>
              <td style="color: #00FE72">{{item.qoq==='--'?'--':item.qoq+'%'}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--左边表格//-->
        <!--右边表格-->
        <div class="col-8" style="height: 100%">
          <div ref="myEchart" id="container" class="echarts-box" style="width:100%;height:100%"></div>
        </div>
        <!--右边表格//-->
      </div>
    </div>
  </div>
</template>
<script>
  let echarts = require("echarts");
  import { getArrearCountYtyQoqChangeCurve } from '@/api/charge'
  export default {
    name: "arrearQoqDiagram",
    data(){
      return {
        seachItems: {},
        titleName: '',
        dataList: [],
        changeCurve: [],
        activeTrNumber: -1,
        myChart: {}
      }
    },
    mounted() {
      if(this.$route.params){
        this.seachItems = Object.assign({},this.$route.params);
        this.loadData();
      }
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
        var seachItems = {}
        seachItems.communityCode = this.seachItems.communityCode === 'null'? '':this.seachItems.communityCode
        seachItems.contentPriceCode = this.seachItems.contentPriceCode === 'null'? '':this.seachItems.contentPriceCode
        seachItems.elecTypeCode = this.seachItems.elecTypeCode === 'null'? '':this.seachItems.elecTypeCode
        this.$store.dispatch('app/openLoading')
        getArrearCountYtyQoqChangeCurve(seachItems).then(r => {
          this.$store.dispatch('app/closeLoading')

          this.dataList = r.data.list;
          this.titleName = r.data.title;
          this.changeCurve = r.data.changeCurve;
          // 绘制曲线图
          this.darwEchartsLine();
        })
      },
      //
      darwEchartsLine(){
        let that = this;
        this.myChart = echarts.init(this.$refs.myEchart);
        let option = option = {
         tooltip: {
          confine: true,
            trigger: 'axis',
            formatter: function (values, index) {
              that.activeTrNumber = values[0].dataIndex
              let str = `${values[0].name}</br>`
              values.forEach((value,index)=>{
                str += index===3||index===2?`${value.marker}${value.seriesName}: ￥${value.value}</br>`: `${value.marker}${value.seriesName}: ${value.value==='--'?'--':value.value+'%'}</br>`
              })
              return str
            }
          },
          grid: {
            left: 80,
            top: 100,
            right: 100,
            bottom: 100
          },
          legend: {
            type: 'plain',
            data: ['同比','环比','同比欠费额','当前欠费额'],
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
            name: '单位：元',
            nameGap: 30,
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
              name: '单位：%',
              type: 'value',
              offset: 30,
              nameGap: 30,
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
          series: [{
            name: '同比',
            data: that.changeCurve.ytys,
            type: 'line',
            smooth: true,
            yAxisIndex:1,
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
          },{
            name:'同比欠费额',
            type:'bar',
            data: that.changeCurve.lastTotalMoneys,
            itemStyle: {
              color: '#00E0FE'
            }
          },{
            name:'当前欠费额',
            type:'bar',
            data: that.changeCurve.nowTotalMoneys,
            itemStyle: {
              color: '#00FE72'
            }
          }]
        };
        this.myChart.setOption(option);
      }

    }
  }
</script>
