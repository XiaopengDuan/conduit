<template>
  <div class="wap-wrap">
    <userHeader></userHeader>
    <leftNav :menuIndex="menuIndex" :clickmenuIndex="clickmenuIndex"></leftNav>
    <!-- <keep-alive>
       <router-view v-if="$store.getters.keepAliveFlag === true && $route.meta && $route.meta.keepAlive && $route.meta.keepAlive === true  ? true:false"></router-view>
     </keep-alive>
     <router-view v-if="$store.getters.keepAliveFlag === true && $route.meta && $route.meta.keepAlive && $route.meta.keepAlive === true ? false:true"></router-view>
   -->
    <keep-alive :include="$store.getters.keepAliveValue">
      <router-view ></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { setstore, getstore } from '@/utils/auth'
  import userHeader from "../../components/userCenterHeader";
  import leftNav from "../../components/wma/leftNav";
  export default {
    name: "mater",
    components: {
      userHeader,
      leftNav
    },
    mounted(){
      
    },
    data() {
      return {
        menuIndex : getstore('meterdata') ? Number(getstore('meterdata')) : 0,
      };
    },
    created() {
      if(this.$route.path === '/wma/index') {
        setstore('meterdata', 0)
        this.menuIndex = 0
      }
    },
    watch:{
      $route(to,from){
        if(to.path === '/wma/index') {
          setstore('meterdata', 0)
          this.menuIndex = 0
        }
      }
    },
    methods: {
      clickmenuIndex(e){
        setstore('meterdata', e)
        this.menuIndex = e
      }
    }
  }
</script>

<style scoped>

</style>
