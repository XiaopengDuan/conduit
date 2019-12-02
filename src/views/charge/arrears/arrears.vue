<template>
  <div class="tablecont-box">
          <div class="title">用户来电分析
            <div class="input-group-btn" id="app">
                <button type="button" @click="showCont" class="btn choose-time" >中景豪庭 <span class="caret"></span></button>
                <ul class="dropdown-menu" v-show="show">
                </ul>
              </div><!-- /btn-group -->
              <div class="input-group-btn app" id="date">
                  <button type="button" @click="showCont" class="btn choose-time" >2018 <span class="caret"></span></button>
                  <ul class="dropdown-menu" v-show="show">
                  
                  </ul>
                </div><!-- /btn-group -->
          </div>
          <ul class="nav nav-tabs nav-jf">
            <li><a>税务设置</a><img src="../../../assets/img/tab_list_active.png"></li>
            <li class="active"><a>计费设置</a><img src="../../../assets/img/tab_list_active.png" style="display: block;"></li>
          </ul>
          <!-- <div class="scroll-box"> -->
            <table class="table table-jf table-fx" width="100%" border="0" cellspacing="0" cellpadding="0">
              <thead>
              <tr>
                <th rowspan="2" scope="col">来电类型</th>
                <th rowspan="2" scope="col">年份</th>
                <th rowspan="2" scope="col">总计</th>
                <th colspan="2" scope="col"><span class="d4"></span>201809</th>
                <th colspan="2" scope="col">201810</th>
                <th colspan="2" scope="col">201811</th>
                <th colspan="2" scope="col">201812<span class="d3"></span></th>
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="4" align="center" class="text-success">报装</td>
                <td align="center">2018</td>
                <td align="center">200</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center" class="chart-td"><img src="../../../assets/img/chart05.png" /></td>
              </tr>
              <tr>
                <td align="center">2019</td>
                <td align="center">200</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center" class="chart-td"><img src="../../../assets/img/chart05.png" /></td>
              </tr>
              <tr>
                <td align="center">同比</td>
                <td align="center">200</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center" class="chart-td"><img src="../../../assets/img/chart05.png" /></td>
              </tr>
              <tr>
                <td align="center">环比增长率</td>
                <td align="center">200</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center" class="chart-td"><img src="../../../assets/img/chart05.png" /></td>
              </tr>
              <tr>
                <td rowspan="4" align="center" class="text-success">报修</td>
                <td align="center">2018</td>
                <td align="center">200</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center" class="chart-td"><img src="../../../assets/img/chart05.png" /></td>
              </tr>
              <tr>
                <td align="center">2019</td>
                <td align="center">200</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center" class="chart-td"><img src="../../../assets/img/chart05.png" /></td>
              </tr>
              <tr>
                <td align="center">同比</td>
                <td align="center">200</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center" class="chart-td"><img src="../../../assets/img/chart05.png" /></td>
              </tr>
              <tr>
                <td align="center">环比增长率</td>
                <td align="center">200</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center" class="chart-td"><img src="../../../assets/img/chart05.png" /></td>
              </tr>
              <tr>
                <td rowspan="4" align="center" class="text-success">咨询</td>
                <td align="center">2018</td>
                <td align="center">200</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center" class="chart-td"><img src="../../../assets/img/chart05.png" /></td>
              </tr>
              <tr>
                <td align="center">2019</td>
                <td align="center">200</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center" class="chart-td"><img src="../../../assets/img/chart05.png" /></td>
              </tr>
              <tr>
                <td align="center">同比</td>
                <td align="center">200</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center" class="chart-td"><img src="../../../assets/img/chart05.png" /></td>
              </tr>
              <tr>
                <td align="center">环比增长率</td>
                <td align="center">200</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center">200</td>
                <td align="center">3820t</td>
                <td align="center" class="chart-td"><img src="../../../assets/img/chart05.png" /></td>
              </tr>
            </tbody>
            </table> 
          <!-- </div> -->
      </div>
</template>