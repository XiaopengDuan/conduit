<template>
  <div style="height: 100%">
    <div class="right" style="height: 100%">
      <div class="right-content" style="height: 100%">
        <!--四个装饰角-->
        <div class="top-horn-l"></div>
        <div class="top-horn-r"></div>
        <div class="bottom-horn-l"></div>
        <div class="bottom-horn-r"></div>
        <a href="#" @click="$router.go(-1)" class="btn-back"><span>返回上一级</span></a>
        <div class="tablecont-box" style="justify-content: space-between;height: 100%;display: flex;align-items: center;">
          <router-view></router-view>
          <waterRightNav  style="position: initial;"></waterRightNav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import waterRightNav from '@/components/charge/waterRightNav'
    export default {
        name: "waterDailyPeak",
        components: {
          waterRightNav
        }
    }
</script>

<style scoped>

</style>
