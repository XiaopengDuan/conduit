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
        <div class="title" style="width: 14.5rem">菜单管理
          <div class="input-group-btn-right">
            <button v-if="this.pageType !== 'wait'" class="form_button" @click="query()">返回查询</button>
            <button class="form_button" @click="todelete()">删除</button>
            <!-- <button class="form_button" @click="loadJsonData()">测试导入数据</button> -->
            <button class="form_button" @click="pageTypeUpdate('update')">修改</button>
            <button class="form_button" @click="pageTypeUpdate('add')">新增</button>
            <button class="form_button" @click="link_List()">表格菜单切换</button>
          </div>
        </div>
        <div style="margin-left: .45rem">
          <el-row>
            <el-col :span="6">
              <div style="border: 1px solid #409EFF;background:#013366">
                <div class="scrolllist" id="scrolllist">
                  <el-tree :node-click="handleNodeClick"
                    ref="mytree"
                    node-key="key"
                    id="renderContent"
                    :expand-on-click-node="false"
                    :render-content="renderContent"
                    :default-expand-all="true" 
                    style="min-height: 6rem" 
                    :data="treeData" 
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    highlight-current>
                  </el-tree>
                </div>
              </div>
            </el-col>
            <el-col :span="2">
              &nbsp;
            </el-col>
            <el-col :span="12">
              <menu_insert :restData="loadDate" ref="menu_insert"></menu_insert>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { setstore, getstore } from '@/utils/auth'
  import menu_insert from '@/components/auth/menu/insert'
  import { menuTree, deleteMenu, addOrModifyMenu  } from '@/api/auth'
    export default {
        name: "index",
        components: {
          menu_insert
        },
        created() {
          this.loadDate()  
        },
        mounted() {
          this.$refs.menu_insert.setModelAndType(JSON.parse(this.$route.params.item),this.$route.params.type)
          // window.addEventListener('scroll',this.handleScroll)
          this.$nextTick(() => {
            if(getstore('menuCodeindex')&&this.treeData.indexOf(JSON.parse(getstore('menuCodeindex')))){
              setTimeout(function (){
                let iscurrent = document.getElementsByClassName('is-current')[0].offsetTop
                var height = iscurrent - 100
                document.getElementById('scrolllist').scrollTop = height
              }, 1000)
            }
          })
        },
        data() {
            return {
              nowChecked: null,
              treeData: [],
              defaultProps: {
                children: 'subMenuList',
                label: 'menuName'
              },
              pageType: 'wait',
              isdelete: false,
            }
        },
        methods: {
          query(){
            this.pageType = 'wait'
            this.$refs.menu_insert.setModelAndType({}, this.pageType)
            if(getstore('menuCodeindex')&&this.treeData.indexOf(JSON.parse(getstore('menuCodeindex')))){
              let iscurrent = document.getElementsByClassName('is-current')[0].offsetTop
              var height = iscurrent - 100
              document.getElementById('scrolllist').scrollTop = height
              var lists = this.$refs.mytree.getCurrentNode()
              this.$refs.menu_insert.setModel(lists)
            }
          },
          loadJsonData(){
            let sz = []
            this.insertJsonData(sz)
          },
          insertJsonData(arr){

            arr.forEach((value, index) => {
              let subFrom = Object.assign({}, value)
              delete subFrom.key
              delete subFrom.subMenuList
              addOrModifyMenu(subFrom)
               if(value.subMenuList && value.subMenuList.length>0){
                 this.insertJsonData(value.subMenuList)
               }
            })

          },
          validDelete(){
            // if(this.pageType !== 'update'){
            //   this.$message({
            //     message: '只有在修改模式下才能删除数据',
            //     type: 'warning'
            //   });
            //   return true
            // } else 
            if (!this.nowChecked){
              this.$message({
                message: '请选择要删除的数据',
                type: 'warning'
              });
              return true
            } else {
              return false
            }
          },
          todelete(){
            // 验证是否可以删除
            if(this.validDelete()){return}
            let that = this
            // 提示是否按错
            this.$confirm('删除数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
              }).then(() => {
              that.$store.dispatch('app/openLoading')
              deleteMenu({key: that.nowChecked.key}).then(r =>{
                this.isdelete = true
                this.$message({
                  message: r.msg,
                  type: 'success'
                });
                that.$refs.menu_insert.resetForm()
                that.$store.dispatch('app/closeLoading')
                that.loadDate()
              })
            })
          },
          pageTypeUpdate(type){
            if(type==='add'){
              this.pageType = type
              this.$route.params.type = type
              this.$refs.menu_insert.setModelAndType({parentMenu: this.nowChecked&&this.nowChecked.menuCode?this.nowChecked.menuCode:'root'}, type)
              this.isdelete = true
            } else if(type==='update'){
              if(this.nowChecked){
                this.pageType = type
                this.$route.params.type = type
                this.$refs.menu_insert.setModelAndType({}, type)
                this.isdelete = true
              } else {
                 this.$message({
                  message: '请选择要修改的数据',
                  type: 'warning'
                });
              }
            }
          },
          handleNodeClick(data,node,value){
            // this.pageType = 'wait'
            setstore('menuCodeindex', data.key)
            this.nowChecked = data
            if(this.pageType === 'wait'){
              this.$refs.menu_insert.setModel(data)
            } else if(this.pageType === 'update'){
              this.$refs.menu_insert.setParentMenuCodeAndLable(data)
            } else if(this.pageType === 'add') {
              this.$refs.menu_insert.setParentMenuCodeAndLable(data)
            }

          },
          link_List(){
            this.$router.push({
              name: 'authMenuList'
            })
          },
          loadDate(PageType, key){
            if(PageType)this.setPageType(PageType)
            // alert(1)
            this.$store.dispatch('app/openLoading')
            menuTree({
              'rootCode': 'root'
            }).then(r=>{
              this.$store.dispatch('app/closeLoading')
              this.treeData = r.data.root
              if(getstore('menuCodeindex')&&this.treeData.indexOf(JSON.parse(getstore('menuCodeindex')))){
                this.$nextTick(() => {
                  this.$refs.mytree.setCurrentKey(JSON.parse(getstore('menuCodeindex'))); // treeBox 元素的ref   value 绑定的node-key
                  var datalist =  this.$refs.mytree.getCurrentNode();
                  this.nowChecked = datalist
                  if(!this.isdelete){this.$refs.menu_insert.setModel(datalist)}
                })
              }
            })
          },
          setPageType(value){
            this.pageType = value
          },
          updateDate(data){
          }
        }
    }
</script>

<style>
.el-tree-node.is-current > .el-tree-node__content {
  background:rgba(0, 47, 188, 0.9) !important;
}
</style>
<style scoped>
.scrolllist{
  height:6rem;
  overflow: auto;
}
.scrolllist::-webkit-scrollbar {
  width: 0px;
}
.scrolllist:hover::-webkit-scrollbar {
  width: 8px;
}
.scrolllist::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background:rgb(4, 38, 68)!important
}
.scrolllist::-webkit-scrollbar-track {
  border-radius: 0;
  background: #013366!important;
  border:none;
}
</style>