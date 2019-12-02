<template>
  <div>
    <!--右上角按钮-->
    <a href="#" class="btn-back" @click="$router.go(-1)">
      <span>返回上一级</span>
    </a>
    <div class="tablecont-box">
      <div class="title">
        单户监控
        <div class="input-group-btn">
          <button type="button" class="btn choose-time">{{titleName}}</button>
        </div>
      </div>

      <div style="position: absolute;width:100%;height:100%;">
        <div class="m-box">
          <div class="sx-yb">单户监控</div>
          <!--<div class="sx-yellow">一般失信行为</div>
          <div class="sx-red">一般失信行为</div>-->
          <div class="input-group">
            <div class="col-12">
              <div class="number-box">
                <label class="label-number">1</label>
              </div>
              <label class="label-text">数据采集状态</label>
              <div class="lable-control">
                <img
                  src="../../assets/img/warn.png"
                  v-if="this.viewData.dataState=='1'"
                  style="width:.25rem !important;height:.25rem !important;max-width: 1rem;max-height: 1rem;"
                />
                <img
                  src="../../assets/img/success.png"
                  v-if="this.viewData.dataState=='0'"
                  style="width:.25rem !important;height:.25rem !important;max-width: 1rem;max-height: 1rem;"
                />
              </div>
              <div class="number-box">
                <label class="label-number">6</label>
              </div>
              <label class="label-text">昨日产生水费</label>
              <div class="lable-control">{{this.viewData.yesterdayMoney}}元</div>
            </div>
            <div class="col-12">
              <div class="number-box">
                <label class="label-number">2</label>
              </div>
              <label class="label-text">欠费状态</label>
              <div type="text" class="lable-control">
                <img
                  src="../../assets/img/warn.png"
                  v-if="this.viewData.arrearState=='1'"
                  style="width:.25rem !important;height:.25rem !important;max-width: 1rem;max-height: 1rem;"
                />
                <img
                  src="../../assets/img/success.png"
                  v-if="this.viewData.arrearState=='0'"
                  style="width:.25rem !important;height:.25rem !important;max-width: 1rem;max-height: 1rem;"
                />
              </div>
              <div class="number-box">
                <label class="label-number">7</label>
              </div>
              <label class="label-text">当前所在阶梯</label>
              <div class="lable-control">{{this.viewData.nowLadderName}}</div>
            </div>
            <div class="col-12">
              <div class="number-box">
                <label class="label-number">3</label>
              </div>
              <label class="label-text">当月累计水量</label>
              <div class="lable-control">{{this.viewData.monthPower}}吨</div>
              <div class="number-box">
                <label class="label-number">8</label>
              </div>
              <label class="label-text">当前水价</label>
              <div class="lable-control">{{this.viewData.nowLadder}}元</div>
            </div>
            <div class="col-12">
              <div class="number-box">
                <label class="label-number">4</label>
              </div>
              <label class="label-text">当月累计水费</label>
              <div class="lable-control">{{this.viewData.monthMoney}}元</div>
              <div class="number-box">
                <label class="label-number">9</label>
              </div>
              <label class="label-text">下一阶梯</label>
              <div class="lable-control">{{this.viewData.nextLadder}}元</div>
            </div>
            <div class="col-12">
              <div class="number-box">
                <label class="label-number">5</label>
              </div>
              <label class="label-text">昨日用水量</label>
              <div class="lable-control">{{this.viewData.yesterdayPower}}吨</div>
              <div class="number-box">
                <label class="label-number">10</label>
              </div>
              <label class="label-text">本阶梯剩余水量</label>
              <div class="lable-control">{{this.viewData.remainLadderPower}}吨</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.m-box {
  position: absolute;
  width: 10rem;
  height: 6rem;
  left: 2.3rem;
  top: 0;
  background: url(../../assets/img/monitorbg.png) no-repeat;
  background-size: 100% 100%;
  z-index: 1;
}
.m-box [class^="sx-"] {
  text-align: center;
  font-size: 0.48rem;
  position: absolute;
  width: 100%;
  top: -0.15rem;
  line-height: 0.48rem;
  height: 0.48rem;
  font-weight: bold;
  font-family: "AlpinGothicCGNo1";
  background: linear-gradient(to bottom, #68f9d4, #01bd8d);
  -webkit-background-clip: text;
  color: transparent;
}

.m-box .input-group {
  padding: 0 0.3rem;
  padding-left: 0.8rem;
  padding-top: 1rem;
}
.m-box .input-group .col-12 {
  display: table;
  padding-bottom: 0.2rem;
}
.m-box .input-group .label-text {
  width: 1.5rem;
  padding-left: 0.2rem;
  font-size: 0.18rem;
}
.m-box .input-group .form-control {
  border: 0;
  border-radius: 0;
  padding-bottom: 2px;
  padding-top: 2px;
}
.m-box .input-group .lable-control {
  border: 0;
  border-radius: 0;
  background-color: transparent;
  box-sizing: border-box;
  padding: 0.2rem 0.5rem;
  font-size: 0.2rem;

  color: #00ffff;
  width: 2rem;
  vertical-align: middle;
}

.m-box .number-box {
  display: table-cell;
  width: 0.5rem;
  vertical-align: middle;
}
.m-box .label-number {
  display: inline-block;
  width: 0.34rem;
  height: 0.34rem;
  text-align: center;
  line-height: 0.34rem;
  font-size: 0.2rem;
  color: #ffffff;

  background: linear-gradient(to right, #48adf4, #39a0ec);
  border-radius: 0.1rem;
}
</style>

<script>
import userHeader from "../../components/userCenterHeader";
import leftNav from "../../components/userCenter/leftNav";
import {
  getUserAllInfo,
  getUserWaterRealTimeMonitorInfo
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
      show: false,
      userAddress: "", // 地址模糊查询
      userNo: "", // 户号模糊查询
      userName: "",
      contactMobile: "",

      viewData: {
        dataState: "",
        yesterdayMoney: "",
        arrearState: "",
        monthPower: "",
        nowLadder: "",
        nowLadderName: "",
        monthMoney: "",
        nextLadder: "",
        yesterdayPower: "",
        remainLadderPower: ""
      }
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
    loadData() {
      var that=this;
      let postData = { userNo: this.$route.params.userNo };
      getUserWaterRealTimeMonitorInfo(postData).then(response => {
        if (response.code == 200) {
          this.viewData = response.data;
        }
      });
    }
  }
};
</script>
