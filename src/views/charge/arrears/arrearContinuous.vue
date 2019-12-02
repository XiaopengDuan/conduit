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
      <!-- <a href="javascript: void (0)" @click="link_userTab()" class="btn-back"><span>返回上一级</span></a> -->
      <div class="tablecont-box" v-if="temp.countLists.length === 0 || temp.countLists[0].items.length>0">
        <div class="sharetitle">
          连续欠费人数
          <div class="input-group-btn">
            <el-tooltip class="item" content="按回车默认查询" placement="top-start" effect="light">
              <el-select  @change="tempsearchN" v-model="temp.seachItems.communityCode" placeholder="请选择地域">
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
            <el-date-picker
              @change="tempsearchN"
              value-format="yyyyMM"
              format="yyyyMM"
              v-model="temp.seachItems.startMonth"
              type="month"
              placeholder="请选择月份">
            </el-date-picker>
          </div>
        </div>
        <!-- <div class="scroll-box"> -->
          <table  class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
            <tr>
              <th rowspan="2" scope="col">小区</th>
              <th rowspan="2" scope="col">总计</th>
              <template v-if="temp.countLists.length>0">
              <th colspan="2" scope="col" v-for="(value,index) in temp.countLists[0].items.slice(startNumber,startNumber + 5)" :key="index">
                <span class="d4" v-if="index===0 && startNumber!==0 " @click="updateStartNumber(-1)"></span>
                <span class="d3" v-else-if="index===4 && startNumber + 5 < temp.countLists[0].items.length" @click="updateStartNumber(1)"></span>
                {{value.month}}
              </th>
              </template>
              <template v-if="temp.countLists.length===0">
              <th colspan="2" scope="col" v-for="(value,index) in months.slice(startNumber,startNumber + 5)" :key="index">
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
            <tr v-for="(value, index) in temp.countLists" key="code">
              <td align="center" class="text-success" width="100px">
                <el-tooltip :content="value.communityName" effect="light" placement="top-start">
                  <a @click="link_userTab(value)" style="cursor: pointer">{{value.communityName | tooltip-filter(4)}}</a>
                </el-tooltip>
              </td>
              <td align="center" width="1rem">￥{{value.totalMoneys}}</td>
              <template v-for="(v,i) in value.items.slice(startNumber,startNumber + 5)">
                <td align="center" @click="link_userInfo(value,i,v.countsAndMoneys.counts)" style="cursor: pointer;color: #00fffc">{{v.countsAndMoneys.counts}}</td>
                <td align="center" style="color: #EC5007">￥{{v.countsAndMoneys.moneys}}</td>
              </template>
<!--              <td></td>-->
              <td class="chart-td" @click="link_arrarDiagram(value)"><div :id="'echarts'+ index " style="width: 336px;height: 35px">{{darwEcharts(index, value)}}</div></td>
              <!--<td align="center" class="chart-td"></td>
              -->
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
  import { getContinuousUserCountList} from '@/api/charge'
  import { getCommunityAll } from '@/api/usercenter'
  import { initPage } from '@/utils/utility'
  import { minecharts } from '@/components/echars/minecharts'
    export default {
        name: "getContinuousUserCountList",
        data(){
          return {
            temp: { seachItems: {}, page: {}, countLists: [{ months: [], items: [], months: [] }] }, // 分页封装对象
            communityOption: [], // 小区下拉列表值
            startNumber: 0,
            months:["欠 1 个月", "欠 2 个月", "欠 3 个月", "欠 4 个月", "欠 5 个月", "欠 6 个月", "欠 7 个月"]
          }
        },
      mounted(){
        //初始化分页查询
        initPage(this.temp, getContinuousUserCountList, 'countLists')
        this.temp.page.pageSize = 8;
        let date = new Date();
        this.$set( this.temp.seachItems, 'startMonth', (date.getFullYear() - 1).toString() + (date.getMonth()+1>9?date.getMonth()+1:'0'+(date.getMonth()+1)).toString())
        this.getCommunitySelectInfo()
      },
      methods: {
        tempsearchN(){
          this.temp.page.pageNum = 1
          this.temp.dataInterceptor = this.Istheredata
          this.temp.searchN();
        },
        Istheredata(e){
          // console.log(e.countLists.length === 0)
          if(e.countLists.length === 0) {
            return false
          }
        },
        getCommunitySelectInfo(){
          getCommunityAll().then(r => {
            this.communityOption = r.data
            this.communityOption.unshift({communityCode: '',communityName: '查看全部'})
            // this.$set(this.temp.seachItems, 'communityCode', this.communityOption[0].communityCode)
            /* 　
             */
            this.temp.searchCurrent(1)
          })
        },
        // updateYer(){
        //   this.temp.page.pageNum = 1
        //   this.temp.searchN()
        // },
        link_arrarDiagram(value){
          // console.log(value)
          this.$router.push({
            name: "arrearDiagram",
            // params: {communityCode: value.communityCode,contentPriceCode: 'null',elecTypeCode: 'null'}
            // name: "waterUserCurveJump",
            params: {userNo: '**', userName: '**', communityCode: value.communityCode, contentPriceCode: 'null', elecTypeCode: 'null',startMonth:this.temp.seachItems.startMonth, type:'arrearResidentialquarters2'}
          });
        },
        link_userInfo(value, index, e){
          if(Number(e) === 0){
            // this.$message('人数为0，无数据加载...')
            return false
          }
          this.$router.push({
            name: "arrearUserInfo",
            params: {seachItems: JSON.stringify({communityCode: value.communityCode, conNum: this.startNumber+index+1,startMonth: this.temp.seachItems.startMonth})}
          });
        },
        updateStartNumber(index){
          if(index>0 && this.startNumber + 4 < this.temp.countLists[0].items.length){
            this.startNumber += index
          } else if (index<0 && this.startNumber > 0){
            this.startNumber += index
          }
        },
        darwEcharts(index, date){
          this.$nextTick(function () {
            minecharts(index,date.months,date.counts)
          })
        }
      }
    }
</script>

<style scoped>
</style>
