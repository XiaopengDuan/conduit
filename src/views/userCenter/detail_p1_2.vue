<template>
<div style='height:100%'>
 <!--右上角按钮-->
        <a class="btn-back" @click="$router.go(-1)">
          <span>返回上一级</span>
        </a>
        <!--右上角按钮//-->
 <div class="top-sertch">
        <div class="sertch-form row input-group">
          <div class="col-4"><label class="label-text">用户名</label><input type="text" class="form-control" value="admin" disabled></div>
          <div class="col-4"><label class="label-text">小区</label><input type="text" class="form-control" value="茶园小区" disabled></div>
          <div class="col-4"><label class="label-text">收费方式</label><input type="text" class="form-control" value="坐收" disabled></div>
          <div class="col-4"><label class="label-text">状态</label><input type="text" class="form-control" value="正常运行" disabled></div>
          <div class="col-4"><label class="label-text">用户类型</label><input type="text" class="form-control" value="居民户" disabled></div>
          <div class="col-4"><label class="label-text">余额</label><input type="text" class="form-control" value="¥122389" disabled></div>
        </div>
      </div>
      <div class="bottom-table-box">
          <!--左边表格-->
          <div class="col-6 table-wrap">
            <div class="table-title">
              <div class="text">用户用水变化</div>
            </div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>时间</th>
                  <th>水量（吨）</th>
                  <th>环比增长</th>
                  <th>同比增长</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">201804</td>
                  <td>50</td>
                  <td>10</td>
                  <td>-10</td>
                </tr>
                <tr>
                  <td scope="row">201804</td>
                  <td>201804</td>
                  <td>201804</td>
                  <td>201804</td>
                </tr>
                <tr>
                  <td scope="row">201804</td>
                  <td>50</td>
                  <td>10</td>
                  <td>-10</td>
                </tr>
                <tr>
                  <td scope="row">201804</td>
                  <td>201804</td>
                  <td>201804</td>
                  <td>201804</td>
                </tr>
                <tr>
                  <td scope="row">201804</td>
                  <td>50</td>
                  <td>10</td>
                  <td>-10</td>
                </tr>
                <tr>
                  <td scope="row">201804</td>
                  <td>201804</td>
                  <td>201804</td>
                  <td>201804</td>
                </tr>
                <tr>
                  <td scope="row">201804</td>
                  <td>50</td>
                  <td>10</td>
                  <td>-10</td>
                </tr>
              </tbody>
            </table>
            <nav class="pagination-wrap" aria-label="...">
              <ul class="pagination">
                <li><a href="#" aria-label="Previous"><span aria-hidden="true">上一页</span></a></li>
                <li><a class="active">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">......</a></li>
                <li><a href="#">16</a></li>
                <li><a href="#" aria-label="Next"><span aria-hidden="true">下一页</span></a></li>
              </ul>
            </nav>
          </div>
          <!--左边表格//-->
        <!--右边表格-->
        <div class="col-6 table-wrap table-wrap-r">
          <div class="table-title">
            <div class="text">用户缴费变化</div>
          </div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>时间</th>
                <th>水量（吨）</th>
                <th>环比增长</th>
                <th>同比增长</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">201804</td>
                <td>50</td>
                <td>10</td>
                <td>-10</td>
              </tr>
              <tr>
                <td scope="row">201804</td>
                <td>201804</td>
                <td>201804</td>
                <td>201804</td>
              </tr>
              <tr>
                <td scope="row">201804</td>
                <td>50</td>
                <td>10</td>
                <td>-10</td>
              </tr>
              <tr>
                <td scope="row">201804</td>
                <td>201804</td>
                <td>201804</td>
                <td>201804</td>
              </tr>
              <tr>
                <td scope="row">201804</td>
                <td>50</td>
                <td>10</td>
                <td>-10</td>
              </tr>
              <tr>
                <td scope="row">201804</td>
                <td>201804</td>
                <td>201804</td>
                <td>201804</td>
              </tr>
              <tr>
                <td scope="row">201804</td>
                <td>50</td>
                <td>10</td>
                <td>-10</td>
              </tr>
            </tbody>
          </table>
          <nav class="pagination-wrap" aria-label="...">
            <ul class="pagination">
              <li><a href="#" aria-label="Previous"><span aria-hidden="true">上一页</span></a></li>
              <li><a class="active">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#">5</a></li>
              <li><a href="#">......</a></li>
              <li><a href="#">16</a></li>
              <li><a href="#" aria-label="Next"><span aria-hidden="true">下一页</span></a></li>
            </ul>
          </nav>
        </div>
        <!--右边表格//-->
      </div>
      <!--右侧切换按钮-->
      <router-link  :to="{name:'detail_p2_2',params:$route.params}" class="btn-switch" name="切换" ></router-link>
      <!--右侧切换按钮//-->

</div>
</template>
<script>
export default{
  mounted(){
    let userNo=this.$route.params.userNo;
  }
}
</script>