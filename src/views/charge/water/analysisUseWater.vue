<template>
   <div class="right right2">
     <div class="right-content" >
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <!--右上角按钮-->
          <!-- <a href="#" class="btn-back"><span>返回上一级</span></a> -->
          <div class="tablecont-box" v-if="temp.countLists.length===0 || Object.keys(temp.countLists[0].countsAndPowers).length>0">
            <div class="sharetitle">不同地域用水量列表
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
                <!-- <el-date-picker
                  @change="temp.searchN"
                  value-format="yyyy"
                  format="yyyy"
                  v-model="temp.seachItems.year"
                  type="year"
                  placeholder="请选择年份">
                </el-date-picker> -->
<!--                  <el-select class="el-modification" @change="temp.searchN" v-model="temp.seachItems.year" placeholder="请选择年份">-->
<!--                    <el-option-->
<!--                      v-for="item in yearOption"-->
<!--                      :key="item.code"-->
<!--                      :label="item.value"-->
<!--                      :value="item.code">-->
<!--                    </el-option>-->
<!--                  </el-select>-->
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
                  <th rowspan="2" scope="col">小区</th>
                  <th rowspan="2" scope="col">总计</th>
<!--                  <th colspan="2" scope="col" v-for="(value,index) in temp.months.slice(startNumber,startNumber + 4)">{{value}}</th>-->
                  <template v-if="temp.countLists.length>0">
                  <th colspan="2" scope="col" v-for="(value,index) in Object.keys(temp.countLists[0].countsAndPowers).slice(startNumber,startNumber + 5)" :key="index">
                    <span class="d4" v-if="index===0 && startNumber!==0 " @click="updateStartNumber(-5)"></span>
                    <span class="d3" v-else-if="index===4 && startNumber + 5 < Object.keys(temp.countLists[0].countsAndPowers).length" @click="updateStartNumber(5)"></span>
                    {{value}}
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
                  <th align="center">用户数</th>
                  <th align="center">用水量</th>
                  <th align="center">用户数</th>
                  <th align="center">用水量</th>
                  <th align="center">用户数</th>
                  <th align="center">用水量</th>
                  <th align="center">用户数</th>
                  <th align="center">用水量</th>
                  <th align="center">用户数</th>
                  <th align="center">用水量</th>
                </tr>
                </thead>
                <tbody v-if="temp.countLists.length > 0">
                <tr v-for="(value, index) in temp.countLists" :key="index">
                  <td align="center" class="text-success" width="100px">{{value.name}}</td>
                  <td align="center">{{value.totalPowers}}</td>
                  <template v-for="(v,i) in Object.values(value.countsAndPowers).slice(startNumber,startNumber + 5)">
                    <td align="center">{{v.count}}</td>
                    <td align="center" class="ly-pointer" @click="link_userRanking(value,v.power)">{{v.power}}</td>
                  </template>
                  <td align="center" class="chart-td" @click="link_CurveJump(value)"><div :id="'echarts'+ index " style="width: 100%;height: 35px">{{darwEcharts(index, value.values)}}</div></td>
                </tr>
              </tbody>
              </table>
              <div v-if="temp.countLists.length === 0" class="nodata">
                暂无数据
              </div>
              <nav class="pagination-wrap"   aria-label="...">
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
  import { getRegionUseWaterList} from '@/api/charge'
  import { getCommunityAll } from '@/api/usercenter'
  import { initPage } from '@/utils/utility'
  import { minecharts } from '@/components/echars/minecharts'
    export default {
        name: "analysisUseWater",
        components: {
        },
        mounted() {
          //初始化分页查询
          initPage(this.temp, getRegionUseWaterList, 'countLists')
          this.temp.page.pageSize = 8;
          this.$set( this.temp.seachItems, 'year', '')
          this.getCommunitySelectInfo()
        },
        data(){
          return {
            startNumber: 0, // table 标题左右切换下标
            communityOption: [], // 小区下拉框集合
            temp: {seachItems:{year: '2019'},countLists: [{countsAndPowers: []}],page:{}},
            headersList: ['01','02','03','04','05','06','07','08','09','10','11','12'],
            months:["201811", "201812", "201901", "201902", "201903", "201904", "201905", "201906", "201907", "201908","201909", "201910"]
          }
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
              this.temp.searchCurrent(1)
            })
          },

          updateStartNumber(index){
            // index: 正负显示title的长度
            // 获取固定title数组的长度
            let length = Object.keys(this.temp.countLists[0].countsAndPowers).length;
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
              var ff = ['01','02','03','04','05','06','07','08','09','10','11','12']
              minecharts(index,ff,date)
            })
          },
          link_userRanking(value,e){
            if(parseInt(e) === 0){
              // this.$message('0吨，无数据加载...')
              return false
            }
            // console.log('link', value)
            this.$router.push({
              name: "waterUserRanking",
              params: {seachItems: JSON.stringify({communityCode: value.code})}
            });
          },
          link_CurveJump(value){
            // console.log('link', value)
            this.$router.push({
              name: "waterCurveJump",
              // name: "waterUserCurveJump",
              params: {userNo: '**', userName: '**',seachItems: JSON.stringify({communityCode: value.code}), type:'analysisUseWater'}
            });
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

