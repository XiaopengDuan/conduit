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
      <!-- <a href="#" class="btn-back"><span>返回上一级</span></a> -->
      <div class="tablecont-box" v-if="!$store.state.app.loading || temp.countLists.length>0">
        <div class="sharetitle">夜间最小分析
          <div class="input-group-btn">
            <el-tooltip class="item" content="按回车默认查询" placement="top-start" effect="light">
              <el-select @change="search" v-model="temp.seachItems.communityCode" placeholder="请选择地域">
                <el-option
                  v-for="item in communityOption"
                  :key="item.communityCode"
                  :label="item.communityName"
                  :value="item.communityCode">
                </el-option>
              </el-select>
            </el-tooltip>
          </div>
          <div class="input-group-btn">
            <el-tooltip class="item" content="按回车默认查询" placement="top-start" effect="light">
              <el-input v-model="temp.seachItems.userName" @keyup.enter.native="search" placeholder="请输入用户名"></el-input>
            </el-tooltip>
          </div>
          <div class="input-group-btn">
            <el-tooltip class="item" content="按回车默认查询" placement="top-start" effect="light">
              <el-input v-model="temp.seachItems.userNo" @keyup.enter.native="search"  placeholder="请输入户号"></el-input>
            </el-tooltip>
          </div>
        </div>
        <!-- <div class="scroll-box"> -->
          <table  class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
            <tr>
              <th  scope="col">日期</th>
              <th  scope="col" v-if="!td_show_type_Flag">小区名</th>
              <th  scope="col" v-if="td_show_type_Flag">户名</th>
              <th  scope="col" v-if="td_show_type_Flag">户号</th>
              <th  scope="col">最小时间</th>
              <th  scope="col">最小值</th>
              <th  scope="col">最大时间</th>
              <th  scope="col">最大值</th>
              <th  scope="col">高峰用水分析</th>
            </tr>
            </thead>
            <tbody v-if="temp.countLists.length > 0">
            <tr v-for="(value, index) in temp.countLists">
              <td align="center" class="text-success" width="100px">{{value.day}}</td>
              <td align="center"  width="100px" v-if="!td_show_type_Flag">{{value.communityName}}</td>
              <td align="center"  width="100px" v-if="td_show_type_Flag">{{value.userName}}</td>
              <td align="center"  width="100px" v-if="td_show_type_Flag">{{value.userNo}}</td>
              <td align="center"  width="100px">
                <el-tooltip :content="value.minTime" effect="light" placement="top-start">
                  <a>{{value.minTime | tooltip-filter(12)}}</a>
                </el-tooltip>
              </td>
              <td align="center" style="color: red"  width="100px">{{value.minValue}}</td>
              <td align="center"  width="100px">
                <el-tooltip :content="value.maxTime" effect="light" placement="top-start">
                  <a>{{value.maxTime | tooltip-filter(12)}}</a>
                </el-tooltip>
              </td>
              <td align="center" style="color: red" width="100px">{{value.maxValue}}</td>
              <td align="center" class="chart-td" @click="link_DailyPeak(value)"><div :id="'echarts'+ index " style="width: 100%;height: 35px">{{darwEcharts(index, value.time,value.value)}}</div></td>
            </tr>
            </tbody>
          </table>
          <div v-if="temp.countLists.length === 0" class="nodata">
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
              :pager-count="temp.page.pageCount"
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
  import { getCommunityAll } from '@/api/usercenter'
  import { getNightMinWaterAnalysisList} from '@/api/chargeWater'
  import { initPage } from '@/utils/utility'
  import { minecharts } from '@/components/echars/minecharts'
  export default {
    name: "waterMiniNightList",
    mounted() {
      initPage(this.temp, getNightMinWaterAnalysisList, 'countLists');
      this.temp.page.pageSize = 9;
      // this.$set( this.temp.seachItems, 'year', '2019');
      this.temp.searchCurrent(1);
      this.getCommunitySelectInfo();
    },
    data() {
      return {
        communityCode: '',
        communityOption: [],
        username: '',
        userno: '',
        td_show_type_Flag: false,
        temp: {seachItems:{},countLists: [],page:{}},
      }
    },
    methods: {
      Istheredata(e){
        // console.log(e.countLists.length === 0)
        if(e.countLists.length === 0) {
          return false
        }
      },
      search(){
        this.temp.dataInterceptor = this.Istheredata
        if(!this.temp.seachItems.userName && !this.temp.seachItems.userNo){
          this.td_show_type_Flag = false
        } else {
          this.td_show_type_Flag = true
        }
        this.temp.searchCurrent(1);
      },
      getCommunitySelectInfo(){
        getCommunityAll().then(r => {
          this.communityOption = r.data
          this.communityOption.unshift({communityCode: '',communityName: '查看全部'})
          // this.$set(this.temp.seachItems, 'communityCode', this.communityOption[0].communityCode)
        })
      },
      darwEcharts(index,time, date){
        this.$nextTick(function () {
          minecharts(index,time, date)
        })
      },
      link_DailyPeak(value){
        if(Number(value.maxValue)+Number(value.minValue) === 0){
          // this.$message('无数据加载...')
          return false
        }
        if(!value || !value.communityCode ){
              return
            }
        this.$router.push({
          name: "waterMiniNight",
          params: {communityCode: value.communityCode}
        });
      }
    }
  }
</script>

<style scoped>
.right3 .right-content{
  padding: 0
}
</style>
