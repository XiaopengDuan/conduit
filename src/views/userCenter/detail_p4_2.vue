<template>
  <div style="height:100%" v-loading="loading">
    <div class="bottom-table-box" style="padding:.3rem;height:85%;box-sizing: border-box;">
      <!--左边表格-->
      <div class="col-6 table-wrap" style="height: 100%">
        <div class="table-title">
          <div class="text">用水水量同比<span style="font-size: .18rem;font-weight: 400;color: #fff;">（单位：吨）</span></div>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th v-text="water.timeTitle"></th>
              <th v-text="water.pastTitle"></th>
              <th v-text="water.currentTitle"></th>
              <th v-text="water.yearOnYearTitle"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in water.data" :key="index">
              <td scope="row" v-text="item.month"></td>
              <td v-text="item.past"></td>
              <td v-text="item.current"></td>
              <td v-html="item.yearOnYear"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--左边表格//-->

      <!--右边表格-->
      <div class="col-6 table-wrap table-wrap-r" style="height: 100%">
        <div class="table-title">
          <div class="text">用水水费同比<span style="font-size: .18rem;font-weight: 400;color: #fff;">（单位：元）</span></div>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th v-text="money.timeTitle"></th>
              <th v-text="money.pastTitle"></th>
              <th v-text="money.currentTitle"></th>
              <th v-text="money.yearOnYearTitle"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in money.data" :key="index">
              <td scope="row" v-text="item.month"></td>
              <td v-text="item.past"></td>
              <td v-text="item.current"></td>
              <td v-html="item.yearOnYear"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--右边表格//-->
    </div>
    <!--右侧切换按钮-->
    <router-link
      name="切换"
      class="btn-switch"
      :to="{path:`/userCenter/detail/${this.$route.params.userNo}/p4_1`}"
    ></router-link>
    <!--右侧切换按钮//-->
  </div>
</template>
<script>
import { getUserMoneyYtyInfo, getUserWaterYtyInfo } from "@/api/usercenter";

export default {
  data() {
    return {
      loading: false,
      water: {
        timeTitle: "",
        currentTitle: "",
        pastTitle: "",
        yearOnYearTitle: "",
        data: []
      },
      money: {
        timeTitle: "",
        currentTitle: "",
        pastTitle: "",
        yearOnYearTitle: "",
        data: []
      }
    };
  },
  mounted() {
    let postData = { userNo: this.$route.params.userNo };
    var that = this;
    that.loading = true;
    getUserWaterYtyInfo(postData)
      .then(res => {
        if (res.code === 200) {
          this.water = this.transform(res.data);
        }
        that.loading = false;
      })
      .catch(res => {
        that.loading = false;
      });
    getUserMoneyYtyInfo(postData)
      .then(res => {
        if (res.code === 200) {
          this.money = this.transform(res.data);
        }
        that.loading = false;
      })
      .catch(res => {
        that.loading = false;
      });
  },
  methods: {
    transform: function(data) {
      let list = data.list;
      let res = data.months;
      let length = res.length;
      let result = {
        timeTitle: "时间",
        currentTitle: "本期数据",
        pastTitle: "往期数据",
        yearOnYearTitle: "同比增长率",
        data: Array.apply(null, Array(length)).map(() => {
          return {
            past: "",
            month: "",
            current: "",
            yearOnYear: ""
          };
        })
      };
      for (let i = 0; i < length; i++) {
        result.data[i].month = res[i];
      }
      res = list.now;
      for (let i = 0; i < length; i++) {
        result.data[i].current = res[i];
      }
      res = list.last;
      for (let i = 0; i < length; i++) {
        result.data[i].past = res[i];
      }
      res = list.value;
      for (let i = 0; i < length; i++) {
        if (isNaN(res[i])) {
          result.data[i].yearOnYear = `${res[i]}`;
        } else if (parseFloat(res[i]) >= 0) {
          result.data[i].yearOnYear = `${res[i]}%`;
        } else {
          result.data[
            i
          ].yearOnYear = `<span style="color: red;">${res[i]}%</span>`;
        }
      }
      return result;
    }
  }
};
</script>
