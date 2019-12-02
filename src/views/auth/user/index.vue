<template>
  <div class="right">
    <div class="right-content">
      <!--四个装饰角-->
      <div class="top-horn-l"></div>
      <div class="top-horn-r"></div>
      <div class="bottom-horn-l"></div>
      <div class="bottom-horn-r"></div>
      <!--四个装饰角//-->
      <!--右上角按钮-->
      <div class="tablecont-box">
        <div class="title" style="width: 14.5rem">
          用户管理
          <div class="input-group-btn">
<!--            <button type="button" class="btn choose-time">123</button>-->
          </div>
          <div class="input-group-btn-right" style="margin-top: .05rem">
            <a href="#" @click="$router.go(-1)"><span>返回</span></a>
          </div>
        </div>

        <div style="position: absolute;width:100%;height:100%;">
          <div class="m-box box-form">
            <div class="sx-yb">{{pageType==='add'?'添加用户':'修改用户'}}</div>
            <div>
            <el-scrollbar style="height: 4.4rem;padding-right: .3rem">
            <el-form size="mini" status-icon="true" label-position="left" :model="model" :rules="rules" ref="ruleForm" label-width="100px">
              <el-form-item label="用户名" prop="userName">
                <el-input v-model="model.userName"></el-input>
              </el-form-item>
              <el-form-item label="用户账号" prop="userAccount">
                <el-input v-model="model.userAccount"></el-input>
              </el-form-item>
              <el-form-item v-if="pageType==='add'" label="密码" prop="password">
                <el-input type="password" :disabled="pageType==='update'" v-model="model.password"></el-input>
              </el-form-item>
              <el-form-item v-if="pageType==='add'" label="确认密码" prop="password2">
                <el-input type="password" :disabled="pageType==='update'" v-model="model.password2"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="model.email"></el-input>
              </el-form-item>
              <!-- <el-form-item label="验证码" prop="verificationCode">
                <el-input v-model="model.verificationCode"></el-input>
                <button class="form_button" @click="gsendVerificationCode()">发送验证码</button>
              </el-form-item> -->
              <el-form-item label="电话" prop="phone">
                <el-input v-model="model.phone"></el-input>
              </el-form-item>
              <el-form-item label="所属角色" prop="roleId">
                <el-select v-model="model.roleId" placeholder="请选择">
                  <el-option
                    v-for="item in roleOptions"
                    :key="item.key"
                    :label="item.roleName"
                    :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <el-radio v-model="model.sex" label="1">男</el-radio>
                <el-radio v-model="model.sex" label="2">女</el-radio>
              </el-form-item>
               <el-form-item label="">
                <el-radio v-model="model.state" label="1">启用</el-radio>
                <el-radio v-model="model.state" label="0">禁用</el-radio>
              </el-form-item>
            </el-form>
            </el-scrollbar>
            </div>
            <span class="from_remark">备注: 角色下拉框可复选, 用户，邮箱，角色必填</span> 
            <div class="form_button_group">
              <button class="form_button" v-if="pageType==='add'" @click="submitForm()">保存</button>
              <button class="form_button" @click="submitForm('back')">{{pageType==='add'?'保存并返回':'修改'}}</button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getstore, setstore } from '@/utils/auth'
  import {addOrModifyUser, sendVerificationCode, fuzzyQueryRole} from '@/api/auth'
  import md5 from 'js-md5';

    export default {
        name: "index",
        mounted() {
          if(this.$route.params.type === 'update') {
            this.pageType = 'update'
            this.model = JSON.parse(this.$route.params.item)
            if(JSON.parse(this.$route.params.item)){
              this.vif = false
            }else{
              this.vif = true
            }
            // console.log(this.vif)
            this.model.password = '***'
            this.model.password2 = '***'
            this.loadRoleOption('update')
          } else {
            this.loadRoleOption('add')
          }
        },
        data() {
            var validatePass2 = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.model.password) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            }
            return {
              vif: true,
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
                userName: [
                  { required: true, message: '请输入用户名称', trigger: 'blur' }
                ],
                email:[
                  { required: true, message: '请输入邮箱', trigger: 'blur' },
                  { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                password: [
                  { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                password2: [
                  { required: true, message: '请再次输入密码', trigger: 'blur' },
                  { validator: validatePass2, trigger: 'blur' }
                ],
                roleId: [
                  { required: true, message: '请输入角色', trigger: 'blur' },
                ]
              }
            }
        },
        methods: {
          loadRoleOption(e){
            var data = {
              state: '1'
            }
            var list = []
            fuzzyQueryRole(data).then(r=>{
              this.roleOptions = r.data.list
              this.roleOptions.forEach(r=>{
                list.push(r.key)
              })
              if(list.indexOf(this.model.roleId) === -1) {
                this.model.roleId = ''
              }
            })
          },
          gsendVerificationCode(){
            if(!this.model.email || !this.model.userName){
              this.$message({
                message: '请输入邮箱和用户名',
                type: 'warning'
              });
            } else {
              this.$store.dispatch('app/openLoading')
              sendVerificationCode({userName: this.model.userName, email: this.model.email}).then(r => {
                this.$store.dispatch('app/closeLoading')
                this.$message({
                  message: '发送成功',
                  type: 'success'
                });
              })
            }
          },
          submitForm(back) {
            this.$refs['ruleForm'].validate((valid) => {
              if (valid) {
                this.$store.dispatch('app/openLoading')
                let fromData = Object.assign({}, this.model)
                fromData.password = md5(fromData.password)
                fromData.password2 = md5(fromData.password2)
                addOrModifyUser(fromData).then(r => {
                  this.$store.dispatch('app/closeLoading')
                  this.$message({
                    message: this.pageType==='add'?'添加成功':'修改成功',
                    type: 'success'
                  });
                  if (getstore('userAccount') && fromData.userAccount === JSON.parse(getstore('userAccount')) && JSON.parse(this.$route.params.item).roleId !== this.model.roleId) {
                    // 清除用户信息
                    this.$store.dispatch('user/logout')
                    this.$router.push({
                      name: 'login'
                    })
                    setstore('menuIndex', 1)
                    setstore('menuIndex2',1)
                    setstore('meterdata',1)
                  }
                  if(back === "back"){
                    this.$router.go(-1)
                  }
                })
              } else {
                this.$store.dispatch('app/closeLoading')
                return false;
              }
            });
          },
          
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
    background: url(../../../assets/img/monitorbg.png) no-repeat;
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
