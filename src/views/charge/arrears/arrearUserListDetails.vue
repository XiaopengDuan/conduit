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
      <div class="tablecont-box">
        <div class="title">用户欠费详情
          <div class="title_info"> 户号：&nbsp; {{userInfo.userNo}} &nbsp;名户：&nbsp;{{userInfo.userName}} &nbsp; 联系电话：&nbsp;{{userInfo.telephone}}&nbsp; 小区：&nbsp;{{userInfo.communityName }}</div>
        </div>
        <div class="bottom-table-box row mes" style="height: 100%">
        <!--左边表格-->
        <div class="col-4 table-wrap" style="width: 20%;height: 100%;padding-top:0">
          <!-- <div class="table-title">
            <div class="text" style="padding-left:15px;" ></div>
          </div> -->
          <table class="table table-striped">
            <thead>
            <tr>
              <th>日期</th>
              <th>欠费额</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in dataList" :key="index" :class="{'echarts-active-tr': activeTrNumber === index}" @mouseenter="mouseenterSelect(index)" @mouseleave="mouseleaveSelect(index)">
              <td scope="row" v-text="item.month"></td>
              <td v-html="item.totalMoney"></td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--左边表格//-->
        <!--右边表格-->
        <div class="col-6" style="width: 80%;height: 100%">
          <div ref="myEchart" id="container" class="echarts-box" style="width:100%;height:100%"></div>
        </div>
        <!--右边表格//-->
      </div>
      </div>
    </div>
  </div>
</template>
<script>
  let echarts = require("echarts");
  import { getUserArrearInfoByUserNo } from '@/api/charge'
  import { getUserAllInfo } from '@/api/usercenter'
  export default {
    name: "arrearUserListDetails",
    data(){
      return {
        seachItems: {},
        titleName: '',
        dataList: [],
        activeTrNumber: 0,
        changeCurve: [],
        userInfo: {},
        myEChars: {}
      }
    },
    mounted() {
      if(this.$route.params){
        this.seachItems = Object.assign({},JSON.parse(this.$route.params.seachItems));
        this.loadData(this.seachItems);
        this.findUserAllInfo()
      }
    },
    methods: {
      mouseenterSelect(index){
        // console.log(index)
        if(index>=0){
          this.activeTrNumber = index;
          this.myEChars.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index
          })
          this.myEChars.dispatchAction({
            type: 'highlight',
            seriesIndex: [0,1],
            dataIndex: index
          })
        }
      },
      mouseleaveSelect(index){
        if(index>0){
          this.myEChars.dispatchAction({
            type: 'downplay',
            seriesIndex: [0,1],
            dataIndex: index
          })
        }
      },
      findUserAllInfo(){
        getUserAllInfo({userNo: JSON.parse(this.$route.params.seachItems).userNo}).then(r =>{
          this.userInfo = r.data
        })
      },
      loadData(seachItems){
        this.$store.dispatch('app/openLoading');
        getUserArrearInfoByUserNo(seachItems).then(r => {
          this.$store.dispatch('app/closeLoading');
          this.dataList = r.data.list;
          this.titleName = r.data.title;
          this.changeCurve = r.data.changeCurve;
          // 绘制曲线图
          this.initEchars();
        })
      },
      //
      initEchars(xData, data) {
        this.myEChars = echarts.init(this.$refs.myEchart);
        let option = {
          title: {},
          legend: {
            type: 'plain',
            data: ['欠费额'],
            textStyle: {
              color: '#FFFFFF'
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
          grid: {
            left: 80,
            top: 80,
            right: 40,
            bottom: '18%'
          },
         tooltip: {
          confine: true,},
          xAxis: {
            // data: ['01','02','03','04','05','06','07','08','09','10','11','12'],
            data: this.changeCurve.months,
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
            name: '单位：元',
            offset: 15,
            nameGap: 60,
            splitLine: {
              lineStyle: {
                color: "#516B83"
              }
            },
            axisLabel: {
              color: "#ffffff",
              formatter: function(value, index) {
                return value === 0 ? value : value ;
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#FFFFFF'
              }
            }
          },
          series: [

            {
              radius: "100%",
              name: "用水量",
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
              data: this.changeCurve.totalMoneys
            }

          ]
        };
        this.myEChars.setOption(option);
      },

    }
  }
</script>
