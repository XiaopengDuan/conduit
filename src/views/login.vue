<template>
  <div class="login" :style="bgImg">
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
    <el-dialog
      title="验证码"
      :visible.sync="slidedialogVisible"
      style="padding: 15px 20px;"
       width='4.55rem'
      >
      <div class="ly-slide-verify">
         
        <slideVerify
          ref="myVerify"
          :l="42"
          :r="10"
          :w="330"
          :h="100"
          @success="onSuccess"
          @fail="onFail"
          @refresh="onRefresh"
          :slider-text="text"
          ></slideVerify>
      </div>
    </el-dialog>
     
      <div  class="tsDiv" v-if="$store.state.app.exitZhengshu">
        <span>您需要安装<a href="../../static/credential.rar">辽阳水司大数据分析平台根证书</a>，以便于您能更安全的访问。请点击链接下载。谢谢配合! </span>
        <button @click="closeExitZhengshu()" class="tsDivClose">X</button>
      </div>
      <h1>辽阳水司大数据分析平台</h1>
      <div class="login-box" style="margin-top: -1rem">
        <form class="form">
          <div class="form-group dropdown">
            <label for="exampleInputEmail1"><img src="../assets/img/icon_login_user.png" /></label>
            <input @keyup.enter="handleLogin()" type="email" v-model="loginForm.userName" class="form-control" id="exampleInputEmail1" placeholder="请输入账号或者邮箱">
            <div v-if="arr_logininfo.length>0" class="dropdown-content" style="width: 3.5rem;left: .72rem;top: .65rem">
              <a v-for="(value, index) in arr_logininfo" :key="index" @click="updateloginInfo(index)"><i class="el-icon-user"></i>{{value.userName}}</a>
          
            </div>
            <span class="d2"></span>
          </div>
          <div class="form-group password">
            <label for="exampleInputEmail1"><img src="../assets/img/icon_login_password.png" /></label>
            <input @keyup.enter="handleLogin()"  v-model="loginForm.passWord" type="password" class="form-control" id="exampleInputEmail1" placeholder="密码">
          </div>
          <div class="checkbox">
            <label class="pull-left">
              <el-checkbox   v-model="rememberPassword"  class="input">记住密码</el-checkbox>
            </label>
            <a class="pull-right" style="cursor: pointer"  @click="link_lostPassWord">忘记密码</a>
          </div>
          <a href="javaScript: void (0)" class="btn-login" @click="handleLogin"></a>
        </form>
      </div>
    </div>
</template>

<script>
  import defaultImg from '../assets/img/login.jpg'
  import { menuTree } from '../api/auth'
  import { removeAccountInfo, getAccountInfo, setAccountInfo } from '../utils/auth'
  import slideVerify from '@/components/utils/slide-verify'

    export default {
        name: "login",
        mounted() {
          // this.findZhengShu()
          this.getRememberPassword()
          this.displayZhenshu()
        },
        components:{
         slideVerify
        },
        data() {
            return {
              slideflag: false,
              slidedialogVisible: false,
              msg: '',
              text: '滑动左边滑块 完成拼图',
              rememberPassword: false,
              dialogVisible: false,
              passDialogFlag: false,
              bgImg: {
                backgroundImage: "url(" + defaultImg + ")",
                backgroundSize: '100% 100%',
                width: '100%',
                height: '100%',
                padding: 0,
                margin: 0
              },
              loginForm: {
                userName: '',
                passWord: ''
              },
              arr_logininfo: []
            }
        },
        methods: {
          closeExitZhengshu(){
            this.$store.commit('app/SET_EXITZHENGSHU', false)
          },
          displayZhenshu(){
            let that = this
            setTimeout(function(){
              that.$store.commit('app/SET_EXITZHENGSHU', false)
            },10000)
          },
          onSuccess(){
            this.$store.dispatch('app/openLoading')
            this.slidedialogVisible = false
            this.$store.dispatch('user/login', this.loginForm)
              .then(() => {
                this.$refs.myVerify.refresh()
                if(this.rememberPassword){
                  setAccountInfo(this.loginForm)
                } else {
                  removeAccountInfo(this.loginForm)
                }
                let that = this
                setTimeout(function(){
                  that.$store.dispatch('app/closeLoading')
                },300)
              })
              .catch(() => {
                this.$refs.myVerify.refresh()
                this.$store.dispatch('app/closeLoading')
              })
          },
          onFail(){
              this.msg = ''
          },
          onRefresh(){
              this.msg = ''
          },
          link_lostPassWord(){
            this.$router.push({
                path: '/lostPassWord'
            })
          },
          handleClose(){
            this.dialogVisible = false
          },
          findZhengShu(){
            menuTree().then(r=>{}).catch(error=>{   
              // console.log('------->xxoo', error)        
              if(!error.response){
                this.$store.dispatch('app/changeZS', true)
                // this.$store.dispatch('app/changeZS', true)
              } else {
                this.$store.dispatch('app/changeZS', false)
              }
            })
          },
          handleLogin(){
            if(this.validLoginInfo()){
              this.slidedialogVisible = true           
            }
          },
          getRememberPassword(){
            let local_user_arr = getAccountInfo()
            if(local_user_arr.length > 0){
              this.loginForm =  local_user_arr[local_user_arr.length-1]
              this.rememberPassword = true
            } else {
              this.rememberPassword = false
            }
            this.arr_logininfo = local_user_arr
          },
          updateloginInfo(index){
            this.loginForm =  Object.assign({}, this.arr_logininfo[index])
          },
          validLoginInfo(){
            const {userName, passWord} = this.loginForm
            if(!userName){
              this.$message({
                message: '请输入用户名',
                customClass: 'login_warning_message',
                type: 'warning'
              });
            } else if(!passWord){
              this.$message({
                message: '请输入密码',
                customClass: 'login_warning_message',
                type: 'warning'
              });
            } else {
              return true
            }
          }
        }
    }
</script>

<style scoped> 
  .el-dialog__body{
    padding: 15px 20px !important;
  }
  .ly-slide-verify{
  /* margin-left: .6rem */
  }
  .tsDiv{
    padding-top: .4rem;
    text-align: center;
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: .6rem;
    /* background-color: black;
    opacity: 0.7; */
    background:rgba(0,0,0,0.5);
    /* background-color:rgba(0.09, 0.15, 0.20,0.6); */
    color: white;
  }
</style>
