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
      <!-- <a href="javascript: void (0)" @click="$router.go(-1)" class="btn-back"><span>返回上一级</span></a> -->
      <div class="tablecont-box" v-if="temp.countLists.length === 0 || temp.countLists[0].months.length>0">
        <div class="sharetitle">
          <el-row>小区欠费列表</el-row>
          <div class="input-group-btn">
            <el-tooltip class="item" content="按回车默认查询" placement="top-start" effect="light">
              <el-select  @change="updateYer" v-model="temp.seachItems.communityCode" placeholder="请选择地域">
                <el-option
                  v-for="item in communityOption"
                  :key="item.communityCode"
                  :label="item.communityName"
                  :value="item.communityCode">
                </el-option>
              </el-select>
            </el-tooltip>
          </div>
          <!-- <div class="input-group-btn">
            <el-date-picker
              @change="updateYer"
              value-format="yyyy"
              format="yyyy"
              v-model="temp.seachItems.year"
              type="year"
              placeholder="请选择年份">
            </el-date-picker>
          </div> -->
        </div>
        <!-- <div class="scroll-box"> -->
          <table class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th rowspan="2" scope="col">小区</th>
                <th rowspan="2" scope="col">总计</th>
                <template v-if="temp.countLists.length>0">
                <th colspan="2" scope="col" v-for="(value,index) in temp.countLists[0].months.slice(startNumber,startNumber + 5)" :key="index">
                  <span class="d4" v-if="index===0 && startNumber!==0 " @click="updateStartNumber(-5)"></span>
                  <span class="d3" v-else-if="index===4 && startNumber + 5 < temp.countLists[0].months.length" @click="updateStartNumber(5)"></span>
                  {{value}}
                </th>
                </template>
                <template v-if="temp.countLists.length===0">
                   <th colspan="2" scope="col" v-for="(value,index) in month.slice(startNumber,startNumber + 5)" :key="index">
                  {{value}}
                </th>
                </template>
                <th rowspan="2" scope="col" class="chart-td">变化曲线</th>
              </tr>
              <tr>
                <th align="center">人数</th>
                <th align="center">欠费额</th>
                <th align="center">人数</th>
                <th align="center">欠费额</th>
                <th align="center">人数</th>
                <th align="center">欠费额</th>
                <th align="center">人数</th>
                <th align="center">欠费额</th>
                <th align="center">人数</th>
                <th align="center">欠费额</th>
              </tr>
            </thead>
            <tbody v-if="temp.countLists.length > 0">
              <tr v-for="(value, index) in temp.countLists" :key="index">
                <td align="center" class="text-success" width="100px">
                  <el-tooltip :content="value.name" effect="light" placement="top-start">
                    <a @click="link_userTab(value)" style="cursor: pointer">{{value.name | tooltip-filter(4)}}</a>
                  </el-tooltip>
                </td>
                <td align="center" width="1rem">{{value.totalMoneys}}</td>
                <template v-for="(v,i) in value.items.slice(startNumber,startNumber + 5)">
                  <td align="center" @click="link_userInfo(value,i,v.countsAndMoneys.count)" style="cursor: pointer;color: #00fffc">{{v.countsAndMoneys.count}}</td>
                  <td align="center" style="color: #EC5007">￥{{v.countsAndMoneys.money}}</td>
                </template>
                <!--              <td></td>-->
                <td class="chart-td" @click="link_arrarDiagram(value)"><div :id="'echarts'+ index " style="width: 336px;height: 35px">{{darwEcharts(index, value)}}</div></td>
                <!--              <td align="center" class="chart-td"></td>-->
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
  import { getRegionArrearCountList} from '@/api/charge'
  import { getCommunityAll } from '@/api/usercenter'
  import { initPage } from '@/utils/utility'
  import { minecharts } from '@/components/echars/minecharts'
  export default {
    name: "arrearResidentialquarters",
    data(){
      return {
        temp: { seachItems: {}, page: {}, countLists: [{ months: [], items: [], months: [] }] }, // 分页封装对象
        communityOption: [], // 小区下拉列表值
        startNumber: 0,
        month: ["201811", "201812", "201901", "201902", "201903", "201904", "201905", "201906", "201907", "201908","201909", "201910"]
      }
    },
    mounted(){
      //初始化分页查询
      initPage(this.temp, getRegionArrearCountList, 'countLists');
      this.temp.page.pageSize = 8;
      // this.$set( this.temp.seachItems, 'year', '2019');
      this.getCommunitySelectInfo();
    },
    methods: {
      link_userTab(e){
        this.link_arrarDiagram(e)
      },
      getCommunitySelectInfo(){
        getCommunityAll().then(r => {
          this.communityOption = r.data;
          this.communityOption.unshift({communityCode: '',communityName: '查看全部'});
          // this.$set(this.temp.seachItems, 'communityCode', this.communityOption[0].communityCode)
          this.temp.searchCurrent(1);
        })
      },
      updateYer(){
        this.temp.dataInterceptor = this.Istheredata
        this.temp.page.pageNum = 1
        this.temp.searchN();
      },
      Istheredata(e){
        // console.log(e.countLists.length === 0)
        if(e.countLists.length === 0) {
          return false
        }
      },
      updateStartNumber(index) {
        // index: 正负显示title的长度
        // 获取固定title数组的长度
        let length = this.temp.countLists[0].months.length;
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
      darwEcharts(index, date){
        this.$nextTick(function () {
          minecharts(index,date.months,date.values)
        })
      },
      link_arrarDiagram(value){
        if(Number(value.totalMoneys) === 0){
          // this.$message('无数据加载...')
          return false
        }
        this.$router.push({
          name: "arrearDiagram",
          // name: "waterUserCurveJump",
          params: {userNo: '**', userName: '**',communityCode: value.code,contentPriceCode: 'null',elecTypeCode: 'null',type:'arrearResidentialquarters'}
        });
      },
      link_userInfo(value, index, e){
        if(Number(e) === 0){
          // this.$message('人数为0，无数据加载...')
          return false
        }
        this.$router.push({
          name: "arrearUserInfo",
          params: {seachItems: JSON.stringify({communityCode: value.code, month: this.temp.countLists[0].months[this.startNumber+index]})}
        });
      }
    }
  }
</script>

<style scoped>
</style>
