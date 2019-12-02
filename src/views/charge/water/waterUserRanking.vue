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
      <a href="javaScript: void (0)" @click="$store.dispatch('app/resetKeepAive',$options.name); $router.go(-1)" class="btn-back"><span>返回上一级</span></a>
      <div class="tablecont-box">
        <div class="sharetitle">用户用水量
          <div class="input-group-btn" style="width: 1.9rem">
             <el-select  @change="contentPriceCode" v-model="temp.seachItems.communityCode" placeholder="请选择地域">
                <el-option
                  v-for="item in communityOption"
                  :key="item.communityCode"
                  :label="item.communityName"
                  :value="item.communityCode">
                </el-option>
              </el-select>
          </div>
          <div class="input-group-btn" style="width: 2.1rem">
              <el-select  @change="contentPriceCode" v-model="temp.seachItems.contentPriceCode" placeholder="请选择水价类型">
                <el-option
                  v-for="item in contentPriceOption"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
          </div>
          <div class="input-group-btn" style="width: 2.3rem">
              <el-input v-model="temp.seachItems.userNo" @keyup.enter.native="contentPriceCode" placeholder="输入用户号模糊查询"></el-input>
          </div>
          <div class="input-group-btn" style="width: 2.3rem">
              <el-input v-model="temp.seachItems.userName" @keyup.enter.native="contentPriceCode" placeholder="输入用户名模糊查询"></el-input>
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
              <th  scope="col">小区名</th>
              <th  scope="col">户名</th>
              <th  scope="col">户号</th>
              <th  scope="col">合计</th>
              <template v-if="temp.countLists.length>0">
              <th  scope="col" v-for="(value,index) in temp.countLists[0].countsAndPowers.slice(startNumber,startNumber + 5)" :key="index">
                <span class="d4" v-if="index===0 && startNumber!==0 " @click="updateStartNumber(-5)"></span>
                <span class="d3" v-else-if="index===4 && startNumber + 5 < temp.countLists[0].countsAndPowers.length" @click="updateStartNumber(5)"></span>
                {{value.month}}
              </th>
              </template>
              <th  scope="col">变化曲线</th>
            </tr>
            <tr></tr>
            </thead>
            <tbody v-if="temp.countLists[0].countsAndPowers.length !== 0">
              <tr v-for="(value, index) in temp.countLists" :key="index">
                <td align="center" class="text-success">
                  <el-tooltip :content="value.name" effect="light" placement="top-start">
                    <a style="cursor: pointer;">{{value.name | tooltip-filter(5)}}</a>
                  </el-tooltip>
                </td>
                <td align="center" class="ly-pointer" @click="link_underpaidCustomers(value)">{{value.userName}}</td>
                <td align="center">{{value.userNo}}</td>
                <td align="center" >{{value.total}}</td>
                <td align="center" class="ly-pointer" @click="link_calendarDay(value, startNumber, i)" :key="i" v-for="(v, i) in value.countsAndPowers.slice(startNumber,startNumber + 5)">
                  {{v.totalPower}}
                </td>
                <td align="center" class="chart-td" @click="link_CurveJump(value)"><div :id="'echarts'+ index " style="width: 100%;height:.25rem">{{darwEcharts(index, value)}}</div></td>
              </tr>
            </tbody>
          </table>
          <div v-if="temp.countLists[0].countsAndPowers.length === 0" class="nodata">
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
  import { getContentPriceSelect, getUserUseWaterList} from '@/api/chargeWater'
  import { getCommunityAll } from '@/api/usercenter'
  import { initPage } from '@/utils/utility'
  import { minecharts } from '@/components/echars/minecharts'
  export default {
    name: "waterUserRanking",
    components: {
    },
    mounted() {
      //初始化分页查询
      initPage(this.temp, getUserUseWaterList, 'countLists')
      this.temp.page.pageSize = 13;
      let seachItems = JSON.parse(this.$route.params.seachItems);
      this.temp.seachItems = seachItems
      this.$set( this.temp.seachItems, 'year', '2019')
      this.getCommunitySelectInfo()
      this.getContentPriceOption()
    },
    data(){
      return {
        startNumber: 0, // table 标题左右切换下标
        communityOption: [], // 小区下拉框集合
        temp: {seachItems:{},countLists: [{countsAndPowers: []}],page: {}},
        contentPriceOption: [],
        startNumber: 0
      }
    },
    updated() {
      // console.log(this.temp.countLists.length)
    },
    methods: {
      contentPriceCode() {
        //查看是否有数据
        this.temp.page.pageNum = 1
        this.temp.dataInterceptor = this.Istheredata
        this.temp.searchN()
      },
      //查看是否有数据
      Istheredata(e) {
        if(e.countLists.length === 0) {
          e.countLists[0]={
            countsAndPowers: [],
          }
        }
      },
      dataInterceptor(e){
        // console.log(e.countLists.length === 0)
        if(e.countLists.length === 0) {
          return false
        }
      },
      link_CurveJump(value){
        if(parseInt(value.total) === 0){
          // this.$message('0吨，无数据加载...')
          return false
        }
        this.$router.push({
          name: "waterUserCurveJump",
          params: {userNo: value.userNo, userName: value.userName, type:'waterUserRanking'}
        });
      },
      darwEcharts(index, date){
        if(date && date.countsAndPowers.length > 0){
          this.$nextTick(function () {
            minecharts(index,date.month,date.power)
          })
        }
      },
      getCommunitySelectInfo(){
        getCommunityAll().then(r => {
          this.communityOption = r.data
          this.communityOption.unshift({communityCode: '',communityName: '查看全部'})
          // this.$set(this.temp.seachItems, 'communityCode', this.communityOption[0].communityCode)
          this.temp.searchCurrent(1)
        })
      },
      getContentPriceOption() {
        getContentPriceSelect().then(r => {
          let keys = Object.keys(r.data);
          let values = Object.values(r.data);
          this.contentPriceOption.push({key: '', value: '查看全部'})
          for(let i=0;i < keys.length; i++){
            this.contentPriceOption.push({ key: keys[i], value: values[i] });
          }
        })
      },
      updateStartNumber(index){
        // index: 正负显示title的长度
        // 获取固定title数组的长度
        let length = this.temp.countLists[0].countsAndPowers.length;
        // 判断点击的是左箭头还是右箭头
        if(index>0){
          if(length - this.startNumber > index + index){
            this.startNumber += index
          } else {
            this.startNumber = length - index
          }
        } else {
          if(this.startNumber + index > 0 ){
            this.startNumber += index
          } else {
            this.startNumber = 0
          }
        }
      },
      link_underpaidCustomers(value){
        this.$router.push({
          name: 'analysisUnderpaidCustomers',
          params: {user_no: value.userNo}
        })
      },
      link_calendarDay(value, index, i){
        if(parseInt(value.power[index+i]) === 0){
          // this.$message('0吨，无数据加载...')
          return false
        }
        this.$router.push({
          // name: "waterCurveJump",
          name: 'waterCalendarDay',
          params: {seachItems: JSON.stringify({communityCode: value.code,user_no: value.userNo, user_name: value.userName, month: this.temp.countLists[0].countsAndPowers[index+i].month})}
        })
      }
    }
  }
</script>

<style scoped>
  .d4:hover{
    border-width: .11rem;
    cursor:pointer
  }
  .d3:hover{
    border-width: .11rem;
    cursor:pointer
  }
</style>
