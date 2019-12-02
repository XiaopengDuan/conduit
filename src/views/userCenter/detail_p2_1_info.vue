<template>
  <div class="right-content">
    <a href="#" class="btn-back" @click="goBack()"><span>返回上一级</span></a>
    <div class="tablecont-box">
      <ul class="nav nav-tabs nav-jf" style="left: 0.5rem;">
        <li v-for="(item,index) in navBox.navList" @click="navChange(index)"
            :class="{active:index === navBox.navIndex }">
          <a v-text="item" style="cursor:pointer"></a><img src="../../assets/img/tab_list_active.png">
        </li>
      </ul>
      <!-- <div class="scroll-box"> -->
        <div class="table-box1" v-if="navBox.navIndex === 0">
          <table class="table table-jf">
            <tbody>
            <tr>
              <th scope="row">户号</th>
              <td v-text="userAllInfo.userNo"></td>
              <th scope="row">户名</th>
              <td v-text="userAllInfo.userName"></td>
              <th scope="row">地址</th>
              <td v-text="userAllInfo.userAddress"></td>
            </tr>
            <tr>
              <th scope="row">身份证</th>
              <td v-text="userAllInfo.idCard"></td>
              <th scope="row">用户状态</th>
              <td v-text="userAllInfo.stateName"></td>
              <th scope="row">用户类型</th>
              <td v-text="userAllInfo.userTypeName"></td>
            </tr>
            <tr>
              <th scope="row">营业区域</th>
              <td v-text="userAllInfo.departmentName"></td>
              <th scope="row">所属表册</th>
              <td v-text="userAllInfo.writeBookCode"></td>
              <th scope="row">考核表</th>
              <td v-text="userAllInfo.accessMeterName"></td>
            </tr>
            <tr>
              <th scope="row">所属小区</th>
              <td v-text="userAllInfo.communityName"></td>
              <th scope="row">所属楼宇</th>
              <td v-text="userAllInfo.floorName"></td>
              <th scope="row">单元号</th>
              <td v-text="userAllInfo.unitNum"></td>
            </tr>
            <tr>
              <th scope="row">楼层数</th>
              <td v-text="userAllInfo.floorNum"></td>
              <th scope="row">门牌号</th>
              <td v-text="userAllInfo.houseNumber"></td>
              <th scope="row">违约金计算方式</th>
              <td v-text="userAllInfo.punishCalcMode"></td>
            </tr>
            <tr>
              <th scope="row">收费方式</th>
              <td v-text="userAllInfo.chargeModeName"></td>
              <th scope="row">合并户号</th>
              <td v-text="userAllInfo.chargeUserNo"></td>
              <th scope="row">合并户名</th>
              <td v-text="userAllInfo.chargeUserName"></td>
            </tr>
            <tr>
              <th scope="row">人口数</th>
              <td v-text="userAllInfo.popNum"></td>
              <th scope="row">人均吨数</th>
              <td v-text="userAllInfo.popTonNum"></td>
              <th scope="row">面积</th>
              <td v-text="userAllInfo.areaNum"></td>
            </tr>
            <tr>
              <th scope="row">联系人</th>
              <td v-text="userAllInfo.contact"></td>
              <th scope="row">联系手机</th>
              <td v-text="userAllInfo.contactMobile"></td>
              <th scope="row">备用手机</th>
              <td v-text="userAllInfo.contactMobile1"></td>
            </tr>
            <tr>
              <th scope="row">联系电话</th>
              <td v-text="userAllInfo.telephone"></td>
              <th scope="row">计件类型</th>
              <td v-text="userAllInfo.pieType"></td>
              <th scope="row">抄表序号</th>
              <td v-text="userAllInfo.writeSequence"></td>
            </tr>
            <tr>
              <th scope="row">是否开户</th>
              <td v-text="userAllInfo.isOpenAccountName"></td>
              <th scope="row">开户日期</th>
              <td v-text="userAllInfo.openAccountDate"></td>
              <th scope="row">销户日期</th>
              <td v-text="userAllInfo.cancelDate"></td>
            </tr>
            <tr>
              <th scope="row">开户银行</th>
              <td v-text="userAllInfo.openAccountBank"></td>
              <th scope="row">银行账号</th>
              <td v-text="userAllInfo.bankAccount"></td>
              <th scope="row">银行开户登记日期</th>
              <td v-text="userAllInfo.openBankDate"></td>
            </tr>
            <tr>
              <th scope="row">低保证号</th>
              <td v-text="userAllInfo.certNo"></td>
              <th scope="row">低保证登记时间</th>
              <td v-text="userAllInfo.certCreateDate"></td>
              <th scope="row">低保证到期时间</th>
              <td v-text="userAllInfo.certExpireDate"></td>
            </tr>
            <tr>
              <th scope="row">是否签订供水合同</th>
              <td v-text="userAllInfo.isSignContractName"></td>
              <th scope="row">合同编号</th>
              <td v-text="userAllInfo.contractNo"></td>
              <th scope="row">DMA分区</th>
              <td v-text="userAllInfo.dmaAreaId"></td>
            </tr>
            <tr>
              <th scope="row">是否开阀</th>
              <td v-text="userAllInfo.valveControlStateName"></td>
              <th scope="row">是否增值税</th>
              <td v-text="userAllInfo.isVatName"></td>
              <th scope="row">一卡通</th>
              <td v-text="userAllInfo.oneCard"></td>
            </tr>
            <tr>
              <th scope="row">发票开票地址</th>
              <td v-text="userAllInfo.invoiceAddress"></td>
              <th scope="row">备注</th>
              <td v-text="userAllInfo.remark" colspan="3"></td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="table-box2" v-if="navBox.navIndex === 1">
          <table class="table table-jf">
            <tbody>
            <tr>
              <th scope="row">发票类型</th>
              <td v-text="userVatSetInfo.itemName"></td>
              <th scope="row">增值税税率</th>
              <td v-text="userVatSetInfo.vatRate"></td>
            </tr>
            <tr>
              <th scope="row">增值税户名</th>
              <td v-text="userVatSetInfo.vatName"></td>
              <th scope="row">增值税地址</th>
              <td v-text="userVatSetInfo.vatAddress"></td>
            </tr>
            <tr>
              <th scope="row">增值税开户行</th>
              <td v-text="userVatSetInfo.vatBank"></td>
              <th scope="row">银行账号</th>
              <td v-text="userVatSetInfo.vatBankAccount"></td>
            </tr>
            <tr>
              <th scope="row">纳税人识别号</th>
              <td v-text="userVatSetInfo.vatPayer"></td>
              <th scope="row">开票备注</th>
              <td v-text="userVatSetInfo.vatRemark"></td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="table-box2" v-if="navBox.navIndex === 2">
          <table class="table table-jf">
            <tbody>
            <tr>
              <th>计费点号</th>
              <td v-text="userChargeSetInfo.groupNo"></td>
              <th>执行阶梯</th>
              <td v-text="userChargeSetInfo.isLadder" colspan="3"></td>
            </tr>
            <tr>
              <th scope="row">基本水价</th>
              <td v-text="userChargeSetInfo.contentPriceCode"></td>
              <th>代征费</th>
              <td v-text="userChargeSetInfo.plusSortName"></td>
              <th>主用水类别</th>
              <td v-text="userChargeSetInfo.elecTypeName"></td>
            </tr>
            <tr>
              <th scope="row">功能代码</th>
              <td v-text="userChargeSetInfo.functionName"></td>
              <th>功能方向</th>
              <td v-text="userChargeSetInfo.powerDirection"></td>
              <th>定量定比值</th>
              <td v-text="userChargeSetInfo.constPower"></td>
            </tr>
            <tr>
              <th scope="row">水表编号</th>
              <td v-text="userChargeSetInfo.madeNo"></td>
              <th>水表口径</th>
              <td v-text="userChargeSetInfo.caliberCode"></td>
              <th>安装区域</th>
              <td v-text="userChargeSetInfo.installAreaType"></td>
            </tr>
            <tr>
              <th scope="row">新表起码</th>
              <td v-text="userChargeSetInfo.originNum"></td>
              <th>表封号</th>
              <td v-text="userChargeSetInfo.sealNo"></td>
              <th>表锁号</th>
              <td v-text="userChargeSetInfo.lockNo"></td>
            </tr>
            <tr>
              <th scope="row">水表地址</th>
              <td v-text="userChargeSetInfo.address"></td>
              <th>备注</th>
              <td v-text="userChargeSetInfo.remark" colspan="3">209</td>
            </tr>
            </tbody>
          </table>
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
  import {
    getUserAllInfo,
    getUserVatSetInfo,
    getUserChargeSetInfo,
  } from "@/api/usercenter";

  export default {
    data() {
      return {
        navBox: {
          navIndex: 0,
          navList: ['基本信息', '税务设置', '计费设置'],
        },
        userAllInfo: {},
        userVatSetInfo: {},
        userChargeSetInfo: {},
      }
    },
    mounted() {
      this.navChange();
    },
    methods: {
      goBack() {
        this.$router.back(-1);
      },
      navChange(index) {
        let userNo = this.$route.params.userNo;
        let postData = {userNo: userNo};
        this.navBox.navIndex = typeof (index) === "undefined" ? this.navBox.navIndex : index;
        if (this.navBox.navIndex === 0) {//基本信息
          this.loadUserAllInfo(postData);
        } else if (this.navBox.navIndex === 1) {//税务设置
          this.loadUserVatSetInfo(postData);
        } else if (this.navBox.navIndex === 2) {//计费设置
          this.loadUserChargeSetInfo(postData);
        }
      },
      /**
       * 获取用户所有信息
       * @param data
       */
      loadUserAllInfo(data) {
        getUserAllInfo(data).then((res) => {
          if (res.code === 200) {
            this.userAllInfo = res.data;
          }
        });
      },
      /**
       * 获取用户税务设置
       * @param data
       */
      loadUserVatSetInfo(data) {
        getUserVatSetInfo(data).then((res) => {
          if (res.code === 200) {
            this.userVatSetInfo = res.data;
          }
        });
      },
      /**
       * 获取用户税务设置
       * @param data
       */
      loadUserChargeSetInfo(data) {
        getUserChargeSetInfo(data).then((res) => {
          if (res.code === 200) {
            this.userChargeSetInfo = res.data;
          }
        });
      },
    }
  }
</script>
