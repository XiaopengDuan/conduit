<template>
  <div style="height:100%">
    <div class="top-sertch">
      <div class="sertch-form row input-group">
        <div class="col-4">
          <label class="label-text">用户名</label>
          <input type="text" class="form-control" :value="$route.params.userName" disabled />
        </div>
        <div class="col-4">
          <label class="label-text">小区</label>
          <input type="text" class="form-control" :value="$route.params.userAddress" disabled />
        </div>
        <div class="col-4">
          <label class="label-text">收费方式</label>
          <input type="text" class="form-control" :value="$route.params.chargeMode" disabled />
        </div>
        <div class="col-4">
          <label class="label-text">状态</label>
          <input type="text" class="form-control" :value="$route.params.state" disabled />
        </div>
        <div class="col-4">
          <label class="label-text">用户类型</label>
          <input type="text" class="form-control" :value="$route.params.userType" disabled />
        </div>
        <div class="col-4">
          <label class="label-text">余额</label>
          <input type="text" class="form-control" :value="$route.params.money" disabled />
        </div>
      </div>
    </div>
    <div class="bottom-table-box">
      <!--左边表格-->
      <div class="col-6 table-wrap" style="height:80%">
        <div class="table-title">
          <div class="text">用户用水变化</div>
        </div>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>时间</th>
            <th>水量（吨）</th>
            <th>环比增长</th>
            <th>同比增长</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(value, index) in waterTableData" :key="index">
            <td scope="row">{{value.month}}</td>
            <td>{{value.writePower}}</td>
            <td>{{value.writeQoq==='--'?'--':value.writeQoq+'%'}}</td>
            <td>{{value.writeYty==='--'?'--':value.writeYty+'%'}}</td>
          </tr>
           <tr v-if="!waterTableData||waterTableData.length<1">
              <td colspan="2" >暂无数据</td>
            </tr>
          </tbody>
        </table>

        <nav class="pagination-wrap usercent-pagination" aria-label="...">
          <el-pagination
            v-show="waterPageCount>0"
            prev-text="上一页"
            next-text="下一页"
            :page-size="pageSize"
            :pager-count="5"
            layout="prev, pager, next"
            :total="waterTotal"
            @size-change="waterPageChange"
            @current-change="waterPageChange"
          ></el-pagination>
        </nav>
      </div>
      <!--左边表格//-->
      <!--右边表格-->
      <div class="col-6 table-wrap table-wrap-r" style="height:80%">
        <div class="table-title">
          <div class="text">用户缴费变化</div>
        </div>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>时间</th>
            <th>金额</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(value, index) in payTableData" :key="index">
            <td scope="row">{{value.month}}</td>
            <td>￥{{value.money}}</td>
          </tr>
            <tr v-if="!payTableData||payTableData.length<1">
              <td colspan="2" >暂无数据</td>
            </tr>
          </tbody>
        </table>
        <nav class="pagination-wrap usercent-pagination" aria-label="...">
          <el-pagination
            v-show="payPageCount>0"
            prev-text="上一页"
            next-text="下一页"
            :page-size="pageSize"
            :pager-count="5"
            layout="prev, pager, next"
            :total="payTotal"
            @size-change="payPageChange"
            @current-change="payPageChange"

          ></el-pagination>
        </nav>
      </div>
      <!--右边表格//-->
    </div>
    <!--右侧切换按钮-->
    <router-link
      :to="{name:'detail_p2_1',params:{userNo:$route.params.userNo,userName:$route.params.userName}}"
      class="btn-switch"
      name="切换"
    ></router-link>
    <!--右侧切换按钮//-->
  </div>
</template>
<script>
  import { getPageCount } from "@/utils/utility";
  import { getUserWaterChangeTable, getUserPayTable } from "@/api/usercenter";
  export default {
    data() {
      return {
        table_head_cell_class: "table-customize-header-cell",
        table_head_row_class: "table-customize-header-row",
        table_cell_class: "table-customize-cell",
        table_row_class: "table-customize-row",
        pageSize: 8,
        waterPageNow: 0,
        waterTotalRecord: 0, //总记录数
        waterTotal: 0,
        waterTableData: [], // 列表返回数据

        payPageNow: 1,
        payTotalRecord: 0,
        payTotal: 0,
        payTableData: [] // 列表返回数据
      };
    },
    mounted() {
      let userNo = this.$route.params.userNo;
      this.loadWaterData();
      this.loadPayData();
    },
    methods: {
      tabRowClassName({ row, rowIndex }) {
        let index = rowIndex + 1;
        if (index % 2 == 0) {
          return "table-customize-warning-row";
        }
      },
      waterPageChange(e) {
        this.waterPageNow = e;
        this.loadWaterData();
      },
      payPageChange(e) {
        this.payPageNow = e;
        this.loadPayData();
      },
      loadWaterData: function() {
        let that = this;
        let postData = {
          userNo: this.$route.params.userNo,
          pageNum: this.waterPageNow,
          pageSize: this.pageSize
        };
        getUserWaterChangeTable(postData).then(function(response) {
          if (response.code == 200) {
            that.waterTableData = response.data.waterList;
            that.waterTotalRecord = response.data.totalCount;
            that.waterTotal = parseInt(response.data.totalCount);
          }
        });
      },
      loadPayData: function() {
        let that = this;
        let postData = {
          userNo: this.$route.params.userNo,
          pageNum: this.waterPageNow,
          pageSize: this.pageSize
        };
        getUserPayTable(postData).then(function(response) {
          if (response.code == 200) {
            that.payTableData = response.data.payList;
            that.payTotalRecord = response.data.totalCount;
            that.payTotal = parseInt(response.data.totalCount);
          }
        });
      }
    },
    computed: {
      waterPageCount: function() {
        return getPageCount(this.waterTotalRecord, this.pageSize);
      },
      payPageCount: function() {
        return getPageCount(this.payTotalRecord, this.pageSize);
      }
    }
  };
</script>
