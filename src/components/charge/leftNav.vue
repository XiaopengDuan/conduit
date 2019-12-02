<template>
  <!--左边菜单-->
  <div id="menushow">
    <a class="btn-export" style="z-index:300" v-show="!$store.state.app.leftMeunShowFlag2 && classObject === 'menu-wrap'" @click="showCont"></a>
    <div v-bind:class="classObject" v-show="$store.state.app.leftMeunShowFlag2 || classObject==='menu-wrap-left'" style="display: none">
      <ul class="left-menu">
        <li v-if="$store.state.user.menuPerms.includes('CHARGE.CHARGEINDEX')" :class="{'active':menuIndex==1}">
          <router-link @click.native="updateClass(1)" to="/charge/Index"><i><img src="../../assets/img/icon_home.png" /></i><span class="text">首页</span></router-link>
        </li>
        <li v-if="$store.state.user.menuPerms.includes('CHARGE.ARREAR')" :class="{'active':menuIndex==2}">
          <div class="second-menu-wrap">
            <span class="ly-icon-arrow"></span>
            <ul class="second-menu">
              <!--          <li><router-link @click.native="updateClass(2)" to="/charge/arrear/arrearUserInfo">用户档案列表</router-link></li>-->
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.ARREAR.ARREARRESIDENTIALQUARTERS')"><router-link @click.native="updateClass(2)" to="/charge/arrear/arrearResidentialquarters">小区欠费列表</router-link></li>
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.ARREAR.ARREARWATERPROPERTIES')"><router-link @click.native="updateClass(2)" to="/charge/arrear/arrearWaterProperties">用水性质欠费人数</router-link></li>
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.ARREAR.ARREARWATERTYPE')"><router-link @click.native="updateClass(2)" to="/charge/arrear/arrearWaterType">水价类型欠费列表</router-link></li>
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.ARREAR.ARREARCONTINUOUS')"><router-link @click.native="updateClass(2)" to="/charge/arrear/arrearContinuous">连续欠费人数</router-link></li>
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.ARREAR.ARREARQOQLIST')"><router-link @click.native="updateClass(2)" to="/charge/arrear/QoqList">欠费同比环比</router-link></li>
              <!--          <li><router-link @click.native="updateClass(2)" to="/charge/arrear/IndexCurve">欠费曲线</router-link></li>-->
            </ul>
          </div>
          <router-link @click.native="updateClass(2)" to="/charge/arrear/Index"><i><img src="../../assets/img/icon_qfyhfx.png" /></i><span class="text">欠费用户分析</span></router-link>
          </li>
        <li v-if="$store.state.user.menuPerms.includes('CHARGE.WATER')" :class="{'active':menuIndex==3}">
          <div class="second-menu-wrap">
            <span class="ly-icon-arrow"></span>
            <ul class="second-menu">
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.WATER.ANALYSISUSEWATER')">
                <router-link @click.native="updateClass(3)" to="/charge/water/useWater">不同地域用水量</router-link>
                </li>
              <!--              <li><router-link @click.native="updateClass(3)" to="/charge/water/waterUserRanking">用户用水量</router-link></li>-->
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.WATER.ELECTYPEUSEWATERLIST')">
                <router-link @click.native="updateClass(3)" to="/charge/water/elecTypeList">不同用水性质用水量</router-link>
                </li>

              <li v-if="$store.state.user.menuPerms.includes('CHARGE.WATER.WATERPRICETYPE')">
                <router-link @click.native="updateClass(3)" to="/charge/water/waterPriceType">不同水价类型用水量</router-link>
                </li>
              <!--              <li><router-link @click.native="updateClass(3)" to="/charge/water/analysisUnderpaidCustomers">用户用水波动分析</router-link></li>-->
              <!--              <li><router-link @click.native="updateClass(3)" to="/charge/water/waterDayStatistics">天数统计</router-link></li>-->
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.WATER.WATERHIGHFREQUENCYFLUCTUATION')">
                <router-link  @click.native="updateClass(3)" to="/charge/water/waterHighFrequencyFluctuation">小区用水高频波动分析</router-link></li>
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.WATER.WATERQOQLIST')">
                <router-link @click.native="updateClass(3)" to="/charge/water/QoqList">用水同比</router-link>
                </li>
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.WATER.WATERDAILYPEAKLIST')">
                <router-link @click.native="updateClass(3)" to="/charge/water/waterDailyPeakList">日高峰用水分析</router-link>
                </li>
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.WATER.WATERMININIGHTLIST')">
                <router-link @click.native="updateClass(3)" to="/charge/water/waterMiniNightList">夜间最小用水分析</router-link>
                </li>



            </ul>
          </div>
          <router-link @click.native="updateClass(3)" to="/charge/water/Index"><i><img src="../../assets/img/icon_yhysfx.png" /></i><span class="text">用户用水分析</span></router-link>
        </li>
        <li v-if="$store.state.user.menuPerms.includes('CHARGE.INCOME')" :class="{'active':menuIndex==4}">
          <div class="second-menu-wrap">
            <span class="ly-icon-arrow"></span>
            <ul class="second-menu">
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.INCOME.RATIO')"><router-link @click.native="updateClass(4)" to="/charge/income/Ratio">收益同比环比</router-link></li>
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.INCOME.INCOMERESIDENTIALUSER')"><router-link @click.native="updateClass(4)" to="/charge/income/ResidentialUser">小区收益统计报表</router-link></li>
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.INCOME.INCOMEUSERTYPE')"><router-link @click.native="updateClass(4)" to="/charge/income/incomeUserType">不同用户类型收益</router-link></li>
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.INCOME.INCOMEWATERTYPE')"><router-link @click.native="updateClass(4)" to="/charge/income/incomeWaterType">不同水价类型收益</router-link></li>
            </ul>
          </div>
          <router-link @click.native="updateClass(4)" to="/charge/income/Index"><i><img src="../../assets/img/icon_syfx.png" /></i><span class="text">收益分析</span></router-link>

        </li>
        <li v-if="$store.state.user.menuPerms.includes('CHARGE.CALL')" :class="{'active':menuIndex==5}">
          <div class="second-menu-wrap">
            <span class="ly-icon-arrow"></span>
            <ul class="second-menu">
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.CALL.CALLSTATISTICSITEM')"><router-link @click.native="updateClass(5)" to="/charge/call/callStatisticsItem">分项表格统计</router-link></li>
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.CALL.CALLANALYSIS')"><router-link @click.native="updateClass(5)" to="/charge/call/Analysis">客户来电分析</router-link></li>
              <li v-if="$store.state.user.menuPerms.includes('CHARGE.CALL.CALLLISTDETAILS')"><router-link @click.native="updateClass(5)" to="/charge/call/callListDetails">列表详情</router-link></li>
            </ul>
          </div>
          <router-link @click.native="updateClass(5)" to="/charge/call/Index"><i><img src="../../assets/img/icon_khldfx.png" /></i><span class="text">客户来电分析</span></router-link>
        </li>
      </ul>
    </div>
    <a class="btn-export2" v-show="$store.state.app.leftMeunShowFlag2"  @click="showCont" style="z-index:300"></a>
  </div>
  <!--左边菜单//-->
</template>
<script>
  import { getstore, setstore } from '@/utils/auth'
  export default {
    data() {
      return {
        show: false,
        className: 'menu-wrap',  // 'menu-wrap-left'
        menuIndex: getstore('menuIndex2') ? Number(getstore('menuIndex2')) : 1
      };
    },
    mounted() {

    },
    computed: {
      classObject: function () {
        if(this.$route.meta && this.$route.meta.type === 'analysis'){
          return 'menu-wrap-left'
        } else {
          return 'menu-wrap'
        }
      }
    },
    methods: {
      showCont: function() {
        this.setShow(!this.$store.state.app.leftMeunShowFlag2);
      },
      setShow(value){
        this.$store.commit('app/SET_LEFTMEUNSHOWFLAG2', value)
      },
      updateClass: function (i) {
        // this.$store.commit('app/SET_KEEPALIVEFLAG', false)
        this.$store.dispatch("app/resetKeepAliveAll")
        // alert(this.$store.getters.keepAliveFlag)
        setstore('menuIndex2', i)
        this.menuIndex = i;
        this.$store.state.app.leftMeunShowFlag2 = false;
      }
    }
  };
</script>
