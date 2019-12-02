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
      <a href="#" class="btn-back" @click="goBack()"><span>返回上一级</span></a>
      <div class="tablecont-box">
        <!--左边表格-->
        <div class="col-6 table-wrap">
          <div class="table-title">
            <div class="text" style="padding-left:15px;" v-text="title"></div>
          </div>
          <table class="table table-striped">
            <thead>
            <tr>
              <th>日期</th>
              <th>销售额</th>
              <th>同比增长率</th>
              <th>环比增长率</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in list" :key="index">
              <td scope="row" v-text="item.month"></td>
              <td v-html="item.totalPower"></td>
              <td v-html="item.yty"></td>
              <td v-html="item.qoq"></td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--左边表格//-->
        <!--右边表格-->
        <div class="col-6">
          <div id="container" class="echarts-box" style="width:100%;height:5.8rem;"></div>
        </div>
        <!--右边表格//-->
      </div>
    </div>
  </div>
</template>
<script>
  import {getArrearCountYtyQoqChangeCurve} from "@/api/charge";
  import echarts from "echarts";

  export default {
    data() {
      return {
        title: '',
        list: [],
      }
    },
    mounted() {
      let postData = this.$route.query;
      getArrearCountYtyQoqChangeCurve(postData).then(res => {
        if (res.code === 200) {
          this.title = res.data.title;
          this.list = this.format(res.data.list);

          let data = res.data.changeCurve;
          let options = {
            months: data.months,
            lastTitle: '往期数据',
            last: data.lastTotalPowers,

            nowTitle: '本期数据',
            now: data.nowTotalPowers,

            ytysTitle: '同比增长率',
            ytys: data.ytys,

            qoqsTitle: '环比增长率',
            qoqs: data.qoqs,
          };
          this.drawWaterLine(options);
        }
      });
    },
    methods: {
      goBack() {
        this.$router.back(-1)
      },
      format(list) {
        let result = [];
        for (let i = 0; i < list.length; i++) {
          let item = list[i];

          if (isNaN(item.totalPower)) {
            item.totalPower = `${item.totalPower}`;
          } else {
            item.totalPower = `¥${item.totalPower}`;
          }

          if (isNaN(item.yty)) {
            item.yty = `${item.yty}`;
          } else if (parseFloat(item.yty) >= 0) {
            item.yty = `<span style="color: rgb(3, 255, 134);">+${item.yty}%</span>`;
          } else {
            item.yty = `<span style="color: rgb(3, 255, 134);">-${item.yty}%</span>`;
          }


          if (isNaN(item.qoq)) {
            item.qoq = `${item.qoq}`;
          } else if (parseFloat(item.qoq) >= 0) {
            item.qoq = `<span style="color: rgb(3, 255, 134);">+${item.qoq}%</span>`;
          } else {
            item.qoq = `<span style="color: rgb(3, 255, 134);">-${item.qoq}%</span>`;
          }

          result.push(item);
        }
        return result;
      },
      drawWaterLine(options) {
        let container = document.getElementById("container");
        echarts.init(container).setOption({
          grid: {
            y: 40,
            x: 60,
            x2: 0
          },
          legend: {
            left: 50,
            align: 'left',
            textStyle: {//图例文字的样式
              color: '#fff',
            },
          },
         tooltip: {
          confine: true,
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#283b56'
              }
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
          yAxis: {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: "#05abc4"
              }
            },
            axisLabel: {
              textStyle: {
                color: "#fff" //坐标值得具体的颜色
              }
            },
            axisLine: {
              show: false
            }
          },
          series: [
            {
              name: options.lastTitle,
              data: options.last,
              type: "bar",
              barGap: "0%",
              barWidth: 10,
              smooth: true,
              itemStyle: {
                normal: {
                  color: "rgb(1, 137, 255)",
                  lineStyle: {
                    color: "rgb(1, 137, 255)",
                    width: "3"
                  }
                }
              }
            },
            {
              name: options.nowTitle,
              data: options.now,
              type: "bar",
              barGap: "0%",
              barWidth: 10,
              smooth: true,
              itemStyle: {
                normal: {
                  color: "rgb(22, 217, 99)", //改变折线点的颜色
                  lineStyle: {
                    color: "rgb(22, 217, 99)", //改变折线颜色
                    width: "3"
                  }
                }
              }
            },
            {
              name: options.ytysTitle,
              data: options.ytys,
              type: "line",
              itemStyle: {
                normal: {
                  color: "rgb(255, 255, 255)", //改变折线点的颜色
                  lineStyle: {
                    color: "rgb(255, 255, 255)", //改变折线颜色
                    width: "1"
                  }
                }
              }
            },
            {
              name: options.qoqsTitle,
              data: options.qoqs,
              type: "line",
              itemStyle: {
                normal: {
                  color: "rgb(249, 100, 10)", //改变折线点的颜色
                  lineStyle: {
                    color: "rgb(249, 100, 10)", //改变折线颜色
                    width: "1"
                  }
                }
              }
            },
          ]
        });
      }
    }
  };
</script>
