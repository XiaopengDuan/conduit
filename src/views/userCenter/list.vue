<template>
  <div :class="{'user-list':true,'collapse':collapse,'uncollapse':!collapse}" style="height:100%">
    <transition name="collapse"></transition>
    <!--四个装饰角//-->
    <div class="top-sertch top-serth-khbb">
      <div class="sertch-form row input-group" v-show="!collapse">
        <div class="col-10">
          <div class="col-4">
            <!-- <label class="label-text">用户名</label> -->
            <el-input class="el-modification" v-model="userName" placeholder="可输入关键字模糊查询"></el-input>
            <!--            class="el-modification" <input type="text" class="form-control" v-model="userName" placeholder="可输入关键字模糊查询" />-->
          </div>
          <div class="col-4">
            <!-- <label class="label-text">小区</label> -->
            <el-select class="el-modification" v-model="userAddress" placeholder="请选择小区">
              <el-option
                v-for="item in community"
                :key="item.communityCode"
                :label="item.communityName"
                :value="item.communityCode"
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
            <el-select class="el-modification" v-model="userType" placeholder="请选择类型">
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
        </div>
        <div class="col-3">
          <a class="btn-back" @click="loadDatas" href="javascript:void(0)">
            <span>查询</span>
          </a>
        </div>
      </div>
    </div>
    <div class="shrink-line">
      <a :class="{retract:!collapse,open:collapse}" @click="doCollapse">{{collapse?'展开':'收起'}}</a>
    </div>
     <div class="bottom-table-box bottom-table-box-khbb" style="margin-top:10px;display:block;">
      <!--左边表格-->
      <!-- <div class="col-12 table-wrap" style="max-width:15.9rem;height:75%;"> -->
      <div class="col-12 table-wrap" style="max-width:15.9rem;height:82%;">
        <div class="table-title">
          <div class="text" style="padding-left:15px;">用户列表</div>
        </div>
        <table class="table table-striped" v-loading="loading">
          <thead>
            <tr>
              <th width="150rem">用户名</th>
              <th width="50rem">户号</th>
              <th>用户状态</th>
              <th>用户类型</th>
              <th>收费方式</th>
              <th>联系方式</th>
              <th>余额</th>
              <th>上月水量</th>
              <th>上月水费</th>
              <th>当前欠费</th>
              <th>地址</th>
              <th>操作</th>
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
              <td>{{value.state}}</td>
              <td>{{value.userType}}</td>
              <td>{{value.chargeMode}}</td>
              <td>{{value.contactMobile}}</td>
              <td>{{value.money}}</td>
              <td>{{value.lastMonthPower}}</td>
              <td>{{value.lastMonthMoney}}</td>
              <td>{{value.arrearsMoney}}</td>
              <td>
                <el-tooltip :content="value.userAddress" effect="light" placement="top-start">
                  <a>{{value.userAddress | tooltip-filter}}</a>
                </el-tooltip>
              </td>
              <td>
                <el-link
                  type="success"
                  style="color:#00FF84;font-size:.16rem;"
                  @click="handleClick(value)"
                  size="small"
                  v-if="!value.hide"
                >用户行为图谱</el-link>
                <el-link
                  type="success"
                  style="color:#00FF84;font-size:.16rem;"
                  @click="handleDefaultClick(value)"
                  size="small"
                  v-if="!value.hide"
                >违约记录</el-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav class="pagination-wrap" aria-label="...">
        <el-pagination
          prev-text="上一页"
          next-text="下一页"
          :page-size="pageSize"
          :pager-count="5"
          layout="prev, pager, next"
          :total="pageTotal"
          @size-change="pageChange"
          @current-change="pageChange"
          @prev-click="pageChange"
          @next-click="pageChange"
        ></el-pagination>
      </nav>
      <!--左边表格//-->
    </div>
  </div>
</template>
<style scoped>
.user-list .table-wrap {
  border-right: none;
}
.table-wrap .table tr {
    height: .4rem;
}
.search-select {
  background: #1669b1;
}
.userType-select option {
  padding: 3px 0;
}
</style>
<style scoped>
.table-padding0 {
  padding: 0 !important;
}
.pagination-wrap {
  position: absolute;
  bottom: 0 !important;
}

</style>

<script>
import userHeader from "../../components/userCenterHeader";
import leftNav from "../../components/userCenter/leftNav";
import {
  getUserInfoList,
  getQuerySelect,
  getCommunityAll
} from "@/api/usercenter";
export default {
  name: "Home",
  components: {
    userHeader,
    leftNav
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 5) {
        return value.slice(0, 5) + "...";
      }
      return value;
    }
  },
  mounted() {
    this.loadData();
  },
  data() {
    return {
      loading: false,
      collapse: false,
      table_head_cell_class: "table-customize-header-cell",
      table_head_row_class: "table-customize-header-row",
      table_cell_class: "table-padding0 table-customize-cell ",
      table_row_class: "table-customize-row",

      menuIndex: 2,
      show: false,
      community: {}, //小区数据
      stateSelect: "", // 用户状态
      userTypeSelect: "", // 用户类型
      chargeModeSelect: "", // 收费方式

      userName: "", // 用户名模糊查询
      userAddress: "", // 地址模糊查询
      userNo: "", // 户号模糊查询
      state: "",
      userType: "",
      chargeMode: "",

      pageSize: 10,
      pageTotal: 0,
      pageNow: 1,
      tableData: [] // 返回数据格式
    };
  },
  mounted() {
    var that = this;

    getCommunityAll()
      .then(res => {
        if (res.code === 200) {
          let data = res.data;
          data.unshift({ communityCode: "", communityName: "==请选择小区==" });
          that.community = data;
        }
      })
      .catch(err => {});

    getQuerySelect()
      .then(res => {
        if (res.code === 200) {
          const queryselect = res.data;
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
        }
      })
      .catch(err => {});

    this.loadData();
  },
  methods: {
    loadDatas() {
      this.pageTotal = 1;
      this.pageNow = 1;
      this.loadData();
    },
    doCollapse() {
      this.pageNow = 1;
      if (this.collapse) {
        this.pageSize = 10;
      } else {
        this.pageSize = 20;
      }
      this.collapse = !this.collapse;
      this.loadData();
    },
    pageChange(e) {
      this.pageNow = e;
      this.loadData();
    },
    handleClick(row) {
      this.$router.push({
        name: "userDetail",
        params: { userNo: row.userNo }
      });
    },
    handleDefaultClick(row) {
      this.$router.push({
        name: "defaultDetail",
        params: { userNo: row.userNo }
      });
    },

    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 == 0) {
        return "table-customize-warning-row";
      }
    },
    //加载数据
    loadData: function() {
      let postData = {
        pageSize: this.pageSize,
        pageNum: this.pageNow,
        userName: this.userName,
        communityCode: this.userAddress,
        userNo: this.userNo,
        state: this.state,
        userType: this.userType,
        chargeMode: this.chargeMode
      };
      var that = this;
      that.loading = true;
      getUserInfoList(postData)
        .then(response => {
          const data = response.data;
          // 用户数据 详细信息
          that.pageTotal = data.totalCount;
          that.loading = false;
          let list = data.userList;
          let size = list.length;
          //# fix bug 需求，数据不足时补空行
          for (let i = 0; (size < this.pageSize) && (i < (this.pageSize - size)); i++) {
            list.push({
              arrearsMoney: "",
              chargeMode: "",
              contactMobile: "",
              lastMonthMoney: "",
              lastMonthPower: "",
              money: "",
              state: "",
              userAddress: "",
              userName: "",
              userNo: "",
              userType: "",
              hide: true,
            });
          }
          that.tableData = list;
        })
        .catch(err => {
          // console.log(err);
          that.loading = false;
        });
    }
  }
};
</script>
