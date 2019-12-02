<template>
  <div class="right" style="padding-left:0.5rem;padding-top:.2rem ">
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
    <div class="right-content">
      <!--四个装饰角-->
      <div class="top-horn-l"></div>
      <div class="top-horn-r"></div>
      <div class="bottom-horn-l"></div>
      <div class="bottom-horn-r"></div>
      <!--四个装饰角//-->
      <!--右上角按钮-->
      <div class="tablecont-box" >
        <div class="title" style="width: 14.5rem">
          <div class="input-group-btn"></div>
          <div class="input-group-btn-right" style="margin-top: .05rem">
            <a href="#" @click="routerlogin"><span>返回</span></a>
          </div>
        </div>

        <div style="position: absolute;width:100%;height:100%;margin-left: 1rem;">
          <div class="m-box box-form">
            <div class="sx-yb">找回密码</div>
            <div>
              <el-scrollbar style="height: 4.4rem;padding-right: .3rem">
                <el-form status-icon="true" label-position="top" :model="model" :rules="rules" ref="ruleForm" label-width="100px">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="model.email"></el-input>
                    <a class="form_button" @click="gsendVerificationCode()">发送验证码</a>
                  </el-form-item>
                  <el-form-item label="验证码" prop="verification">
                    <el-input v-model="model.verification"></el-input>
                  </el-form-item> 
                </el-form>
              </el-scrollbar>
            </div>
            <!-- <span class="from_remark">备注: 角色下拉框可复选, 用户，邮箱，角色必填</span> -->
            <div class="form_button_group">
              <button class="form_button" @click="submitForm()">找回</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {changePassWord, sendVerificationCode, fuzzyQueryRole, initPassword,getLoginfo} from '@/api/auth'
  import { getToken, setToken, removeToken, setstore, getstore } from '@/utils/auth'
  import router from '@/router'
  import md5 from 'js-md5';
    export default {
        name: "lostPassWord",
        mounted() {
          if(this.$route.params.type === 'update') {
            this.pageType = 'update'
            this.model = JSON.parse(this.$route.params.item)
            this.model.password = '***'
            this.model.password2 = '***'
          } else {

          }
          // this.loadRoleOption()
        },
        data() {
            return {
            /*email (string, optional): 邮箱 ,
              key (string, optional): 用户编号 ,
              newPassword (string, optional): 新密码（要修改的密码） ,
              password (string, optional): 密码 ,
              phone (string, optional): 电话 ,
              roleId (string, optional): 用户所属角色 ,
              sex (string, optional): 性别 ,
              state (string, optional): 用户状态 ,
              userName (string, optional): 用户名*/
              pageType: 'add', //当前页面状态
              roleOptions: [],
              model: {
                userName: '',
                email: '',
                phone: '',
                password: '',
                password2: '',
                sex: '1',
                roleId: '',
                state: '1'
              },
              rules: {
                verification: [
                  { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
                email: [
                  { required: true, message: '请输入邮箱', trigger: 'blur' },
                  { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
              }
            }
        },
        methods: {
          routerlogin() {
            router.push({
              name: 'login'
            })
          },
          loadRoleOption(){
            fuzzyQueryRole({}).then(r=>{
              this.roleOptions = r.data.list
            })
          },
          gsendVerificationCode(){
            if(!this.model.email){
              this.$message({
                message: '请输入邮箱',
                type: 'warning'
              });
            } else {
              var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
              if(!myreg.test(this.model.email)){
                this.$message({
                  message: '请输入正确的邮箱格式',
                  type: 'warning'
                })
              }else{
                sendVerificationCode({ email: this.model.email}).then(r => {
                  this.$store.dispatch('app/closeLoading')
                  this.$message({
                    message: '发送成功',
                    type: 'success'
                  });
                })
              }
            }
          },
          submitForm() {
            this.$store.dispatch('app/openLoading')
            this.$refs['ruleForm'].validate((valid) => {
              if (valid) {
                let fromData = {}
                fromData.user_Account = this.model.email
                fromData.verification = this.model.verification
                initPassword(fromData).then(res => {
                  this.$message({
                    message: res.msg,
                    type: 'success'
                  });
                  setToken(res.data.ticket)
                  getLoginfo({ticket: res.data.ticket}).then(r=>{
                    let res =JSON.parse(r.data)
                    this.$store.dispatch('navIndex/RECORDINITS')
                    let pows = res.role[0].menuPerms.split(',')
                    if(pows.length === 0){
                      Message({
                        message: '没有权限',
                        type: 'warning',
                        duration: 5 * 1000
                      })
                      return false
                    }
                    if(pows[0].indexOf('CHARGE') !== -1) {
                      for(let u = 0;u < pows.length; u++){
                        this.$store.dispatch('user/GETUSERCENTER',{pows:pows,u:u})
                        this.$store.dispatch('user/GETWMA',{pows:pows,u:u})
                      }
                      this.$store.dispatch('user/LOGINCHARGE',pows)
                    } else if(pows[0].indexOf('user/USERCENTER') !== -1){
                      for(let u = 0;u < pows.length; u++){
                        this.$store.dispatch('user/GETCHARGE',{pows:pows,u:u})
                        this.$store.dispatch('user/GETWMA',{pows:pows,u:u})
                      }
                      this.$store.dispatch('user/LOGINUSERCENTER',pows)
                      this.$store.dispatch('app/closeLoading')
                    }else if(pows[0].indexOf('WMA') !== -1){
                      for(let u = 0;u < pows.length; u++){
                        this.$store.dispatch('user/GETCHARGE',{pows:pows,u:u})
                        this.$store.dispatch('user/GETUSERCENTER',{pows:pows,u:u})
                      }
                      this.$store.dispatch('user/LOGINWMA',pows)
                      this.$store.dispatch('app/closeLoading')
                    }else if(pows[0].indexOf('AUTH') !== -1){
                      for(let u = 0;u < pows.length; u++){
                        this.$store.dispatch('user/GETWMA',{pows:pows,u:u})
                        this.$store.dispatch('user/GETCHARGE',{pows:pows,u:u})
                        this.$store.dispatch('user/GETUSERCENTER',{pows:pows,u:u})
                      }
                      this.$store.dispatch('user/LOGINAUTH',pows)
                      this.$store.dispatch('app/closeLoading')
                    }
                  })
                })
              } else {
                this.$store.dispatch('app/closeLoading')
                return false;
              }
            });
          }
        }
    }
</script>

<style scoped>
  .m-box {
    position: absolute;
    box-sizing: border-box;
    padding: .5rem 1rem .5rem 1rem;
    width: 10rem;
    height: 6rem;
    left: 2.3rem;
    top: 0;
    background: url(../assets/img/monitorbg.png) no-repeat;
    background-size: 100% 100%;
    z-index: 1;
  }
  .m-box [class^="sx-"] {
    margin-left: -1rem;
    text-align: center;
    font-size: 0.48rem;
    position: absolute;
    width: 100%;
    top: -0.15rem;
    line-height: 0.48rem;
    height: 0.48rem;
    font-weight: bold;
    font-family: "AlpinGothicCGNo1";
    background: linear-gradient(to bottom, #68f9d4, #01bd8d);
    -webkit-background-clip: text;
    color: transparent;
  }

  .m-box .input-group {
    padding: 0 0.3rem;
    padding-left: 0.8rem;
    padding-top: 1rem;
  }
  .m-box .input-group .col-12 {
    display: table;
    padding-bottom: 0.2rem;
  }
  .m-box .input-group .label-text {
    width: 1.5rem;
    padding-left: 0.2rem;
    font-size: 0.18rem;
  }
  .m-box .input-group .form-control {
    border: 0;
    border-radius: 0;
    padding-bottom: 2px;
    padding-top: 2px;
  }
  .m-box .input-group .lable-control {
    border: 0;
    border-radius: 0;
    background-color: transparent;
    box-sizing: border-box;
    padding: 0.2rem 0.5rem;
    font-size: 0.2rem;

    color: #00ffff;
    width: 2rem;
    vertical-align: middle;
  }

  .m-box .number-box {
    display: table-cell;
    width: 0.5rem;
    vertical-align: middle;
  }
  .m-box .label-number {
    display: inline-block;
    width: 0.34rem;
    height: 0.34rem;
    text-align: center;
    line-height: 0.34rem;
    font-size: 0.2rem;
    color: #ffffff;

    background: linear-gradient(to right, #48adf4, #39a0ec);
    border-radius: 0.1rem;
  }
</style>
