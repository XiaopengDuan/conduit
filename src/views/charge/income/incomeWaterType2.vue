<template>
  <div class="right rigth3">
    <div class="right-content">
      <!--四个装饰角-->
      <div class="top-horn-l"></div>
      <div class="top-horn-r"></div>
      <div class="bottom-horn-l"></div>
      <div class="bottom-horn-r"></div>
      <!--四个装饰角//-->
      <!--右上角按钮-->
      <a href="#" class="btn-back" @click="$router.go(-1)">
        <span>返回上一级</span>
      </a>
      <div class="tablecont-box" v-if="temp.queryData.length===0 || temp.queryData[0].cellList.length>0">
        <div class="sharetitle">
          {{$route.params.typeName}}收益排行
          <div class="input-group-btn">
            <el-select
              @keyup.enter.native="tempsearchN" 
              v-model="temp.seachItems.communityCode"
              placeholder="请选择地域"
            >
              <el-option
                v-for="item in communityOption"
                :key="item.communityCode"
                :label="item.communityName"
                :value="item.communityCode"
              ></el-option>
            </el-select>
          </div>
          <div class="input-group-btn">
            <el-input
              v-model="temp.seachItems.username"
              @keyup.enter.native="tempsearchN"           
                placeholder="请输入用户名"
            ></el-input>
          </div>
          <div class="input-group-btn">
            <el-input
              v-model="temp.seachItems.userno"
              @keyup.enter.native="tempsearchN" 
               placeholder="请输入户号"
            ></el-input>
          </div>
        </div>

        <!--            <ul class="nav nav-tabs nav-jf">-->
        <!--              <li><a>税务设置</a><img src="@/assets/img/tab_list_active.png"></li>-->
        <!--              <li class="active"><a>计费设置</a><img src="@/assets/img/tab_list_active.png" style="display: block;"></li>-->
        <!--            </ul>-->
        <!-- <div class="scroll-box"> -->
          <table
            class="table table-jf table-fx"
            width="100%"
            border="0"
            cellspacing="0"
            cellpadding="0"
          >
            <thead>
              <tr>
                <th rowspan="2" scope="col">类型名称</th>
                <th rowspan="2" scope="col">户号</th>
                <th rowspan="2" scope="col">户名</th>
                <th rowspan="2" scope="col">用水性质</th>
                <th rowspan="2" scope="col">联系方式</th>
                <th rowspan="2" scope="col">总计</th>
                <th
                  colspan="2"
                  scope="col"
                  v-for="(value,index) in temp.queryData[0].cellList.slice(startNumber,startNumber + 4)"
                  :key="index"
                >
                  <span
                    class="d4"
                    v-if="index===0 && startNumber!==0 "
                    @click="updateStartNumber(-4)"
                  ></span>
                  <span
                    class="d3"
                    v-else-if="index===3 && startNumber + 4 < temp.queryData[0].cellList.length"
                    @click="updateStartNumber(4)"
                  ></span>
                  {{value.month}}
                </th>
                <th rowspan="2" scope="col" class="chart-td">变化曲线</th>
              </tr>
              <tr>
                <th align="center">应收</th>
                <th align="center">实收</th>
                <th align="center">应收</th>
                <th align="center">实收</th>
                <th align="center">应收</th>
                <th align="center">实收</th>
                <th align="center">应收</th>
                <th align="center">实收</th>
              </tr>
            </thead>
            <tbody v-if="temp.queryData.length > 0">
              <tr v-for="(value, index) in temp.queryData" key="code">
                <td align="center" class="text-success" width="4rem">
                  <el-tooltip :content="value.typeName" effect="light" placement="top-start">
                    <a style="cursor: pointer">{{value.typeName | tooltip-filter(4)}}</a>
                  </el-tooltip>
                </td>
                <td align="center" width="1rem">{{value.userNo}}</td>
                <td align="center" class="text-success" width="4rem">
                  <el-tooltip :content="value.userName" effect="light" placement="top-start">
                    <a style="cursor: pointer">{{value.userName | tooltip-filter(4)}}</a>
                  </el-tooltip>
                </td>
                <td align="center" width="1rem">{{value.typeName}}</td>
                <td align="center" width="1rem">{{value.contactMobile}}</td>
                <td align="center" width="1rem">{{value.totalChargeMoney}}</td>
                <template v-for="(v,i) in value.cellList.slice(startNumber,startNumber + 4)">
                  <td align="center">￥{{v.element.totalMoney}}</td>
                  <td align="center" style="color: red">￥{{v.element.chargeMoney}}</td>
                </template>
                <td align="center" class="chart-td" @click="linkGraph(value)">
                  <div
                    :id="'echarts'+ index "
                    style="width: 336px;height: 34px"
                  >{{darwEcharts(index, value.graph)}}</div>
                </td>
                <!--              <td align="center" class="chart-td"></td>-->
              </tr>
            </tbody>
          </table>
          <div v-if="temp.queryData.length === 0" class="nodata">
            暂无数据
          </div>
          <nav class="pagination-wrap"  aria-label="...">
            <el-pagination
              class="pagination"
              style="margin: 10px 0;"
              prev-text="上一页"
              next-text="下一页"
              :page-size="temp.page.pageSize"
            :current-page.sync="temp.page.pageNum"
              :pager-count="8"
              layout="prev, pager, next"
              :total="temp.page.totalCount"
              @size-change="temp.pageChange"
              @current-change="temp.pageChange"
            ></el-pagination>
          </nav>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
let echarts = require("echarts");
import { get52UserPayByContentPriceCode } from "@/api/charge";
import { getCommunityAll } from "@/api/usercenter";
import { initPage } from "@/utils/utility";
import { minecharts } from '@/components/echars/minecharts'
export default {
  name: "incomeWaterType2",
  components: {},
  created() {
    // console.log('params', this.$route.params)
    // 加载分页方法
    initPage(this.temp, get52UserPayByContentPriceCode, "queryData");
    this.temp.page.pageSize = 8;
    // 设置查询条件
    this.temp.seachItems.startMonth = "201801";
    this.temp.seachItems.endMonth = "201907";
    this.temp.seachItems.typeName = this.$route.params.typeName;
    this.temp.seachItems.typeCode = this.$route.params.typeCode;
    // 查询第一页
    this.temp.searchCurrent(1);
    // 加载小区下拉框
    this.getCommunitySelectInfo();
  },
  computed: {},
  data() {
    return {
      startNumber: 0,
      communityOption: [],
      temp: {
        seachItems: {},
        queryData: [{ cellList: [], graph: { xData: [] } }],
        page: {}
      }
    };
  },
  methods: {
    tempsearchN(){
        this.temp.page.pageNum = 1;
        this.temp.dataInterceptor = this.Istheredata
        this.temp.searchN();
      },
      Istheredata(e){
        // console.log(e.countLists.length === 0)
        if(e.queryData.length === 0) {
          return false
        }
      },
    // 加载小区下拉框
    getCommunitySelectInfo() {
      getCommunityAll().then(r => {
        this.communityOption = r.data;
        this.communityOption.unshift({
          communityCode: "",
          communityName: "查看全部"
        });
        // this.$set(this.temp.seachItems, 'communityCode', this.communityOption[0].communityCode)
      });
    },
    updateStartNumber(index) {
      // index: 正负显示title的长度
      // 获取固定title数组的长度
      let length = this.temp.queryData[0].cellList.length;
      // 判断点击的是左箭头还是右箭头
      if (index > 0) {
        if (length - this.startNumber > index + index) {
          this.startNumber += index;
        } else {
          this.startNumber = length - index;
        }
      } else {
        if (this.startNumber + index > 0) {
          this.startNumber += index;
        } else {
          this.startNumber = 0;
        }
      }
    },
    // 更改table标题的左右切换下标
    // 表格Echarths图
    darwEcharts(index, date) {
      if (!date) {
        return;
      }
      this.$nextTick(function() {
        minecharts(index,date.xData,date.chargeYData)
      });
    },
    // 跳转值用户统计
    linkGraph(value) {
      // console.log(value);
      this.$router.push({
        name: "incomeUserListDetails",
        params: { typeCode: value.typeCode, typeName: value.typeName,userName:value.userName,userNo:value.userNo }
      });
    }
  }
};
</script>
