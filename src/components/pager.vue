<template>
  <nav class="pagination-wrap" aria-label="...">
    <ul class="pagination">
      <li>
        <a aria-label="Previous" @click="prevPage" href="javascript:void(0)">
          <span aria-hidden="true">上一页</span>
        </a>
      </li>
      <li v-for="index in pages" :key="index">
        <a
          :class="{'active':index==pageNow}"
          @click="gotoPage(index)"
          href="javascript:void(0)"
        >{{index}}</a>
      </li>
      <li>
        <a aria-label="Next" @click="nextPage" href="javascript:void(0)">
          <span aria-hidden="true">下一页</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "pager",
  data() {
    return {
      pageNow: 1, // 当前页数
      pageSize: 8, // 每页显示条数
      pages: [], //页码
      totalPages: 0, //总页数
      totalCount: 0, // 数据总条数
      pagerId: ""
    };
  },

  methods: {
    render: function( data,pagerId) {
      //debugger
      this.pagerId = pagerId;
      this.pageNow = parseInt(data.pageNum);
      this.totalCount = parseInt(data.totalCount);
      this.totalPages = parseInt(
        (this.totalCount + parseInt(this.pageSize) - 1) /
          parseInt(data.pageSize)
      );
      this.geneatePage();
    },
    prevPage: function() {
      if (this.pageNow > 0) this.pageNow--;
      else return;
      //debugger
      this.$emit("setPagerParams", this.pageNow, this.pagerId);
    },
    nextPage: function() {
      if (this.pageNow < this.totalPages) this.pageNow++;
      else return;
      this.$emit("setPagerParams", this.pageNow);
    },
    gotoPage: function(pageNow) {
      this.pageNow = pageNow;
      this.$emit("setPagerParams", this.pageNow);
    },
    geneatePage: function() {
      let starPage = 0;
      let endPage = 0;
      if (this.totalPages <= 5) {
        starPage = 1;
        endPage = this.totalPages;
      } else if (this.totalPages > 5 && this.pageNow <= 4) {
        starPage = 1;
        endPage = 4;
        if (this.pageNow == 4) {
          endPage = 5;
        }
      } else {
        if (this.totalPages == this.pageNow) {
          starPage = this.pageNow - 3;
          endPage = this.pageNow;
        } else {
          starPage = this.pageNow - 2;
          endPage = this.pageNow + 1;
        }
      }
      this.pages = [];
      for (let i = starPage; i <= endPage; i++) {
        this.pages.push(i);
      }
    }
  }
};
</script>