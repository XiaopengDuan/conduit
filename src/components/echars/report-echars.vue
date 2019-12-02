<template>
  <!-- <div style="width: 5rem;height: 100%;margin-left: -0.3rem"> -->
  <div style="width: 5rem;height: 4.6rem;margin-left: -0.1rem">
    <div ref="pie" id="pie" style="width: 100%;height: 100%"></div>
  </div>
</template>

<script>
  import echarts from "echarts";
  import {
    getComTopFiveAndUserArreaCounts,
    getUserNonArreaCountsAndComTopFive,
    getCountsCommunityTopByElecTypeCode
  } from "@/api/usercenter";

  export default {
    name: "report-echars",
    data() {
      return {
        pieDataList: {}
      };
    },                                      
    model: {
      prop: "vModel",
      event: "vModel_event"
    },
    props: {
      chartType: {
        type: String,
        default() {
          return "1";
        }
      },
      vModel: String,
      communitySelect: [],
      loadData: Function
    },
    mounted() {
      this.loadPieData();
    },
    methods: {
      loadPieData: function () {
        let that = this;
        if (this.chartType == "1") {
          //欠费用户列表
          getComTopFiveAndUserArreaCounts().then(response => {
            let data = response.data;
            that.pieDataList = data;
            this.drawPie(data);
          });
        }

        if (this.chartType == "2") {
          //正常缴费
          getUserNonArreaCountsAndComTopFive().then(response => {
            let data = response.data;
            that.pieDataList = data;
            this.drawPie(data);
          });
        }

        if (
          this.chartType == "3" ||
          this.chartType == "4" ||
          this.chartType == "5"
        ) {
          //00：居民 01：非居民 02：特种
          let elecTypeCode = "00";
          if (this.chartType == "4") elecTypeCode = "01";
          if (this.chartType == "5") elecTypeCode = "02";
          let postData = {elecTypeCode: elecTypeCode};
          //正常缴费
          getCountsCommunityTopByElecTypeCode(postData).then(response => {
            let data = response.data;
            that.pieDataList = data;
            this.drawPie(data);
          });
        }
      },
      drawPie: function (data) {
        let that = this;
        let centerText = "";
        if (this.chartType == "1") {

          // centerText = `<table style='font-size:10px;'>
          //                   <tr><td style='font-size:13px;'>用户总数　<span style='color:#ff9900;'>${data.userTotalCount}</span></td></tr>
          //                   <tr><td style='font-size:9px;'>欠费用户数　<span style='color:#ff9900'>${data.userArrearTotalCount}</span></td></tr>
          //                   <tr><td style='font-size:9px;'>欠费总额　<span style='color:#ff9900'>${data.arrearTotalMoney}</span></td></tr>
          //                   <tr><td style='font-size:9px;'>欠费用户数环比　<span style='color:#ff9900'>${data.userArrearCountQoq}</span></td></tr>
          //                   <tr><td style='font-size:9px;'>欠费总额环比　<span style='color:#ff9900'>${data.arrearMoneyQoq}</span></td></tr>
          //                 </table>`;
          centerText = `<table>
                          <tr>
                            <td rowspan="4" style="align:center;font-size:10px;"><span style='color:#ff9900;font-size:14px;'>${data.userArrearTotalCount}</span></br>用户总数</td>
                            <td style='font-size:9px;'>用户数　<span style='color:#ff9900'>${data.userArrearTotalCount}</span></td>
                          </tr>
                          <tr><td style='font-size:9px;'>欠费额　<span style='color:#ff9900'>${data.arrearTotalMoney}</span></td></tr>
                          <tr><td style='font-size:9px;'>用户数环比　<span style='color:#ff9900'>${data.userArrearCountQoq}</span></td></tr>
                          <tr><td style='font-size:9px;'>金额环比　<span style='color:#ff9900'>${data.arrearMoneyQoq}</span></td></tr>
                        </table>`;
        }

        if (this.chartType == "2") {
          centerText = `<table style='font-size:10px;'>
                          <tr ><td rowspan="5" style='font-size:10px;'><span style='color:#ff9900;font-size:11px;'>${
            data.totalPower
            }</span></br>累计用水
                          </td>
                          <td style='font-size:9px;'>上月用水量　<span style='color:#ff9900'>${
            data.lastPower
            }</span></td>
                          </tr>
                          <tr><td style='font-size:9px;'>累计水费　<span style='color:#ff9900'>${
            data.totalMoney
            }</span></td></tr>
                          <tr><td style='font-size:9px;'>上月水费　<span style='color:#ff9900'>${
            data.lastMoney
            }</span></td></tr>
                          <tr><td style='font-size:9px;'>水费环比　<span style='color:#ff9900'>${
            data.powerYty
            }</span></td></tr>
                          <tr><td style='font-size:9px;'>水量环比　<span style='color:#ff9900'>${
            data.powerQoq
            }</span></td></tr>
                        </table>`;
        }

        if (
          this.chartType == "3" ||
          this.chartType == "4" ||
          this.chartType == "5"
        ) {
          centerText = `<table  cellpadding='0' cellspacing='0' style='font-size:10px;padding:0;margin:0;'>
         <tr><td rowspan="6" style='font-size:10px;padding-right:3px;'><span style='color:#ff9900;font-size:12px;margin:0;'>${
            data.totalPower
          }</span></br>累计用水
                          </td>
                          <td style='font-size:9px;padding:0;margin:0;'>上月用水量　<span style='color:#ff9900;padding:0;margin:0;'>${
            data.lastPower
          }</span></td>
                          </tr>
                          <tr><td style='font-size:9px;padding:0;margin:0;'>累计水费　<span style='color:#ff9900;padding:0;margin:0;'>${
            data.totalMoney
          }</span></td></tr>
                          <tr><td style='font-size:9px;padding:0;margin:0;'>上月水费　<span style='color:#ff9900'>${
            data.lastMoney
          }</span></td></tr>
                          <tr><td style='font-size:9px;padding:0;margin:0;'>欠费金额　<span style='color:#ff9900'>${
            data.arrearsMoney
          }</span></td></tr>
                          <tr><td style='font-size:9px;padding:0;margin:0;'>欠费次数　<span style='color:#ff9900'>${
            data.now
          }</span></td></tr>
                          <tr><td style='font-size:9px;'>消除次数　<span style='color:#ff9900'>${
            data.remove
          }</span></td></tr>
                        </table>`;
        }

        let sum = data.community.reduce((prev, item) => {
          return Number.parseInt(prev) + Number.parseInt(item.value);
        }, 0);

        let buttom1 = sum * 1.12;
        let buttom2 = sum * 0.02;
        let value1 = data.community[0]
          ? Number.parseInt(data.community[0].value) / sum < 0.07
            ? sum * 0.07
            : data.community[0].value
          : 0;
        let value2 = data.community[1]
          ? Number.parseInt(data.community[1].value) / sum < 0.07
            ? sum * 0.07
            : data.community[1].value
          : 0;
        let value3 = data.community[2]
          ? Number.parseInt(data.community[2].value) / sum < 0.07
            ? sum * 0.07
            : data.community[2].value
          : 0;
        let value4 = data.community[3]
          ? Number.parseInt(data.community[3].value) / sum < 0.07
            ? sum * 0.07
            : data.community[3].value
          : 0;
        let value5 = data.community[4]
          ? Number.parseInt(data.community[4].value) / sum < 0.07
            ? sum * 0.07
            : data.community[4].value
          : 0;
        let myChart = echarts.init(that.$refs.pie);
        var option = {

         tooltip: {
          confine: true,
            triggerOn: "none", //默认不显示，必须通过 showTip显示
            alwaysShowContent: true, //一直显示，不隐藏
            backgroundColor: "transparent", // 提示框背景颜色
            position: ["13%", "32%"], //悬浮框位置
            textStyle: {
              color: "skyblue" // 设置文本颜色 默认#FFF
            },
            formatter: function (params, ticket, callback) {
              return centerText;
            }
          },
          grid:{left:20},
          series: [
            {
              type: "pie",
              center: ["35%", "45%"],
              radius: ["75%", "78%"],
              startAngle: 70, //起始角度
              avoidLabelOverlap: false, //是否启用防止标签重叠策略
              labelLine: {
                show: false,
                length: 1
              },
              label: {
                normal: {
                  show: true,
                  fontSize: 11,
                  position: "outside",
                  formatter: function (parmas) {
                    return parmas.name.length > 6 ? parmas.name.substring(0, 6) : parmas.name;
                  },
                  padding: [20, 0, 0, 0]
                }
              },
              itemStyle: {
                color: function (params) {
                  if (params.name == that.currentSelectPie) {
                    return "#ff9900";
                  } else {
                    return "skyblue";
                  }
                }
              },
              data: [
                {
                  name: data.community[0].name,
                  value: value1
                },
                {
                  name: "bottom",
                  value: buttom2,
                  itemStyle: {
                    color: "transparent"
                  }
                },
                {
                  name: data.community[1].name,
                  value: value2
                },
                {
                  name: "bottom",
                  value: buttom2,
                  itemStyle: {
                    color: "transparent"
                  }
                },
                {
                  name: data.community[2].name,
                  value: value3
                },
                {
                  name: "bottom",
                  value: buttom2,
                  itemStyle: {
                    color: "transparent"
                  }
                },
                {
                  name: data.community[3] ? data.community[3].name : "",
                  value: value4
                },
                {
                  name: "bottom",
                  value: buttom2,
                  itemStyle: {
                    color: "transparent"
                  }
                },
                {
                  name: data.community[4] ? data.community[4].name : "",
                  value: value5
                },
                {
                  name: "bottom",
                  value: buttom1,
                  itemStyle: {
                    color: "transparent"
                  }
                }
              ]
            },
            {
              type: "pie",
              center: ["35%", "45%"], //中心点
              radius: ["70%", "71%"], //饼图的半径
              label: {
                show: false
              },
              silent: true, //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
              animation: false, //是否开启动画
              itemStyle: {
                color: "skyblue"
              },
              data: [
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}},
                {value: 2},
                {value: 1, itemStyle: {color: "transparent"}}
              ]
            },
            {
              type: "pie",
              center: ["35%", "45%"],
              radius: ["63%", "66%"],
              startAngle: 0, //起始角度
              silent: true, //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
              animation: false,
              label: {
                show: false
              },
              data: [
                {
                  value: 10,
                  itemStyle: {
                    color: "skyblue",
                    borderWidth: 5,
                    borderColor: "skyblue"
                  }
                },
                {
                  value: 20,
                  itemStyle: {
                    color: "#344E81"
                  }
                }
              ]
            },
            {
              type: "pie",
              center: ["35%", "45%"],
              radius: ["58%", "59%"],
              label: {
                show: false
              },
              silent: true, //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
              animation: false, //是否开启动画
              data: [
                {
                  name: "小区前五名",
                  value: 10,
                  itemStyle: {
                    color: "skyblue"
                  }
                }
              ]
            }
          ]
        };
        myChart.setOption(option, true);

        //默认显示第一项tooltip显示框
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: 0
        });

        myChart.on("click", function (param) {
          if (param.name != "bottom") {
            that.currentSelectPie = param.name;
            if (that.communitySelect.some(x => x.name == param.name)) {
              let community = that.communitySelect.filter(
                x => x.name == param.name
              );
              that.vModel = community[0].code;
              that.$emit("vModel_event", community[0].code);
              that.loadData();
            }
            that.communitySelect.includes(param.name);
            myChart.setOption(option, true);

            myChart.dispatchAction({
              type: "showTip",
              seriesIndex: param.seriesIndex,
              dataIndex: param.dataIndex
            });
          }
        });
      }
    }
  };
</script>

<style scoped>
</style>
