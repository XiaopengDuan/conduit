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
  import { getstore, setstore } from '@/utils/auth'
  import userHeader from "../../components/userCenterHeader";
  import leftNav from "../../components/auth/leftNav";
  export default {
    name: "mater",
    components: {
      userHeader,
      leftNav
    },
    mounted(){
      // console.log('xxoo', this.$store.getters.keepAliveValue)
    },
    data() {
      return {
        menuIndex: getstore('menuIndex') ? Number(getstore('menuIndex')) : 1
      };
    },
    watch:{
      $route(to,from){
        // console.log(to.path)
        if(to.path === '/auth/user/list') {
          setstore('menuIndex', 1)
          this.menuIndex = 1
        }
      }
    },
    methods: {
      clickmenuIndex(e){
        setstore('menuIndex', e)
        this.menuIndex = e
      }
    }
  }
</script>

<style scoped>

</style>
