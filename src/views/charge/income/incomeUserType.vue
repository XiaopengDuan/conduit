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
      <!-- <a href="#" class="btn-back" @click="$router.go(-1)"><span>返回上一级</span></a> -->
      <div class="tablecont-box" v-if="temp.queryData.length===0 || temp.queryData[0].cellList.length>0">
        <div class="sharetitle">不同用户类型收益
          <div class="input-group-btn">
<!--              <el-select  @change="temp.searchCurrent(1)" v-model="temp.seachItems.communityCode" placeholder="请选择地域">-->
<!--                <el-option-->
<!--                  v-for="item in communityOption"-->
<!--                  :key="item.communityCode"-->
<!--                  :label="item.communityName"-->
<!--                  :value="item.communityCode">-->
<!--                </el-option>-->
<!--              </el-select>-->
          </div>
        </div>
        <!--            <ul class="nav nav-tabs nav-jf">-->
        <!--              <li><a>税务设置</a><img src="@/assets/img/tab_list_active.png"></li>-->
        <!--              <li class="active"><a>计费设置</a><img src="@/assets/img/tab_list_active.png" style="display: block;"></li>-->
        <!--            </ul>-->
        <!-- <div class="scroll-box"> -->
          <table  class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
            <tr>
              <th rowspan="2" scope="col">用水类型</th>
              <th rowspan="2" scope="col">总计</th>
              <th colspan="2" scope="col" v-for="(value,index) in temp.queryData[0].cellList.slice(startNumber,startNumber + 5)" :key="index">
                <span class="d4" v-if="index===0 && startNumber!==0 " @click="updateStartNumber(-5)"></span>
                <span class="d3" v-else-if="index===4 && startNumber + 5 < temp.queryData[0].cellList.length" @click="updateStartNumber(5)"></span>
                {{value.month}}
              </th>
              <th rowspan="2" scope="col" class="chart-td">变化曲线</th>
            </tr>
            <tr>
              <th align="center">应收</th>
              <th align="center">实收</th>
              <th align="center">应收</th>
              <th align="center">实收</th>
              <th align="center">应收</th>
              <th align="center">实收</th>
              <th align="center">应收</th>
              <th align="center">实收</th>
              <th align="center">应收</th>
              <th align="center">实收</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(value, index) in temp.queryData" :key="index">
              <td align="center" class="text-success" width="100px">
                <el-tooltip :content="value.typeName" effect="light" placement="top-start">
                  <a @click="link_userTab(value)" style="cursor: pointer">{{value.typeName | tooltip-filter}}</a>
                </el-tooltip>
              </td>
              <td align="center" width="1rem">{{value.totalChargeMoney}}</td>
              <template v-for="(v,i) in value.cellList.slice(startNumber,startNumber + 5)">
                  <td class="detailLink" @click="link_detail_curve(value, v.element.totalMoney)">￥{{v.element.totalMoney}}</td>
                  <td class="detailLink"
                    style="color: red"
                    @click="link_detail_curve(value, v.element.chargeMoney)"
                  >￥{{v.element.chargeMoney}}</td>
              </template>
              <td class="chart-td" @click="link_detail_page(value)"><div :id="'echarts'+ index " style="width: 336px;height: 35px">{{darwEcharts(index, value.graph)}}</div></td>
              <!--              <td align="center" class="chart-td"></td>-->
            </tr>
            </tbody>
          </table>
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
<style scoped>
.detailLink {
  cursor: pointer;
  text-align: center;
}
</style>
<script>
  let echarts = require("echarts");
  import { get41IncomeByUserType} from '@/api/charge'
  import { getCommunityAll } from '@/api/usercenter'
  import { initPage } from '@/utils/utility'
  import { minecharts } from '@/components/echars/minecharts'
  export default {
    name: "incomeUserType",
    components: {
    },
    mounted() {
      // 初始化分页
      initPage(this.temp, get41IncomeByUserType, 'queryData')
      this.temp.page.pageSize = 8;
      // 查询第一页
      this.temp.searchCurrent(1)
      // 获取下拉列表
      this.getCommunitySelectInfo()
    },
    computed: {
    },
    data(){
      return {
        startNumber: 0, // 表格左右切换的下标
        communityOption: [],
        temp: {seachItems:{},queryData: [{cellList: [],graph: {xData:[]}}],page:{}},
      }
    },
    methods: {
      link_detail_curve(value, e) {
        if(parseInt(e) === 0){
          // this.$message('无数据加载...')
          return false
        }
        this.$router.push({
          name: "incomeUserType2",
          params: { typeCode: value.typeCode, typeName: value.typeName }
        });
      },
      link_detail_page(value){
        if(value.totalChargeMoney+value.totalShouldMoney === 0){
          // this.$message('无数据加载...')
          return false
        }
        this.$router.push({
          name: "incomeResidentialGraph",
          // name: "incomeResidentialGraph2",
          params: { typeCode: value.typeCode, typeName: value.typeName, type:'UserType'}
        })
      },
      getCommunitySelectInfo(){
        getCommunityAll().then(r => {
          this.communityOption = r.data
          this.communityOption.unshift({communityCode: '',communityName: '查看全部'})
          // this.$set(this.temp.seachItems, 'communityCode', this.communityOption[0].communityCode)
        })
      },
      updateStartNumber(index){
        // index: 正负显示title的长度
        // 获取固定title数组的长度
        let length = this.temp.queryData[0].cellList.length;
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

      darwEcharts(index, date) {
        if(!date.chargeYData){
          return
        }

        this.$nextTick(function () {
          minecharts(index,date.xData,date.chargeYData)
        })
      },
      linkGraph(value){
        this.$router.push({
          name: "incomeResidentialGraph",
          params: {}
        });
      },
      link_userTab(value) {
        this.$router.push({
          name: "incomeUserType2",
          params: {typeCode: value.typeCode, typeName: value.typeName}
        });
      }
    }
  }
</script>

