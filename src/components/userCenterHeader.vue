<template>
  <!--顶部-->
    <div class="top">
      <div class="logo">
        <img alt src="../assets/img/logo.png">
      </div>
      <div class="title">
<!--        <img src="../assets/img/title.png">-->
        <img v-if="$route.fullPath.startsWith('/charge')" src="../assets/img/yy_title.png">
        <img v-else-if="$route.fullPath.startsWith('/wma')" src="../assets/img/wmatitle.png">
        <img v-else-if="$route.fullPath.startsWith('/auth')" src="../assets/img/qxsz_title.png">
        <img v-else src="../assets/img/title.png">
        
      </div>
        <router-link v-if="$store.state.user.menuPerms.includes('WMA')" :to="$store.state.user.wmaindex" :class="[$route.fullPath.startsWith('/wma')&&'btn-active','btn-top btn-top-r1']"> 远传水表数据分析 </router-link>
        <router-link v-if="$store.state.user.menuPerms.includes('USERCENTER')" :to="$store.state.user.userCenterindex" :class="[isroute && 'btn-active','btn-top btn-top-l2']"> 用户大数据 </router-link>
        <router-link v-if="$store.state.user.menuPerms.includes('CHARGE')" :to="$store.state.user.chargeindex" :class="[$route.fullPath.startsWith('/charge')&&'btn-active','btn-top btn-top-l']"> 营业大数据 </router-link>
      <div class="admin-box dropdown">
<!--        <router-link to="/">-->
        <a style="cursor: pointer">
          <img src="../assets/img/icon-admin.png">
          <span >{{userName}}</span>
        </a>
        
        <div class="dropdown-content" style="z-index:200">
          <a @click="toAuth()" v-if="$store.state.user.menuPerms.includes('AUTH')"><i class="el-icon-s-custom"></i> 权限管理</a>
          <a @click="toChangePass()"><i class="el-icon-edit-outline"></i> 修改密码</a>
          <a @click="toLogin()"> <i class="el-icon-s-promotion"></i>退出登录</a>
        </div>
<!--        </router-link>-->
      </div>
      <transition>
      <div v-if="$store.state.app.loading" class='popContainer'>
        <div class="loader">
          <div class="face">
            <div class="circle"></div>
          </div>
          <div class="face">
            <div class="circle"></div>
          </div>
           <span style="color: white;font-size: .1rem">loading</span>
        </div>
      </div>
      </transition>
       <!-- <div v-if="$store.state.app.exitZhengshu"  class="tsDiv">
        <span>您需要安装<a href="../../static/credential.rar">辽阳水司大数据分析平台根证书</a>，以便于您能更安全的访问。请点击链接下载。谢谢配合! </span>
      </div> -->
    </div>
    <!--顶部//-->
</template>

<script>
import { getstore, setstore } from '@/utils/auth'
export default {
  name: "userCenterHeader",
  data(){
    return {
      isroute: false,
      userName: getstore('data')?JSON.parse(getstore('data')).user.userName:''
    }
  },
  mounted() {
    if(this.$route.fullPath.startsWith('/charge') || this.$route.fullPath.startsWith('/wma') || this.$route.fullPath.startsWith('/auth')){
      this.isroute = false
      // console.log(this.isroute)
    } else {
      this.isroute = true
      // console.log(this.isroute)
    }
  },
  methods:{
    //首页跳转重置选项
    toLogin(){
      // 清除用户信息
      this.$store.dispatch('user/logout')
      // this.$store.dispatch('user/restRole')
      // setstore('menuIndex', 1)
      // setstore('menuIndex2',1)
      // setstore('meterdata',1)
    },
    toAuth(){
      this.$router.push({
        name: this.$store.state.user.authindex
      })
      setstore('menuIndex', 1)
      setstore('menuIndex2',1)
      setstore('meterdata',1)
    },
    toChangePass(){
      // changePassworauthindexd
      this.$router.push({
        name: 'changePassword'  
      })
      setstore('menuIndex', 1)
      setstore('menuIndex2',1)
      setstore('meterdata',1)
    }
  }
};
</script>
<style scoped>
  .v-enter,
  .v-leave-to{
    opacity: 0;
    /*transform: translateX(100px);*/
  }
  .v-enter-active,
  .v-leave-active{
    transition: all 0.8s ease;
  }
  
</style>

