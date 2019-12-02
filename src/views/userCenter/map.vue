<template>
  <div style="height:100%">
    <div class="map-box">
      <div class="map" id="map"></div>
      <!--搜索栏-->
      <div class="sertch-wrap">
        <router-link to="#" class="sertch"></router-link>
        <div class="sertch-form input-group">
          <div class="sertch-form-bg"></div>
          <div class="input-group-btn" id="app">
            <button type="button" class="btn" @click="showCommunity">
              {{communityName}}
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu dropdown-community scroll-box" v-show="show">
              <li
                v-for="(data,index) in community"
                :key="index"
                @click="chooseCommunity(data.communityCode,data.communityName,data.longitude,data.latitude)"
              >{{data.communityName}}
              </li>
            </ul>
          </div>
          <!-- /btn-group -->

          <label>户号</label>
          <!-- @keyup="searchUser(1) userNoInput" -->
          <input
            type="text"
            class="form-control"
            aria-label="Text input with dropdown button"
            v-model="userNoInput"
          />
          <ul class="dropdown-menu dropdown-userNo scroll-box" v-show="showUserNoDropdown">
            <li
              v-for="(item,index) in userNoList"
              :key="index"
              @click="loadDetail(item.userNo,item.userName,item.latitude,item.longitude,item.communityName,item.communityCode)"
            >{{item.userName|ellipsis}}( {{item.userNo}})
            </li>
          </ul>
          <label>户名</label>
          <input
            type="text"
            class="form-control"
            aria-label="Text input with dropdown button"
            v-model="userNameInput"
          />
          <ul class="dropdown-menu dropdown-userName scroll-box" v-show="showUserNameDropdown">
            <li
              v-for="(item,index) in userNameList"
              :key="index"
              @click="loadDetail(item.userNo,item.userName,item.latitude,item.longitude,item.communityName,item.communityCode)"
            >{{item.userName|ellipsis}}( {{item.userNo}})
            </li>
          </ul>
        </div>
      </div>
      <!--搜索栏//-->
      <!--数据栏-->
      <dl class="data-box">
        <dt>居民用水户数</dt>
        <dd>
          <span class="number01" v-for="(item,index) in waterCount_resident" :key="index">{{item}}</span>
        </dd>
        <dt>非居民用水户数</dt>
        <dd>
          <span class="number01" v-for="(item,index) in waterCount_unresident" :key="index">{{item}}</span>
        </dd>
        <dt>特种用水户数</dt>
        <dd>
          <span class="number01" v-for="(item,index) in waterCount_special" :key="index">{{item}}</span>
        </dd>
        <dt>学校</dt>
        <dd>
          <span class="number01" v-for="(item,index) in waterCount_school" :key="index">{{item}}</span>
        </dd>
      </dl>
      <!--数据栏//-->

      <!--右侧按钮-->
      <div style="
            position: absolute;
            width: 40%;
            top: 0;
            right: 0;
            overflow: hidden;    
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          " :style="{height: showUserPanel ? '100%':'auto'}">
        <div class="btn-map-box" style="justify-content: space-evenly;display: flex;margin-top: .4rem;position: initial;width: 100%;">
          <a href="#" :class="{'btn-yhys':true,'active':mapType==1}" @click="swichType(1)">用户用水</a>
          <a href="#" :class="{'btn-yhqf':true,'active':mapType==2}" @click="swichType(2)">用户欠费</a>
          <a href="#" :class="{'btn-yhjf':true,'active':mapType==3}" @click="swichType(3)">用户缴费</a>
        </div>
        <div class="user-detail" v-show="showUserPanel">
          <div class="model-box">
            <!--四个装饰角-->
            <div class="top-horn-l"></div>
            <div class="top-horn-r"></div>
            <div class="bottom-horn-l"></div>
            <div class="bottom-horn-r"></div>
            <a class="close" @click="closeDlg"></a>
            <!--四个装饰角//-->
            <div class="content">
              <div class="analyzedata">
                <a href="javascript:;" @click="analyzedata=true" :style="{background:(analyzedata === true ? 'rgba(0, 108, 255, 0.31)':'')}">分析数据</a>
                <a href="javascript:;" @click="analyzedata=false" :style="{background:(analyzedata === true ? '':'rgba(0, 108, 255, 0.31)')}">用水监控</a>
              </div>
              <div class="line-7" v-if="analyzedata">
                <div class="content-mes">
                  <div class="input-group">
                    <div class="col-12">
                      <label class="label-text">用户名</label>
                      <input type="text" class="form-control" :value="userInfo.userName" disabled/>
                    </div>
                    <div class="col-12">
                      <label class="label-text">户号</label>
                      <input type="text" class="form-control" :value="userInfo.userNo" disabled/>
                    </div>
                    <div class="col-12">
                      <label class="label-text">地址</label>
                      <input type="text" class="form-control" :value="userInfo.userAddress" disabled/>
                    </div>
                    <div class="col-12">
                      <label class="label-text">状态</label>
                      <input type="text" class="form-control" :value="userInfo.state" disabled/>
                    </div>
                    <div class="col-12">
                      <label class="label-text">用户类型</label>
                      <input type="text" class="form-control" :value="userInfo.elecTypeName" disabled/>
                    </div>
                    <div class="col-12">
                      <label class="label-text">联系手机</label>
                      <input type="text" class="form-control" :value="userInfo.contactMobile" disabled/>
                    </div>
                    <div class="col-12">
                      <label class="label-text">余额</label>
                      <input type="text" class="form-control" :value="userInfo.money" disabled/>
                    </div>
                    <div class="col-12" v-if="mapType==1">
                      <label class="label-text">上月水量</label>
                      <input type="text" class="form-control" :value="userInfo.totalPower" disabled/>
                    </div>
                    <div class="col-12" v-if="mapType==1">
                      <label class="label-text">今年累计水量</label>
                      <input type="text" class="form-control" :value="userInfo.yearPower" disabled/>
                    </div>
                    <div class="col-12" v-if="mapType==3">
                      <label class="label-text">上月水费</label>
                      <input type="text" class="form-control" :value="userInfo.totalMoney" disabled/>
                    </div>
                    <div class="col-12" v-if="mapType==3">
                      <label class="label-text">今年总水费</label>
                      <input type="text" class="form-control" :value="userInfo.yearMoney" disabled/>
                    </div>
                    <div class="col-12" v-if="mapType==2">
                      <label class="label-text">当前欠费</label>
                      <input type="text" class="form-control" :value="userInfo.arrearsMoney" disabled/>
                    </div>
                    <div class="col-12" v-if="mapType==2">
                      <label class="label-text">欠费时长</label>
                      <input type="text" class="form-control" :value="userInfo.arrearMonths" disabled/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="line-7 Watermonitoring" v-else>
                <div class="content-mes">
                  <div class="input-group">
                    <div class="col-12" style="display: flex;">
                      <label class="label-text">数据采集状态</label>
                      <span style="flex: 1 1;text-align: end;"><i v-if="dataState === 0" class="el-icon-success" style="color:#10d410;font-size: .2rem;"></i><i v-else class="el-icon-warning" style="color:red;font-size: .2rem"></i></span>
                    </div>
                    <div class="col-12" style="display: flex;">
                      <label class="label-text">欠费状态</label>
                      <span style="flex: 1 1;text-align: end;"><i v-if="arrearState === 0" class="el-icon-success" style="color:#10d410;font-size: .2rem;"></i><i v-else class="el-icon-warning" style="color:red;font-size: .2rem"></i></span>
                    </div>
                    <div class="col-12">
                      <label class="label-text">当月累计水量</label>
                      <input type="text" class="form-control" :value="userInfo.monthPower" disabled/>
                    </div>
                    <div class="col-12">
                      <label class="label-text">当月累计水费</label>
                      <input type="text" class="form-control" :value="userInfo.monthMoney" disabled/>
                    </div>
                    <div class="col-12">
                      <label class="label-text">昨日用水量</label>
                      <input type="text" class="form-control" :value="userInfo.yesterdayPower" disabled/>
                    </div>
                    <div class="col-12">
                      <label class="label-text">昨日产生水费</label>
                      <input type="text" class="form-control" :value="userInfo.yesterdayMoney" disabled/>
                    </div>
                    <div class="col-12">
                      <label class="label-text">当前所在的阶梯</label>
                      <input type="text" class="form-control" :value="userInfo.nowLadderName" disabled/>
                    </div>
                    <div class="col-12">
                      <label class="label-text">当前水价</label>
                      <input type="text" class="form-control" :value="userInfo.nowLadder" disabled/>
                    </div>
                    <div class="col-12">
                      <label class="label-text">下一阶梯</label>
                      <input type="text" class="form-control" :value="userInfo.nextLadder" disabled/>
                    </div>
                    <div class="col-12">
                      <label class="label-text">本阶梯剩余水量</label>
                      <input type="text" class="form-control" :value="userInfo.remainLadderPower" disabled/>
                    </div>
                    <div class="col-12">
                      <label class="label-text">当前欠费</label>
                      <input type="text" class="form-control" :value="userInfo.arrearsMoney" disabled/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--        {path:'/userCenter/detail/index',params:{userNo:userInfo.userNo,userName:userInfo.userName}}-->
            <router-link
              :to="{name: 'userDetail',params: { userNo: userInfo.userNo }}"
              class="btn-back"
            >
              <span>查看详情</span>
            </router-link>
          </div>
        </div>
      </div>
      <!--右侧按钮//-->
    </div>
    <!--弹出层-->
   
    <!--弹出层//-->
  </div>
</template>
<style scoped>
  .btn-map-box>a{
    margin: 0;
  }
  .analyzedata{
    display: flex;
    justify-content: start;
    margin-bottom: .1rem;
  }
  .analyzedata a{
    padding: .05rem .2rem;
    color: #ffffff;
    font-size: .1rem;
    border-radius: 0.04rem;
    margin-right: .2rem;
    box-shadow: rgb(53, 129, 216) 0px 0px 0.05rem inset;
  }
  .analyzedata a:hover{
    background: rgba(0, 108, 255, 0.31);
  }
  .map-box .sertch-wrap .sertch-form .form-control:focus {
    border: 0;
    border-bottom: 1px solid #ffffff !important;
  }

  .dropdown-community {
    width: 2.2rem;
    left: -0.4rem;
    min-width: 1.8rem;
    color: #a3c1dd;
    text-align: center;
    background: #1669b1;
    height: 5rem;
    overflow-y: scroll;
  }

  .dropdown-community li {
    padding: 7px 0;
    border-bottom: none;
    cursor: pointer;
  }

  .dropdown-userNo {
    left: 1.65rem;
    width: 2.2rem;
    height: 5rem;
    min-width: 1.8rem;
    color: #a3c1dd;
    text-align: center;
    background: #1669b1;
  }

  .dropdown-userName {
    left: 4.2rem;
    width: 2.2rem;
    height: 5rem;
    min-width: 1.8rem;
    color: #a3c1dd;
    text-align: center;
    background: #1669b1;
  }

  .dropdown-userName li {
    padding: 7px 0;
    border-bottom: none;
    cursor: pointer;
  }

  .dropdown-userNo li {
    padding: 7px 0;
    border-bottom: none;
    cursor: pointer;
  }

  .user-detail {
    /* position: absolute; */
    right: 0.1rem;
    /* top: 0.8rem; */
    bottom: 0.1rem;
    /* width: 6rem; */
    /* height: 100%; */
    flex: 1 1;
    display: flex;
    align-items: center;
  }

  .user-detail .content .line-7 {
    padding-top: 0;
  }

  .user-detail .btn-back {
    position: initial;
    width: 2rem;
    height: 0.56rem;
    display: flex;
    margin: auto;
  }

  .user-detail .btn-back span {
    text-align: center;
    padding-left: 0;
    background-image: none;
  }

  .user-detail .model-box {
    position: relative;
    width: 4.5rem;
    /* height: 85%; */
    border: 2px solid #2681c0;
    /* position: absolute; */
    /* left: 60%; */
    /* margin-left: -2.6rem; */
    /* margin-top: 5%; */
    margin: auto;
    box-sizing: border-box;
    padding: 0.3rem;
    box-shadow: rgb(7, 109, 232) 0px 0px 0.4rem inset;
    background: rgba(10, 37, 79, 0.89);
    /* padding-bottom: 0.6rem; */
  }

  .user-detail .model-box.xylh {
    height: 93%;
    margin-top: 2%;
    padding-bottom: 0.3rem;
  }

  .user-detail .model-box .content {
    /* height: 100%; */
    overflow-y: auto;
  }

  .user-detail .model-box .content .title {
    left: 0;
    top: 0;
  }

  .user-detail .model-box.xylh .content .line-5 {
    height: auto;
    padding-top: 2.4rem;
    padding-bottom: 0.2rem;
  }

  .user-detail .model-box.xylh .xy-img {
    position: absolute;
    width: 3.41rem;
    height: 2.44rem;
    left: 50%;
    margin-left: -1.705rem;
    top: 0;
  }

  .user-detail .model-box.xylh .content .content-mes p {
    text-align: center;
    color: #ffffff;
    font-size: 0.16rem;
  }

  .user-detail .model-box .content .line-7 {
    max-height: 58.3333333333%;
    height: auto;
    margin-bottom: 0.2rem;
  }

  .user-detail .model-box .content .line-7,
  .model .model-box .content .line-5 {
    box-sizing: border-box;
    position: relative;
  }

  .user-detail .model-box .content-mes {
    height: 100%;
    box-sizing: border-box;
    font-size: 0.16rem;
  }

  .user-detail .model-box .top-horn-l {
    border-left: 0.02rem #ffffff solid;
    border-top: 0.02rem #ffffff solid;
    left: -1px;
    top: -1px;
    width: 0.1rem;
    height: 0.1rem;
  }

  .user-detail .model-box .top-horn-r {
    border-right: 0.02rem #ffffff solid;
    border-top: 0.02rem #ffffff solid;
    right: -1px;
    top: -1px;
    width: 0.1rem;
    height: 0.1rem;
  }

  .user-detail .model-box .bottom-horn-l {
    border-left: 0.02rem #ffffff solid;
    border-bottom: 0.02rem #ffffff solid;
    bottom: -1px;
    left: -1px;
    width: 0.1rem;
    height: 0.1rem;
  }

  .user-detail .model-box .bottom-horn-r {
    border-right: 0.02rem #ffffff solid;
    border-bottom: 0.02rem #ffffff solid;
    right: -1px;
    bottom: -1px;
    width: 0.1rem;
    height: 0.1rem;
  }

  .user-detail .model-box .pagination {
    margin: 10px 0;
    font-size: 0.16rem;
  }

  .user-detail .model-box .pagination .active {
    color: #00ffff;
    min-width: 3rem;
  }

  .user-detail .model-box .col-12 {
    display: table;
    line-height: 0.45rem;
    padding-bottom: 0;
  }

  .user-detail .model-box .Watermonitoring .col-12 {
    display: table;
    line-height: 0.45rem;
    padding-bottom: 0;
  }

  .user-detail .model-box .input-group {
    height: 100%;
  }

  .user-detail .model-box .label-text {
    width: 1.2rem;
    font-size: 0.16rem;
  }

  .user-detail .model-box .form-control {
    border: 0;
    border-bottom: 1px solid #00ffff;
    border-radius: 0;
    font-size: 0.16rem;
    color: #00ffff;
    padding-bottom: 2px;
    padding-top: 2px;
  }

  .user-detail .model-box .close {
    display: block;
    background: url(../../assets/img/close.png) no-repeat;
    /*  background: url(../../assets/img/btnClose.png) no-repeat;*/
    background-size: 100% 100%;
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    right: 0.05rem;
    top: 0.05rem;
    cursor: pointer;
  }
</style>

<script>
  import * as maptalks from "maptalks";
  import _ from "lodash";
  import "maptalks/dist/maptalks.css";
  import {
    getMapInfo,
    getUserCountByType,
    getUserNoAndNameByNoName,
    getUserAllInfo,
    getCommunityAll
  } from "@/api/usercenter";

  import {digitize} from "@/utils/utility";

  import marker1_1 from "@/assets/img/marker1_1.png";
  import marker1_2 from "@/assets/img/marker1_2.png";
  import marker1_3 from "@/assets/img/marker1_3.png";
  import marker1_4 from "@/assets/img/marker1_4.png";
  import marker1_5 from "@/assets/img/marker1_5.png";

  import marker2_1 from "@/assets/img/marker2_1.png";
  import marker2_2 from "@/assets/img/marker2_2.png";
  import marker2_3 from "@/assets/img/marker2_3.png";
  import marker2_4 from "@/assets/img/marker2_4.png";
  import marker2_5 from "@/assets/img/marker2_5.png";

  import marker3_1 from "@/assets/img/marker3_1.png";
  import marker3_2 from "@/assets/img/marker3_2.png";
  import marker3_3 from "@/assets/img/marker3_3.png";
  import marker3_4 from "@/assets/img/marker3_4.png";
  import marker3_5 from "@/assets/img/marker3_5.png";

  export default {
    name: "Home",
    components: {},
    created(){
      // console.log(this.$route.params)
    },
    filters: {
      ellipsis(value) {
        if (!value) return "";
        if (value.length > 3) {
          return value.slice(0, 3) + "...";
        }
        return value;
      }
    },
    data() {
      return {
        clickFlag: false,
        searchQueryIsDirty: false,
        isCalculating: false,
        analyzedata: true,
        community: [],
        communityName: "全部小区",
        communityCode: "",
        show: false,
        userNoInput: "",
        userNameInput: "",
        showUserNoDropdown: false, //控制是否显示户号查询下拉
        showUserNameDropdown: false, //控制是否显示户名查询下拉
        showUserPanel: false, //控制是否显示用户资料

        map: null, //地图对象
        markerLayer: {}, //标注图层
        level: 14, //地图当前级别，
        mapType: 1, //类型
        x1: 0, //左上角经度
        y1: 0, //左上角纬度
        x2: 0, //右下角经度
        y2: 0, //右下角纬度
        markerIcon: [
          [marker1_1, marker1_2, marker1_3, marker1_4, marker1_5],
          [marker2_1, marker2_2, marker2_3, marker2_4, marker2_5],
          [marker3_1, marker3_2, marker3_3, marker3_4, marker3_5]
        ],

        waterCount_special: [], //特种用水户数
        waterCount_resident: [], //居民用水户数
        waterCount_unresident: [], //非居民用水户数
        waterCount_school: [], //学校

        userNoList: [], //按户号查询的列表数据
        userNameList: [], //按户名查询的列表数据
        userInfo: {}, //查询出来的用户
        communityMarker: {},

        searchNo: ""
      };
    },
    watch: {
      userNoInput: function () {
        this.searchQueryIsDirty = true
        if(!this.clickFlag){
          this.searchUser(1)
        }
      },
      userNameInput: function () {
        this.searchQueryIsDirty = true
        // console.log('clickFlag', this.clickFlag)
        if(!this.clickFlag){
         this.searchUser(2)
        }
      },
    //  searchNo(newValue, oldValue) {
    //     this.doSearchNo();
    //  }
    },
    mounted() {
      this.initMap();
      this.getUserCount();
      this.loadCommunity();
    },
    beforeDestroy() {
      if (this.map) {
        this.map.remove();
      }
      this.map=null;
    },
    methods: {
      doSearchNo: function () {
        this.userNoInput = this.searchNo;
        this.searchUser(1);
      },
      closeDlg: function () {
        this.userNoInput = "";
        this.userNameInput = "";
        this.showUserPanel = false;
      },
      showCommunity: function () {
        if (this.show) this.show = false;
        else this.show = true;
      },
      chooseCommunity: function (code, name, lng, lat) {
        this.show = false;
        this.communityCode = code;
        this.communityName = name;
        // this.userNoInput = "";
        // this.userNameInput = "";
        let currentCenter = this.map.getCenter();
        //切换地图中心
        if (lng && lng > 0) {
          currentCenter.x = lng;
          currentCenter.y = lat;
          this.map.setCenter(currentCenter);
          this.map.setZoom(16);
        }
      },
      loadCommunity: function () {
        var that = this;
        let cachedCommunity = JSON.parse(sessionStorage.getItem("Community"));
        if (cachedCommunity) {
          that.community = cachedCommunity;
          return;
        }

        getCommunityAll()
          .then(res => {
            if (res.code === 200) {
              let data = res.data;
              data.unshift({
                communityCode: "",
                communityName: "全部小区",
                latitude: 0,
                longitude: 0
              });
              that.community = data;
              sessionStorage.setItem("Community", JSON.stringify(data));
            }
          })
          .catch(err => {
          });
      },
      swichType: function (type) {
        this.mapType = type;
        this.communityMarker.length = 0;
        this.loadMarkers();
      },
      //初始化地图
      initMap: function () {
        if (this.map) {
          this.map.remove();
        }
        this.map = new maptalks.Map("map", {
          center: [123.203978, 41.214225],
          zoom: 14,
          pitch: 60,
          minZoom: 1,
          maxZoom: 19,
          spatialReference: {
            projection: "baidu"
          },
          baseLayer: new maptalks.TileLayer("base", {
            urlTemplate:
              "http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1&ak=murqvIRayvQcLVNIhWYLRNHl30mlMwiA",
            subdomains: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            cssFilter: "contrast(60%) sepia(70%) invert(95%)  hue-rotate(340deg) saturate(80%)",//(对比度 深褐色转换比率 反转图像色值 调整的色环角度值 饱和度)
            attribution: "&copy; sunray"
          })
        });
        this.map.on("zoomend moveend", this.getMapStatus);
        this.getMapStatus();
        //this.loadMarkers();
      },
      //加载标注
      loadMarkers: function () {
        var that = this;
        let postData = {
          level: this.level,
          mapType: this.mapType,
          x1: this.x1,
          y1: this.y1,
          x2: this.x2,
          y2: this.y2
        };

        getMapInfo(postData)
          .then(response => {
            if (that.markerLayer) {
              that.map.removeLayer(this.markerLayer);
            }

            let rspData = response.data;
            that.markerLayer = new maptalks.VectorLayer("vector").addTo(that.map);
            for (var index in rspData) {
              var mk = rspData[index];
              //判断地图上是否已有此标注
              var markerFile =
                that.markerIcon[that.mapType - 1][parseInt(mk.value) - 1];
              var marker = new maptalks.Marker([mk.longitude, mk.latitude], {
                symbol: {
                  markerFile: markerFile,
                  markerWidth: 28,
                  markerHeight: 28,
                  markerDx: 0,
                  markerDy: 0,
                  markerOpacity: 1
                }
              });
              marker.mk = mk;
              marker.on("click", function (e) {
                that.markerClick(e);
              });

              marker.addTo(that.markerLayer);
            }
          })
          .catch(err => {
          });
      },
      markerClick: function (e) {
        let mk = e.target.mk;
        this.communityCode = mk.communityCode;
        this.communityName = mk.communityName;
        this.userNoInput = "";
        this.userNameInput = "";
        this.showUserPanel = false;
      },
      //获取地图状态
      getMapStatus: function () {
        let extent = this.map.getExtent();
        this.x1 = extent.xmin.toFixed(5);
        this.y1 = extent.ymax.toFixed(5);
        this.x2 = extent.xmax.toFixed(5);
        this.y2 = extent.ymin.toFixed(5);
        this.level = this.map.getZoom();
        this.loadMarkers();
      },
      //获取不同用水类别的用户数
      getUserCount: function () {
        let that = this;
        getUserCountByType()
          .then(response => {
            var list = response.data;
            list.forEach(function (row) {
              //居民用水户数
              if (row.elecTypeCode === "00") {
                that.waterCount_resident = digitize(row.count);
              }
              //非居民用水户数
              if (row.elecTypeCode === "01") {
                that.waterCount_unresident = digitize(row.count);
              }
              //特种用水户数
              if (row.elecTypeCode === "02") {
                that.waterCount_special = digitize(row.count);
              }
              if (row.elecTypeCode === "03") {
                that.waterCount_school = digitize(row.count);
              }
            });
          })
          .catch(err => {
          });
      },
      //按户号/用户名模模糊查询
      // _.debounce
      searchUser: _.debounce(function (type) {
        let that = this;
        this.isCalculating = true
        let userNo = this.userNoInput;
        let userName = this.userNameInput;
        this.userNoList = [];
        this.userNameList = [];
        that.showUserNoDropdown = false;
        that.showUserNameDropdown = false;
        if (type == 1) {
          if (userNo == "") return;
          // this.userNameInput = "";
        } else if (type == 2) {
          if (userName == "") return;
          // this.userNoInput = "";
        }
        let postData = {
          userName: userName,
          userNo: userNo,
          communityCode: this.communityCode
        };
        getUserNoAndNameByNoName(postData)
          .then(response => {
            this.isCalculating = false
            this.searchQueryIsDirty = false
            var list = response.data;
            if (list.length > 0) {
              if (type == 1) that.showUserNoDropdown = true;
              if (type == 2) that.showUserNameDropdown = true;
            }
            list.forEach(function (row) {
              if (type == 1) that.userNoList.push(row);
              else that.userNameList.push(row);
            });
          })
          .catch(err => {
          });
      },250),
      //获取某个用户资料
      loadDetail: function (userNo, userName, latitude, longitude, communityName, communityCode) {
        var that = this;
        this.showUserNoDropdown = false;
        this.showUserNameDropdown = false;
        this.communityName = communityName || "全部小区";
        this.communityCode = communityCode

        this.map.setCenter({
          x: longitude,
          y: latitude
        });
        this.map.setZoom(16);
        this.clickFlag = true
        setTimeout(()=>{
          this.clickFlag = false
        },1500)
        if(this.userNameInput!==userName)
        this.userNameInput = userName;
        if(this.userNoInput!==userNo)
        this.userNoInput = userNo;

        let postData = {
          userNo: userNo
        };
        getUserAllInfo(postData)
          .then(response => {
            // console.log(response)
            that.showUserPanel = true;
            that.userInfo = response.data;
          })
          .catch(err => {
          });
      }
    }
  };
</script>
