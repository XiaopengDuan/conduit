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
        <!-- <a href="#" class="btn-back"><span>返回上一级</span></a>-->
        <div class="tablecont-box" v-if="!$store.state.app.loading || temp.lists.length>0">
          <div class="sharetitle">查看列表详情
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
          </div>
          <!-- <div class="scroll-box"> -->
          <table class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
            <tr>
              <th width="100rem">编号</th>
              <th scope="col">
                <span class="d4" @click="updateStartNumber(-8)"></span>
                {{tableTiltes[cursor_num].name}}
              </th>
              <th scope="col">{{tableTiltes[cursor_num + 1].name}}</th>
              <th scope="col">{{tableTiltes[cursor_num + 2].name}}</th>
              <th scope="col">{{tableTiltes[cursor_num + 3].name}}</th>
              <th scope="col">{{tableTiltes[cursor_num + 4].name}}</th>
              <th scope="col">{{tableTiltes[cursor_num + 5].name}}</th>
              <th scope="col" v-if="tableTiltes.length-1 > cursor_num + 6">
                {{tableTiltes[cursor_num + 6].name}}
                 <span v-if="tableTiltes.length-1 <= cursor_num + 7" class="d3" @click="updateStartNumber(8)"></span>
              </th>
              <th scope="col" v-if="tableTiltes.length-1 > cursor_num + 7">
                {{tableTiltes[cursor_num + 7].name}}
                <span class="d3" @click="updateStartNumber(8)"></span>
              </th>
            </tr>
            </thead>
            <tbody v-if="temp.lists.length > 0">
            <tr align="center" v-for="(value, index) in temp.lists" :key="index">
              <td  scope="row" width="100px">
                <el-tooltip :content="value.workorder" effect="light" placement="top-start">
                  <a>{{value.workorder | tooltip-filter(12)}}</a>
                </el-tooltip>
              </td>
              <td>
                 <span v-if="tableTiltes[cursor_num].code === 'workorder'">
                  <span style="color: #FDC900">{{value[tableTiltes[cursor_num].code]}}</span>

                </span>
                <span v-else>{{value[tableTiltes[cursor_num].code]}}</span>

              </td>
              <td>
                <div v-if="tableTiltes[cursor_num + 1].code === 'opration'">
                  <a style="color: #00FA74;cursor: pointer">外呼</a>
                  <a style="color: #00FA74;cursor: pointer">催办</a>
                </div>
                <span v-else>{{value[tableTiltes[cursor_num + 1].code]}}</span>
              </td>
              <td>{{value[tableTiltes[cursor_num + 2].code]}}</td>
              <td>
                <span v-if="tableTiltes[cursor_num + 3].code === 'pullStateName' && value[tableTiltes[cursor_num + 3].code] !== '未领取'">
                  <span style="color: #E04C0F">{{value[tableTiltes[cursor_num + 3].code]}}</span>
                </span>
                <span v-else>{{value[tableTiltes[cursor_num + 3].code]}}</span>
              </td>
              <td>{{value[tableTiltes[cursor_num + 4].code]}}</td>
              <td>{{value[tableTiltes[cursor_num + 5].code]}}</td>
              <td>{{value[tableTiltes[cursor_num + 6].code]}}</td>
              <td v-if="tableTiltes.length-1 > cursor_num + 7">{{value[tableTiltes[cursor_num + 7].code]}}</td>
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
          <!-- </div> -->
        </div>
      </div>
    </div>
</template>

<script>
  import { getCustomerCallAnalysisList} from '@/api/chargeCall'
  import { getCommunityAll } from '@/api/usercenter'
  import { initPage } from '@/utils/utility'
  export default {
        name: "callListDetails",
        data(){
          return {
            temp: { seachItems: {},lists: [],page: {}}, // 分页封装对象
            communityOption: [],
            cursor_num: 0,
            tableTiltes: [
              { code: 'stateName', name: '状态'},
              { code: 'opration', name: '操作'},
              { code: 'pressCount', name: '催办次数'},
              { code: 'pullStateName', name: '领取情况'},
              { code: 'timeOutState', name: '超时情况'},
              { code: 'satisfactionName', name: '满意度'},
              { code: 'contactPhone', name: '联系电话'},
              { code: 'postponeCount', name: '延期次数'},
              { code: 'workorder', name: '工单编号'},
              { code: 'createDate', name: '接报时间'},
              { code: 'createUserName', name: '受理人'},
              { code: 'seat', name: '坐席号'},
              { code: 'telePhone', name: '来电电话'},
              { code: 'userNo', name: '户号'},
              { code: 'contactAddress', name: '发生地址'},
              { code: 'reactiontypeName', name: '反应类别'},
              { code: 'createUserName', name: '受理人'},
              { code: 'seat', name: '坐席号'},
              { code: 'telePhone', name: '来电电话'},
              { code: 'userNo', name: '户号'},
              { code: 'contactAddress', name: '发生地址'},
              { code: 'reactiontypeName', name: '反应类别'},
              { code: 'reactioncontentName', name: '反应类容'},
              { code: 'null', name: ''},
            ]
          }
        },
      created() {
        initPage(this.temp, getCustomerCallAnalysisList, 'lists');
        this.temp.page.pageSize = 13;
        //this.$set(this.temp.seachItems, 'year', '2019');ナ二ヌネノ
        this.temp.searchCurrent(1);
        this.getCommunitySelectInfo()
      },
      methods: {
        tempsearchN() {
          this.temp.page.pageNum = 1;
          this.temp.dataInterceptor = this.Istheredata
          this.temp.searchN();
        },
        Istheredata(e){
          // console.log(e.countLists.length === 0)
          // console.log(e)
          if(e.lists.length === 0) {
            return false
          }
        },
        getCommunitySelectInfo(){
          getCommunityAll().then(r => {
            this.communityOption = r.data;
            this.communityOption.unshift({communityCode: '',communityName: '查看全部'})
            // this.$set(this.temp.seachItems, 'communityCode', this.communityOption[0].communityCode)
          })
        },
        updateStartNumber(index) {
          if (index > 0 && this.cursor_num + 7 < this.tableTiltes.length-1) {
            this.cursor_num += index;
          } else if (index < 0 && this.cursor_num > 0) {
            this.cursor_num += index;
          }
        }
      }
    }
</script>

