<template>
  <div>
    <!--右上角按钮-->
    <a href="#" class="btn-back" @click="$router.go(-1)">
      <span>返回上一级</span>
    </a>
    <div class="tablecont-box">
      <div class="title">
        监控详情页
        <div class="input-group-btn">
          <button type="button" class="btn choose-time">{{titleName}}</button>
        </div>
      </div>
      <ul class="nav nav-tabs nav-jf">
        <li class="active">
          <router-link :to="{name:'waterMonitorDetail',params:{'userNo':userNo}}">天数据</router-link>
          <img src="../../assets/img/tab_list_active.png" style="display: block;" />
        </li>
        <li>
          <router-link :to="{name:'waterMonitorHour',params:{'userNo':userNo}}">小时数据</router-link>
        </li>
      </ul>
      <!-- <div class="scroll-box"> -->
        <table class="table table-striped" v-loading="loading">
          <thead>
            <tr>
              <th>数据采集状态</th>
              <th>欠费状态</th>
              <th>时间</th>
              <th>当月水费</th>
              <th>当月水量</th>
              <th>下阶水价</th>
              <th>当前所在阶梯水价</th>
              <th>当日水费</th>
              <th>当日水量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in tableData" :key="index">
              <td class="text-success" scope="row">
                <img src="../../assets/img/circle_b.png" v-if="value.dataState==0" />
                <img src="../../assets/img/circle_r.png" v-if="value.dataState!=0" />
              </td>
              <td>
                <img src="../../assets/img/circle_b.png" v-if="value.arrearState==0" />
                <img src="../../assets/img/circle_r.png" v-if="value.arrearState!=0" />
              </td>
              <td>{{value.dateTime}}</td>
              <td>{{value.monthMoney}}</td>
              <td>{{value.monthPower}}</td>
              <td>{{value.nextLadder}}</td>
              <td>{{value.nowLadder}}</td>
              <td>{{value.nowMoney}}</td>
              <td>{{value.nowPower}}</td>
            </tr>
          </tbody>
        </table>
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
      <!-- </div> -->
    </div>
  </div>
</template>


<script>
import userHeader from "../../components/userCenterHeader";
import leftNav from "../../components/userCenter/leftNav";
import {
  getUserWaterDayDateList,
  getQuerySelect,
  getCommunityAll,
  getUserAllInfo
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
      show: false,
      userAddress: "", // 地址模糊查询
      userNo: "", // 户号模糊查询
      userName: "",
      contactMobile: "",

      state: "",
      userType: "",
      chargeMode: "",
      tableData: [], // 返回数据格式
      totalCount: 0,
      pageSize: 12,
      pageNow: 1
    };
  },
  computed: {
    titleName: function() {
      return `户号：${this.userNo} 户名：${this.userName} 联系电话：${this.contactMobile}`;
    }
  },
  mounted() {
    var that = this;
    let userNo = this.$route.params.userNo;

    let postData = { userNo: userNo };
    that.loading = true;
    getUserAllInfo(postData)
      .then(response => {
        if (response.code == 200) {
          that.userNo = response.data.userNo;
          that.userName = response.data.userName;
          that.contactMobile = response.data.contactMobile;
          that.loadData();
        }
      })
      .catch(res => {
      });
  },
  methods: {
    pageChange(e) {
      this.pageNow = e;
      this.loadData();
    },
    //加载数据
    loadData: function() {
      let userNo = this.$route.params.userNo;
      let postData = {
        userNo: userNo,
        pageSize: this.pageSize,
        pageNum: this.pageNow
      };
      var that = this;
      that.loading = true;
      getUserWaterDayDateList(postData)
        .then(response => {
          const data = response.data;
          // 用户数据 详细信息
          that.tableData = data.list;
          that.totalCount = parseInt(data.totalCount);
          that.loading = false;
        })
        .catch(err => {
          // console.log(err);
          that.loading = false;
        });
    }
  }
};
</script>
