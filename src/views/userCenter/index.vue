<template>
  <div class="wap-wrap">
    <userHeader></userHeader>
    <leftNav ></leftNav>
    <!--右边内容-->
    <div :class="[(!$route.fullPath.startsWith('/userCenter/detail') && !$route.fullPath.startsWith('/userCenter/waterMonitorSingle')
     && !$route.fullPath.startsWith('/defaultDetail') && !$route.fullPath.startsWith('/userCenter/detail/p6_2') && !$route.fullPath.startsWith('/map') )
     &&'right3','right']">
      <div class="right-content">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <router-view></router-view>
      </div>
    </div>
    <!--右边内容//-->
  </div>
</template>
<script>
import userHeader from "../../components/userCenterHeader";
import leftNav from "../../components/userCenter/leftNav";
export default{
  components: {
    userHeader,
    leftNav
  },
  data(){
    return{
      data:{
        isright3: false
      }
    }
  }
}
</script>
