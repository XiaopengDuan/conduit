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
        <li>
          <router-link :to="{name:'waterMonitorDetail',params:{'userNo':userNo}}">天数据</router-link>
        </li>
        <li class="active">
          <router-link :to="{name:'waterMonitorHour',params:{'userNo':userNo}}">小时数据</router-link>
          <img src="../../assets/img/tab_list_active.png" style="display: block;" />
        </li>
      </ul>
      <!-- <div class="scroll-box"> -->
        <div class="table-title">
          <div class="text" style="padding-left:15px;color:#f8f10b">{{upTableName}}</div>
        </div>
        <table class="table table-striped" v-loading="loading">
          <thead>
            <tr>
              <th>时间</th>
              <th>水量</th>
              <th>时间</th>
              <th>水量</th>
              <th>时间</th>
              <th>水量</th>
              <th>时间</th>
              <th>水量</th>
              <th>时间</th>
              <th>水量</th>
              <th>时间</th>
              <th>水量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 4" :key="i">
              <td>{{upTableData[(i-1)*6]? upTableData[(i-1)*6].time:""}}</td>
              <td>{{upTableData[(i-1)*6]? upTableData[(i-1)*6].value:""}}</td>

              <td>{{upTableData[(i-1)*6+1]? upTableData[(i-1)*6+1].time:""}}</td>
              <td>{{upTableData[(i-1)*6+1]? upTableData[(i-1)*6+1].value:""}}</td>

              <td>{{upTableData[(i-1)*6+2]? upTableData[(i-1)*6+2].time:""}}</td>
              <td>{{upTableData[(i-1)*6+2]? upTableData[(i-1)*6+2].value:""}}</td>

              <td>{{upTableData[(i-1)*6+3]? upTableData[(i-1)*6+3].time:""}}</td>
              <td>{{upTableData[(i-1)*6+3]? upTableData[(i-1)*6+3].value:""}}</td>

              <td>{{upTableData[(i-1)*6+4]? upTableData[(i-1)*6+4].time:""}}</td>
              <td>{{upTableData[(i-1)*6+4]? upTableData[(i-1)*6+4].value:""}}</td>

              <td>{{upTableData[(i-1)*6+5]? upTableData[(i-1)*6+5].time:""}}</td>
              <td>{{upTableData[(i-1)*6+5]? upTableData[(i-1)*6+5].value:""}}</td>
            </tr>
          </tbody>
        </table>

        <div class="table-title" style="margin-top:20px;">
          <div class="text" style="padding-left:15px;;color:#f8f10b">{{downTableName}}</div>
        </div>
        <table class="table table-striped" v-loading="loading">
          <thead>
            <tr>
              <th>时间</th>
              <th>水量</th>
              <th>时间</th>
              <th>水量</th>
              <th>时间</th>
              <th>水量</th>
              <th>时间</th>
              <th>水量</th>
              <th>时间</th>
              <th>水量</th>
              <th>时间</th>
              <th>水量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 4" :key="i">
              <td>{{downTableData[(i-1)*6]? downTableData[(i-1)*6].time:""}}</td>
              <td>{{downTableData[(i-1)*6]? downTableData[(i-1)*6].value:""}}</td>

              <td>{{downTableData[(i-1)*6+1]? downTableData[(i-1)*6+1].time:""}}</td>
              <td>{{downTableData[(i-1)*6+1]? downTableData[(i-1)*6+1].value:""}}</td>

              <td>{{downTableData[(i-1)*6+2]? downTableData[(i-1)*6+2].time:""}}</td>
              <td>{{downTableData[(i-1)*6+2]? downTableData[(i-1)*6+2].value:""}}</td>

              <td>{{downTableData[(i-1)*6+3]? downTableData[(i-1)*6+3].time:""}}</td>
              <td>{{downTableData[(i-1)*6+3]? downTableData[(i-1)*6+3].value:""}}</td>

              <td>{{downTableData[(i-1)*6+4]? downTableData[(i-1)*6+4].time:""}}</td>
              <td>{{downTableData[(i-1)*6+4]? downTableData[(i-1)*6+4].value:""}}</td>

              <td>{{downTableData[(i-1)*6+5]? downTableData[(i-1)*6+5].time:""}}</td>
              <td>{{downTableData[(i-1)*6+5]? downTableData[(i-1)*6+5].value:""}}</td>
            </tr>
          </tbody>
        </table>

        <div class="table-title" style="margin-top:20px;">
          <div class="text" style="padding-left:15px;;color:#f8f10b">{{bottomTableName}}</div>
        </div>
        <table class="table table-striped" v-loading="loading">
          <thead>
            <tr>
              <th>时间</th>
              <th>水量</th>
              <th>时间</th>
              <th>水量</th>
              <th>时间</th>
              <th>水量</th>
              <th>时间</th>
              <th>水量</th>
              <th>时间</th>
              <th>水量</th>
              <th>时间</th>
              <th>水量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 4" :key="i">
              <td>{{bottomTableData[(i-1)*6]? bottomTableData[(i-1)*6].time:""}}</td>
              <td>{{bottomTableData[(i-1)*6]? bottomTableData[(i-1)*6].value:""}}</td>

              <td>{{bottomTableData[(i-1)*6+1]? bottomTableData[(i-1)*6+1].time:""}}</td>
              <td>{{bottomTableData[(i-1)*6+1]? bottomTableData[(i-1)*6+1].value:""}}</td>

              <td>{{bottomTableData[(i-1)*6+2]? bottomTableData[(i-1)*6+2].time:""}}</td>
              <td>{{bottomTableData[(i-1)*6+2]? bottomTableData[(i-1)*6+2].value:""}}</td>

              <td>{{bottomTableData[(i-1)*6+3]? bottomTableData[(i-1)*6+3].time:""}}</td>
              <td>{{bottomTableData[(i-1)*6+3]? bottomTableData[(i-1)*6+3].value:""}}</td>

              <td>{{bottomTableData[(i-1)*6+4]? bottomTableData[(i-1)*6+4].time:""}}</td>
              <td>{{bottomTableData[(i-1)*6+4]? bottomTableData[(i-1)*6+4].value:""}}</td>

              <td>{{bottomTableData[(i-1)*6+5]? bottomTableData[(i-1)*6+5].time:""}}</td>
              <td>{{bottomTableData[(i-1)*6+5]? bottomTableData[(i-1)*6+5].value:""}}</td>
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
  getUserWaterHourDateList,
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
      userAddress: "",
      userNo: "",
      userName: "",
      contactMobile: "",

      state: "",
      userType: "",
      chargeMode: "",
      upTableName: "",
      upTableData: [],
      downTableName: "",
      downTableData: [],
      bottomTableName: "",
      bottomTableData: [],
      totalCount: 0,
      pageSize: 3,
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
      .catch(res => {});
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
      getUserWaterHourDateList(postData)
        .then(response => {
          const data = response.data;
          that.totalCount = parseInt(data.totalCount);
          if (data.list.length > 0) {
            let tbl = data.list[0];
            that.upTableName = tbl.day;
            that.upTableData = tbl.datas;
          }

          if (data.list.length > 1) {
            let tbl = data.list[1];
            that.downTableName = tbl.day;
            that.downTableData = tbl.datas;
          }

          if (data.list.length > 2) {
            let tbl = data.list[2];
            that.bottomTableName = tbl.day;
            that.bottomTableData = tbl.datas;
          }
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
