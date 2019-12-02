<template>
  <div class="right right3">
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
          新增角色
<!--          <span style="color: greenyellow">{{transferData}}</span>-->
          <div class="input-group-btn">
            <!--            <button type="button" class="btn choose-time">123</button>-->
          </div>
          <div class="input-group-btn-right" >
            <a href="#" @click="$router.go(-1);"><span>返回</span></a>
<!--            <a href="#" @click="test()"><span>返回</span></a>-->
          </div>
          <div class="input-group-btn-right">
            <a href="#" @click="submitData()"><span>{{type==='add'?'保存':'修改'}}</span></a>
          </div>
        </div>
        <div style="margin: 0 auto;width: 11rem;">
          <el-input style="margin-bottom: .1rem" v-model="model.roleName" placeholder="请填写角色名称"></el-input>
          <srTransfer style="margin-top: .1rem" ref="transfer" v-model="transferData" :options="options"></srTransfer>
        </div>
        <div style="display: flex;justify-content: center;margin: .4rem 0 0">
          <el-radio v-model="model.state" label="1">启用</el-radio>
          <el-radio v-model="model.state" label="0">禁用</el-radio>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import srTransfer from '@/components/element/sr-transfer'
  import { menuTree, addOrModifyRole } from '@/api/auth'

    export default {
        name: "authRoleList",
        mounted() {
          this.loadTreeData()
        },
        components:{
          srTransfer
        },
        data() {
            return {
              model: {
                roleName: '',
                state: '1'
              },
              transferData: '',
              type: 'add',
              options: [],
              rules: {
                roleName: [
                  { required: true, message: '请输入角色名称', trigger: 'blur' },
                ]
              }
            }
        },
        methods: {
          test(){
            this.transferData = ''
          },
          loadTreeData(){
            this.$store.dispatch('app/openLoading')
            menuTree({
              'rootCode': 'root'
            }).then(r=>{
              this.$store.dispatch('app/closeLoading')
              this.options = r.data.root
              this.loadData()
            })
          },
          loadData(){
            if(this.$route.params.type === 'update') {
              this.type = 'update'
              this.model = JSON.parse(this.$route.params.item)
              this.transferData = this.model.menuPerms.split(',')
            } else {
            }
          },
          submitData(){
            if(!this.model.roleName|| !this.transferData){
              this.$message({
                type: 'warning',
                message: '请输入角色名和菜单权限'
              })
              return
            }
            this.$store.dispatch('app/openLoading')
            let fromData = Object.assign({}, this.model)
            fromData.menuPerms = this.transferData.join(',');
            addOrModifyRole(fromData).then(r => {

              this.$message({
                message: r.msg,
                type: 'success'
              });
              setTimeout(() =>{
                this.$store.dispatch('app/closeLoading')
                this.$router.push({
                  name: 'authRoleList',
                })
              },1000);
            })
          }
        }
    }
</script>

<style scoped>
  .right3 .right-content{
    padding: 0!important
  }
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
