<template>
  <div style="height:100%" v-loading="loading">
    <!--右上角按钮-->
    <a class="btn-back" @click="$router.go(-1)">
      <span>返回上一级</span>
    </a>
    <!--右上角按钮//-->
    <div class="list-ys-box list-yhmes-box yh-mes-wrap" style="padding-top:0;">
      <div class="up-box">
        <div class="title" style="top:.42rem">用户行为图谱</div>
        <div id="menu" ref="chartMenu">
          <div
            id="backImg"
            :style="{'height':backImgHeight+'px','width':backImgWidth+'px','left':backImgLeft+'px','top':backImgTop+'px'}"
          >
          <!--<div id="rootName">{{centerName}}</div>-->
          </div>
          <div id="myEcharts" class="echarts_div" ></div>
        </div>
      </div>
    </div>
    <!--右侧page-->
    <rightNav :menuIndex="1"></rightNav>
    <!--右侧page//-->

    <!---->
    <userDefault
      :isShowUserDefaultPanel="isShowUserDefaultPanel"
      :userNo="userNo"
      ref="userDefault"
    ></userDefault>
    <userCall :isShowCallPanel="isShowCallPanel" :userNo="userNo" ref="userCall"></userCall>
    <userWater :isShowWaterPanel="isShowWaterPanel" :userNo="userNo" ref="userWater"></userWater>
    <userPay :isShowPayPanel="isShowPayPanel" :userNo="userNo" ref="userPay"></userPay>
  </div>
</template>
<style scoped>
.echarts_div {
  position: absolute;
  height: 100%;
  width: 100%;
  /* padding: 10px */
}

#backImg {
  position: absolute;
  height: 744px;
  width: 744px;
  background-image: url("../../assets/img/mes_bg.png");
  background-size: cover;
}

#menu {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
#rootName {
  position: absolute;
  left: 50%;
  top: 54.5%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  color: #ffffff;
  font-weight: 600;
}
</style>

<script>
var echarts = require("echarts");

import userHeader from "../../components/userCenterHeader";
import rightNav from "../../components/userCenter/rightNav";
import userDefault from "../../components/userCenter/userDefault";
import userCall from "../../components/userCenter/userCall";
import userWater from "../../components/userCenter/userWater";
import userPay from "../../components/userCenter/userPay";
import center from "@/assets/img/centerRoot.png";
import other from "@/assets/img/kf_bg.png";

import {
  getUserProperty,
  getDefaultWindowInfoPage1,
  getCallWindowInfoPage1
} from "@/api/usercenter";

const secondNoteNameList = {
  basis: "基本信息",
  call: "联系客服",
  defaultRecord: "违约记录",
  pay: "缴费记录",
  water: "用水行为"
};

export default {
  name: "Home",
  components: {
    userHeader,
    userDefault,
    userCall,
    userWater,
    userPay,
    rightNav
  },
  data() {
    return {
      loading: false,
      menuIndex: 2,
      isShowUserDefaultPanel: false, //控制是否显示用户违约弹层
      isShowCallPanel: false, //控制是否显示联系客户弹层
      isShowWaterPanel: false, //控制是否显示用水弹层
      isShowPayPanel: false, //控制是否显示缴费弹层

      //用于图表
      centerName: "",
      myChart: {},
      index: 0,
      backImgHeight: 0,
      backImgWidth: 0,
      backImgLeft: 0,
      backImgTop: 0
    };
  },
  computed: {
    menuHeight: function() {
      var height = this.$refs.chartMenu.offsetHeight;
      return height;
    },
    userNo: function() {
      return this.$route.params.userNo; //"0410005005"; //
    },
    userName: function() {
      return this.$route.params.userName; //"罗威"; //t
    },
    postData: function() {
      let postData = {
        userNo: this.userNo
      };
      return postData;
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("myEcharts"));
    this.getUserInfo();
  },

  methods: {
    //获取页面基本属性数据
    getUserInfo: function() {
      let that = this;
      let postData = {
        userNo: this.userNo
      };
      that.loading = true;
      getUserProperty(postData)
        .then(response => {
          that.loading = false;
          let data = response.data;
          this.creatEcharts(data);
        })
        .catch(err => {
          that.loading = false;
        });
    },
    //封装数据，生成图表
    creatEcharts: function(data) {
      let listdata = [];
      let links = [];
      let firstPrams = {
        name: data.userName
      };
      this.centerName = data.userName;
      let firstData = this.setData(
        firstPrams,
        0,
        this.menuHeight * 0.336 * 0.87,
        firstPrams.name,
        center
      );
      listdata.push(firstData);
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          if (element instanceof Array) {
            let secondData = {
              name: secondNoteNameList[key]
            };

            secondData = this.setData(
              secondData,
              1,
              this.menuHeight * 0.235 * 0.9,
              secondData.name,
              other
            );
            listdata.push(secondData);
            links.push(this.setLinkData(secondData, firstData, true));
            element.forEach(elementChild => {
              let thirdData = {
                name: elementChild.nodeName
              };
              thirdData = this.setData(
                thirdData,
                2,
                this.menuHeight * 0.177 * 0.9,
                elementChild.value,
                other
              );
              listdata.push(thirdData);
              links.push(this.setLinkData(thirdData, secondData));
            });
          }
        }
      }

      this.initEcharts(listdata, links);
    },
    //生成节点
    setData: function(json, n, size, value, imageUrl) {
      let labelStyle = {
        normal: {
          show: true,
          position: "inside",
          fontSize: 18 - n * 2,
          color: "#ffffff",
          fontWeight: "normal"
        }
      };

      if (n === 0) {
        labelStyle.normal.position = "insideBottom";
        labelStyle.normal.distance = size * 0.35;
      }
      if (n === 2) {
        labelStyle.normal.formatter = [
          "{a|" + json.name + "}",
          "{a|" + value + "}"
        ].join("\n");

        labelStyle.normal.rich = {
          a: {
            align: "center",
            fontSize: 18 - n * 2,
            color: "#ffffff",
            fontWeight: "normal",
            lineHeight: 25
          }
        };
      }
      let res = {
        name: json.name,
        symbol: "image://" + imageUrl,
        symbolSize: size,
        symbolOffset: [5, 5],
        draggable: "true",
        value: value,
        label: labelStyle,
        level: n
      };
      return res;
    },
    //生成关系
    setLinkData: function(json, title, isHide) {
      let normal = {
        opacity: 1,
        width: 3,
        color: "#28aac1"
      };
      if (isHide) {
        normal = {
          opacity: 0,
          width: 0
        };
      }

      let res = {
        source: json.name,
        target: title.name,
        value: "",
        lineStyle: {
          normal: normal
        }
      };
      return res;
    },
    //生成图表
    initEcharts: function(listdata, links) {
      var option = {
        //tooltip: {
        //formatter: "{b}"
        //  },
        animationDuration: 6000,
        animationDurationUpdate: 2000,
        hoverAnimation: false,
        series: [
          {
            type: "graph",
            layout: "force",
            force: {
              repulsion: 450,
              edgeLength: 120,
              gravity: 0.08,
              layoutAnimation: true
            },
            emphasis: {
              itemStyle: {
                shadowColor: "rgba(255,255,255,1)",
                shadowBlur: 100,
                borderWidth: 50,
                borderColor: "#ff0000"
              },
              label: {
                shadowColor: "rgba(255,255,255,1)",
                shadowBlur: 100,
                fontWeight: 600
              }
            },
            data: listdata,
            links: links,
            roam: false,
            nodeScaleRatio: 0,
            focusNodeAdjacency: true,
            lineStyle: {
              normal: {
                opacity: 0.5,
                width: 1.5,
                curveness: 0
              }
            }
          }
        ]
      };
      this.myChart.setOption(option);
      this.myChart.on("finished", this.finishedHandle);
      this.myChart.on("click", this.clickFun);
    },

    //图表移动完成事件
    finishedHandle: function() {
      // let postion = this.getMyPosition({
      //   finder: {
      //     seriesIndex: 1
      //   }
      // })._itemLayouts[0];

      // if (this.$refs.chartMenu && this.$refs.chartMenu.offsetHeight) {
      //   let height = this.$refs.chartMenu.offsetHeight;
      //   this.backImgHeight = height * 0.87;
      //   this.backImgWidth = height * 0.87;
      //   this.backImgLeft = postion[0] - (height * 0.87) / 2;
      //   this.backImgTop = postion[1] - (height * 0.87) / 2;
      // }
    },
    //天旭添加this
    // getMyPosition = function (finder) {
    //   var ecModel = this._model;

    //   finder = modelUtil.parseFinder(ecModel, finder, {defaultMainType: 'series'});

    //   var seriesModel = finder.seriesModel;

    //   if (__DEV__) {
    //       if (!seriesModel) {
    //           console.log('There is no specified seires model');
    //       }
    //   }

    //   var data = seriesModel.getData();
    //   return data;

    // },
    //图表点击事件
    clickFun: function(param) {
      if (param.data.level === 1) {
        if (param.name == "用水行为") {
          this.$refs.userWater.toggleDialog();
        }
        if (param.name == "违约记录") {
          this.$refs.userDefault.toggleDialog();
        }
        if (param.name == "联系客服") {
          this.$refs.userCall.toggleDialog();
        }
        if (param.name == "缴费记录") {
          this.$refs.userPay.toggleDialog();
        }
      }
    },

    back() {
      this.$router.go(-1); //返回上一层
    },
    //获取用户违约
    showUserDefaultPanel: function() {
      this.$refs.userDefault.toggleDialog();
    },
    //显示联系客户窗口
    showCallPanel: function() {
      this.$refs.userCall.toggleDialog();
    },
    //显示用水弹层
    showWaterPanel: function() {
      this.$refs.userWater.toggleDialog();
    },
    //显示缴费弹层
    showPayPanel: function() {
      this.$refs.userPay.toggleDialog();
    }
  }
};
</script>
