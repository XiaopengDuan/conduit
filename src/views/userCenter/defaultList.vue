<template>
  <div style="height:100%">
    <div class="bottom-table-box bottom-table-box-khbb" style="margin-top:30px;height: 90%">
      <!--左边表格-->
      <div class="col-12 table-wrap" style="max-width:15.9rem;height:90%;">
        <div class="table-title">
          <div class="text" style="padding-left:15px;">违约详情</div>
        </div>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>违约时间</th>
            <th>违约类型</th>
            <th>违约内容</th>
            <th>欠费金额</th>
            <th>违约状态</th>
            <th>备注</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(value, index) in temp.defaultList" :key="index">
            <td scope="row">{{value.month}}</td>
            <td style="color: #D45246">{{value.defaultType}}</td>
            <td >{{value.defaultContent}}</td>
            <td style="color: #D45246">￥{{value.arrearsMoney}}</td>
            <td>{{value.defaultType}}</td>
            <td>{{value.remark}}</td>
          </tr>
          </tbody>
        </table>
        <nav  class="pagination-wrap" aria-label="...">
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
      </div>

    </div>
    <router-link :to="{name:'defaultDetail',params:{userNo:$route.params.userNo}}" class="btn-switch" name="切换"></router-link>
  </div>
</template>


<script>
  import { getDefaultInfoList } from "@/api/usercenter";
  import { initPage } from '@/utils/utility'
  export default {
    data() {
      return {
        temp: {defaultList: [],page: {}}
      };
    },
    mounted() {
      if(this.$route.params.userNo) {
        initPage(this.temp, getDefaultInfoList, 'defaultList')
        this.temp.page.pageSize = 10
        this.temp.seachItems.userNo = this.$route.params.userNo
        this.temp.searchCurrent(1);
      }
    }
  };
</script>
