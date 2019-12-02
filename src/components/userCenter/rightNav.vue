<template>
  <!--右侧page-->
  <ul class="list-page">
    <li :class="{'active':menuIndex==1}">
      <router-link :to="{name:'detail_p1_1',params:$route.params}">Page 01</router-link>
    </li>
    <li :class="{'active':menuIndex==2}">
      <router-link :to="{name:'detail_p2_1',params:$route.params}">Page 02</router-link>
    </li>
    <li :class="{'active':menuIndex==3}">
      <router-link :to="{name:'detail_p3_1',params:$route.params}">Page 03</router-link>
    </li>
    <li :class="{'active':menuIndex==4}">
      <router-link :to="{name:'detail_p4_1',params:$route.params}">Page 04</router-link>
    </li>
    <li :class="{'active':menuIndex==5}">
      <router-link :to="{name:'detail_p5_1',params:$route.params}">Page 05</router-link>
    </li>
    <li :class="{'end':true,'active':menuIndex==6}">
      <router-link :to="{name:'detail_p6_1',params:$route.params}">Page 06</router-link>
    </li>
    <a href="javascript:void(0)" @click="pageDown" class="down"></a>
  </ul>
  <!--右侧page//-->
</template>
<script>
export default {
  props: {
    menuIndex: {
      default: 1
    }
  },
  data() {
   return{ 
     userNo:''
     }
  },
  mounted(){
    this.userNo=this.$route.params.userNo;
  },
  methods: {
    pageDown: function() {
      let pageIndex = this.menuIndex + 1;
      pageIndex = pageIndex > 6 ? 1 : pageIndex;
      let routeName = "detail_p" + pageIndex + "_1";
      this.$router.push({ name: routeName,params:this.$route.params });
    }
  }
};
</script>