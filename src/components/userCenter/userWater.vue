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
          <div class="title">水量记录</div>
          <div class="content-mes">
            <div class="input-group">
              <div class="col-12">
                <label class="label-text">月均水量</label>
                <input type="text" class="form-control" :value="monthWater" disabled />
              </div>
              <div class="col-12">
                <label class="label-text">全年水量</label>
                <input type="text" class="form-control" :value="yearWater" disabled />
              </div>
              <div class="col-12">
                <label class="label-text">最少月份水量</label>
                <input type="text" class="form-control" :value="minWater" disabled />
              </div>
              <div class="col-12">
                <label class="label-text">最高月份水量</label>
                <input type="text" class="form-control" :value="maxWater" disabled />
              </div>
            </div>
          </div>
        </div>
        <div class="line-5">
          <div class="title">上月同小区用水量对比</div>
          <div class="content-mes" style="height:220px">
            <div id="water_chart"></div>
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
#water_chart {
  width: 4.5rem;
  height: 220px;
}
.col-12 {
  padding-bottom: 0 !important;
}
</style>

<script>
var echarts = require("echarts");
import { getWaterWindowInfoPage1 } from "@/api/usercenter";
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
      userCallProp: {},
      isShowFootNav: "",

      monthWater: "", //月均水量
      yearWater: "", //全年水量
      minWater: "", //最少月份水量
      maxWater: "", //最高月份水量
      xArr: [], //图表水平参数
      yArr: [], //图表垂直参数
      mySub: "", //我所在的区间
      mySubX: 0 //我所在的区间
    };
  },
  mounted() {
    var that = this;
    let postData = {
      userNo: this.userNo
    };
    getWaterWindowInfoPage1(postData)
      .then(response => {
        if (response.code == 200) {
          that.monthWater = response.data.waters.月均水量;
          that.yearWater = response.data.waters.全年水量;
          that.minWater = response.data.waters.最少月份水量;
          that.maxWater = response.data.waters.最高月份水量;

          that.xArr = response.data.xZData;
          that.yArr = response.data.yZData;

          that.xArr.forEach((item, index, arr) => {
            if (item == response.data.sub) {
              that.mySub = that.yArr[index];
              that.mySubX=index;
            }
          });
          that.initChart();
        }
      })
      .catch(err => {});
  },
  watch: {
    userCallProp: function(val) {}
  },
  methods: {
    toggleDialog: function() {
      if (this.isShowPanel) this.isShowPanel = false;
      else this.isShowPanel = true;
    },
    initChart: function() {
      // console.log({ value: this.mySub, xAxis: this.mySubX, yAxis: this.mySub })
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("water_chart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "单位：用户数",
          textAlign: "left",
          textStyle: {
            color: "#fff",
            fontSize: 12
          }
        },
        grid: {
          y: 65,
          x: 45,
          y2: 20
        },
       tooltip: {
          confine: true,},
        xAxis: {
          name: "吨",
          nameLocation: "end",
          nameGap: "5",
          data: this.xArr,
          show: true,
          nameTextStyle: {
            color: "#DEE1E7"
          },
          axisLabel: {
            rotate: 0,
            textStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#657288"],
              width: 1
            }
          },
          axisLabel: {
            rotate: 0,
            textStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            name: "",
            type: "bar",
            data: this.yArr,
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
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#fff",
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
                y2: 0,
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
           tooltip: {
          confine: true,
              formatter: "{b0}吨: {c0}户"
            },
            markPoint: {
              data: [{ value: this.mySub, xAxis: this.mySubX, yAxis: this.mySub }],
              label: {
                color: "#fff"
              },
              itemStyle: {
                color: "#FE6E09"
              }
            }
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
      if (this.index < this.footNavTextArr.length) this.index++;
      if (this.footNavTextArr.length > this.index) {
        this.footNavText = this.footNavTextArr[this.index];
      }
    }
  }
};
</script>
