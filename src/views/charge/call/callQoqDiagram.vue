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
      <a href="#" class="btn-back" @click="$router.push({name: 'callAnalysis',params: {navIndex: 1}})"><span>返回上一级</span></a>
      <div class="bottom-table-box row mes" style="padding-top: 1rem; margin-bottom:-50px;height: 100%">
        <!--左边表格-->
        <div class="col-6 table-wrap">
          <div class="table-title">
            <div class="text" style="padding-left:15px;" >{{titleName}}</div>
          </div>
          <table class="table table-striped table-border-show">
            <thead>
            <tr>
              <th>日期</th>
              <th>销售额</th>
              <th>同比增长率</th>
              <th>环比增长率</th>
            </tr>
            </thead>
            <tbody>
            <tr @mouseenter="mouseenterSelect(index)" @mouseleave="mouseleaveSelect(index)" :class="{'echarts-active-tr': activeTrNumber === index}" v-for="(item, index) in dataList" :key="index">
              <td scope="row" v-text="item.month"></td>
              <td v-html="item.totalCount"></td>
              <td style="color: #00FE72">{{item.yty==='--'?'--':item.yty+'%'}}</td>
              <td style="color: #00FE72">{{item.qoq==='--'?'--':item.qoq+'%'}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--左边表格//-->
        <!--右边表格-->
        <div class="col-6">
          <div ref="myEchart" id="container" class="echarts-box" style="width:100%;height:5.8rem;"></div>
        </div>
        <!--右边表格//-->
      </div>
    </div>
  </div>
</template>
<script>
  let echarts = require("echarts");
  import { getCustomerCallYtyQoqChangeCurve } from '@/api/chargeCall'
  export default {
    name: "callQoqDiagram",
    data(){
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
            seriesIndex: 1,
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
        var seachItems = {
          communityCode: this.seachItems.communityCode ,
          typeName: this.seachItems.name
        }
        // seachItems.communityCode = this.seachItems.communityCode === 'null'? '':this.seachItems.communityCode　
        // seachItems.contentPriceCode = this.seachItems.contentPriceCode === 'null'? '':this.seachItems.contentPriceCode
        // seachItems.elecTypeCode = this.seachItems.elecTypeCode === 'null'? '':this.seachItems.elecTypeCode
        this.$store.dispatch('app/openLoading')
        getCustomerCallYtyQoqChangeCurve(seachItems).then(r => {
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
              // console.log('value', values)
              // console.log('index', index)
              that.activeTrNumber = values[0].dataIndex
              let str = `${values[0].name}</br>`
              values.forEach((value,index)=>{
                str += index===0?`${value.seriesName}: ￥${value.value}</br>`: `${value.seriesName}: ${value.value}T</br>`
              })
              return str
            }
          },
          legend: {
            type: 'plain',
            data: ['同比','环比','投诉','咨询','报漏','报修'],
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
            name: '单位：人',
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
          series: [{
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
          },{
            name:'投诉',
            type:'bar',
            stack: 'one',
            label: {
              normal: {
                show: true,
                formatter: function (value) {
                  if(value.data !== '0'){
                    return value.data
                  } else {
                    return ''
                  }

                }
              }
            },
            data: that.changeCurve.complaints,
            itemStyle: {
              color: '#00E0FE'
            }
          },{
            name:'咨询',
            type:'bar',
            stack: 'one',
            label: {
              normal: {
                show: true,
                formatter: function (value) {
                  if(value.data !== '0'){
                    return value.data
                  } else {
                    return ''
                  }

                }
              }
            },
            data: that.changeCurve.consultations,
            itemStyle: {
              color: '#00FE72'
            }
          },{
            name:'报漏',
            type:'bar',
            stack: 'one',
            label: {
              normal: {
                show: true,
                formatter: function (value) {
                  if(value.data !== '0'){
                    return value.data
                  } else {
                    return ''
                  }

                }
              }
            },
            data: that.changeCurve.leakages,
            itemStyle: {
              color: '#003CFF'
            }
          },{
            name:'报修',
            type:'bar',
            label: {
              normal: {
                show: true,
                formatter: function (value) {
                  if(value.data !== '0'){
                    return value.data
                  } else {
                    return ''
                  }

                }
              }
            },
            stack: 'one',
            data: that.changeCurve.repairs,
            itemStyle: {
              color: '#FFCB00'
            }
          }]
        };
        this.myChart.setOption(option);
      }

    }
  }
</script>
