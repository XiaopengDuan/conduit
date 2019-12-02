<template>
  <div class="content-box">
      <div class="pull-left data-left">
        <div class="data-wrap question-ranking">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <div class="title">来电反映的问题排行 </div>
          <ul class="list-question">
            <li>
              <div class="name">投诉-缴费业务</div>
              <div class="number">12801<small>个</small></div>
            </li>
            <li>
              <div class="name">投诉-工程施工</div>
              <div class="number">12801<small>个</small></div>
            </li>
            <li>
              <div class="name">投诉-缴费业务</div>
              <div class="number">12801<small>个</small></div>
            </li>
            <li>
              <div class="name">投诉-无水投诉</div>
              <div class="number">12801<small>个</small></div>
            </li>
            <li>
              <div class="name">报装-管件</div>
              <div class="number">12801<small>个</small></div>
            </li>
            <li>
              <div class="name">报装-管线</div>
              <div class="number">12801<small>个</small></div>
            </li>
            <li>
              <div class="name">报漏-室外二次供水漏水</div>
              <div class="number">12801<small>个</small></div>
            </li>
            <li>
              <div class="name">报装-阀门</div>
              <div class="number">12801<small>个</small></div>
            </li>
          </ul>
        </div>
        
        <div class="data-wrap question-number">
          <!--四个装饰角-->
          <div class="top-horn-l"></div>
          <div class="top-horn-r"></div>
          <div class="bottom-horn-l"></div>
          <div class="bottom-horn-r"></div>
          <!--四个装饰角//-->
          <div class="title">小区长期反应的问题数量前10
            <div id="app" class="input-group-btn"><button type="button" class="btn choose-time">中景豪庭 <span class="caret"></span></button> <ul class="dropdown-menu" style="display: none;"><li><a>一区</a></li> <li><a>二区</a></li> <li><a>三区</a></li> <li><a>四区</a></li></ul></div><!-- /btn-group -->
          </div>
          <ul class="list-number">
            <li>
              <div class="name"><span class="number">01</span>指标名称</div>
              <div class="line-box">
                <div class="line-orange"></div>
              </div>
            </li>
            <li>
              <div class="name"><span class="number">02</span>指标名称</div>
              <div class="line-box">
                <div class="line-orangeyellow" style="width: 90%"></div>
              </div>
            </li>
            <li>
              <div class="name"><span class="number">03</span>指标名称</div>
              <div class="line-box">
                <div class="line-yellow" style="width: 80%"></div>
              </div>
            </li>
            <li>
              <div class="name"><span class="number">04</span>指标名称</div>
              <div class="line-box">
                <div class="line-green" style="width: 70%"></div>
              </div>
            </li>
            <li>
              <div class="name"><span class="number">05</span>指标名称</div>
              <div class="line-box">
                <div class="line-green2" style="width: 60%"></div>
              </div>
            </li>
            <li>
              <div class="name"><span class="number">06</span>指标名称</div>
              <div class="line-box">
                <div class="line-green3" style="width: 50%"></div>
              </div>
            </li>
            <li>
              <div class="name"><span class="number">07</span>指标名称</div>
              <div class="line-box">
                <div class="line-blue" style="width: 40%"></div>
              </div>
            </li>
            <li>
              <div class="name"><span class="number">08</span>指标名称</div>
              <div class="line-box">
                <div class="line-blue2" style="width: 30%"></div>
              </div>
            </li>
            <li>
              <div class="name"><span class="number">09</span>指标名称</div>
              <div class="line-box">
                <div class="line-blue3" style="width: 20%"></div>
              </div>
            </li>
            <li>
              <div class="name"><span class="number">10</span>指标名称</div>
              <div class="line-box">
                <div class="line-blue4" style="width: 10%"></div>
              </div>
            </li>
          </ul>
        </div>
        
        <div class="data-wrap question-chart">
            <!--四个装饰角-->
            <div class="top-horn-l"></div>
            <div class="top-horn-r"></div>
            <div class="bottom-horn-l"></div>
            <div class="bottom-horn-r"></div>
            <!--四个装饰角//-->
            <div class="title">小区长期出现问题变化曲线
              <div id="app" class="input-group-btn"><button type="button" class="btn choose-time">中景豪庭 <span class="caret"></span></button> <ul class="dropdown-menu" style="display: none;"><li><a>一区</a></li> <li><a>二区</a></li> <li><a>三区</a></li> <li><a>四区</a></li></ul></div><!-- /btn-group -->
            </div>
            <div class="chart-box"><img src="../../../assets/img/chart06.jpg" /></div>
          </div>
      </div>
      <div class="pull-left data-middle">
          <div class="data-wrap map-box">
              <!--四个装饰角-->
              <div class="top-horn-l"></div>
              <div class="top-horn-r"></div>
              <div class="bottom-horn-l"></div>
              <div class="bottom-horn-r"></div>
              <!--四个装饰角//-->
              <!--右上角按钮-->
              <a href="#" class="btn-back"><span>返回上一级</span></a>
              <!--右上角按钮//-->
              <!--右下角加号-->
              <a href="#" class="btn-add"></a>
              <!--右下角加号//-->
              <div class="instructions">
                <span>高</span>
                <div class="line"></div>
                <span>低</span>
              </div>
            </div>
        
            <div class="data-wrap question-user">
                <!--四个装饰角-->
                <div class="top-horn-l"></div>
                <div class="top-horn-r"></div>
                <div class="bottom-horn-l"></div>
                <div class="bottom-horn-r"></div>
                <!--四个装饰角//-->
                <div class="title">小区用户反应问题数量
                  <div id="app" class="input-group-btn"><button type="button" class="btn choose-time">中景豪庭 <span class="caret"></span></button> <ul class="dropdown-menu" style="display: none;"><li><a>一区</a></li> <li><a>二区</a></li> <li><a>三区</a></li> <li><a>四区</a></li></ul></div><!-- /btn-group -->
                    <a class="more">更多</a>
                </div>
                <div class="chart-box"><img src="../../../assets/img/chart07.png" /></div>
              </div>
      </div>
      <div class="pull-right data-left">
          <div class="data-wrap question-phone">
              <!--四个装饰角-->
              <div class="top-horn-l"></div>
              <div class="top-horn-r"></div>
              <div class="bottom-horn-l"></div>
              <div class="bottom-horn-r"></div>
              <!--四个装饰角//-->
              <div class="title">小区来电问题排行
              </div>
              <div class="chart-box"><img src="../../../assets/img/chart08.png" /></div>
            </div>
            
            <div class="data-wrap question-proportion">
                <!--四个装饰角-->
                <div class="top-horn-l"></div>
                <div class="top-horn-r"></div>
                <div class="bottom-horn-l"></div>
                <div class="bottom-horn-r"></div>
                <!--四个装饰角//-->
                <div class="title">不同用水用户反应问题占比
                  <div id="app" class="input-group-btn"><button type="button" class="btn choose-time">中景豪庭 <span class="caret"></span></button> <ul class="dropdown-menu" style="display: none;"><li><a>一区</a></li> <li><a>二区</a></li> <li><a>三区</a></li> <li><a>四区</a></li></ul></div><!-- /btn-group -->
                </div>
                <div class="chart-box"><img src="../../../assets/img/chart09.png" /></div>
              </div>
              
            <div class="data-wrap question-handle">
                <!--四个装饰角-->
                <div class="top-horn-l"></div>
                <div class="top-horn-r"></div>
                <div class="bottom-horn-l"></div>
                <div class="bottom-horn-r"></div>
                <!--四个装饰角//-->
                <div class="title">小区问题处理情况
                    <a class="more">更多</a>
                </div>
                <div class="chart-box"><img src="../../../assets/img/chart10.png" /></div>
              </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "Home",
  components:{
    
  },
  data(){
    return {
      menuIndex: 3,
    }
  },
  mounted(){

  },
  methods: {
    back() {
      this.$router.go(-1); //返回上一层
    }
  }
}
</script>