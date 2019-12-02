<template>
  <div style="width: 100%;height: 100%">
    <div ref="canv" id="canv" style="width: 100%;height: 100%"></div>
  </div>
</template>

<script>
  import echarts from "echarts";
  export default {
    name: "incomePieEchars",
    data() {
      return {
        DataList: {},
        maxNumber: 500,
      }
    },
    model: {
      prop: 'vModel',
      event: 'vModel_event',
      echartsData: []
    },
    // props: {
    //   vModel: String
    // },
    props: ['canvs','vModel'],
    mounted() {
      // this.draw()
    },
    methods: {
      changeData(sz){
        this.echartsData = sz;
        this.draw()
      },
      loadData: function () {
      },
      isZero(){
        let flag = true
        this.echartsData.forEach(vlaue => {
          if(vlaue.value!==0){
            flag =  false
          }
        });
        return flag
      },
      draw: function (data) {
        let myEcharts = echarts.getInstanceByDom(this.$refs.canv)
        this.canvs(myEcharts)
        if(!myEcharts){
          myEcharts = echarts.init(this.$refs.canv, 'light');
          this.$once('hook:beforeDestroy', function () {
                echarts.dispose(myEcharts)
          })
        }
        // let myEcharts = echarts.init(this.$refs.canv);
        let colors = ["#12E6F9", "#00C451", "#FF6D00", "#FF0000"]
        // if(this.isZero()){
        //     colors =  ["#09243A", "#09243A", "#09243A"]
        // }
        let that = this;
        let option = {
          color: colors,
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            top: '5%',
            left: '5%',
            orient: 'vertical',
            textStyle: {
              color: '#FFFFFF'
            }
          },
          series : [
            {
              name:'访问来源',
              type:'pie',
              radius : this.isZero()?["15%","20%"]:["15%", "60%"],
              data: this.echartsData.sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
              },
              labelLine: {
              },
              itemStyle: {
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
        };
        myEcharts.setOption(option);
      }
    }
  }
</script>

<style scoped>
</style>
