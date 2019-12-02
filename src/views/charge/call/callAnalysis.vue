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
      <div class="tablecont-box" v-if="list.length>0 || !$store.state.app.loading">
        <div class="sharetitle">客户来电分析
          <div class="input-group-btn" v-if="selectBox.communitysType.show">
            <el-tooltip class="item" content="按回车默认查询" placement="top-start" effect="light">
              <el-select clearable
                  @change="getdatalist()"
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
          <div class="input-group-btn" v-if="selectBox.timeType.show">
            <el-date-picker
              type="year"
              style="width: 150px;"
              v-model="timeTypeValue"
              @change="getdatalist()"
              :placeholder="selectBox.timeType.placeholder">
            </el-date-picker>
          </div>
        </div>
        <ul class="nav nav-tabs nav-jf" style="right: 1rem;">
          <li v-for="(item,index) in navBox.navList" @click="navOrSelectChange(index)"
              :class="{active:index === navBox.navIndex }" :key="index">
            <a v-text="item" style="cursor:pointer"></a><img src="../../../assets/img/tab_list_active.png">
          </li>
        </ul>
       <div class="scroll-box">
        <table class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
          <thead>
          <tr>
            <th rowspan="2" scope="col" v-text="this.navBox.navTitle[this.navBox.navIndex]">用水类型</th>
            <th rowspan="2" scope="col" v-if="navBox.navIndex === 1">年份</th>
            <th rowspan="2" scope="col" v-if="navBox.navIndex === 1">总计</th>
            <template v-for="(item,index) in monthsLeftRight" v-if="navBox.navIndex === 0 && index < columnNum">
              <th colspan="2" scope="col" v-if="index === 0 && months[0] !== item" @click="columnMoveLeft"
                  style="cursor:pointer">
                <span class="d4"></span><span v-text="item"></span>
              </th>
              <th colspan="2" scope="col" v-else-if="index === (columnNum-1) && months[months.length -1] !== item"
                  @click="columnMoveRight"
                  style="cursor:pointer">
                <span class="d3"></span><span v-text="item"></span>
              </th>
              <th colspan="2" scope="col" v-else>
                <span v-text="item"></span>
              </th>
            </template>
            <template v-for="(item,index) in monthsLeftRight" v-if="navBox.navIndex === 1 && index < columnNum">
              <th colspan="2" scope="col" v-if="index === 0 && item !== '一月'" @click="columnMoveLeft2" style="cursor:pointer" :key="index">
                <span class="d4"></span><span v-text="item"></span>
              </th>
              <th colspan="2" scope="col" v-else-if="index === (columnNum-1) && item !== '十二月'" @click="columnMoveRight2" style="cursor:pointer" :key="index">
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
              <th align="center">汇报数</th>
              <th align="center">已处理</th>
            </template>
          </tr>
          </thead>
          <tbody>
          <template v-if="navBox.navIndex === 0" v-for="items in list">
            <tr>
              <td align="center" class="text-success" v-text="items.name"></td>
              <template v-for="(item,index) in items.totalAndDeal" v-if="index < columnNum">
                <td align="center" class="text-success" v-text="item.totals"></td>
                <td align="center" class="text-success" v-text="item.deals" style="color: red;"></td>
              </template>
              <td align="center" class="chart-td" @click="linkQoqDiagram(items)">
                <!--<img src="../../assets/img/chart05.png"/>-->
                <div class="echarts-box" style="width:100%;height:0.28rem;"></div>
              </td>
            </tr>
          </template>

          <template v-if="(navBox.navIndex === 1 && list2.length > 0)" v-for="(items,list2Index) in list2">
            <tr>
              <td rowspan="4" align="center" class="text-success" v-text="items.name"></td>
              <td align="center" v-text="items.lastYear.year"></td>
              <td align="center" v-text="items.lastYear.total"></td>
              <template v-for="(item,index) in items.lastYear.items" v-if="index < columnNum">
                <td align="center" v-text="item.countsAndMoneys.totalCount"></td>
                <td align="center" v-text="item.countsAndMoneys.dealCount"></td>
              </template>
              <!--<td align="center" class="chart-td" @click="linkQoqDiagram(items)">
                <div :id="'echarts_lastYear'+ list2Index " class="echarts-box" style="width:100%;height:0.28rem">
                   {{ drawWaterLine2('echarts_lastYear'+ list2Index, items.changeCurve.lastYears)}}
                </div>
              </td>-->
              <td align="center" rowspan="4" class="chart-td" @click="linkQoqDiagram(items)">
                <div :id="'echarts_nowYear'+ list2Index " class="echarts-box" style="width:100%;height:1rem;">
                  <!-- {{ drawWaterLine2('echarts_nowYear'+ list2Index, items.changeCurve.nowYears)}} -->
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" v-text="items.nowYear.year"></td>
              <td align="center" v-text="items.nowYear.total"></td>
              <template v-for="(item,index) in items.nowYear.items" v-if="index < columnNum">
                <td align="center" v-text="item.countsAndMoneys.totalCount"></td>
                <td align="center" v-text="item.countsAndMoneys.dealCount"></td>
              </template>
              <!--<td align="center" rowspan="4" class="chart-td" @click="linkQoqDiagram(items)">
                <div :id="'echarts_nowYear'+ list2Index " class="echarts-box" style="width:100%;height:0.28rem;">
                   {{ drawWaterLine2('echarts_nowYear'+ list2Index, items.changeCurve.nowYears)}} 
                </div>
              </td>-->
            </tr>
            <tr>
              <td align="center" v-text="items.yty.year"></td>
              <td align="center" v-text="items.yty.total"></td>
              <template v-for="(item,index) in items.yty.items" v-if="index < columnNum">
                <td align="center" v-html="formatStyle(item.countsAndMoneys.totalCount)"></td>
                <td align="center" v-html="formatStyle(item.countsAndMoneys.dealCount)"></td>
              </template>
               <!--<td align="center" class="chart-td" @click="linkQoqDiagram(items)">
                <div :id="'echarts_yty'+ list2Index " class="echarts-box" style="width:100%;height:0.28rem;">
                   {{ drawWaterLine2('echarts_yty'+ list2Index, items.changeCurve.ytys)}} 
                </div>
              </td>-->
            </tr>
            <tr>
              <td align="center" v-text="items.qoq.year"></td>
              <td align="center" v-text="items.qoq.total"></td>
              <template v-for="(item,index) in items.qoq.items" v-if="index < columnNum">
                <td align="center" v-html="formatStyle(item.countsAndMoneys.totalCount)"></td>
                <td align="center" v-html="formatStyle(item.countsAndMoneys.dealCount)"></td>
              </template>
               <!-- <td align="center" class="chart-td" @click="linkQoqDiagram(items)">
                <div :id="'echarts_qoq'+ list2Index " class="echarts-box" style="width:100%;height:0.28rem;">
                 {{ drawWaterLine2('echarts_qoq'+ list2Index, items.changeCurve.qoqs)}} 
                </div>
              </td>-->
            </tr>
          </template>
          </tbody>
        </table>
        <div v-if="(navBox.navIndex === 1&&list2.length === 0)" class="nodata">
          暂无数据
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import echarts from "echarts";
  import {getNearlyYearProtrudeProblemList, getArrearSelectValue, getComplaintProblemYtyQoq} from "@/api/charge";
  import { maxecharts } from '@/components/echars/minecharts'
  export default {
    data() {
      return {
        columnNum: 4,
        list: [],
        list2: [],
        // listID: ['echarts_lastYear','echarts_nowYear','echarts_yty','echarts_qoq'],
        listID: ['echarts_nowYear'],
        monthsLeftRight: [],
        timeTypeValue: '',
        communitysType: [],
        communitysTypeValue: '',
        selectBox: {
          communitysType: {
            show: true,
            placeholder: '小区名称',
          },
          timeType: {
            show: true,
            placeholder: '选择年份',
          },
        },
        navBox: {
          navIndex: this.$store.getters.callAnalysisindex,
          navTitle: ['突出问题', '来电类型'],
          navList: ['近几年突出问题', '四类来电同比'],
        },
        months: [],
      }
    },
    created() {
      this.navBox.navIndex = this.$store.getters.callAnalysisindex
    },
    mounted() {
      this.loadArrearSelectValue();
      this.getdatalist()
      // this.navOrSelectChange();
      // this.navBox.navIndex = this.$route.params.navIndex || 0;
    },
    computed: {
      echartsContainers() {
        return document.getElementsByClassName('echarts-box')
      },
    },
    methods: {
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
      formatStyle(data) {
        if (isNaN(data)) {
          return data;
        } else if (parseFloat(data) >= 0) {
          return `${data}%`;
        } else {
          return `<span style="color: red;">${data}%</span>`;
        }
      },
      navOrSelectChange(index) {
        this.navBox.navIndex= index,
        this.$store.commit("navIndex/CALLANALYSISINDEX", index)
        this.getdatalist()
      },
      getdatalist() {
        if (this.$store.getters.callAnalysisindex === 0) {
          this.selectBox.timeType.show = false;
          this.selectBox.communitysType.show = false;
          this.loadNearlyYearProtrudeProblemList();
        } else if (this.$store.getters.callAnalysisindex === 1) {
          this.selectBox.timeType.show = true;
          this.selectBox.communitysType.show = true;
          this.loadComplaintProblemYtyQoq({
            communityCode: this.communitysTypeValue || "",
            year: this.timeTypeValue ? moment(this.timeTypeValue).format('YYYY') : "",
          });
        }
      },
      columnMoveLeft() {
        this.left(this.monthsLeftRight);
        for (let i = 0; i < this.list.length; i++) {
          let item = this.list[i];
          this.left(item.totalAndDeal);
          let container = this.echartsContainers[i];
          let echartsData = this.calcEchartsData(item.items);
          this.drawWaterLine(container, echartsData);
        }
      },
      columnMoveLeft2() {
        this.left(this.monthsLeftRight);
        // var listID = ['echarts_lastYear','echarts_nowYear','echarts_yty','echarts_qoq']
        for (let i = 0; i < this.list2.length; i++) {
          let item = this.list2[i];
          this.left(item.lastYear.items);
          this.left(item.nowYear.items);
          this.left(item.yty.items);
          this.left(item.qoq.items);
          // var listdata = [item.lastYear.items,item.nowYear.items,item.yty.items,item.qoq.items]
          var listdata = [item.nowYear.items]
          for(let y = 0; y < this.listID.length; y++){
            let container = document.getElementById(this.listID[y]+i);
            let echartsData = this.calcEchartsData3(listdata[y]);
            this.drawWaterLine(container, echartsData);
          }
        }
      },
       columnMoveRight2() {
        this.right(this.monthsLeftRight);
        // var listID = ['echarts_lastYear','echarts_nowYear','echarts_yty','echarts_qoq']
        // var listID = ['echarts_lastYear','echarts_nowYear','echarts_yty','echarts_qoq']
        for (let i = 0; i < this.list2.length; i++) {
          let item = this.list2[i];
          this.right(item.lastYear.items);
          this.right(item.nowYear.items);
          this.right(item.yty.items);
          this.right(item.qoq.items);
          // var listdata = [item.lastYear.items,item.nowYear.items,item.yty.items,item.qoq.items]
          var listdata = [item.nowYear.items]
          for(let y = 0; y < this.listID.length; y++){
            let container = document.getElementById(this.listID[y]+i);
            let echartsData = this.calcEchartsData3(listdata[y]);
            this.drawWaterLine(container, echartsData);
          }
        }
      },
      columnMoveRight() {
        this.right(this.monthsLeftRight);
        for (let i = 0; i < this.list.length; i++) {
          let item = this.list[i];
          this.right(item.totalAndDeal);
          let container = this.echartsContainers[i];
          let echartsData = this.calcEchartsData(item.items);
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
      loadNearlyYearProtrudeProblemList() {
        this.$store.dispatch('app/openLoading')
        getNearlyYearProtrudeProblemList().then((res) => {
          this.$store.dispatch('app/closeLoading')
          if (res.code === 200) {
            let lists = [];
            let result = res.data.lists;
            for (let i = 0; i < result.length; i++) {
              let item = result[i];
              let length = item.totals.length;
              let totalAndDeal = Array.apply(null, Array(length)).map((obj, objIndex) => {
                return {
                  totals: item.totals[objIndex],//汇报数
                  deals: item.deals[objIndex]//已处理数
                };
              });
              lists.push({
                name: item.name,
                items: item.items,
                totalAndDeal: totalAndDeal,
                month: item.month,
                totals: item.totals,
                deals: item.deals
              });
              if (i === 0) this.months = item.month;
            }
            this.list = lists;
            
            this.monthsLeftRight = JSON.parse(JSON.stringify(this.months));
            this.$store.commit("navIndex/CALLANALYSISDATALIST", this.monthsLeftRight)
            this.$nextTick(() => {
              for (let i = 0; i < this.list.length; i++) {
                let item = this.list[i];
                let container = this.echartsContainers[i];
                let echartsData = this.calcEchartsData(item.items);
                this.drawWaterLine(container, echartsData);
              }
            });
          }
        });
      },
      loadComplaintProblemYtyQoq(postData) {
        this.$store.dispatch('app/openLoading')
        getComplaintProblemYtyQoq(postData).then((res) => {
          this.$store.dispatch('app/closeLoading')
          if (res.code === 200) {
            this.list2 = res.data.countLists;
            this.monthsLeftRight = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            // var listID = ['echarts_lastYear','echarts_nowYear','echarts_yty','echarts_qoq']
            this.$nextTick(() => {
              for (let i = 0; i < this.list2.length; i++) {
                let item = this.list2[i];
                // var listdata = [item.lastYear.items,item.nowYear.items,item.yty.items,item.qoq.items]
                var listdata = [item.nowYear.items]
                for(let y = 0; y < this.listID.length; y++){
                  let container = document.getElementById(this.listID[y]+i);
                  let echartsData = this.calcEchartsData3(listdata[y]);
                  this.drawWaterLine(container, echartsData);
                }
              }
            });
          }
        });
      },
      calcEchartsData(oriList) {
        let result = [];
        for (let i = 0; i < oriList.length; i++) {
          let data = parseFloat(oriList[i].totalAndDeal.totalCount);
          result.push(isNaN(data) ? 0 : data);
        }
        return result;
      },
      calcEchartsData3(oriList) {
        let result = [];
        for (let i = 0; i < oriList.length; i++) {
          let data = parseFloat(oriList[i].countsAndMoneys.dealCount);
          result.push(isNaN(data) ? 0 : data);
        }
        return result;
      },
      calcEchartsData2(oriList) {
        let result = [];
        for (let i = 0; i < oriList.length; i++) {
          let data = parseFloat(oriList[i]);
          result.push(isNaN(data) ? 0 : data);
        }
        return result;
      },
      drawWaterLine(container, data) {
        maxecharts(container,Array.apply(null, Array(data.length).map((item, index) => index)),data)
      },
      drawWaterLine2(containerId, data) {
        this.$nextTick(() => {
          let echartsData = this.calcEchartsData2(data);
          let container = document.getElementById(containerId);
          this.drawWaterLine(container, echartsData);
        });
      },
      linkQoqDiagram(value) {
        if (this.$store.getters.callAnalysisindex === 0) {
          this.$router.push({
            name: "callProminentProblem",
            params: value
          })
        } else {
          value.communityCode = this.communitysTypeValue || ""
          value.contentPriceCode = 'null'
          value.elecTypeCode = 'null'
          value.type = 'callAnalysis'
          this.$router.push({
            name: "waterQoqDiagram4",
            params: value,
          })
        }
      },
    }
  }
</script>
