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
      <a href="javaScript: void (0)" @click="onback()"  class="btn-back"><span>返回上一级</span></a>
      <div class="tablecont-box" v-if="!$store.state.app.loading || temp.userList.length>0">
        <div class="sharetitle">用户档案列表
          <!--          <div class="input-group-btn" style="width: 1.9rem">
                        <el-select  @change="temp.searchCurrent(1)" v-model="temp.seachItems.communityCode" placeholder="请选择地域">
                          <el-option
                            v-for="item in communityOption"
                            :key="item.communityCode"
                            :label="item.communityName"
                            :value="item.communityCode">
                          </el-option>
                        </el-select>
                    </div>
                    <div class="input-group-btn" style="width: 2.1rem">
                        <el-select  @change="temp.searchCurrent(1)" v-model="temp.seachItems.contentPriceCode" placeholder="请选择水价类型">
                          <el-option
                            v-for="item in contentPriceOption"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                          </el-option>
                        </el-select>
                    </div>-->
          <div class="input-group-btn" style="width: 2.3rem">
            <el-tooltip class="item" content="按回车默认查询" placement="top-start" effect="light">
              <el-input v-model="temp.seachItems.userNo" @keyup.enter.native="tempsearchN" placeholder="输入用户号模糊查询"></el-input>
            </el-tooltip>
          </div>
          <div class="input-group-btn" style="width: 2.3rem">
            <el-tooltip class="item" content="按回车默认查询" placement="top-start" effect="light">
              <el-input v-model="temp.seachItems.userName" @keyup.enter.native="tempsearchN" placeholder="输入用户名模糊查询"></el-input>
            </el-tooltip>
          </div>
        </div>
        <!--<ul class="nav nav-tabs nav-jf">-->
        <!--  <li><a>税务设置</a><img src="@/assets/img/tab_list_active.png"></li>-->
        <!--  <li class="active"><a>计费设置</a><img src="@/assets/img/tab_list_active.png" style="display: block;"></li>-->
        <!--</ul>-->
        <!-- <div class="scroll-box"> -->
          <table  class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
            <tr>
              <th  scope="col">用户名</th>
              <th  scope="col">户号</th>
              <th  scope="col">地址</th>
              <th  scope="col">用户状态</th>
              <th  scope="col">用户类型</th>
              <th  scope="col">收费方式</th>
              <th  scope="col">联系手机</th>
              <th  scope="col">欠费时间</th>
              <th  scope="col">欠费状态</th>
              <th  scope="col">欠费金额</th>
              <th  scope="col">操作</th>
            </tr>
            </thead>
            <tbody v-if="temp.userList.length > 0">
            <tr v-for="(value, index) in temp.userList" :key="index">
              <td align="center" class="text-success" width="2rem">
                <el-tooltip :content="value.userName" effect="light" placement="top-start">
                  <a style="cursor: pointer">{{value.userName | tooltip-filter(5)}}</a>
                </el-tooltip>
              </td>
              <td align="center">{{value.userNo}}</td>
              <td align="center">{{value.communityName}}</td>
              <td align="center"></td>
              <td align="center">{{value.userTypeName}}</td>
              <td align="center">{{value.chargeName}}</td>
              <td align="center">{{value.contactMobile}}</td>
              <td align="center">{{value.badDate}}</td>
              <td align="center">{{value.badFlag===0?'不呆账':'呆账'}}</td>
              <td align="center">{{value.arrearsMoney}}</td>
              <td align="center"><span style="color: #00FD72;cursor: pointer" @click="link_detail(value)">档案详情</span></td>
            </tr>
            </tbody>
          </table>
          <div v-if="temp.userList.length === 0" class="nodata">
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
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  let echarts = require("echarts");
  import { getUserList, getContinuousUserList } from '@/api/charge'
  import { getCommunityAll } from '@/api/usercenter'
  import { getContentPriceSelect } from '@/api/chargeWater'
  import { initPage } from '@/utils/utility'
  export default {
    name: "arrearUserInfo",
    components: {
    },
    mounted() {
      // console.info(this.$route.params)
      //初始化分页查询
      let seachItems = JSON.parse(this.$route.params.seachItems)
      if(!seachItems.conNum) {
        initPage(this.temp, getUserList, 'userList');
      } else {
        initPage(this.temp, getContinuousUserList, 'userList');
      }
      this.temp.page.pageSize = 13;
      this.temp.seachItems = Object.assign({}, seachItems);
      this.month = this.temp.seachItems.month
      this.temp.searchCurrent(1);
      this.getCommunitySelectInfo();
      this.getContentPriceOption()
    },
    data(){
      return {
        startNumber: 0, // table 标题左右切换下标
        communityOption: [], // 小区下拉框集合
        temp: {seachItems:{},userList: [], page:{}},
        contentPriceOption: [],
        startNumber: 0,
        month: ''
      }
    },
    methods: {
      tempsearchN() {
        this.temp.dataInterceptor = this.Istheredata
        this.temp.page.pageNum = 1
        this.temp.searchN();
      },
      Istheredata(e){
        // console.log(e.countLists.length === 0)
        if(e.userList.length === 0) {
          return false
        }
      },
      onback(){
        this.$store.dispatch("app/resetKeepAive",this.$options.name)
        this.$router.back(-1)
      },
      // 用户列表详情跳转
      link_detail(value){
        this.$router.push({
          name: "arrearUserListDetails",
          params: {seachItems: JSON.stringify({userNo: value.userNo, month: this.month})}
        });
      },
      getCommunitySelectInfo(){
        getCommunityAll().then(r => {
          this.communityOption = r.data
          this.communityOption.unshift({communityCode: '',communityName: '查看全部'})
          // this.$set(this.temp.seachItems, 'communityCode', this.communityOption[0].communityCode)
        })
      },
      getContentPriceOption() {
        getContentPriceSelect().then(r => {
          let keys = Object.keys(r.data);
          let values = Object.values(r.data);
          for(let i=0;i < keys.length; i++){
            this.contentPriceOption.push({ key: keys[i], value: values[i] });
          }
        })
      },
      updateStartNumber(index){
        if(index>0 && this.startNumber + 4 < this.temp.countLists[0].countsAndPowers.length){
          this.startNumber += index
        } else if (index<0 && this.startNumber > 0){
          this.startNumber += index
        }
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
    align-items: center;
  }
  .d4:hover{
    border-width: .11rem;
    cursor:pointer
  }
  .d3:hover{
    border-width: .11rem;
    cursor:pointer
  }
</style>
