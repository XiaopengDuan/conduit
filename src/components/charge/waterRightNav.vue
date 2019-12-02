<template>
  <ul class="list-page">
    <li :class="{'active':$route.fullPath.startsWith('/charge/water/waterDailyPeak/water/waterMiniNightPage1')}">
      <router-link @click.native="menuIndex=1"  :to="{name:'waterDailyPeakPage1',params:$route.params}">Page 01</router-link>
    </li>
    <li :class="{'end':true,'active':$route.fullPath.startsWith('/charge/water/waterDailyPeak/water/waterMiniNightPage2')}">
      <router-link @click.native="menuIndex=2" :to="{name:'waterDailyPeakPage2',params:$route.params}">Page 02</router-link>
    </li>
    <a href="javascript:void(0)" @click="pageDown" class="down"></a>
  </ul>
</template>

<script>
    export default {
        props: {
          menuIndex: {
            default: 1
          }
        },
        name: "waterRightNav",
        data(){
          return {
            menuIndex: 1
          }
        },
        mounted(){
          // this.$router.push({
          //   name: "waterDailyPeakPage1",
          //   params: {}
          // })
        },
        methods: {
          pageDown: function() {
            let pageIndex = this.menuIndex + 1;
            pageIndex = pageIndex > 2 ? 1 : pageIndex;
            this.menuIndex = pageIndex
            let routeName = "waterDailyPeakPage" + pageIndex;
            this.$router.push({ name: routeName,params:this.$route.params });
          }
        }
    }
</script>

<style scoped>

</style>
