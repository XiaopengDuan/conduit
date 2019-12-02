<template>
  <div style="height:100%;padding: .2rem;overflow: hidden;box-sizing: border-box;" v-loading="loading">
    <div class="top-sertch mes" style="margin-bottom:0;border-bottom: 1px solid #6be9fc;height: auto;overflow: hidden;">
      <div class="col-6 da-box" style="border:none">
        <div class="newspaper">
          <div class="mes-line">
            <span class="name">用户名:</span>
            <span class="admin">{{userInfo.userName}}</span>
          </div>
          <div class="mes-line">
            <span class="name">地址</span>
            <span class="admin">{{userInfo.userAddress}}</span>
          </div>
          <div class="mes-line">
            <span class="name">报装信息</span>
            <span class="admin">{{userInfo.stateName}}</span>
          </div>
        </div>
      </div>
      <div class="col-6 tab" style="padding-bottom: .5rem;border-left: 1px solid #6be9fc;">
        <ul id="myTabs" class="nav nav-tabs" role="tablist">
          <!--          <li role="presentation" class="active"><a href="#home" id="home-tab">最近报装</a></li>-->
          <li role="presentation" v-bind:class="uLisClass[0].li">
            <a href="javascript:void(0)" @click="changeClass(0)" id="home-tab">最近报装</a>
          </li>
          <li role="presentation" v-bind:class="uLisClass[1].li">
            <a href="javascript:void(0)" @click="changeClass(1)" role="tab" id="profile-tab">最近咨询</a>
          </li>
          <li role="presentation" v-bind:class="uLisClass[2].li">
            <a href="javascript:void(0)" @click="changeClass(2)" role="tab" id="dropdown1-tab">最近投诉</a>
          </li>
          <li role="presentation" v-bind:class="uLisClass[3].li">
            <a href="javascript:void(0)" @click="changeClass(3)" role="tab" id="dropdown2-tab">最近保修</a>
          </li>
        </ul>
        <div id="myTabContent" class="tab-content">
          <div role="tabpanel" v-bind:class="uLisClass[0].div" id="home" aria-labelledby="home-tab">
            <div class="mes-line">
              <span class="name">报装时间</span>
              <span class="admin">{{newsInfo.leak.time}}</span>
            </div>
            <div class="mes-line">
              <span class="name">报装地点</span>
              <span class="admin">{{newsInfo.leak.address}}</span>
            </div>
            <div class="mes-line">
              <span class="name">时间内容</span>
              <span class="admin">{{newsInfo.leak.content}}</span>
            </div>
            <div class="mes-line">
              <span class="name">执行进度</span>
              <span class="admin">{{newsInfo.leak.Result}}</span>
            </div>
          </div>
          <div
            role="tabpanel"
            v-bind:class="uLisClass[1].div"
            id="profile"
            aria-labelledby="profile-tab"
          >
            <div class="mes-line">
              <span class="name">咨询时间</span>
              <span class="admin">{{newsInfo.consult.time}}</span>
            </div>
            <div class="mes-line">
              <span class="name">咨询地点</span>
              <span class="admin">{{newsInfo.consult.address}}</span>
            </div>
            <div class="mes-line">
              <span class="name">咨询内容</span>
              <span class="admin">{{newsInfo.consult.content}}</span>
            </div>
            <!--            <div class="mes-line"><span class="name">咨询进度</span><span class="admin">{{newsInfo.consult.Result}}</span></div>-->
          </div>
          <div
            role="tabpanel"
            v-bind:class="uLisClass[2].div"
            id="dropdown1"
            aria-labelledby="dropdown1-tab"
          >
            <div class="mes-line">
              <span class="name">投诉时间</span>
              <span class="admin">{{newsInfo.complain.time}}</span>
            </div>
            <div class="mes-line">
              <span class="name">投诉地点</span>
              <span class="admin">{{newsInfo.complain.address}}</span>
            </div>
            <div class="mes-line">
              <span class="name">投诉内容</span>
              <span class="admin">{{newsInfo.complain.content}}</span>
            </div>
            <!--            <div class="mes-line"><span class="name">投诉进度</span><span class="admin">{{newsInfo.complain.Result}}</span></div>-->
          </div>
          <div
            role="tabpanel"
            v-bind:class="uLisClass[3].div"
            id="dropdown2"
            aria-labelledby="dropdown2-tab"
          >
            <div class="mes-line">
              <span class="name">保修时间</span>
              <span class="admin">{{newsInfo.repair.time}}</span>
            </div>
            <div class="mes-line">
              <span class="name">保修地点</span>
              <span class="admin">{{newsInfo.repair.address}}</span>
            </div>
            <div class="mes-line">
              <span class="name">保修内容</span>
              <span class="admin">{{newsInfo.repair.content}}</span>
            </div>
            <div class="mes-line">
              <span class="name">保修进度</span>
              <span class="admin">{{newsInfo.repair.Result}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-table-box row mes">
      <!--左边表格-->
      <div class="col-6 table-wrap" style="border:none">
        <div class="table-title">
          <div class="text">用户预缴费使用</div>
        </div>
        <!--        <el-table-->
        <!--          :data="yccd.yccdList"-->
        <!--          class="table-customize"-->
        <!--          style="width: 100%"-->
        <!--          stripe-->
        <!--          height="100%"-->
        <!--          :row-class-name="tabRowClassName"-->
        <!--          :cell-class-name="table_cell_class"-->
        <!--          :header-cell-class-name="table_head_cell_class"-->
        <!--          :header-row-class-name="table_head_row_class"-->
        <!--        >-->
        <!--          <el-table-column prop="month" label="时间"></el-table-column>-->
        <!--          <el-table-column prop="money" label="水量（吨）"></el-table-column>-->
        <!--        </el-table>-->
        <table class="table table-striped" style="height:80%!important">
          <thead>
            <tr>
              <th>时间</th>
              <th>水量（吨）</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in yccd.yccdList" :key="index">
              <td scope="row">{{value.month}}</td>
              <td>{{value.money}}</td>
            </tr>
            <tr v-if="!yccd.yccdList||yccd.yccdList.length<1">
              <td colspan="2" >暂无数据</td>
            </tr>
          </tbody>
        </table>

        <nav v-if="yccd.page.totalCount>0" class="pagination-wrap" style="position: initial;" aria-label="...">
          <el-pagination
            class="pagination"
            style="margin: 10px 0;"
            prev-text="上一页"
            next-text="下一页"
            :page-size="yccd.page.pageSize"
            :pager-count="yccd.page.pageCount"
            layout="prev, pager, next"
            :total="yccd.page.totalCount"
            @size-change="yccd.pageChange"
            @current-change="yccd.pageChange"
          ></el-pagination>
        </nav>
      </div>
      <!--左边表格//-->
      <!--右边表格-->
      <div class="col-6 table-wrap" style="border:none;border-left: 1px solid #6be9fc;">
        <div class="table-title">
          <div class="text">用户欠费</div>
        </div>
        <table class="table table-striped" style="height:80%!important">
          <thead>
            <tr>
              <th>时间</th>
              <th>水量（吨）</th>
              <th>环比增长</th>
              <th>同比增长</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in arrear.arrearList" :key="index">
              <td scope="row">{{value.month}}</td>
              <td>{{value.arrearsMoney}}</td>
              <td>{{value.arrMoneyQoq}}</td>
              <td>{{value.arrMoneyYty}}</td>
            </tr>
            <tr v-if="!arrear.arrearList||arrear.arrearList.length<1">
              <td colspan="2" >暂无数据</td>
            </tr>
          </tbody>
        </table>

        <nav v-if="arrear.page.totalCount>0" class="pagination-wrap" style="position: initial;" aria-label="...">
          <el-pagination
            class="pagination"
            style="margin: 10px 0;"
            prev-text="上一页"
            next-text="下一页"
            :page-size="arrear.page.pageSize"
            :pager-count="arrear.page.pageCount"
            layout="prev, pager, next"
            :total="arrear.page.totalCount"
            @size-change="arrear.pageChange"
            @current-change="arrear.pageChange"
          ></el-pagination>
        </nav>
      </div>
      <!--右边表格//-->
    </div>
    <!--右侧切换按钮-->
    <router-link
      :to="{name:'detail_p6_1',params:{userNo:$route.params.userNo}}"
      class="btn-switch"
      name="切换"
    ></router-link>
    <!--右侧切换按钮//-->
  </div>
</template>
<script>
import {
  getUserArrearsCallCount,
  getUserAllInfo,
  getUserYccdTable,
  getUserArrearsChangeTable,
  getRepairLeakConsultComplainInfoByUserNo
} from "@/api/usercenter";
import { initPage } from "@/utils/utility";
export default {
  loading: false,
  name: "p6_2",
  components: {},
  created() {
    if (this.$route.params.userNo) {
      // 获取选择用户基本信息
      this.getUserAllInfo(this.$route.params.userNo);
      // 获取用户最新报修、报漏、咨询、投诉
      this.getRepairLeakConsultComplainInfoByUserNo(this.$route.params.userNo);
      // 加载分页对象
      initPage(this.yccd, getUserYccdTable, "yccdList");
      // 设置分页数量 --默认为6
      this.yccd.page.pageSize = 6;
      // 设置分页条件
      this.yccd.seachItems.userNo = this.$route.params.userNo;
      // 查询第一页
      this.yccd.searchCurrent(1);

      initPage(this.arrear, getUserArrearsChangeTable, "arrearList");
      this.arrear.page.pageSize = 6;
      this.arrear.seachItems.userNo = this.$route.params.userNo;
      this.arrear.searchCurrent(1);
    } else {
    }
  },
  data() {
    return {
      userInfo: {}, //用户信息
      getUserArrearsChangeTable: getUserArrearsChangeTable,
      newsInfo: { leak: {}, consult: {}, complain: {}, repair: {} }, // 用户最新消息
      yccd: { yccdList: [], page: {} }, //用户预交费封装对象
      arrear: { arrearList: [], page: {} }, //用户欠费封装对象
      uLisClass: [
        // tabs class
        { li: "active", div: "tab-pane fade active in" },
        { li: "", div: "tab-pane fade" },
        { li: "", div: "tab-pane fade" },
        { li: "", div: "tab-pane fade" }
      ],
      table_head_cell_class: "table-customize-header-cell",
      table_head_row_class: "table-customize-header-row",
      table_cell_class: "table-customize-cell",
      table_row_class: "table-customize-row"
    };
  },
  methods: {
    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 == 0) {
        return "table-customize-warning-row";
      }
    },
    getUserAllInfo(userNo) {
      // 获取用户信息
      var that = this;
      that.loading = true;
      getUserAllInfo({ userNo: this.$route.params.userNo }).then(r => {
        this.userInfo = r.data;
        that.loading = false;
      });
    },
    getRepairLeakConsultComplainInfoByUserNo(userNo) {
      // 获取用户报装，维修，咨询，投诉最新消息
      getRepairLeakConsultComplainInfoByUserNo({
        userNo: this.$route.params.userNo
      }).then(r => {
        this.newsInfo = r.data;
      });
    },
    changeClass(index) {
      this.uLisClass = [
        { li: "", div: "tab-pane fade" },
        { li: "", div: "tab-pane fade" },
        { li: "", div: "tab-pane fade" },
        { li: "", div: "tab-pane fade" }
      ];
      this.uLisClass[index] = { li: "active", div: "tab-pane fade  active in" };
    }
  }
};
</script>
