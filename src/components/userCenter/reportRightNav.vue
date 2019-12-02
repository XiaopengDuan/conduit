<template>
  <ul class="list-page">
    <li :class="{'active':menuIndex==1}">
      <router-link @click.native="menuIndex=1"  :to="{name:'reportDetail_p1',params:$route.params}">Page 01</router-link>
    </li>
    <li :class="{'active':menuIndex==2}">
      <router-link @click.native="menuIndex=2"  :to="{name:'reportDetail_p2',params:$route.params}">Page 02</router-link>
    </li>
    <li :class="{'end':true,'active':menuIndex==3}">
      <router-link @click.native="menuIndex=3" :to="{name:'reportDetail_p3',params:$route.params}">Page 03</router-link>
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
        pageIndex = pageIndex > 3 ? 1 : pageIndex;
        this.menuIndex = pageIndex
        let routeName = "reportDetail_p" + pageIndex ;
        this.$router.push({ name: routeName,params:this.$route.params });
      }
    }
  }
</script>

<style scoped>

</style>
