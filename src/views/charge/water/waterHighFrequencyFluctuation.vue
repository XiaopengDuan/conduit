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
      <!-- <a href="#" class="btn-back"><span>返回上一级</span></a> -->
      <div class="tablecont-box" v-if="temp.countLists.length===0 || Object.keys(temp.countLists[0].countsAndPowers).length>0">
        <div class="sharetitle">小区用水高频波动分析
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
          <!-- <div class="input-group-btn">
            <el-date-picker
              @change="tempsearchN"
              value-format="yyyy"
              format="yyyy"
              v-model="temp.seachItems.year"
              type="year"
              placeholder="请选择年份">
            </el-date-picker>
          </div> -->
        </div>
        <!-- <div class="scroll-box"> -->
          <table  class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
            <tr>
              <th rowspan="2" scope="col">小区名</th>
              <th rowspan="2" scope="col">总价</th>
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
              <th rowspan="2" scope="col">变化曲线</th>
            </tr>
            <tr>
              <th align="center">人数</th>
              <th align="center">水量</th>
              <th align="center">人数</th>
              <th align="center">水量</th>
              <th align="center">人数</th>
              <th align="center">水量</th>
              <th align="center">人数</th>
              <th align="center">水量</th>
              <th align="center">人数</th>
              <th align="center">水量</th>
            </tr>
            </thead>
            <tbody  v-if="temp.countLists.length > 0">
            <tr v-for="(value, index) in temp.countLists" :key="index">
              <td align="center" class="text-success" width="100px">
                <el-tooltip :content="value.name" effect="light" placement="top-start">
                  <a>{{value.name | tooltip-filter}}</a>
                </el-tooltip>
              </td>
              <td align="center" width="100px">{{value.totalPowers}}</td>
              <template v-for="(v,i) in Object.values(value.countsAndPowers).slice(startNumber,startNumber + 5)">
                <td align="center">{{v.count}}</td>
                <td align="center" class="ly-pointer" @click="link_userRanking(value, v.power)">{{v.power}}</td>
              </template>

              <td align="center" class="chart-td" @click="link_CurveJump(value)"><div :id="'echarts'+ index " style="width: 100%;height:23px">{{darwEcharts(index, value)}}</div></td>
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
              :pager-count="5"
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
  import { getContentPriceSelect, getCommunityWaterHighFreqVolatiRank} from '@/api/chargeWater'
  import { getCommunityAll } from '@/api/usercenter'
  import { initPage } from '@/utils/utility'
  import { minecharts } from '@/components/echars/minecharts'
  export default {
    name: "waterHighFrequencyFluctuation",
    components: {
    },
    created() {
      // 初始化分页对象
      initPage(this.temp, getCommunityWaterHighFreqVolatiRank, 'countLists')
      this.temp.page.pageSize = 10;
      // this.$set(this.temp.seachItems, 'year', null);
      this.temp.searchCurrent(1);
      // 获取小区下拉列表数据
      this.getCommunitySelectInfo();
      // 获取水价类型下拉列表数据 
      this.getContentPriceOption()
    },
    computed: {
    },
    data(){
      return {
        show: false,
        startNumber: 0,
        communityOption: [],
        temp: {seachItems:{},countLists: [{countsAndPowers: {}}],page:{}},
        contentPriceOption: [],
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
      link_CurveJump(value){
        this.$router.push({
          name: "waterUnderpaidCustomers",
          // name: "waterUserCurveJump",
          params: {userNo: '**', userName: '**',seachItems: JSON.stringify({communityCode: value.code}), type:'analysisUseWater',state: 2}
        });
      },
      link_userRanking(value, e){
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
      getContentPriceOption() {
        getContentPriceSelect().then(r => {
          let keys = Object.keys(r.data);
          let values = Object.values(r.data);
          for(let i=0;i < keys.length; i++){
            this.contentPriceOption.push({ key: keys[i], value: values[i] });
          }
        })
      },
      getCommunitySelectInfo(){
        getCommunityAll().then(r => {
          this.communityOption = r.data;
          this.communityOption.unshift({communityCode: '',communityName: '查看全部'});
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
          minecharts(index,date.months,date.values)
        })
      }
    }
  }
</script>
