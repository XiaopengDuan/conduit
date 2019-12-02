<template>
  <div style="height:100%" :class="{'user-list':true,'collapse':collapse,'uncollapse':!collapse}">
    <div class="top-sertch top-serth-khbb">
      <div class="sertch-form row input-group">
        <div class="col-10">
          <div class="col-4">
            <!-- <label class="label-text">用户名</label> -->
            <el-input class="el-modification" v-model="userName" placeholder="可输入用户名查询"></el-input>
            <!--            <input type="text" class="form-control" v-model="userName" placeholder="可输入关键字模糊查询" />-->
          </div>
          <div class="col-4">
            <!-- <label class="label-text">小区</label> -->
            <el-select class="el-modification" v-model="communityCode" placeholder="请选择小区">
              <el-option
                v-for="item in communitySelect"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="col-4">
            <!-- <label class="label-text">状态</label> -->
            <el-select class="el-modification" v-model="state" placeholder="请选择状态">
              <el-option
                v-for="item in stateSelect"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="col-4">
            <!-- <label class="label-text">用户类型</label> -->
            <el-select class="el-modification" v-model="userType" placeholder="请选择用户类型">
              <el-option
                v-for="item in userTypeSelect"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="col-4">
            <!-- <label class="label-text">户号</label> -->
            <el-input class="el-modification" v-model="userNo" placeholder="可输入户号查询" />
          </div>
          <div class="col-4">
            <!-- <label class="label-text">收费方式</label> -->
            <el-select class="el-modification" v-model="chargeMode" placeholder="请选择收费方式">
              <el-option
                v-for="item in chargeModeSelect"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div class="line"></div>
        </div>
        <div class="col-2">
          <a class="btn-back" @click="loadDatas" href="javascript:void(0)">
            <span>查询</span>
          </a>
        </div>
      </div>
    </div>
    <div class="shrink-line">
      <a :class="{retract:!collapse,open:collapse}" @click="doCollapse">{{collapse?'展开':'收起'}}</a>
    </div>
    <div class="bottom-table-box bottom-table-box-khbb">
      <!--左边表格-->
      <div class="col-8 table-wrap">
        <div class="table-title">
          <div class="text" style="padding-left:15px;">用户列表</div>
        </div>
        <table class="table table-striped" v-loading="loading">
          <thead>
            <tr>
              <th width="50rem">用户名</th>
              <th width="50rem">户号</th>
              <th scope="col">
                <span class="d4" v-if="cursor_num!==0" @click="updateStartNumber(-5)"></span>
                {{tableTiltes[cursor_num].name}}
              </th>
              <th scope="col">{{tableTiltes[cursor_num + 1].name}}</th>
              <th scope="col">{{tableTiltes[cursor_num + 2].name}}</th>
              <th scope="col">{{tableTiltes[cursor_num + 3].name}}</th>
              <th scope="col">
                {{tableTiltes[cursor_num + 4].name}}
                <span class="d3" v-if="cursor_num+5<tableTiltes.length" @click="updateStartNumber(5)"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in tableData" :key="index">
              <td class="text-success" scope="row">
                <el-tooltip :content="value.userName" effect="light" placement="top-start">
                  <a>{{value.userName | tooltip-filter}}</a>
                </el-tooltip>
              </td>
               <td>
                <router-link style="color:#fff;" :to="{name:'reportDetail_p1',params:{userNo:value.userNo}}">{{value.userNo}}</router-link>
              </td>
              <td>{{value[tableTiltes[cursor_num].code]}}</td>
              <td>{{value[tableTiltes[cursor_num + 1].code]}}</td>
              <td>{{value[tableTiltes[cursor_num + 2].code]}}</td>
              <td>{{value[tableTiltes[cursor_num + 3].code]}}</td>
              <td>{{value[tableTiltes[cursor_num + 4].code]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav class="pagination-wrap" aria-label="...">
        <el-pagination
          v-show="totalCount>0"
          prev-text="上一页"
          next-text="下一页"
          :page-size="pageSize"
          :pager-count="5"
          layout="prev, pager, next"
          :total="totalCount"
          @size-change="pageChange"
          @current-change="pageChange"
        ></el-pagination>
      </nav>
      <!--左边表格//-->
      <!--右边表格-->
      <div class="col-4">
        <!--        <div id="mychart"></div>-->
        <reportEchars
          v-model="communityCode"
          :communitySelect="communitySelect"
          :chartType="3"
          :loadData="loadData"
        ></reportEchars>
      </div>
      <!--右边表格//-->
    </div>
  </div>
</template>

<style scoped>
.user-list .table-wrap {
  border-right: none;
}
.table-wrap .table tr{
  height:.4rem!important;
}
.search-select {
  background: #1669b1;
}
.userType-select option {
  padding: 3px 0;
}
#mychart {
  width: 100%;
  height: 100%;
}
.btn-back span{
  padding-left: 0.88rem;
}
.bottom-table-box-khbb .col-8 { width: 70%;}
</style>
<script>
import userHeader from "../../components/userCenterHeader";
import leftNav from "../../components/userCenter/leftNav";
import reportEchars from "@/components/echars/report-echars";
import {
  getReportQuerySelect,
  getUserWaterReportInfoList
} from "@/api/usercenter";
export default {
  name: "Home",
  components: {
    userHeader,
    leftNav,
    reportEchars
  },
  data() {
    return {
      loading: false,
      collapse: false,
      table_head_cell_class: "table-customize-header-cell",
      table_head_row_class: "table-customize-header-row",
      table_cell_class: "table-customize-cell",
      table_row_class: "table-customize-row",
      totalCount: 0,
      show: false,
      pageSize: 10,
      pageNow: 1,
      tableData: [], // 列表返回数据

      cursor_num: 0, // 表格标题左右切换游标
      tableTiltes: [
        { name: "用户状态", code: "state" },
        { name: "联系电话", code: "contactMobile" },
        { name: "小区名", code: "communityName" },
        { name: "累计用水量", code: "totalMoney" },
        { name: "上月用水量", code: "moneyMonth" },
        { name: "同比增长", code: "writeYty" },
        { name: "环比增长", code: "writeQoq" },
        { name: "欠费金额", code: "arrearsMoney" },
        { name: "欠费次数", code: "nowArrearCount" },
        { name: "消除次数", code: "removeArrearCount" },
        { name: "累计欠费次数", code: "totalArrearCount" }
      ],
      communitySelect: "", //小区下拉列表
      chargeModeSelect: "", //收费方式下拉列表
      userTypeSelect: "", //用户类型下拉列表
      stateSelect: "", //状态下拉列表
      userName: "", //用户名
      communityCode: "", //小区
      state: "", //状态
      userType: "", //用户类型
      userNo: "", //户号
      chargeMode: "", //收费方式
      currentSelectPie: "", //pie当前选中块
      pieDataList: {} //pie返回数据列表
    };
  },
  mounted() {
    let that = this;
    getReportQuerySelect().then(res => {
      if (res.code === 200) {
        let queryselect = res.data;
        //小区
        let communitydata = queryselect.communitySelect;
        communitydata.unshift({ code: "", name: "==请选择小区==" });
        that.communitySelect = communitydata;
        if (that.communitySelect)
          that.communityCode = that.communitySelect[0].code;
        //用户状态
        that.stateSelect = queryselect.stateSelect;
        that.stateSelect.unshift({ code: "", name: "==请选择用户状态==" });
        if (that.stateSelect) that.state = that.stateSelect[0].code;
        //用户类型
        that.userTypeSelect = queryselect.userTypeSelect;
        that.userTypeSelect.unshift({ code: "", name: "==请选择用户类型==" });
        if (that.userTypeSelect) that.userType = that.userTypeSelect[0].code;
        //收费方式
        that.chargeModeSelect = queryselect.chargeModeSelect;
        that.chargeModeSelect.unshift({ code: "", name: "==请选择收费方式==" });
        if (that.chargeModeSelect)
          that.chargeMode = that.chargeModeSelect[0].code;

        this.loadData();
      }
    });
  },
  methods: {
    loadDatas() {
      this.pageTotal = 1;
      this.pageNow = 1
      this.loadData();
    },
    doCollapse() {
      this.pageNow = 1;
     if (this.collapse) {
        this.pageSize = 10;
      } else {
        this.pageSize = 13;
      }
      this.collapse = !this.collapse;
      this.loadData();
    },
    pageChange(e) {
      this.pageNow = e;
      this.loadData();
    },
    updateStartNumber(index) {
      // index: 正负显示title的长度
      // 获取固定title数组的长度
      let length = this.tableTiltes.length;
      // 判断点击的是左箭头还是右箭头
      if(index>0){
        if(length - this.cursor_num > index + index){
          this.cursor_num += index
        } else {
          this.cursor_num = length - index
        }
      } else {
        if(this.cursor_num + index > 0 ){
          this.cursor_num += index
        } else {
          this.cursor_num = 0
        }
      }
    },
    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 == 0) {
        return "table-customize-warning-row";
      }
    },
    showCont: function() {
      this.show = !this.show;
    },
    loadData: function() {
      let postData = {
        pageSize: this.pageSize,
        pageNum: this.pageNow,

        userName: this.userName,
        userNo: this.userNo,
        state: this.state,
        userType: this.userType,
        chargeMode: this.chargeMode,
        communityCode: this.communityCode
      };
      let that = this;
      // that.loading = true;
      this.$store.dispatch('app/openLoading');
      getUserWaterReportInfoList(postData)
        .then(response => {
          this.$store.dispatch('app/closeLoading');
          let data = response.data;
          that.tableData = data.userList;
          //设置分页参数
          that.totalCount = parseInt(data.totalCount);
          this.$refs.pager.render(data, "pagerId");
          that.loading = false;
        })
        .catch(err => {
          that.loading = false;

        });
    }
  }
};
</script>
