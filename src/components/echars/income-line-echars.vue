<template>
  <div style="width: 100%;height: 100%">
    <div ref="canv" id="canv" style="width: 100%;height: 100%"></div>
  </div>
</template>

<script>
  import echarts from "echarts";
  export default {
    name: "incomeLineEchars",
    data() {
      return {
        DataList: {},
        maxNumber: 500,
        legendData: [],
        seriesData: [],
        canv: {}
      }
    },
    model: {
      prop: 'vModel',
      event: 'vModel_event'
    },
    // props: {
    //   vModel: String,
    //   series: Array, // echarts series data参数
    //   xData: Array, // echarts xAxis data参数
    //   activeTrNumber: Number,
    // },
    props: ['canvs','vModel','series','xData','activeTrNumber','resdatad'],
    mounted() {
      this.loadData()
      this.draw()
    },
    methods: {
      mouseenterSelect(index) {
        if (index >= 0) {
          --index;
          this.$emit("update:activeTrNumber", index);
          this.canv.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index
          });
          this.canv.dispatchAction({
            type: 'highlight',
            seriesIndex: [0, 1],
            dataIndex: index
          });
        }
      },
      mouseleaveSelect(index) {
        if (index > 0) {
          --index;
          this.canv.dispatchAction({
            type: 'downplay',
            seriesIndex: [0, 1],
            dataIndex: index
          });
        }
      },
      loadData: function () {
        let that = this
        this.$props.series.forEach(function (value, index) {
          that.legendData.push(value.name)
          // 获取数组数据的最大值
          let max = Math.max.apply(null, value.data);
          if(that.maxNumber<max){
            that.maxNumber = max;
          }
        })
      },
      draw: function (data) {
        if(this.$props.series.length===0){return}
        
          this.drawEchars(data)
       
        
      },
      drawEchars: function(data){
        
        this.canv = echarts.init(this.$refs.canv);
        if(this.canvs){
          this.canvs(this.canv)
        }
        let that = this;
        let option = {
          grid: {
            left: '4%',
            right: '4%',
            bottom: '4%',
            containLabel: true
          },
          legend: {
            data: that.legendData,
            top: '5%',
            textStyle: {
              color: '#FFFFFF'
            }
          },
          tooltip : {
            trigger: 'axis',
             formatter: function (values, index) {
               if(that.resdatad){
                  that.resdatad(values[0].dataIndex)
               }
                // that.activeTrNumber = values[0].dataIndex + 1;
                that.$emit("update:activeTrNumber", values[0].dataIndex + 1);
                return `${values[0].marker}${values[0].seriesName}：${values[0].value}</br>${values[1].marker}${values[1].seriesName}：${values[1].value}`
            },
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          xAxis: {
            axisLabel: {
              color: '#FFFFFF'
            },
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            axisTick: {
              alignWithLabel: true,
              inside: true,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            nameLocation: 'middle',
            data: that.$props.xData
          },
          yAxis: [{
            name: '单位: 元',
            type: 'value',
            axisLabel: {
              color: '#FFFFFF'
            },
            splitLine: {
              lineStyle: {
                color: '#284D65',
                type: 'dashed'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            axisTick: {
              inside: true,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            max: function(value) {
              return that.maxNumber;
            }
          },
            {
            type: 'value',
              max: function(value) {
                return that.maxNumber;
              },
              axisLabel: {
                color: '#FFFFFF'
              },
              splitLine: {
                lineStyle: {
                  color: '#284D65',
                  type: 'dashed'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#FFFFFF'
                }
              },
              axisTick: {
                inside: true,
                lineStyle: {
                  color: '#FFFFFF'
                }
              }
          }],
          series: [{
            name: that.$props.series[0].name,
            data: that.$props.series[0].data,
            type: 'line',
            itemStyle: {
              color: '#0F79DA',
              opacity: 0
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
                    color: "#0F79DA" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#012747" // 100% 处的颜色
                  }
                ]
              },
              opacity: 0.6
            }
          },
            {
              name: that.$props.series[1].name,
              data: that.$props.series[1].data,
              type: 'line',
              yAxisIndex:1,
              itemStyle: {
                color: '#00C451',
                opacity: 0
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
                      color: "#00C451" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#012747" // 100% 处的颜色
                    }
                  ]
                },
                opacity: 0.6
              }
            }]
        };
        this.canv.setOption(option);
      }
    },
    watch: {
      series: function (newValue, oldValue){
        
        this.loadData()
        
        this.draw()
      }
    }
  }
</script>

<style scoped>
</style>

