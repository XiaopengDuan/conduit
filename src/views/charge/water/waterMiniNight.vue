<template>
  <div style="height: 100%">
    <div class="right" style="height: 100%">
      <div class="right-content" style="height: 100%">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <a @click="$router.go(-1)" class="btn-back"><span>返回上一级</span></a>
        <div class="tablecont-box" style="justify-content: space-between;height: 100%;display: flex;align-items: center;">
          <router-view></router-view>
          <waterMiniNightRightNav style="position: initial;"></waterMiniNightRightNav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import waterMiniNightRightNav from '@/components/charge/waterMiniNightRightNav'
  export default {
    name: "waterMiniNight",
    components: {
      waterMiniNightRightNav
    }
  }
</script>

<style scoped>

</style>
