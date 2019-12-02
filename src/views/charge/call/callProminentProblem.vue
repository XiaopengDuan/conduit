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
      <a href="#" class="btn-back" @click="$router.push({name: 'callAnalysis',params: {navIndex: 0}})"><span>返回上一级</span></a>
      <div class="tablecont-box">
        <div class="title">突出问题变化曲线</div>
        <div style="height: 100%;width: 100%">
          <div ref="myEcharts" style="height: 100%;width: 100%"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  let echarts = require("echarts");
  export default {
    name: "callProminentProblem",
    mounted() {
      this.initEchars();
    },
    methods: {
      initEchars(xData, data) {
        this.myEChars = echarts.init(this.$refs.myEcharts);
        let option = {
          title: {},
          grid: {
            left: 80,
            top: 40,
            right: 40,
            bottom: 40
          },
         tooltip: {
          confine: true,
          trigger: 'axis',
          formatter: function (values, index) {
              let str = `${values[0].name}</br>`
              values.forEach((value,index)=>{
                str += index===0?`${value.seriesName}: ${value.value}个</br>`: `${value.seriesName}: ${value.value}个</br>`
              })
              return str
            }
          },
          legend: {
            type: 'plain',
            data: ['已处理', '总计'],
            textStyle: {
              color: '#FFFFFF'
            }
          },
          xAxis: {
            data: this.$route.params.month,
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
            name: '单位：个',
            offset: 15,
            splitLine: {
              lineStyle: {
                color: "#516B83"
              }
            },
            axisLabel: {
              color: "#ffffff",
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
              name: "已处理",
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
              data: this.$route.params.deals
            },
            {
              radius: "100%",
              name: "总计",
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
              data: this.$route.params.totals
            },
          ]
        };
        this.myEChars.setOption(option);
      },
    }
  }
</script>

<style scoped>

</style>

