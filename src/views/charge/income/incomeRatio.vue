<template>
  <div class="right right1">
    <div class="right-content" >
      <!--四个装饰角-->
      <div class="top-horn-l"></div>
      <div class="top-horn-r"></div>
      <div class="bottom-horn-l"></div>
      <div class="bottom-horn-r"></div>
      <!--四个装饰角//-->
      <!--右上角按钮-->
<!-- <a href="#" class="btn-back" @click="$router.go(-1)"><span>返回上一级</span></a>-->
      <div class="tablecont-box" v-if="!$store.state.app.loading || list.length>0">
        <div class="sharetitle">
          <div>收益同比环比</div>
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
          <div class="input-group-btn" v-if="navBox.navIndex===2">
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
        </div>
        <ul class="nav nav-tabs nav-jf" style="right: 1rem;">
          <li v-for="(item,index) in navBox.navList" @click="navOrSelectChange(index)"
              :class="{active:index === navBox.navIndex }" :key="index">
            <a v-text="item" style="cursor:pointer"></a><img src="../../../assets/img/tab_list_active.png">
          </li>
        </ul>
        <!-- <div class="scroll-box"> -->
          <table class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
            <tr>
              <th rowspan="2" scope="col" v-text="this.navBox.navTitle[this.navBox.navIndex]">用水类型</th>
              <th rowspan="2" scope="col">年份</th>
              <th rowspan="2" scope="col">合计</th>
              <template v-for="(item,index) in monthsLeftRight" v-if="index < columnNum">
                <th colspan="2" scope="col" v-if="index === 0 && item !== '一月'" @click="columnMoveLeft" style="cursor:pointer">
                <span class="d4"></span><span v-text="item"></span>
                </th>
                <th colspan="2" scope="col" v-else-if="index === (columnNum-1) && item !== '十二月'" @click="columnMoveRight"
                    style="cursor:pointer">
                  <span class="d3"></span><span v-text="item"></span>
                </th>
                <th colspan="2" scope="col" v-else>
                  <span v-text="item"></span>
                </th>
              </template>
              <th rowspan="2" scope="col" class="chart-td">变化曲线</th>
            </tr>
            <tr>
              <template v-for="(item,index) in monthsLeftRight" v-if="index < columnNum">
                <th align="center">人数</th>
                <th align="center">收益额</th>
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
                  <td align="center" v-text="item.countsAndMoneys.totalMoney"></td>
                  <td align="center" v-html="formatStyle1(item.countsAndMoneys.chargeMoney)"></td>
                </template>
                <td rowspan="4" align="center" class="chart-td" @click="goCurve(items)">
                  <!--<img src="../../assets/img/chart05.png"/>-->
                  <div class="echarts-box" style="width:100%;height:100%;"></div>
                </td>
              </tr>
              <tr>
                <td align="center" v-text="items.nowYear.year"></td>
                <td align="center" v-text="items.nowYear.total"></td>
                <template v-for="(item,index) in items.nowYear.items" v-if="index < columnNum">
                  <td align="center" v-text="item.countsAndMoneys.totalMoney"></td>
                  <td align="center" v-html="formatStyle1(item.countsAndMoneys.chargeMoney)"></td>
                </template>
              </tr>
              <tr>
                <td align="center" v-text="items.yty.year"></td>
                <td align="center" v-text="items.yty.total"></td>
                <template v-for="(item,index) in items.yty.items" v-if="index < columnNum">
                  <td align="center" v-text="item.countsAndMoneys.totalMoney"></td>
                  <td align="center" v-html="formatStyle2(item.countsAndMoneys.chargeMoney)"></td>
                </template>
              </tr>
              <tr>
                <td align="center" v-text="items.qoq.year"></td>
                <td align="center" v-text="items.qoq.total"></td>
                <template v-for="(item,index) in items.qoq.items" v-if="index < columnNum">
                  <td align="center" v-text="item.countsAndMoneys.totalMoney"></td>
                  <td align="center" v-html="formatStyle2(item.countsAndMoneys.chargeMoney)"></td>
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
  import moment from "moment";
  import { maxecharts } from '@/components/echars/minecharts'
  import {                   
    getArrearSelectValue,
    get61ChargeAndShouldMoneyByCommunityStatistics,
    get62ChargeAndShouldMoneyByWaterPriceStatistics,
    get63ChargeAndShouldMoneyByUserTypeStatistics,
  } from "@/api/charge";

  export default {
    name: 'Ratio',
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
          navList: ['小区收益', '用水类型收益', '水价类型收益'],
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
      goCurve(value) {
        if(this.navBox.navIndex === 0){
          this.$router.push({
            name: "waterQoqDiagram3",
            // name: "incomeQoqDiagram",
            params: {communityCode: value.code,contentPriceCode: 'null',elecTypeCode: 'null', type:'incomeRatio'},
            // meta: {type: 'analysis', permissionCode: 'CHARGE.ARREAR.ARREARQOQDIAGRAM'},
          });
        } else if(this.navBox.navIndex === 1){
          this.$router.push({
            name: "waterQoqDiagram3",
            // name: "incomeQoqDiagram",
            params: {communityCode: 'null',contentPriceCode: 'null', elecTypeCode: value.code, type:'incomeRatio'},
            // meta: {type: 'analysis', permissionCode: 'CHARGE.ARREAR.ARREARQOQDIAGRAM'},
          });
        } else if(this.navBox.navIndex === 2){
          this.$router.push({
            // name: "incomeQoqDiagram",
            name: "waterQoqDiagram3",
            params: {communityCode: 'null',contentPriceCode: value.code, elecTypeCode: 'null', type:'incomeRatio'},
            // meta: {type: 'analysis', permissionCode: 'CHARGE.ARREAR.ARREARQOQDIAGRAM'},
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
          return `￥${data}`;
        } else {
          return `<span style="color: red;">￥${data}</span>`;
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
          this.loadRegionArrearCountYtyQoqList(postData);
        } else if (this.navBox.navIndex === 1) {
          this.loadElecTypeArrearCountYtyQoqList(postData);
        } else if (this.navBox.navIndex === 2) {
          this.loadContentPriceArrearCountYtyQoqList(postData);
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
          // console.log('item=>>',item);
          this.left(item.lastYear.items);
          this.left(item.nowYear.items);
          this.left(item.yty.items);
          this.left(item.qoq.items);
          let container = this.echartsContainers[i];
          let echartsData = this.calcEchartsData(item.nowYear.items);
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
       * 水价类型收益同比环比列表
       * @param data
       */
      loadContentPriceArrearCountYtyQoqList(data) {
        
        this.$store.dispatch('app/openLoading')
        get62ChargeAndShouldMoneyByWaterPriceStatistics({
          year: data.year,
          pageNum: data.pageNum,
          pageSize: data.pageSize,
          communityCode: data.communityCode,
          contentPriceCode: data.waterPriceType,
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
       * 小区收益同比环比列表
       * @param data
       */
      loadRegionArrearCountYtyQoqList(data) {
        this.$store.dispatch('app/openLoading')
        get61ChargeAndShouldMoneyByCommunityStatistics({
          year: data.year,
          pageNum: data.pageNum,
          pageSize: data.pageSize,
          communityCode: data.communityCode,
          contentPriceCode: data.waterPriceType,
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
      loadElecTypeArrearCountYtyQoqList(data) {
        
        this.$store.dispatch('app/openLoading')
        get63ChargeAndShouldMoneyByUserTypeStatistics({
          year: data.year,
          pageNum: data.pageNum,
          pageSize: data.pageSize,
          communityCode: data.communityCode,
          contentPriceCode: data.waterPriceType,
        }).then((res) => {
          this.$store.dispatch('app/closeLoading')
          if (res.code === 200) {
            this.list = res.data.countLists;
            this.totalCount = 1;
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
          let data = parseFloat(oriList[i].countsAndMoneys.totalMoney);
          result.push(isNaN(data) ? 0 : data);
        }
        return result;
      },
      drawWaterLine(container, data) {
        maxecharts(container,Array.apply(null, Array(data.length).map((item, index) => index)),data)
      },
    }
  }
</script>
