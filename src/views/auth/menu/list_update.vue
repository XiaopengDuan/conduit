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
          菜单管理
          <div class="input-group-btn">
            <!--            <button type="button" class="btn choose-time">123</button>-->
          </div>
          <div class="input-group-btn-right" style="margin-top: .05rem">
            <a href="#" @click="$router.go(-1)"><span>返回</span></a>
          </div>
        </div>

        <div style="position: absolute;width:100%;height:100%;">
          <div class="m-box box-form">
            <div class="sx-yb">{{type==='add'?'添加菜单':'修改菜单'}}</div>
            <div>
              <el-scrollbar style="height: 4.35rem;padding-right: .3rem">
                <el-form size="mini" status-icon="true" label-position="left" :model="model" :rules="rules" ref="form" label-width="100px">
                  <el-form-item label="父级菜单" prop="parentMenu">
                    <el-cascader
                      clearable="true"
                      v-model="model.parentMenu"
                      :options="options"
                      :props="propsConfig"
                      :change-on-select="true"
                      @change="handleChange">
                    </el-cascader>
                  </el-form-item>
                  <el-form-item label="菜单名称" prop="menuName">
                    <el-input v-model="model.menuName"></el-input>
                  </el-form-item>
                  <el-form-item label="菜单标识" prop="menuCode">
                    <el-input v-model="model.menuCode"></el-input>
                  </el-form-item>
                  <el-form-item label="菜单类型" prop="menuType">
                  <!--          <input class="form_input" v-model="model.menuType"/>-->
                  <span style="margin-left: .2rem">
                    <el-radio v-model="model.menuType" label="1">菜单</el-radio>
                    <el-radio v-model="model.menuType" label="2">按钮</el-radio>
                  </span>
                </el-form-item>
                  <el-form-item label="页面url" prop="pageUrl">
                    <el-input v-model="model.pageUrl"></el-input>
                  </el-form-item>
                  <el-form-item label="图标url" prop="iconUrl">
                    <el-input v-model="model.iconUrl"></el-input>
                  </el-form-item>
                  <el-form-item label="备注" prop="remark">
                    <el-input  v-model="model.remark"></el-input>
                  </el-form-item>
                  <!--<el-form-item label="是否启用" prop="flag">
                    <div style="margin-left: .2rem">
                      <el-radio v-model="model.flag" label="1">启用</el-radio>
                      <el-radio v-model="model.flag" label="2">禁用</el-radio>
                    </div>
                  </el-form-item>-->
                </el-form>
              </el-scrollbar>
            </div>
            <span class="from_remark">备注: 父级菜单可不选，默认为顶级</span>
            <div class="form_button_group">
              <button class="form_button" @click="submitForm()">{{this.type === 'update'?'修改':'保存'}}</button>
              <button v-if="this.type === 'add'" class="form_button" @click="submitForm('back')">{{this.type === 'add'?'保存并返回':''}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { menuTree, addOrModifyMenu } from '@/api/auth'
    export default {
        name: "authUserListUpdate",
        mounted() {
          this.loadTreeData()
        },
        data() {
            return {
              model: {
                parentMenu: '',
                menuCode: '',
                menuName: '',
                menuType: '',
                pageUrl: '',
                remark: ''
              },
              type: 'add',
              options: [],
              propsConfig: {
                children: 'subMenuList',
                label: 'menuName',
                value: 'menuCode',
                emitPath: false
              },
              rules: {
                menuName: [
                  { required: true, message: '必填', trigger: 'blur' },
                ],
                menuType: [
                  { required: true, message: '必填', trigger: 'blur' },
                ],
                菜单标识: [
                  { required: true, message: '必填', trigger: 'blur' },
                ],
                pageUrl: [
                  { required: true, message: '必填', trigger: 'blur' },
                ],
              }
            }
        },
        methods: {
        
          loadTreeData(){
            this.$store.dispatch('app/openLoading')
            menuTree({
              'rootCode': 'root'
            }).then(r=>{
              this.$store.dispatch('app/closeLoading')
              this.options = r.data.root
              this.loadDate()
            })
          },
          loadTree(){
            this.$store.dispatch('app/openLoading')
            menuTree({
              'menuCode': 'root'
            }).then(r=>{
              this.$store.dispatch('app/closeLoading')
              this.options = r.data.root
            })
          },
          loadDate(){
            if(this.$route.params.type === 'update') {
              this.type = 'update'
              this.model = JSON.parse(this.$route.params.item)
            } else {

            }
          },
          handleChange(){

          },
          submitForm(isback){
            // console.log(this.model)
            this.$refs['form'].validate((valid) => {
              if (valid) {
                this.$store.dispatch('app/openLoading')
                let subFrom = Object.assign({},this.model)
                delete subFrom.checked
                if(!subFrom.parentMenu && this.type==='add'){
                  subFrom.parentMenu = 'root'
                }
                addOrModifyMenu(subFrom).then(r=>{
                  if(r.code === 0||r.code === 200){
                    this.$message({ // r.msg
                      message: this.type==='add'?'新增成功':'修改成功',
                      type: 'success'
                    });
                    this.$refs['form'].resetFields()
                    setTimeout(() =>{
                      this.$store.dispatch('app/closeLoading')
                      if(isback){
                        this.$router.push({
                          name: 'authMenuList',
                        })
                      }
                    },1000);
                  } else {
                    this.$store.dispatch('app/closeLoading')
                    this.$message({
                      message: r.msg,
                      type: 'error'
                    });
                  }
                })
              } else {
                // console.log('error submit!!');
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
