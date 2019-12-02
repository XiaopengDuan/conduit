 <template>
  <div :class="{'user-list':true,'collapse':collapse,'uncollapse':!collapse}" style="height:100%">
    <transition name="collapse"></transition>
    <!--四个装饰角//-->
    <div :class="{'top-sertch':true,'top-serth-khbb':true,'top-height12':!collapse}">
        <div class="sertch-form row input-group" v-show="!collapse">
          <div class="col-10">
            <div class="col-4">
              <!-- <label class="label-text">用户名</label> -->
              <el-input class="el-modification" v-model="userName" placeholder="可用户名查询"></el-input>
              <!--            class="el-modification" <input type="text" class="form-control" v-model="userName" placeholder="可输入关键字模糊查询" />-->
            </div>
            <div class="col-4">
              <!-- <label class="label-text">小区</label> -->
              <el-select class="el-modification" v-model="userAddress" placeholder="==请选择小区==">
                <el-option
                  v-for="item in community"
                  :key="item.communityCode"
                  :label="item.communityName"
                  :value="item.communityCode"
                ></el-option>
              </el-select>
            </div>
            <div class="col-4">
              <!-- <label class="label-text">用户类型</label> -->
              <el-select class="el-modification" v-model="userType" placeholder="==请选择用户类型==">
                <el-option
                  v-for="item in userTypeSelect"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </div>
            <div class="col-4">
              <!-- <label class="label-text">状态</label> -->
              <el-select class="el-modification" v-model="state" placeholder="==请选择状态==">
                <el-option
                  v-for="item in stateSelect"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="col-3">
            <a class="btn-back" @click="loadDatas" href="javascript:void(0)">
              <span style="background-image:none;padding:0;text-align: center;">查询</span>
            </a>
          </div>
        </div>
      </div>
    <div class="shrink-line shrink-line2">
      <a :class="{retract:!collapse,open:collapse}" @click="doCollapse">{{collapse?'展开':'收起'}}</a>
    </div>
    <div class="bottom-table-box bottom-table-box-khbb" style="margin-top:10px; display:block;">
      <!--左边表格-->
      <!-- <div class="col-12 table-wrap" style="max-width:15.9rem;height:75%;"> -->
        <div class="col-12 table-wrap" style="max-width:15.9rem;height:82%;">
        <div class="table-title">
          <div class="text" style="padding-left:15px;">用户用水监控</div>
        </div>
        <table class="table table-striped" v-loading="loading">
          <thead>
            <tr>
              <th>数据采集状态</th>
              <th>欠费状态</th>
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
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in tableData" :key="index">
              <td class="text-success" scope="row">
                  <img src="../../assets/img/circle_b.png" v-if="value.dataState=='0'"/>
                  <img src="../../assets/img/circle_r.png" v-if="value.dataState!='0'"/>
              </td>
              <td>
                  <img src="../../assets/img/circle_b.png" v-if="value.arrearState=='0'"/>
                  <img src="../../assets/img/circle_r.png" v-if="value.arrearState!='0'"/>
              </td>
              <td>{{value[tableTiltes[cursor_num].code]}}</td>
              <td>{{value[tableTiltes[cursor_num + 1].code]}}</td>
              <td>{{value[tableTiltes[cursor_num + 2].code]}}</td>
              <td>{{value[tableTiltes[cursor_num + 3].code]}}</td>
              <td>{{value[tableTiltes[cursor_num + 4].code]}}</td>
              <td>
                <el-link
                v-if="$store.state.user.menuPerms.includes('USERCENTER.WATERMONITOR.WATERMONITORSINGLE')"
                  type="success"
                  style="color:#00FF84;font-size:.16rem;"
                  @click="handleClick(value)"
                  size="small"
                >单户监控</el-link>
                <el-link
                v-if="$store.state.user.menuPerms.includes('USERCENTER.WATERMONITOR.WATERMONITORDETAIL') || $store.state.user.menuPerms.includes('USERCENTER.WATERMONITOR.USERCENTER.WATERMONITOR.WATERMONITORHOUR')" 
                  type="success"
                  style="color:#00FF84;font-size:.16rem;"
                  @click="handleDefaultClick(value)"
                  size="small"
                >监控详情</el-link>
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
          :total="totalCount"
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
.search-select {
  background: #1669b1;
}
.userType-select option {
  padding: 3px 0;
}
.col-4 .label-text {
  width: 0.8rem;
}
.top-height12 {
  /* height: 12% !important; */
}
</style>
<style scoped>
</style>

<script>
import circle_blue from "@/assets/img/circle_b.png";
import circle_red from "@/assets/img/circle_r.png";

import userHeader from "../../components/userCenterHeader";
import leftNav from "../../components/userCenter/leftNav";
import {
  getUserWaterRealTimeMonitorList,
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
      tableData: [], // 返回数据格式
      cursor_num: 0, // 表格标题左右切换游标
      tableTiltes: [
        { name: "时间", code: "dateTime" },
        { name: "户号", code: "userNo" },
        { name: "户名", code: "userName" },
        { name: "欠费金额", code: "arrearMoney" },
        { name: "所属小区", code: "communityName" },
        { name: "用水性质", code: "elecTypeName" },
        { name: "联系手机", code: "contactMobile" },
        { name: "当月水量", code: "monthPower" },
        { name: "当月水费", code: "monthMoney" },
        { name: "昨日水量", code: "yesterdayPower" },
        { name: "昨日水费", code: "yesterdayMoney" },
        { name: "距离下一阶梯水价还余水量", code: "remainLadderPower" },
        { name: "当前所在阶梯水价", code: "nowLadder" },
        { name: "下阶水价", code: "nextLadder" },
        { name: "所属小区代码", code: "communityCode" },
        { name: "用水性质代码", code: "elecTypeCode" }
      ],
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
      totalCount:0,
      pageSize: 10,
      pageNow: 1
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
          that.stateSelect.unshift({ communityCode: "", name: "==请选择状态==" });
          if (that.stateSelect) that.state = that.stateSelect[0].code;
          //用户类型
          that.userTypeSelect = queryselect.userTypeSelect;
          that.userTypeSelect.unshift({ communityCode: "", name: "==请选择类型==" });
          if (that.userTypeSelect) that.userType = that.userTypeSelect[0].code;
          //收费方式
          that.chargeModeSelect = queryselect.chargeModeSelect;
          that.chargeModeSelect.unshift({ communityCode: "", name: "==请选择收费方式==" });
          if (that.chargeModeSelect)
            that.chargeMode = that.chargeModeSelect[0].code;
        }
      })
      .catch(err => {});

    this.loadData();
  },
  methods: {
    loadDatas() {
      this.totalCount = 1;
      this.pageNow = 1
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
        name: "waterMonitorSingle",
        params: row
      });
    },
    handleDefaultClick(row) {
      this.$router.push({
        name: "waterMonitorDetail",
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
        communityCode: this.userAddress,
        pageSize: this.pageSize,
        pageNum: this.pageNow,
        userName: this.userName,
        userNo: this.userNo,
        userType: this.userType
      };
      var that = this;
      that.loading = true;
      getUserWaterRealTimeMonitorList(postData)
        .then(response => {
          const data = response.data;
          // 用户数据 详细信息
          that.totalCount=parseInt(data.totalCount) ;
          that.tableData = data.defaultList;
          that.loading = false;
        })
        .catch(err => {

          that.loading = false;
        });
    }
  }
};
</script>
