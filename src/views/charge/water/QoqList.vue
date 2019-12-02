<template>
  <div class="right right1">
    <div class="right-content">
      <!--四个装饰角-->
      <div class="top-horn-l"></div>
      <div class="top-horn-r"></div>
      <div class="bottom-horn-l"></div>
      <div class="bottom-horn-r"></div>
      <!--四个装饰角//-->
      <!--右上角按钮-->
      <div class="tablecont-box" v-if="!$store.state.app.loading || list.length>0">
        <div class="sharetitle">
          <div>水量同比</div>
          <div class="input-group-btn">
            <el-tooltip class="item" content="按回车默认查询" placement="top-start" effect="light">
              <el-select clearable
                @change="tempsearchN"
                style="width: 120px;"
                v-model="communitysTypeValue"
                :placeholder="selectBox.communitysType.placeholder">
                <el-option
                  v-for="item in communitysType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-tooltip>
          </div>
          <div class="input-group-btn">
            <el-date-picker
              type="year"
              style="width: 150px;"
              v-model="timeTypeValue"
              @change="tempsearchN"
              :placeholder="selectBox.timeType.placeholder">
            </el-date-picker>
          </div>
          <div class="input-group-btn">
            <el-tooltip class="item" content="按回车默认查询" placement="top-start" effect="light">
              <el-select clearable
                @change="tempsearchN"
                style="width: 120px;"
                v-model="contentsPriceTypeValue"
                :placeholder="selectBox.contentsPriceType.placeholder">
                <el-option
                  v-for="item in contentsPriceType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-tooltip>
          </div>
          <ul class="nav nav-tabs nav-jf" style="position: initial">
            <li v-for="(item,index) in navBox.navList" @click="navOrSelectChange(index)"
                :class="{active:index === navBox.navIndex }" :key="index">
              <a v-text="item" style="cursor:pointer"></a><img src="../../../assets/img/tab_list_active.png">
            </li>
          </ul>
        </div>
        
        <!-- <div class="scroll-box"> -->
          <table class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
            <tr>
              <th rowspan="2" scope="col" v-text="this.navBox.navTitle[this.navBox.navIndex]">用水类型</th>
              <th rowspan="2" scope="col">年份</th>
              <th rowspan="2" scope="col">合计</th>
              <template v-for="(item,index) in monthsLeftRight"  v-if="index < columnNum" >
                <th colspan="2" scope="col" v-if="index === 0 && item !== '一月'" @click="columnMoveLeft" style="cursor:pointer" :key="index">
                  <span class="d4"></span><span v-text="item"></span>
                </th>
                <th colspan="2" scope="col" v-else-if="index === (columnNum-1) && item !== '十二月'" @click="columnMoveRight" :key="index"
                    style="cursor:pointer">
                  <span class="d3"></span><span v-text="item"></span>
                </th>
                <th colspan="2" scope="col" v-else :key="index">
                  <span v-text="item"></span>
                </th>
              </template>
              <th rowspan="2" scope="col" class="chart-td">变化曲线</th>
            </tr>
            <tr>
              <template v-for="(item,index) in monthsLeftRight" v-if="index < columnNum">
                <th align="center" :key="index">人数</th>
                <th align="center" :key="index">用水量</th>
              </template>
            </tr>
            </thead>
            <tbody>
            <template v-for="items in list">
              <tr>
                <td rowspan="4" align="center" class="text-success" v-text="items.name"></td>
                <td align="center" v-text="items.lastYear.year"></td>
                <td align="center" v-text="items.lastYear.total"></td>
                <template v-for="(item,index) in items.lastYear.items" v-if="index < columnNum">
                  <td align="center" v-text="item.countsAndPowers.count" :key="index"></td>
                  <td align="center" class="ly-pointer" @click="link_userRanking(items.code, item.countsAndPowers.power)"  v-html="formatStyle1(item.countsAndPowers.power)" :key="index"></td>
                </template>
                <td rowspan="4" align="center" class="chart-td" @click="goCurve(items)">
                  <div class="echarts-box" style="width:100%;height:100%;"></div>
                </td>
              </tr>
              <tr>
                <td align="center" v-text="items.nowYear.year"></td>
                <td align="center" v-text="items.nowYear.total"></td>
                <template v-for="(item,index) in items.nowYear.items" v-if="index < columnNum">
                  <td align="center" v-text="item.countsAndPowers.count" :key="index"></td>
                  <td align="center" class="ly-pointer" @click="link_userRanking(items.code, item.countsAndPowers.power)" v-html="formatStyle1(item.countsAndPowers.power)" :key="index"></td>
                </template>
              </tr>
              <tr>
                <td align="center" v-text="items.yty.year"></td>
                <td align="center" v-text="items.yty.total"></td>
                <template v-for="(item,index) in items.yty.items" v-if="index < columnNum">
                  <td align="center" v-text="item.countsAndPowers.count" :key="index"></td>
                  <td align="center" v-html="formatStyle2(item.countsAndPowers.power)" :key="index"></td>
                </template>
              </tr>
              <tr>
                <td align="center" v-text="items.qoq.year"></td>
                <td align="center" v-text="items.qoq.total"></td>
                <template v-for="(item,index) in items.qoq.items" v-if="index < columnNum">
                  <td align="center" v-text="item.countsAndPowers.count" :key="index"></td>
                  <td align="center" v-html="formatStyle2(item.countsAndPowers.power)" :key="index"></td>
                </template>
              </tr>
            </template>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="12" align="center">
                <el-pagination
                  prev-text="上一页"
                  next-text="下一页"
                  layout="prev, pager, next"
                  :pager-count="5"
                  :total="pager.totalCount"
                  :page-size="pager.pageSize"
                  :current-page.sync="pager.pageNum"
                  @size-change="pageChange"
                  @current-change="pageChange"
                  @prev-click="pageChange"
                  @next-click="pageChange"
                ></el-pagination>
              </td>
            </tr>
            </tfoot>
          </table>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";;
  import { maxecharts } from '@/components/echars/minecharts'
  import {
    getRegionUseWaterYtyQoqList,//小区用水同比环比列表
    getElecTypeUseWaterYtyQoqList,//用水类别用水同比环比列表
    getContentPriceUseWaterYtyQoqList,//水价类型用水同比环比列表
  } from "@/api/chargeWater";

 import {
    getArrearSelectValue,
    get61ChargeAndShouldMoneyByCommunityStatistics,
    get62ChargeAndShouldMoneyByWaterPriceStatistics,
    get63ChargeAndShouldMoneyByUserTypeStatistics,
  } from "@/api/charge";


  export default {
    name: 'waterQoqList',
    data() {
      return {
        pager: {
          totalCount: 0,
          pageSize: 3,
          pageNum: 1,
        },
        columnNum: 3,
        list: [],
        monthsLeftRight: [],
        communitysType: [],
        contentsPriceType: [],
        timeTypeValue: '',
        communitysTypeValue: '',
        contentsPriceTypeValue: '',
        selectBox: {
          communitysType: {
            placeholder: '小区名称',
          },
          timeType: {
            placeholder: '选择年份',
          },
          contentsPriceType: {
            placeholder: '水价类型',
          },
        },
        navBox: {
          navIndex: 0,
          navTitle: ['小区名称', '用水类型', '水价类型'],
          navList: ['小区用水量', '不同用户类型用水量', '不同水价类别用水量'],
        },
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      }
    },
    mounted() {
      this.loadArrearSelectValue();
      this.navOrSelectChange();
    },
    computed: {
      echartsContainers() {
        return document.getElementsByClassName('echarts-box')
      },
    },
    methods: {
      link_userRanking(code, e){
        if(parseInt(e) === 0){
          // this.$message('0吨，无数据加载...')
          return false
        }
        // this.$router.push({
        //   name: "waterUserRanking",
        //   params: {seachItems: JSON.stringify({contentPriceCode: value.code})}
        // });
        if (this.navBox.navIndex === 0) {//小区欠费同比环比列表
          this.$router.push({
            name: "waterUserRanking",
            params: {seachItems: JSON.stringify({communityCode:code})}
          });
        } else if (this.navBox.navIndex === 1) {//用水类别用水同比环比列表
          this.$router.push({
            name: "waterUserRanking",
            params: {seachItems: JSON.stringify({elecTypeCode: code})}
          });
        } else if (this.navBox.navIndex === 2) {//水价类型欠费同比环比列表
          this.$router.push({
            name: "waterUserRanking",
            params: {seachItems: JSON.stringify({contentPriceCode: code})}
          });
        }
      },
      goCurve(value) {
        // console.log(value)
        if(this.navBox.navIndex === 0) {
          this.$router.push({
            name: "waterQoqDiagram",
            params: {communityCode: value.code, contentPriceCode: 'null', elecTypeCode: 'null', type:'QoqList',datalist:value.changeCurve},
            // meta: {type: 'analysis', permissionCode: 'CHARGE.ARREAR.ARREARDIAGRAM'},
          });
        } else  if(this.navBox.navIndex === 1) {
          this.$router.push({
            name: "waterQoqDiagram",
            params: {communityCode: 'null', contentPriceCode: value.code, elecTypeCode: 'null', type:'QoqList',datalist:value.changeCurve},
            // meta: {type: 'analysis', permissionCode: 'CHARGE.ARREAR.ARREARDIAGRAM'},
          });
        } else  if(this.navBox.navIndex === 2) {
          this.$router.push({
            name: "waterQoqDiagram",
            params: {communityCode: 'null', contentPriceCode: 'null', elecTypeCode: value.code, type:'QoqList',datalist:value.changeCurve},
            // meta: {type: 'analysis', permissionCode: 'CHARGE.ARREAR.ARREARDIAGRAM'},
          });
        }

      },
      tempsearchN(){
        this.pager.pageNum = 1;
        this.navOrSelectChange();
      },
      pageChange(e) {
        this.pager.pageNum = e;
        this.navOrSelectChange();
      },
      formatStyle1(data) {
        if (isNaN(data)) {
          return data;
        } else if (parseFloat(data) >= 0) {
          return `${data}吨`;
        } else {
          return `<span style="color: red;">${data}吨</span>`;
        }
      },
      formatStyle2(data) {
        if (isNaN(data)) {
          return data;
        } else if (parseFloat(data) >= 0) {
          return `${data}%`;
        } else {
          return `<span style="color: red;">${data}%</span>`;
        }
      },
      navOrSelectChange(index) {
        let postData = {
          pageNum: typeof (index) === "undefined" ?  this.pager.pageNum : 1,
          pageSize: this.pager.pageSize,
          communityCode: this.communitysTypeValue || "",//小区名称
          waterPriceType: this.contentsPriceTypeValue || "",//水价类型
          year: this.timeTypeValue ? moment(this.timeTypeValue).format('YYYY') : "",
        };
        this.monthsLeftRight = JSON.parse(JSON.stringify(this.months));
        this.navBox.navIndex = typeof (index) === "undefined" ? this.navBox.navIndex : index;
        if (this.navBox.navIndex === 0) {
          this.loadRegionUseWaterYtyQoqList(postData);
        } else if (this.navBox.navIndex === 1) {
          this.loadContentPriceUseWaterYtyQoqList(postData);
        } else if (this.navBox.navIndex === 2) {
          this.loadElecTypeUseWaterYtyQoqList(postData);
        }
        if(typeof (index) !== "undefined"){
          this.pager.totalCount = 1
        }
      },
      right(list) {
        for (let i = 0; i < this.columnNum; i++) {
          list.push(list.shift());
        }
      },
      left(list) {
        for (let i = 0; i < this.columnNum; i++) {
          list.unshift(list.pop());
        }
      },
      columnMoveLeft() {
        this.left(this.monthsLeftRight);
        for (let i = 0; i < this.list.length; i++) {
          let item = this.list[i];
          this.left(item.lastYear.items);
          this.left(item.nowYear.items);
          this.left(item.yty.items);
          this.left(item.qoq.items);
          let container = this.echartsContainers[i];
          let echartsData = this.calcEchartsData(item.nowYear.items);
          // let echartsData = this.calcEchartsData(item.qoq.items);
          // let echartsData = this.calcEchartsData(item.yty.items);
          // let echartsData = this.calcEchartsData(item.lastYear.items);
          this.drawWaterLine(container, echartsData);
        }
      },
      columnMoveRight() {
        this.right(this.monthsLeftRight);
        for (let i = 0; i < this.list.length; i++) {
          let item = this.list[i];
          this.right(item.lastYear.items);
          this.right(item.nowYear.items);
          this.right(item.yty.items);
          this.right(item.qoq.items);
          let container = this.echartsContainers[i];
          let echartsData = this.calcEchartsData(item.nowYear.items);
          // let echartsData = this.calcEchartsData(item.qoq.items);
          // let echartsData = this.calcEchartsData(item.yty.items);
          // let echartsData = this.calcEchartsData(item.lastYear.items);
          this.drawWaterLine(container, echartsData);
        }
      },
      loadArrearSelectValue() {
        getArrearSelectValue().then((res) => {
          if (res.code === 200) {
            let selectValue = res.data.selectValue;
            this.communitysType = selectValue.communitys;
            this.contentsPriceType = selectValue.contentsPriceType;
          }
        });
      },
      /**
       * 小区用水同比环比列表
       * @param data
       */
      loadRegionUseWaterYtyQoqList(data) {
        this.$store.dispatch('app/openLoading')
        getRegionUseWaterYtyQoqList({
          year: data.year,
          pageNum: data.pageNum,
          pageSize: data.pageSize,
          communityCode: data.communityCode,
          waterPriceType: data.waterPriceType,
        }).then((res) => {
          this.$store.dispatch('app/closeLoading')
          if (res.code === 200) {
            this.list = res.data.countLists;
            this.pager.totalCount = parseInt(res.data.totalCount);
            // console.log(res)
            this.$nextTick(() => {
              for (let i = 0; i < this.list.length; i++) {
                let item = this.list[i];
                let container = this.echartsContainers[i];
                let echartsData = this.calcEchartsData(item.nowYear.items);
                // let echartsData = this.calcEchartsData(item.qoq.items);
                // let echartsData = this.calcEchartsData(item.yty.items);
                // let echartsData = this.calcEchartsData(item.lastYear.items);
                this.drawWaterLine(container, echartsData);
              }
            });
          }
        });
      },
      /**
       * 水价类型用水同比环比列表
       * @param data
       */
      loadContentPriceUseWaterYtyQoqList(data) {
        this.$store.dispatch('app/openLoading')
        getContentPriceUseWaterYtyQoqList({
          year: data.year,
          pageNum: data.pageNum,
          pageSize: data.pageSize,
          communityCode: data.communityCode,
          waterPriceType: data.waterPriceType,
        }).then((res) => {
          this.$store.dispatch('app/closeLoading')
          if (res.code === 200) {
            this.list = res.data.countLists;
            this.pager.totalCount = parseInt(res.data.totalCount);
            this.$nextTick(() => {
              for (let i = 0; i < this.list.length; i++) {
                let item = this.list[i];
                let container = this.echartsContainers[i];
                let echartsData = this.calcEchartsData(item.nowYear.items);
                this.drawWaterLine(container, echartsData);
              }
            });
          }
        });
      },
      /**
       * 用水类别用水同比环比列表
       * @param data
       */
      loadElecTypeUseWaterYtyQoqList(data) {
        this.$store.dispatch('app/openLoading')
        getElecTypeUseWaterYtyQoqList({
          year: data.year,
          pageNum: data.pageNum,
          pageSize: data.pageSize,
          communityCode: data.communityCode,
          waterPriceType: data.waterPriceType,
        }).then((res) => {
          this.$store.dispatch('app/closeLoading')
          if (res.code === 200) {
            this.list = res.data.countLists;
            this.pager.totalCount = 1;
            this.$nextTick(() => {
              for (let i = 0; i < this.list.length; i++) {
                let item = this.list[i];
                let container = this.echartsContainers[i];
                let echartsData = this.calcEchartsData(item.nowYear.items);
                this.drawWaterLine(container, echartsData);
              }
            });
          }
        });
      },
      calcEchartsData(oriList) {
        let result = [];
        for (let i = 0; i < oriList.length; i++) {
          let data = parseFloat(oriList[i].countsAndPowers.count);
          result.push(isNaN(data) ? 0 : data);
        }
        return result;
      },
      drawWaterLine(container, data) {
        // console.log(container, data,Array.apply(null, Array(data.length).map((item, index) => index)))
        maxecharts(container,Array.apply(null, Array(data.length).map((item, index) => index)),data)
      },
    }
  }
</script>
