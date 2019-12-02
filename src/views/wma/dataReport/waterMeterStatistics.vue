<template>
  <div class="right right2">
    <div class="right-content right-content2">
      <!--四个装饰角-->
      <div class="top-horn-l"></div>
      <div class="top-horn-r"></div>
      <div class="bottom-horn-l"></div>
      <div class="bottom-horn-r"></div>
      <!--四个装饰角//-->
      <!--右上角按钮-->

      <div class="tablecont-box tablecont-box2">
        <div class="sharetitle" style="width: 14.5rem;">
          水表统计报表
          <div class="input-group-btn" style="display: flex;">
              <el-select
                class="el-modification-input"
                style="width: 1.8rem"
                v-model="temp.seachItems.countryNo"
                placeholder="请选择地域"
              >
                <el-option
                  v-for="item in communityOption"
                  :key="item.communityCode"
                  :label="item.communityName"
                  :value="item.communityCode"
                ></el-option>
              </el-select>
              <el-select class="el-modification" v-model="temp.seachItems.dataType" placeholder="全部"
                style="width:1.7rem;margin-left:3px;font-size:14px"
              >
                <el-option
                  v-for="item in dataType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
          </div>
          <div style="flex: 1;">
            <div class="input-group-btn-right">
            <a href="javascript:void(0)" @click="seachN">
              <span>查询</span>
            </a>
            </div>
            <div class="input-group-btn-right">
              <a href="javascript:void(0)" @click="exportExcel">
                <span>导出本页</span>
              </a>
            </div>
            <div class="input-group-btn-right">
              <a href="javascript:void(0)" @click="exportRemote">
                <span>导出全部</span>
              </a>
            </div>
          </div>
        </div>

        <el-table
          :data="temp.list"
          id="list-table"
          style="width: 100%"
          stripe
          :row-class-name="tabRowClassName"
          :cell-class-name="table_cell_class"
          :header-cell-class-name="table_head_cell_class"
          :header-row-class-name="table_head_row_class"
        >
          <el-table-column prop="countryName" label="小区名称"></el-table-column>
          <el-table-column prop="userNo" label="户号"></el-table-column>
          <el-table-column prop="userName" label="用户名"></el-table-column>
          <el-table-column prop="meterNo" label="表号"></el-table-column>
          <el-table-column prop="day" label="时间"></el-table-column>
          <el-table-column label="数量">
              <template slot-scope="scope">
                <el-tooltip :content="scope.row.count" effect="light" placement="top-start">
                  <a style="cursor: pointer">{{scope.row.count | tooltip-filter(60)}}</a>
                </el-tooltip>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="count" label="数量" ></el-table-column> -->
        </el-table>
        <nav class="pagination-wrap" aria-label="...">
          <el-pagination
            class="pagination"
            style="margin: 5px 0;"
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
  </div>
</template>
<script>
import { getCommunityAll } from "@/api/usercenter";
import { getDataReportListSearch ,getDataReportListSearchExport} from "@/api/wma";
import FileSaver from "file-saver";
import moment from "moment";
import XLSX from "xlsx";
import { initPage } from "@/utils/utility";
export default {
  name: "waterMeterStatistics",
  mounted() {
    initPage(this.temp, getDataReportListSearch, "list");
    this.temp.page.pageSize = 18;
    this.getCommunitySelectInfo();
  },
  data() {
    return {
      table_head_cell_class: "table-customize-header-cell",
      table_head_row_class: "table-customize-header-row",
      table_cell_class: "table-customize-cell",
      table_row_class: "table-customize-row",
      searchDate: "",
      temp: { seachItems: {}, page: {}, list: [] }, // 分页对象
      communityOption: [], //小区code
      dataType: [
        { name: "全部", code: "0" },
        { name: "丢失的水表", code: "1" },
        { name: "异常的水表", code: "2" },
        { name: "未录入的水表", code: "3" }
      ]
    };
  },
  methods: {
    tabRowClassName({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 == 0) {
        return "table-customize-warning-row";
      }
    },
    getCommunitySelectInfo() {
      getCommunityAll().then(r => {
        this.communityOption = r.data;
        this.communityOption.unshift({
          communityCode: "",
          communityName: "查看全部"
        });
        this.temp.searchCurrent(1);
      });
    },
    seachN() {
      this.temp.searchCurrent(1);
    },
    //调用接口生成Excel
    exportRemote() {
      this.loadingExcel = true;
      let postData = this.postData();
      getDataReportListSearchExport(postData).then(res => {
        this.loadingExcel = false;
        if (res.code == 200) {
          try {
            var ws = XLSX.utils.json_to_sheet(res.data.list);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "data");
            let excelname = moment() + ".xlsx";
            XLSX.writeFile(wb, excelname);
            return wb;
          } catch (e) {
            // console.log(e);
          }
        }
      });
    },
    //生成单页Excel
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#list-table"));
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        let excelname = moment() + ".xlsx";
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          excelname
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }
  }
};
</script>

<style scoped>
</style>
