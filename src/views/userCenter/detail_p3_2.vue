<template>
  <div style="height:100%" v-loading="loading">
    <div class="table-box" style="padding:.3rem;height:85%;box-sizing: border-box;">
      <!--左边表格-->
      <div class="col-6 table-wrap">
        <div class="table-title">
          <div class="text">同小区居民用水量级别<span style="font-size: .18rem;font-weight: 400;color: #fff;">（单位：吨）</span></div>
        </div>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>分段</th>
            <th>户数</th>
            <th>百分比</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in waterProportionInfo" :key="index"
              :style="{color: (item.flag ==='1')? '#00FFFE' : '',fontWeight:(item.flag ==='1')? 'bold' : 'normal'}">
            <td scope="row" v-text="item.subsection"></td>
            <td v-text="item.count"></td>
            <td v-html="item.perCent"></td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--左边表格//-->
      <!--右边表格-->
      <div class="col-6 table-wrap table-wrap-r">
        <div class="table-title">
          <div class="text">同小区居民水费级别 <span style="font-size: .18rem;font-weight: 400;color: #fff;">（单位：元）</span></div>
        </div>

        <table class="table table-striped">
          <thead>
          <tr>
            <th>分段</th>
            <th>户数</th>
            <th>百分比</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in moneyProportionInfo" :key="index"
              :style="{color: (item.flag ==='1')? '#00FFFE' : '',fontWeight:(item.flag ==='1')? 'bold' : 'normal'}">
            <td scope="row" v-text="item.subsection"></td>
            <td v-text="item.count"></td>
            <td v-html="item.perCent"></td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--右边表格//-->
    </div>
    <!--右侧切换按钮-->
    <router-link
      :to="{name:'detail_p3_1',params:{userNo:$route.params.userNo}}"
      class="btn-switch"
      name="切换"
    ></router-link>
    <!--右侧切换按钮//-->
  </div>
</template>
<script>
  import {
    getMoneyProportionInfo,
    getWaterProportionInfo,
    getUserAllInfo
  } from "@/api/usercenter";

  export default {
    data() {
      return {
        loading: false,
        comCode: "",
        elecTypeCode: "",
        moneyProportionInfo: [],
        waterProportionInfo: []
      };
    },
    mounted() {
      this.loadUserData();
    },
    methods: {
      loadUserData: function () {
        getUserAllInfo({userNo: this.$route.params.userNo}).then(response => {
          if (response.code == 200) {
            let postData = {
              userNo: this.$route.params.userNo,
              comCode: response.data.communityCode,
              elecTypeCode: response.data.elecTypeCode
            };
            if(response.data.elecTypeCode!="00")postData.comCode='';
            this.loadWaterProportionInfo(postData);
            this.loadMoneyProportionInfo(postData);
          }
        });
      },
      loadWaterProportionInfo: function (postData) {
        var that = this;
        that.loading = true;
        getWaterProportionInfo(postData)
          .then(response => {
            if (response.code == 200) {
              this.waterProportionInfo = response.data;
            }
            that.loading = false;
          })
          .catch(res => {
            that.loading = false;
          });
      },
      loadMoneyProportionInfo: function (postData) {

        var that = this
        that.loading = true;
        getMoneyProportionInfo(postData)
          .then(response => {
            if (response.code == 200) {
              this.moneyProportionInfo = response.data;
            }
            that.loading = false;
          })
          .catch(res => {
            that.loading = false;
          });
      }
    }
  };
</script>
