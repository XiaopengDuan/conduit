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
          <div>菜单列表</div>
          <div class="title2">
            <div class="input-group-btn">
              <el-input placeholder="菜单名称查询" v-model="temp.seachItems.menuName"></el-input>
            </div>
            <div class="input-group-btn-right">
              <a @click="temp.searchCurrent(1)"><span>查询</span></a>
            </div>
          </div>
        </div>
        <table  class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
               <th scope="col">
               <span style="padding-right: .03rem">
                 <input class="input-checkbox" v-model="checked" type="checkbox">
                </span>全选
               </th>
               <th scope="col">菜单编号</th>
               <th scope="col">菜单标识</th>
               <th scope="col">菜单名称</th>
               <th scope="col">菜单类型</th>
               <th scope="col">父菜单</th>
               <th scope="col">访问的页面URL</th>
               <th scope="col">图标URL</th>
               <th scope="col">备注</th>
<!--               <th scope="col">操作</th>-->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in temp.list" :key="index">
              <td align="center">
                <input class="input-checkbox" v-model="value.checked" type="checkbox"/>
<!--                <el-checkbox v-model=""></el-checkbox>-->
              </td>
              <td align="center">{{value.key}}</td>
              <td align="center">{{value.menuCode}}</td>
              <td align="center">{{value.menuName}}</td>
              <td align="center">{{value.menuType==='1'?'菜单':'按钮'}}</td>
              <td align="center">{{value.parentMenu}}</td>
              <td align="center">{{value.pageUrl}}</td>
              <td align="center">{{value.iconUrl}}</td>
              <td align="center">{{value.remark}}</td>
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
              :total="temp.page.totalCount"
              @size-change="temp.pageChange"
              @current-change="temp.pageChange">
            </el-pagination>
          </nav>
          <div class="input-group-btn-right">
            <!-- <button class="form_button" >导出</button> -->
            <!-- <button class="form_button" @click="upload()">导入</button> -->
            <button class="form_button" @click="beforeDel()">删除</button>
            <button class="form_button" v-if="$store.state.user.menuPerms.includes('AUTH.MENU.AUTHMENULISTUPDATE')" @click="link_update('update')">修改</button>
            <button class="form_button" v-if="$store.state.user.menuPerms.includes('AUTH.MENU.AUTHMENULISTUPDATE')" @click="link_update('add')">新增</button>
            <button class="form_button" v-if="$store.state.user.menuPerms.includes('AUTH.MENU.AUTHMENUTREE')" @click="link_tree('wait')">表格菜单切换</button>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import { fuzzyQueryMenu, deleteMenu, addOrModifyMenu } from '@/api/auth'
  import { initPage } from '@/utils/utility'
    export default {
        name: "authMenuList",
        mounted() {
          initPage(this.temp, fuzzyQueryMenu, 'list')
          this.temp.page.pageSize = 10
          this.temp.searchCurrent(1)
        },
        data() {
            return {
              checked: false,
              temp: {seachItems: {}, page: {}, list: [{}]}
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
          link_tree(value){
            this.$router.push({
              name: 'authMenuTree',
              params: {
                type: value,
                item: '{}'
              }
            })
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
              name: 'authMenuListUpdate',
              params: {
                type: type,
                item: type === 'update'?JSON.stringify(item):'{}'
              }
            })
          },
          getPromise(key){
            const p = new Promise((resolve, reject) => {
              deleteMenu({key}).then(r=>{
                resolve(r)
              })
            })
            return p
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
                      message: '请选择需要删除的菜单',
                      type: 'warning'
                    });
                    return
              }
            let that = this
            this.$confirm('此操作将删除菜单, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              that.delDate()
            })
          },
          async delDate(){
            // this.$set(this.temp.list[1],'checked', false)
            this.$store.dispatch('app/openLoading')
            for (let i=0;i<this.temp.list.length; i++){
              if(this.temp.list[i].checked){
                this.temp.list[i].checked = false
                // console.log('---->', i)
                let r = await this.getPromise(this.temp.list[i].key)
                if(r.code === 0||r.code === 200){
                  this.temp.list[i].checked = false
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  // this.$set(this.temp.list[i],'checked', false)
                  // this.temp.list.splice(i,1)
                } else {
                  this.$message({
                    message: r.msg,
                    type: 'error'
                  });
                }
              }
            }
            // console.log('---->', 'end')
            this.$store.dispatch('app/closeLoading')
            setTimeout(() =>{
              this.temp.searchCurrent(1)
            },1000);
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
