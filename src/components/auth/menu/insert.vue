<template>
    <div  class="full form_type_table">
      <el-form label-position="center" :rules="rules" ref="form" :model="model" label-width="1.8rem">
        <el-form-item label="父菜单" prop="parentMenu">
          <el-cascader
                      class="noBorder"
                      :disabled="type!=='add'"
                      clearable="true"
                      v-model="model.parentMenu"
                      :options="options"
                      :props="propsConfig"
                      :change-on-select="true"
                      @change="handleChange">
          </el-cascader>
          <!-- <input readonly class="form_input" v-model="model.parentMenLable" placeholder="点击左侧菜单项选择"/> -->
        </el-form-item>
        <el-form-item label="菜单标识" prop="menuCode">
          <input :readonly="type==='wait'" class="form_input" v-model="model.menuCode"/>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <input :readonly="type==='wait'" class="form_input" v-model="model.menuName"/>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
<!--          <input class="form_input" v-model="model.menuType"/>-->
          <div style="margin-left: .2rem">
            <el-radio :readonly="type==='wait'" v-model="model.menuType" label="1">菜单</el-radio>
            <el-radio :readonly="type==='wait'" v-model="model.menuType" label="2">按钮</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="页面url" prop="pageUrl">
          <input :readonly="type==='wait'" class="form_input" v-model="model.pageUrl"/>
        </el-form-item>
        <el-form-item label="图标url" prop="iconUrl">
          <input :readonly="type==='wait'" class="form_input" v-model="model.iconUrl"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <input :readonly="type==='wait'" class="form_input" v-model="model.remark"/>
        </el-form-item>
        <!--<el-form-item label="是否启用" prop="flag">
          <div style="margin-left: .2rem">
            <el-radio v-model="model.flag" label="1">启用</el-radio>
            <el-radio v-model="model.flag" label="2">禁用</el-radio>
          </div>
        </el-form-item>-->
      </el-form>
      <div class="form_button_group">
       <button v-if="type==='add'" class="form_button" @click="submitForm()">保存</button>
       <button v-if="type==='update'" class="form_button" @click="submitForm()">修改</button>
       <!-- <button class="form_button" @click="goback()">返回</button> -->
      </div>
    </div>
</template>

<script>
  import { menuTree,addOrModifyMenu } from '@/api/auth'
    export default {
        name: "insert",
        mounted() {
          this.loadTreeData()
        },
        props:{
          restData: {
            type: Function
          }
        },
        data() {
            return {
              parentMenuCode: '',
              model: {
                parentMenLable: '',
                menuCode: '',
                menuName: '',
                menuType: '',
                pageUrl: '',
                remark: '',
                parentMenu: ''
              },
              propsConfig: {
                children: 'subMenuList',
                label: 'menuName',
                value: 'menuCode',
                emitPath: false
              },
              rules: {
                menuCode: [
                  {required: true, message: '请输入菜单编号', trigger: 'blur'},
                ],
                menuName: [
                  {required: true, message: '请输入菜单名称', trigger: 'blur'},
                ],
                menuType: [
                  {required: true, message: '请输入菜单类型', trigger: 'blur'},
                ],
                pageUrl: [
                  {required: true, message: '请输入页面url', trigger: 'blur'},
                ]
              },
              type: 'add',
              options: []
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
              // this.loadDate()
            })
          },
          submitForm() {
            let parentMenuCode = this.parentMenuCode?this.parentMenuCode:'root' //如果没有指定父级则设置为根菜单
            if(parentMenuCode === this.model.menuCode && this.type === 'add'){
              this.$message({
                message: '菜单标识和父级菜单一致',
                type: 'warning'
              });
              return
            }
            this.$refs['form'].validate((valid) => {
              if (valid) {
                this.$store.dispatch('app/openLoading')

                let subFrom = Object.assign({},this.model)
                if (this.type === 'add') delete subFrom.key // 如果时新增删除key
                if(!subFrom.parentMenu)subFrom.parentMenu='root' // 如果未选择父级菜单默认为root

                // 去除接口无用属性
                delete subFrom.parentMenLable
                delete subFrom.subMenuList

                addOrModifyMenu(subFrom).then(r=>{
                  this.$store.dispatch('app/closeLoading')
                  if(r.code === 0 || r.code === 200){
                    // console.log(r)
                    this.$message({
                      message: this.type === 'add'?'新增成功':'修改成功',
                      type: 'success'
                    });

                    // 获取本条数据key值
                    let key = subFrom.key?subFrom.key:''
                    if(r.msg && r.msg.indexOf(':')!==-1){
                      key = r.msg.substring(r.msg.indexOf(':')+1, r.msg.length)
                    }
                                                           
                    this.type = 'wait'
                    // this.$refs['form'].resetFields()
                    this.loadTreeData() //新增修改成功后刷新树形数据
                    this.$props.restData('wait', key) //新增修改成功后刷新父组件树形数据
                  } else {
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
          },
          resetForm() {
            this.$refs['form'].resetFields();
          },
          goback() {
            this.$router.go(-1)
          },
          setModelAndType(model, type){
            this.type = type
            if(type === 'add'){
              this.resetForm()
              if(model&&model.parentMenu)this.model.parentMenu = model.parentMenu
            }else if(type === 'update'){
              // this.model = Object.assign({},model)
              // this.$set(this.model,'parentMenLable', model.menuName)
              this.type = 'update'
            }
            //

          },
          setModel(model){
            this.model = Object.assign({},model)
            // console.log('model', model)
            this.$set(this.model,'parentMenLable', model.menuName)
          },
          setParentMenuCodeAndLable(data){
            this.model.parentMenu = data.menuCode
          }
        }
    }
</script>

<style scoped>
  .noBorder .el-input.is-disabled input{
    background-color: rgba(1, 51, 102, 0.1) !important;
    border: 0px solid #409EFF !important;
    opacity: 0.98;
  }
</style>
