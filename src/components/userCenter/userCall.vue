<template>
  <!--弹出层-->
  <div class="model" style="display: block" v-show="isShowPanel">
    <div class="model-box">
      <!--四个装饰角-->
      <div class="top-horn-l"></div>
      <div class="top-horn-r"></div>
      <div class="bottom-horn-l"></div>
      <div class="bottom-horn-r"></div>
      <!--四个装饰角//-->
      <!--关闭按钮-->
      <a class="close" @click="toggleDialog"></a>
      <!--关闭按钮//-->
      <div class="content">
        <div class="line-7">
          <div class="title">联系客服</div>
          <div class="content-mes">
            <div class="input-group">
              <div class="col-12">
                <label class="label-text">咨询次数</label>
                <input type="text" class="form-control" :value="callTimes" disabled />
              </div>
              <div class="col-12">
                <label class="label-text">报修次数</label>
                <input type="text" class="form-control" :value="repairTimes" disabled />
              </div>
              <div class="col-12">
                <label class="label-text">报漏次数</label>
                <input type="text" class="form-control" :value="leakTimes" disabled />
              </div>
              <div class="col-12">
                <label class="label-text">投诉次数</label>
                <input type="text" class="form-control" :value="complainTimes" disabled />
              </div>
              <div class="col-12">
                <label class="label-text">全年来电总数</label>
                <input type="text" class="form-control" :value="totalTimes" disabled />
              </div>
            </div>
          </div>
        </div>
        <div class="line-5">
          <div class="title">同小区客服次数对比</div>
          <div class="content-mes">
            <div id="call_chart"></div>
          </div>
        </div>
      </div>
      <nav class="pagination-wrap" aria-label="..." v-if="isShowFootNav">
        <ul class="pagination">
          <li>
            <a aria-label="Previous" @click="Previous">
              <span class="d4"></span>
            </a>
          </li>
          <li>
            <a class="active">{{footNavText}}</a>
          </li>
          <li>
            <a aria-label="Next" @click="Next">
              <span class="d3"></span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <!--弹出层//-->
</template>
<style scoped>
#call_chart {
  width: 4.5rem;
  height: 2.8rem;
}
</style>

<script>
var echarts = require("echarts");
import { getUserProperty, getCallWindowInfoPage1 } from "@/api/usercenter";
export default {
  props: {
    userNo: {
      default: ""
    }
  },
  data() {
    return {
      isShowPanel: false,
      index: 0,
      footNavText: "",
      footNavTextArr: [],
      isShowFootNav: true,

      callTimes: "", //咨询
      repairTimes: "", //报修
      leakTimes: "", //报漏
      complainTimes: "", //投诉
      totalTimes: "", //总计
      xArr: [], //图表水平参数
      yArr: [], //图表垂直参数
    };
  },
  mounted() {
    var that = this;
    let postData = {
      userNo: this.userNo
    };
    getCallWindowInfoPage1(postData)
      .then(response => {
        if (response.code == 200) {
          that.callTimes = response.data.calls.咨询;
          that.repairTimes = response.data.calls.报修;
          that.leakTimes = response.data.calls.报漏;
          that.complainTimes = response.data.calls.投诉;
          that.totalTimes = response.data.calls.总计;
          if(response.data.callTypeNameCounts.length>0){
            that.isShowFootNav=true;
            that.footNavTextArr=response.data.callTypeNameCounts;
            that.footNavText = response.data.callTypeNameCounts[0];
          }
          that.xArr = response.data.callName;
          that.yArr = response.data.callValue;
          that.initChart();
        }
      })
      .catch(err => {});
  },
  methods: {
    toggleDialog: function() {
      if (this.isShowPanel) this.isShowPanel = false;
      else this.isShowPanel = true;
    },
    initChart: function() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("call_chart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "单位：次",
          textAlign: "left",
          textStyle: {
            color: "#fff",
            fontSize: 12
          }
        },
        grid: {
          y: 45,
          x: 45,
          y2:120,
          borderColor: "red"
        },
       tooltip: {
          confine: true,},
        xAxis: {
          data: this.xArr,
          show: true,
          nameTextStyle: {
            color: "#DEE1E7"
          },
          axisLabel: {
            rotate: 70,
            textStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#fff"],
              width: 1
            }
          }
        },
        series: [
          {
            name: "",
            type: "bar",
            data: this.yArr,
            markPoint: {
                  data: [{ value: this.yArr[this.yArr.length-1], xAxis: this.yArr.length-1, yAxis: this.yArr[this.yArr.length-1] }],
                  label: {
                    color: "#fff"
                  },
                  itemStyle: {
                    color: "#FE6E09"
                  }
            },
            itemStyle: {
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#22A3E8" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#7623DC" }
                ])
              },
              normal: {
                label: {
                  show: false, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: '#fff',
                    fontSize: 16
                  }
                },
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#22A3E8" },
                  { offset: 1, color: "#7623DC" }
                ])
              },
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#059CE6" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#6F07D9" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
          }
        ]
      });
    },
    Previous: function() {
      if (this.index > 0) this.index--;
      if (this.footNavTextArr.length > this.index) {
        this.footNavText = this.footNavTextArr[this.index];
      }
    },
    Next: function() {
      if (this.index < this.footNavTextArr.length)
        this.index++;
      if (this.footNavTextArr.length > this.index) {
        this.footNavText = this.footNavTextArr[this.index];
      }
    }
  }
};
</script>
