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
      <!--<a href="#" class="btn-back"><span>返回上一级</span></a>-->
      <div class="tablecont-box" v-if="temp.lists.length>0 || !$store.state.app.loading">
        <div class="sharetitle">分项表格统计
          <div class="input-group-btn">
            <el-tooltip class="item" content="按回车默认查询" placement="top-start" effect="light">
              <el-select v-if="navBox.navIndex===0" @change="tempsearchN" v-model="temp.seachItems.communityCode" placeholder="请选择地域">
                <el-option
                  v-for="item in communityOption"
                  :key="item.communityCode"
                  :label="item.communityName"
                  :value="item.communityCode">
                </el-option>
              </el-select>
              <el-select v-if="navBox.navIndex===1" @change="complaintsearchN" v-model="complaint.seachItems.communityCode" placeholder="请选择地域">
                <el-option
                  v-for="item in communityOption"
                  :key="item.communityCode"
                  :label="item.communityName"
                  :value="item.communityCode">
                </el-option>
              </el-select>
            </el-tooltip>
          </div>
        </div>
        <ul class="nav nav-tabs nav-jf" style="right: 1rem;">
          <li v-for="(item,index) in navBox.navList" @click="navBoxClick(index)"
              :class="{active:index === navBox.navIndex }">
            <a v-text="item" style="cursor:pointer"></a><img src="../../../assets/img/tab_list_active.png">
          </li>
        </ul>
        <div v-if="navBox.navIndex===0">
          <table class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
            <tr>
              <th rowspan="2" width="100rem">小区名称</th>
              <th rowspan="2" width="100rem">合计</th>

              <th :colspan="tableData[cursor_num].child.length" scope="col">
                <span v-if="cursor_num !== 0" class="d4" @click="updateStartNumber(-1)"></span>
                <span v-if="colsNumber - tableData[cursor_num].child.length<=0" class="d3" @click="updateStartNumber(1)"></span>
                {{tableData[cursor_num].name}}
              </th>

              <th v-if="colsNumber - tableData[cursor_num].child.length > 0 && cursor_num!==tableData.length-1"
                  :colspan="colsNumber - tableData[cursor_num].child.length" scope="col">
                <span class="d3" v-if="(cursor_num+1) * colsNumber < childTitle.length" @click="updateStartNumber(1)"></span>
                {{tableData[cursor_num+1].name}}
              </th>
            </tr>
            <tr>
              <th v-for="(value, index) in childTitle.slice(cursor_num * colsNumber,colsNumber * (cursor_num+1))" :key="index">
                {{value.nameTitle}}
              </th>
            </tr>
            </thead>
            <tbody v-if="temp.lists.length > 0">
            <tr v-for="(value, index) in temp.lists" :key="index">
              <td align="center" style="color: #00F172" scope="row" width="100px">
                <el-tooltip :content="value.communityName" effect="light" placement="top-start">
                  <a>{{value.communityName | tooltip-filter(6)}}</a>
                </el-tooltip>
              </td>
              <td align="center">{{value.total}}</td>
              <template v-for="(v, i) in value.value.slice(cursor_num * colsNumber, cursor_num * colsNumber + colsNumber)">
                <td align="center">{{v.value}}</td>
              </template>
            </tr>
            </tbody>
          </table>
          <div v-if="temp.lists.length === 0" class="nodata">
            暂无数据
          </div>
          <nav class="pagination-wrap"  aria-label="...">
            <el-pagination
              class="pagination"
              style="margin: 10px 0;"
              prev-text="上一页"
              next-text="下一页"
              :page-size="temp.page.pageSize"
            :current-page.sync="temp.page.pageNum"
              :pager-count="8"
              layout="prev, pager, next"
              :total="temp.page.totalCount"
              @size-change="temp.pageChange"
              @current-change="temp.pageChange"
            ></el-pagination>
          </nav>
        </div>
        <div v-if="navBox.navIndex===1" class="scroll-box">
          <table  class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
            <tr>
              <th rowspan="2" scope="col">小区名</th>
              <th rowspan="2" scope="col">已处理</th>
              <th rowspan="2" scope="col">处理中</th>
              <th rowspan="2" scope="col">未处理</th>

            </tr>
            </thead>
            <tbody v-if="temp.lists.length > 0">
            <tr v-for="(value, index) in complaint.lists" :key="index">
              <td align="center" style="color: #00F172" scope="row" width="100px">
                <el-tooltip :content="value.communityName" effect="light" placement="top-start">
                  <a>{{value.communityName | tooltip-filter(6)}}</a>
                </el-tooltip>
              </td>
              <td align="center">{{value.processed}}</td>
              <td align="center">{{value.processing}}</td>
              <td align="center">{{value.untreated}}</td>
            </tr>
            </tbody>
          </table>
          <div v-if="temp.lists.length === 0" class="nodata">
            暂无数据
          </div>
          <nav class="pagination-wrap"  aria-label="...">
            <el-pagination
              class="pagination"
              style="margin: 10px 0;"
              prev-text="上一页"
              next-text="下一页"
              :page-size="complaint.page.pageSize"
              :pager-count="8"
              layout="prev, pager, next"
              :total="complaint.page.totalCount"
              @size-change="complaint.pageChange"
              @current-change="complaint.pageChange"
            ></el-pagination>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getComplaintProblemSummaryList, getComplaintProblemStateList} from '@/api/chargeCall'
  import { getCommunityAll } from '@/api/usercenter'
  import { initPage } from '@/utils/utility'
  export default {
    name: "callStatisticsItem",
    data(){
      return {
        temp: { seachItems: {},lists: [],page: {}}, // 投诉问题绘总列表分页封装对象
        complaint: {seachItems: {},lists: [],page: {}}, //投诉问题汇总状态分页封装对象
        communityOption: [],
        cursor_num: 0, // 表格标题游标
        colsNumber: 10, // 表格最大显示列数
        tableData: [{name: '',datas: [],child: []}],
        childTitle: [],
        datas: [],
        navBox: {
          navIndex: 0,
          navTitle: ['投诉类型汇总列表', '投诉问题处理状态列表'],
          navList: ['投诉类型汇总列表', '投诉问题处理状态列表'],
        }
      }
    },
    created() {
      // 封装分页对象
      initPage(this.temp, getComplaintProblemSummaryList, 'lists');
      initPage(this.complaint, getComplaintProblemStateList, 'lists');
      //设置显示页数
      this.temp.page.pageSize = 12;
      this.complaint.page.pageSize = 12;
      // 添加投诉问题绘总列表响应拦截
      this.temp.dataInterceptor = this.dataInterceptor
      // 初始化数据加载
      this.temp.searchCurrent(1);
      this.getCommunitySelectInfo()
    },
    methods: {
      complaintsearchN(){
        this.complaint.page.pageNum = 1;
        this.complaint.dataInterceptor = this.Istheredata
        this.complaint.searchN();
      },
      Istheredata(e){
        // console.log(e.countLists.length === 0)
        // console.log(e)
        if(e.lists.length === 0) {
          return false
        }
      },
      tempsearchN() {
        this.temp.page.pageNum = 1;
        this.temp.dataInterceptor = this.Istheredata
        this.temp.searchN();
      },
      // 获取下拉菜单
      getCommunitySelectInfo(){
        getCommunityAll().then(r => {
          this.communityOption = r.data;
          this.communityOption.unshift({communityCode: '',communityName: '查看全部'})
          // this.$set(this.temp.seachItems, 'communityCode', this.communityOption[0].communityCode)
        })
      },
      // 修改标题下标
      updateStartNumber(index) {
        if (index > 0 && this.cursor_num + 1 < this.tableData.length) {
          this.cursor_num += index;
        } else if (index < 0 && this.cursor_num > 0) {
          this.cursor_num += index;
        }
      },
      // 投诉问题绘总列表响应拦截方法
      dataInterceptor(obj){
        this.loadingTableTiltes(obj.lists);
      },
      // 后台数据转换方法
      loadingTableTiltes(dataList){ // 转换后台数据
        if(dataList.length>0){
          this.tableData = []
          dataList[0].value.forEach((value,index) => {
            let sz = value.name.split('-');
            let flag = true; //
            for (let i=0;i< this.tableData.length;i++){
              if(this.tableData[i].name === sz[0] &&  this.tableData[i].child.length < this.colsNumber){
                 this.tableData[i].child.push({name: value.name, nameTitle: sz[1]});
                 this.tableData[i].datas.push(value.value)
                   flag = false;
                   break;
              }
            }
            if(flag) {
              this.tableData.push({name: sz[0],datas: [value.value],child: [{name: value.name, nameTitle: sz[1]}]})
            }
          })
        }
        this.childTitle = []
        this.datas = []
        this.tableData.forEach((value, index) => {
          this.childTitle.push.apply(this.childTitle,value.child)
          this.datas.push.apply(this.datas,value.datas)
        })
      },
      // 选项卡切换
      navBoxClick(index){
        this.navBox.navIndex = index
        if(index === 0) {
          this.temp.searchN();
        }else if(index === 1 ){
          this.complaint.searchN();
        }
      }
    }
  }
</script>

<style scoped>

</style>

