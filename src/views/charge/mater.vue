<template>
  <div class="wap-wrap">
    <userHeader></userHeader>
    <leftNav :menuIndex="menuIndex"></leftNav>
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

<style scoped>
</style>
<script>
import userHeader from "../../components/userCenterHeader";
import leftNav from "../../components/charge/leftNav";
export default {
  name: "Home",
  components: {
    userHeader,
    leftNav
  },
  mounted(){
  },
  data() {
    return {
      menuIndex: 1,
    };
  },
   methods: {
   }
};
</script>
