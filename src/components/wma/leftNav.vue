<template>
  <!--左边菜单-->
  <div id="menushow">
    <a class="btn-export" v-show="!show && classObject === 'menu-wrap'" @click="showCont"></a>
    <div v-bind:class="classObject" v-show="show || classObject==='menu-wrap-left'" style="display: none">
      <ul class="left-menu">
        <li v-if="$store.state.user.menuPerms.includes('WMA.WMAINDEX')" :class="{'active':$route.fullPath.startsWith('/wma/index')}">
          <router-link @click.native="updateClass(1)" to="/wma/Index"><i><img src="../../assets/img/icon_home.png" /></i><span class="text">首页</span></router-link>
        </li>
        <li v-if="$store.state.user.menuPerms.includes('WMA.DATACOLLECTED')" :class="{'active':$route.fullPath.startsWith('/wma/dataCollected')}">
          <router-link @click.native="updateClass(2)" to="/wma/dataCollected"><i><img src="../../assets/img/icon_home.png" /></i><span class="text">数据采集分析</span></router-link>
        </li>
      
        <li v-if="$store.state.user.menuPerms.includes('WMA.WATERACQUISITIONRATE')" :class="{'active':$route.fullPath.startsWith('/wma/waterAcquisitionRate')}">
          <router-link @click.native="updateClass(3)" to="/wma/waterAcquisitionRate"><i><img src="../../assets/img/icon_home.png" /></i><span class="text">水表采集率分析</span></router-link>
        </li>
        <li v-if="$store.state.user.menuPerms.includes('WMA.DATAREPORT')" :class="{'active':$route.fullPath.startsWith('/wma/dataReport')}">
          <div class="second-menu-wrap">
            <span class="ly-icon-arrow"></span>
            <ul class="second-menu">
              <li v-if="$store.state.user.menuPerms.includes('WMA.DATAREPORT.WATERMETERSTATISTICS')"><router-link @click.native="updateClass(4)" to="/wma/dataReport/waterMeterStatistics">水表统计报表</router-link></li>
              <li v-if="$store.state.user.menuPerms.includes('WMA.DATAREPORT.DATAACQUISITION')"><router-link @click.native="updateClass(4)" to="/wma/dataReport/dataAcquisition">采集数据报表</router-link></li>
            </ul>
          </div>
          <!-- <router-link @click.native="updateClass(4)" to="/wma/dataReport/waterMeterStatistics"><i><img src="../../assets/img/icon_yhysfx.png" /></i><span class="text">数据报表查询</span></router-link> -->
          <router-link to><i><img src="../../assets/img/icon_yhysfx.png" /></i><span class="text">数据报表查询</span></router-link>
        </li>
      </ul>
    </div>
    <a class="btn-export2" v-show="show && classObject==='menu-wrap'" @click="showCont"></a>
  </div>
  <!--左边菜单//-->
</template>
<script>
import { getstore, setstore } from '@/utils/auth'
  export default {
    props: ['menuIndex', 'clickmenuIndex'],
    data() {
      return {
        show: false,
        className: 'menu-wrap',  // 'menu-wrap-left'
        // menuIndex: 1
        // menuIndex: getstore('meterdata') ? Number(getstore('meterdata')) : 1,
      };
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
        this.show = !this.show;
      },
      updateClass: function (i) {
        // this.$store.commit('app/SET_KEEPALIVEFLAG', false)
        this.$store.dispatch("app/resetKeepAliveAll")
        // alert(this.$store.getters.keepAliveFlag)
        // setstore('meterdata', i)
        this.clickmenuIndex(i)
        // this.menuIndex = i;
        this.show = false;
      }
    }
  };
</script>
<style scoped>
  .menu-wrap{
    top: 1.5rem;
  }
</style>
