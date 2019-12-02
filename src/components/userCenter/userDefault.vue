<template>
  <!--弹出层-->
  <div class="model" style="display: block" v-if="isShowPanel">
    <div class="model-box xylh">
      <!--四个装饰角-->
      <div class="top-horn-l"></div>
      <div class="top-horn-r"></div>
      <div class="bottom-horn-l"></div>
      <div class="bottom-horn-r"></div>
      <!--四个装饰角//-->
      <!--关闭按钮-->
      <a class="close" @click="toggleDialog"></a>
      <!--关闭按钮//-->
      <div class="content">
        <div :class="{'line-5':nowArrears==0}">
          <img src="../../assets/img/xylh.png" class="xy-img" v-if="nowArrears==0" />
          <div class="title">违约记录</div>

          <div class="content-mes" v-if="nowArrears==0">
            <p>为配合“信用辽阳”的建设，我司通过大数据平台建立用水信用体系综合平台，居民欠缴水费失信行为将逐步开放给“信用辽阳”平台，实现数据共享</p>
          </div>
          <div class="content-mes" v-else>
            <div class="input-group">
              <div class="col-12">
                <label class="label-text">违约次数</label>
                <input type="text" class="form-control" :value="nowArrears" disabled />
              </div>
              <div class="col-12">
                <label class="label-text">已消除违约</label>
                <input type="text" class="form-control" :value="removeArrears" disabled />
              </div>
              <div class="col-12">
                <label class="label-text">累计违约</label>
                <input type="text" class="form-control" :value="totalArrears" disabled />
              </div>
            </div>
          </div>
        </div>
        <div class="line-7">
          <div class="title">欠缴水费失信行为认定标准</div>
          <div class="content-mes">
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
    </div>
  </div>
  <!--弹出层//-->
</template>

<script>
import { getDefaultWindowInfoPage1 } from "@/api/usercenter";
export default {
  props: {
    userNo: {
      default: ""
    }
  },
  data() {
    return {
      isShowPanel: false,
      userDefaultProp: {},
      nowArrears: "",
      removeArrears: "",
      totalArrears: ""
    };
  },
  mounted() {
    var that = this;
    let postData = {
      userNo: this.userNo
    };
    getDefaultWindowInfoPage1(postData)
      .then(response => {
        if (response.code == 200) {
          that.nowArrears = response.data.nowArrears;
          that.removeArrears = response.data.removeArrears;
          that.totalArrears = response.data.totalArrears;
        }
      })
      .catch(err => {});
  },
  methods: {
    toggleDialog: function() {
      if (this.isShowPanel) this.isShowPanel = false;
      else this.isShowPanel = true;
    }
  }
};
</script>