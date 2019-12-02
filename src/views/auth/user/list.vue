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
        <div class="title" style="width: 14.5rem;">
          <div>用户列表</div>
          <div class="title2">
            <div class="input-group-btn">
              <el-input placeholder="用户名查询" v-model="temp.seachItems.userName"></el-input>
            </div>
            <!-- <div class="input-group-btn">
              <el-input placeholder="用户账号查询" v-model="temp.seachItems.userAccount"></el-input>
            </div> -->
            <div class="input-group-btn-right">
              <a @click="temp.searchCurrent(1)"><span>查询</span></a>
            </div>
          </div>
        </div>
        <table id="list-table"  class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
               <th scope="col"><span style="padding-right: .03rem"><el-checkbox  v-model="checked" ></el-checkbox></span>全选 </th>
               <th scope="col">用户编号</th>
               <th scope="col">用户账号</th>
               <th scope="col">用户名</th>
               <th scope="col">邮箱</th>
               <th scope="col">角色</th>
               <th scope="col">联系电话</th>
               <th scope="col">性别</th>
               <th scope="col">状态</th>
<!--               <th scope="col">操作</th>-->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in temp.list" :key="index">
              <td align="center"><el-checkbox v-model="value.checked"></el-checkbox></td>
              <td align="center">{{value.key}}</td>
              <td align="center">{{value.userAccount}}</td>
              <td align="center">{{value.userName}}</td>
              <td align="center">{{value.email}}</td>
              <td align="center">{{value.roleName}}</td>
              <td align="center">{{value.phone}}</td>
              <td align="center">{{value.sex==='1'?'男':'女'}}</td>
              <td align="center">{{value.state==='1' ? '启用中' : '禁用中'}}</td>
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
            <button class="form_button" @click="exportNowPageExcel('all')">导出全部</button>
            <button class="form_button" @click="exportNowPageExcel()">导出本页</button>
            <button class="form_button" @click="upload()">导入</button>
            <button class="form_button" @click="beforeDel()">删除</button>
            <button class="form_button" v-if="$store.state.user.menuPerms.includes('AUTH.USER.AUTHUSERUPDATE')" @click="link_tree('update')">修改</button>
            <button class="form_button" v-if="$store.state.user.menuPerms.includes('AUTH.USER.AUTHUSERUPDATE')" @click="link_tree('add')">新增</button>
<!--            <button class="form_button" @click="link_tree('add')">表格用户切换</button>-->
          </div>
        </div>
      </div>
      <srFileUpload :restData="temp.searchN" :action="$store.state.app.serveHost+':440/cSCc'" ref="myFileUpload" :down_model="down_model"></srFileUpload>
      <!-- <srFileUpload action="http://192.168.1.164:19998/user/importExcelTable" ref="myFileUpload" :down_model="down_model"></srFileUpload> -->

    </div>
  </div>
</template>

<script>
  import { fuzzyQueryUser,exportExcelTable, deleteUser, excelTableForUserImportDownload } from '@/api/auth'
  import { initPage } from '@/utils/utility'
  import srFileUpload from '@/components/element/sr-file-upload'  
  import moment from "moment";
  import XLSX from "xlsx";
  import FileSaver from "file-saver";
    export default {
        name: "authUserList",
        components:{srFileUpload},
        mounted() {
          initPage(this.temp, fuzzyQueryUser, 'list')
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
      updated(){
        // this.temp.seachItems.userAccount = this.temp.seachItems.userName
        // console.log(this.temp.seachItems.userAccount)
      },
      methods: {
        down_model(){
          excelTableForUserImportDownload().then(r=>{
            // 39.152.209.97:8085
            window.location.href=this.$store.state.app.serveHost +'/files/用户导入模板.xls'
          })
        },
        exportExcel(data){
          // let p = '1000063,1000057'
          // window.open('http://192.168.10.21:19998/user/exportExcelTable' + '&userList=' + p, '_blank')
          exportExcelTable({userList: data}).then(r=>{
              // console.log(r)
              window.location.href=this.$store.state.app.serveHost +'/files/导出用户表.xls'
          })
        },
        exportNowPageExcel(type){
          let str = ''
          if(type!=='all'){
            this.temp.list.forEach((value, index) => {
              str += value.key + ','
            })
          } else {
            str = 'all'
          }
          this.exportExcel(str)
        },
        upload(){
          this.$refs.myFileUpload.openDialog()
        },
        link_tree(type, item){
          // 点击修改时验证以及数据
          if(type === 'update') {
            for (let i = 0; i < this.temp.list.length; i++) {
              if (this.temp.list[i].checked) {
                if(!item){
                  item = this.temp.list[i]
                  // console.log(item)
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
            name: 'authUserUpdate',
            params: {
              type: type,
              item: type === 'update' ? JSON.stringify(item) : '{}'
            }
          })
        },
        getPromise(key){
          const p = new Promise((resolve, reject) => {
            deleteUser({key}).then(r=>{
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
                    message: '请选择需要删除的用户',
                    type: 'warning'
                  });
                  return
            }
            let that = this
            this.$confirm('此操作将删除选中用户， 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              that.delDate()
            })
        },
        async delDate(){
          this.$store.dispatch('app/openLoading')
          for (let i=0;i<this.temp.list.length; i++){
            if(this.temp.list[i].checked){
              let r = await this.getPromise(this.temp.list[i].key)
              if(r.code === 0 || r.code=== 200){
                this.$message({
                  message: r.msg,
                  type: 'success'
                });
              } else {
                this.$message({
                  message: r.msg,
                  type: 'error'
                });
              }
            }
          }
          setTimeout(() =>{
            this.$store.dispatch('app/closeLoading')
            this.temp.searchCurrent(1)
          },1000);
        },
          // exportExcel() {
          //   /* 从表生成工作簿对象 */
          //   var wb = XLSX.utils.table_to_book(document.querySelector("#list-table"));
          //   /* 获取二进制字符串作为输出 */
          //   var wbout = XLSX.write(wb, {
          //     bookType: "xlsx",
          //     bookSST: true,
          //     type: "array"
          //   });
          //   try {
          //     let excelname = moment() + ".xlsx";
          //     FileSaver.saveAs(
          //       //Blob 对象表示一个不可变、原始数据的类文件对象。
          //       //Blob 表示的不一定是JavaScript原生格式的数据。
          //       //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //       //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          //       new Blob([wbout], { type: "application/octet-stream" }),
          //       //设置导出文件名称
          //       excelname
          //     );
          //   } catch (e) {
          //     if (typeof console !== "undefined") console.log(e, wbout);
          //   }
          //   return wbout;
          // }
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
