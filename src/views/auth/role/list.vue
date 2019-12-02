<template>
  <div class="right right2">
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
          <div>角色列表</div>
          <div class="title2">
            <div class="input-group-btn">
              <el-input placeholder="角色名称查询" v-model="temp.seachItems.roleName"></el-input>
            </div>
            <div class="input-group-btn-right">
              <a @click="temp.searchCurrent(1)"><span>查询</span></a>
            </div>
          </div>
        </div>
        <table  class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
               <th scope="col"><span style="padding-right: .03rem"> <input class="input-checkbox" v-model="checked" type="checkbox"></span>全选 </th>
               <th scope="col">角色编号</th>
               <th scope="col">角色名</th>
               <th scope="col">拥有菜单权限</th>
               <th scope="col">状态</th>
<!--               <th scope="col">操作</th>-->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in temp.list" :key="index">
              <td align="center"> <input class="input-checkbox" v-model="value.checked" type="checkbox"></td>
              <td align="center">{{value.key}}</td>
              <td align="center">{{value.roleName}}</td>
              <td align="center" :title="value.menuPerms">{{value.menuPerms|tooltip-filter(12)}}</td>
              <td align="center">{{value.state==='1'?'启用':'禁用'}}</td>
<!--              <td align="center"></td>-->
            </tr>
          </tbody>
        </table>
        <div class="pagination-foot">
          <nav style="display: inline-block" aria-label="...">
            <el-pagination
              class="pagination"
              style="margin: 10px 0;"
              prev-text="上一页"
              next-text="下一页"
              :page-size="temp.page.pageSize"
            :current-page.sync="temp.page.pageNum"
              :pager-count="5"
              layout="prev, pager, next"
              :total="temp.page.totalNum"
              @size-change="temp.pageChange"
              @current-change="temp.pageChange">
            </el-pagination>
          </nav>
          <div class="input-group-btn-right">
            <!-- <button class="form_button" >导出</button> -->
            <!-- <button class="form_button" @click="upload()">导入</button> -->
            <button class="form_button" @click="beforeDel()">删除</button>
            <button v-if="$store.state.user.menuPerms.includes('AUTH.ROLE.AUTHROLEUPDATE')" class="form_button" @click="link_update('update')">修改</button>
            <button v-if="$store.state.user.menuPerms.includes('AUTH.ROLE.AUTHROLEUPDATE')" class="form_button" @click="link_update('add')">新增</button>
            <!-- <button class="form_button" @click="link_update('add')">表格菜单切换</button> -->
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import { fuzzyQueryRole, deleteRole } from '@/api/auth'
  import { initPage } from '@/utils/utility'
    export default {
        name: "authRoleList",
        mounted() {
          initPage(this.temp, fuzzyQueryRole, 'list')
          this.temp.page.pageSize = 10
          this.temp.searchCurrent(1)
        },
        data() {
            return {
              checked: false,
              temp: {seachItems: {}, page: {}, list: [{checked: false}]}
            }
        },
      watch: {
        checked(val) {
            for(let i=0;i<this.temp.list.length;i++){
              // this.temp.list[i].checked = true
              this.$set(this.temp.list[i],'checked', val)
            }
          }
        },
        methods: {
          upload(){

          },
          link_update(type, item){
            // 点击修改时验证以及数据
            if(type === 'update') {
              for (let i = 0; i < this.temp.list.length; i++) {
                if (this.temp.list[i].checked) {
                  if(!item){
                    item = this.temp.list[i]
                  } else {
                    this.$message({
                      message: '请勿选择多项',
                      type: 'warning'
                    });
                    return;
                  }
                }
              }
              if(!item){
                this.$message({
                  message: '请选择修改的数据',
                  type: 'warning'
                });
                return
              }
            }

            this.$router.push({
              name: 'authRoleUpdate',
              params: {
                type: type,
                item: type === 'update'?JSON.stringify(item):'{}'
              }
            })
          },
          getPromise(key){
            return deleteRole({key})
          },
          validateChecked(){
              let flag = false
              for (let i = 0; i < this.temp.list.length; i++) {
                if (this.temp.list[i].checked) {
                  flag = true
                  break
                }
              }
              return flag
          },
           beforeDel(){
              if(!this.validateChecked()){
                this.$message({
                      message: '请选择需要删除的角色',
                      type: 'warning'
                    });
                    return
              }
              let that = this
              this.$confirm('此操作将删除选中角色， 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                that.delDate()
              })
          },
          delDate(){
            let delsz = []
            for (let i=0;i<this.temp.list.length; i++){
              if(this.temp.list[i].checked){
                delsz.push(this.getPromise(this.temp.list[i].key))
              }
            }
            this.$store.dispatch('app/openLoading')
            Promise.all(delsz).then(r => {
              setTimeout(() =>{
                this.$store.dispatch('app/closeLoading')
                this.temp.searchCurrent(1)
              },1000);

            })
          }
        }
    }
</script>

<style scoped>
.tablecont-box .title{
  /* height: auto; */
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tablecont-box .title2{
  flex: 1 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
