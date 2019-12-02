<template>
  <!--四个装饰角//-->
  <router-view></router-view>
</template>


<script>
import userHeader from "../../components/userCenterHeader";
export default {
  name: "Home",
  components: {
    userHeader
  },
  data() {
    return {
      menuIndex: 2
    };
  },
  mounted() {
    var userNo = this.$route.params.userNo;
  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>
<style scoped>
  
</style>