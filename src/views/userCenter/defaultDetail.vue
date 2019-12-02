<template>
  <div style="height:100%">
    <a class="btn-back" @click="$router.go(-1)">
      <span>返回上一级</span>
    </a>
    <!--右上角按钮//-->
    <div class="tablecont-box" @click="link_defaultList()" v-if="nowArrears!=0">
      <div class="title">违约记录</div>
      <div class="mes-xy-box">
        <spa class="icon-text"></spa>
        <div class="text">为配合“信用辽阳”的建设，我司通过大数据平台建立用水信用体系综合平台，居民欠缴水费失信行为将逐步开放给“信用辽阳”平台，实现数据共享</div>
      </div>
      <div class="wy-box">
        <div class="sx-yb"
             style="background-image:-webkit-linear-gradient(bottom, #01a4bdbf, #01bdaceb, #01bd88); -webkit-background-clip:text; -webkit-text-fill-color:transparent;"
             v-if="nowArrears <= 3">一般失信行为
        </div>
        <div class="sx-yellow"
             style="background-image:-webkit-linear-gradient(bottom,#f8de0a,#f8db0a,#f8b00ad6); -webkit-background-clip:text; -webkit-text-fill-color:transparent;"
             v-else-if="nowArrears <= 6">较重失信行为
        </div>
        <div class="sx-red"
             style="background-image:-webkit-linear-gradient(bottom,#da005c96,#da0060cc,#da004cfa); -webkit-background-clip:text; -webkit-text-fill-color:transparent;"
             v-else>严重失信行为
        </div>
        <div class="input-group">
          <div class="col-12">
            <label class="label-text">违约次数</label>
            <input type="text" class="form-control" :value="nowArrears" disabled/>
          </div>
          <div class="col-12">
            <label class="label-text">已消除违约</label>
            <input type="text" class="form-control" :value="removeArrears" disabled/>
          </div>
          <div class="col-12">
            <label class="label-text">累计违约</label>
            <input type="text" class="form-control" :value="totalArrears" disabled/>
          </div>
        </div>
      </div>
      <div class="xy-mes">
        <dl class="panel panel-green">
          <dt>
            一般失信行为
            <span class="circular"></span>
          </dt>
          <dd>1：拖欠水费2个月以上3个月以内的行为</dd>
          <dd>2：1年内发生2次逾期未缴纳水费的行为</dd>
        </dl>
        <dl class="panel panel-yellow">
          <dt>
            较重失信行为
            <span class="circular"></span>
          </dt>
          <dd>1：拖欠水费3个月以上6个月以内的行为</dd>
          <dd>2：1年内发生2次以上5次以下逾期未缴纳水费的行为</dd>
          <dd>3：1年内发生2次以上一般失信行为</dd>
        </dl>
        <dl class="panel panel-red">
          <dt>
            严重失信行为
            <span class="circular"></span>
          </dt>
          <dd>1：拖欠水费6个月以上的行为</dd>
          <dd>2：1年内发生5次以上逾期未缴纳水费的行为</dd>
          <dd>3：1年内发生2次以上较重失信行为</dd>
        </dl>
      </div>
    </div>

    <div class="tablecont-box" v-if="nowArrears==0">
      <div class="title">违约记录</div>
      <div class="mes-xy-box">
        <spa class="icon-text"></spa>
        <div class="text">为配合“信用辽阳”的建设，我司通过大数据平台建立用水信用体系综合平台，居民欠缴水费失信行为将逐步开放给“信用辽阳”平台，实现数据共享</div>
      </div>
      <div class="xy-box">
        <div class="xy">
          <span class="text">0次违约</span>
        </div>
      </div>
      <div class="xy-mes">
        <dl class="panel panel-green">
          <dt>
            一般失信行为
            <span class="circular"></span>
          </dt>
          <dd>1：拖欠水费2个月以上3个月以内的行为</dd>
          <dd>2：1年内发生2次逾期未缴纳水费的行为</dd>
        </dl>
        <dl class="panel panel-yellow">
          <dt>
            较重失信行为
            <span class="circular"></span>
          </dt>
          <dd>1：拖欠水费3个月以上6个月以内的行为</dd>
          <dd>2：1年内发生2次以上5次以下逾期未缴纳水费的行为</dd>
          <dd>3：1年内发生2次以上一般失信行为</dd>
        </dl>
        <dl class="panel panel-red">
          <dt>
            严重失信行为
            <span class="circular"></span>
          </dt>
          <dd>1：拖欠水费6个月以上的行为</dd>
          <dd>2：1年内发生5次以上逾期未缴纳水费的行为</dd>
          <dd>3：1年内发生2次以上较重失信行为</dd>
        </dl>
      </div>
    </div>
  </div>
</template>


<script>
  import {getDefaultWindowInfoPage1} from "@/api/usercenter";

  export default {
    data() {
      return {
        isShowPanel: false,
        userDefaultProp: {},
        nowArrears: 0,
        removeArrears: "",
        totalArrears: ""
      };
    },
    mounted() {
      var that = this;
      let postData = {
        userNo: this.$route.params.userNo
      };
      getDefaultWindowInfoPage1(postData)
        .then(response => {
          if (response.code == 200) {
            that.nowArrears = parseInt(response.data.nowArrears);
            that.removeArrears = response.data.removeArrears;
            that.totalArrears = response.data.totalArrears;
          }
        })
        .catch(err => {
        });
    },
    methods: {
      link_defaultList() {
        this.$router.push({
          name: "defaultList",
          params: {userNo: this.$route.params.userNo}
        });
      }
    }
  };
</script>
