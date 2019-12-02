<template>
  <!--左边菜单-->
  <div class="left">
    <ul class="left-menu">
      <li v-if="$store.state.user.menuPerms.includes('USERCENTER.MAP')" :class="{'active':$route.fullPath.startsWith('/map')}">
        <router-link to="/map" >
          <i>
            <img src="../../assets/img/icon_home.png" />
          </i>
          <span class="text">首页</span>
        </router-link>
      </li>
        <li v-if="$store.state.user.menuPerms.includes('USERCENTER.WATERMONITOR')" :class="{'active':$route.fullPath.startsWith('/userCenter/waterMonitor')}">
        <router-link to="/userCenter/waterMonitor">
          <i>
            <img src="../../assets/img/icon_monitor.png" />
          </i>
          <span class="text">用户用水监控</span>
        </router-link>
      </li>
      <li v-if="$store.state.user.menuPerms.includes('USERCENTER.LIST')" :class="{'active':$route.fullPath.startsWith('/list')||$route.fullPath.startsWith('/userCenter/detail')}">
        <router-link to="/list">
          <i>
            <img src="../../assets/img/icon_khbbcx.png" />
          </i>
          <span class="text">用户行为分析</span>
        </router-link>
      </li>
     
      
      <li v-if="$store.state.user.menuPerms.includes('USERCENTER.USERREPORT')" :class="{'active':$route.fullPath.startsWith('/report')}">
        <div class="second-menu-wrap">
          <span class="ly-icon-arrow"></span>
          <ul class="second-menu">
            <li v-if="$store.state.user.menuPerms.includes('USERCENTER.USERREPORT.USERREPORT0')">
              <router-link to="/report" >
                欠费用户列表
              </router-link>
            </li>
            <li v-if="$store.state.user.menuPerms.includes('USERCENTER.USERREPORT.USERREPORT1')">
              <router-link to="/report1">
                正常缴费用户列表
              </router-link>
            </li>
            <li v-if="$store.state.user.menuPerms.includes('USERCENTER.USERREPORT.REPORT2')">
              <router-link to="/report2">
                居民用户用水列表
              </router-link>
            </li>
            <li v-if="$store.state.user.menuPerms.includes('USERCENTER.USERREPORT.REPORT3')">
              <router-link to="/report3">
                非居民缴费用户列表
              </router-link>
            </li>
            <li v-if="$store.state.user.menuPerms.includes('USERCENTER.USERREPORT.USERREPORT4')">
              <router-link to="/report4">
                特种用户列表
              </router-link>
            </li>
          </ul>
        </div>
        <router-link to>
          <i>
            <img src="../../assets/img/icon_yhda.png" />
          </i>
          <span class="text">用户数据分析</span>
        </router-link>

      </li>
    </ul>
  </div>
  <!--左边菜单//-->
</template>
<script>
import { getstore, setstore } from '@/utils/auth'
export default {
  
  data() {
    return {
      menuIndex: getstore('userdata') ? Number(getstore('userdata')) : 1
    };
  },
  created() {},
  methods: {
    highLight: function(index) {
      // setstore('userdata', index)
      // this.menuIndex = index;
    }
  }
};
</script>
