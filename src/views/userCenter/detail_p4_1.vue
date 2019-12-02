<template>
  <div style="height:100%" v-loading="loading">
    <!--右上角按钮-->
    <a class="btn-back" @click="$router.go(-1)">
      <span>返回上一级</span>
    </a>
    <!--右上角按钮//-->
    <div class="list-ys-box list-yhmes-box chart-wrap-box">
      <div class="up-box">
        <div class="title">
          用水水量同比
          <el-date-picker
            type="monthrange"
            align="right"
            unlink-panels
            format="yyyyMM"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            v-model="selectMonth1"
            @change="loadCurveWater"
            :picker-options="pickerOptions1">
          </el-date-picker>
          <div class="chart-wrap-mes">
            <p>
              <b>
                <span class="bg-blue"></span>
                <span class="text-primary" v-text="promptText1.pastTitle"></span>
              </b>
              <b>
                <span class="bg-green"></span>
                <span class="text-success" v-text="promptText1.currentTitle"></span>
              </b>
              <b>
                <span class="bg-white"></span>
                <span class v-text="promptText1.yearOnYearTitle"></span>
              </b>
            </p>
            <p>单位：吨</p>
          </div>
        </div>
        <div class="chart-wrap">
          <div id="container1" class="echarts-box" style="width:100%;height:2.5rem"></div>
        </div>
      </div>
      <div class="up-box">
        <div class="title">
          用水水费同比
          <el-date-picker
            type="monthrange"
            align="right"
            unlink-panels
            format="yyyyMM"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            v-model="selectMonth2"
            @change="loadCurveMoney"
            :picker-options="pickerOptions2">
          </el-date-picker>
          <div class="chart-wrap-mes">
            <p>
              <b>
                <span class="bg-blue"></span>
                <span class="text-primary" v-text="promptText2.pastTitle"></span>
              </b>
              <b>
                <span class="bg-green"></span>
                <span class="text-success" v-text="promptText2.currentTitle"></span>
              </b>
              <b>
                <span class="bg-white"></span>
                <span class v-text="promptText2.yearOnYearTitle"></span>
              </b>
            </p>
            <p>单位：元</p>
          </div>
        </div>
        <div class="chart-wrap">
          <!--<img width="100%" height="100%" src="../../assets/img/chart.png"/>-->
          <div id="container2" class="echarts-box" style="width:100%;height:2.5rem"></div>
        </div>
      </div>
    </div>
    <!--右侧page-->
    <rightNav :menuIndex="4"></rightNav>
    <!--右侧page//-->
    <!--右侧切换按钮-->
    <router-link name="切换" class="btn-switch"
                 :to="{path:`/userCenter/detail/${this.$route.params.userNo}/p4_2`}"></router-link>
    <!--右侧切换按钮//-->
  </div>
</template>
<script>
  import rightNav from "../../components/userCenter/rightNav";
  import {getUserMoneyYtyBar, getUserWaterYtyBar} from "@/api/usercenter";
  import echarts from "echarts";
  import moment from "moment";
  export default {
    components: {
      rightNav
    },
    computed: {
      startMonth1: function () {
        return moment(this.selectMonth1[0]).format('YYYYMM');
      },
      endMonth1: function () {
        return moment(this.selectMonth1[1]).format('YYYYMM');
      },
      startMonth2: function () {
        return moment(this.selectMonth2[0]).format('YYYYMM');
      },
      endMonth2: function () {
        return moment(this.selectMonth2[1]).format('YYYYMM');
      },
    },
    data() {
      return {
      loading: false,
        promptText1: {
          currentTitle: '',
          pastTitle: '',
          yearOnYearTitle: '',
        },
        promptText2: {
          currentTitle: '',
          pastTitle: '',
          yearOnYearTitle: '',
        },
        selectMonth1: [moment().add(-12, 'months'), moment().add(-1, 'months')],
        selectMonth2: [moment().add(-12, 'months'), moment().add(-1, 'months')],
        pickerOptions1: {
          shortcuts: [{
            text: '上月',
            onClick(picker) {
              picker.$emit('pick', [moment().add(-1, 'months'), moment().add(-1, 'months')]);
            }
          }, {
            text: '去年至今',
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        pickerOptions2: {
          shortcuts: [{
            text: '上月',
            onClick(picker) {
              picker.$emit('pick', [moment().add(-1, 'months'), moment().add(-1, 'months')]);
            }
          }, {
            text: '去年至今',
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      };
    },
    mounted() {
      this.loadCurveWater();
      this.loadCurveMoney();
       this.loadCurveWater();
      this.loadCurveMoney();
    },
    methods: {
      loadCurveWater: function () {
        let container1 = document.getElementById("container1");
        let postData = {userNo: this.$route.params.userNo};
        postData.startMonth = this.startMonth1;
        postData.endMonth = this.endMonth1;
        var that=this;
        that.loading=true;
        getUserWaterYtyBar(postData).then(res => {
          if (res.code === 200) {
            let data = res.data;
            let options = {
              months: data.months,
              current: data.list.now,
              currentTitle: '本期数据',
              past: data.list.last,
              pastTitle: '往期数据',
              yearOnYear: data.list.value,
              yearOnYearTitle: '同比增长率',
            };
            this.promptText1 = {
              currentTitle: options.currentTitle,
              pastTitle: options.pastTitle,
              yearOnYearTitle: options.yearOnYearTitle,
            };
            this.drawWaterLine(container1, options, 'c1');
          }
          that.loading=false;
        })
        .catch(res=>{
          that.loading=false;
        });
      },
      loadCurveMoney: function () {
        let container2 = document.getElementById("container2");
        let postData = {userNo: this.$route.params.userNo};
        postData.startMonth = this.startMonth1;
        postData.endMonth = this.endMonth1;
        var that=this;
        that.loading=true;
        getUserMoneyYtyBar(postData).then(res => {
          if (res.code === 200) {
            let data = res.data;
            let options = {
              months: data.months,
              current: data.list.now,
              currentTitle: '本期数据',
              past: data.list.last,
              pastTitle: '往期数据',
              yearOnYear: data.list.value,
              yearOnYearTitle: '同比增长率',
            };
            this.promptText2 = {
              currentTitle: options.currentTitle,
              pastTitle: options.pastTitle,
              yearOnYearTitle: options.yearOnYearTitle,
            };
            this.drawWaterLine(container2, options, 'c2');
          }
          that.loading=false;
        }).catch(res=>{
          that.loading=false;
        });
      },
      drawWaterLine(container, options, type) {
        echarts.init(container).setOption({
          grid: {
            y: 10,
            x: 38,
            x2: 50,
          },
         tooltip: {
          confine: true,
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#283b56'
              }
            },
            formatter: function (values, index) {
              let str = `${values[0].name}</br>`
              values.forEach((value,index)=>{
                if(type==='c1'){
                  str += index!==2?`${value.marker}${value.seriesName}: ${value.value}T</br>`:`${value.marker}${value.seriesName}: ${value.value==='--'?'--':value.value+'%'}</br>`
                } else {
                   str += index!==2?`${value.marker}${value.seriesName}: ${value.value}元</br>`:`${value.marker}${value.seriesName}: ${value.value==='--'?'--':value.value+'%'}</br>`
                }
              })
              return str
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: options.months,//月份数据
            axisLabel: {
              rotate: 70,
              textStyle: {
                color: "#fff" //坐标值得具体的颜色
              }
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#034778", //左边线的颜色
                width: "1" //坐标线的宽度
              }
            }
          },
          yAxis: [
            {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: "#05abc4"
              }
            },
            axisLabel: {
              formatter: type==='c1'?'{value} T':'{value} 元',
              textStyle: {
                color: "#fff" //坐标值得具体的颜色
              }
            },
            axisLine: {
              show: false
            }
          },
          {
            name: '同比',
            position:'right',
            type: "value",
            splitLine: {
              show: false,
              lineStyle: {
                color: "#05abc4"
              }
            },
            axisLabel: {
              formatter: '{value} %',
              textStyle: {
                color: "#fff" //坐标值得具体的颜色
              }
            },
            axisLine: {
              show: false
            }
          }
          ],
          series: [
            {
              name: options.pastTitle,
              data: options.past,
              type: "bar",
              barGap: "0%",
              barWidth: 10,
              smooth: true,
              areaStyle: {
                normal: {
                  //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(80,141,255,0.39)"
                    },
                    {
                      offset: 0.34,
                      color: "rgba(56,155,255,0.25)"
                    },
                    {
                      offset: 1,
                      color: "rgba(38,197,254,0.00)"
                    }
                  ])
                }
              },
              itemStyle: {
                normal: {
                  color: "#05abc4", //改变折线点的颜色
                  lineStyle: {
                    color: "#05abc4", //改变折线颜色
                    width: "3"
                  }
                }
              }
            },
            {
              name: options.currentTitle,
              data: options.current,
              type: "bar",
              barGap: "0%",
              barWidth: 10,
              smooth: true,
              areaStyle: {
                normal: {
                  //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "rgba(80,141,255,0.39)"
                    },
                    {
                      offset: 0.34,
                      color: "rgba(56,155,255,0.25)"
                    },
                    {
                      offset: 1,
                      color: "rgba(38,197,254,0.00)"
                    }
                  ])
                }
              },
              itemStyle: {
                normal: {
                  color: "#00ff84", //改变折线点的颜色
                  lineStyle: {
                    color: "#00ff84", //改变折线颜色
                    width: "3"
                  }
                }
              }
            },
            {
              name: options.yearOnYearTitle,
              data: options.yearOnYear,
              type: "line",
              yAxisIndex: 1,
              itemStyle: {
                normal: {
                  color: "#ffffff", //改变折线点的颜色
                  lineStyle: {
                    color: "#ffffff", //改变折线颜色
                    width: "1"
                  }
                }
              }
            },
          ]
        });
      }
    }
  }
</script>
