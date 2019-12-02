<template>
  <div class="right">
    <div class="right-content">
      <!--四个装饰角-->
      <div class="top-horn-l"></div>
      <div class="top-horn-r"></div>
      <div class="bottom-horn-l"></div>
      <div class="bottom-horn-r"></div>
      <!--四个装饰角//-->
      <!--右上角按钮-->
      <a href="javascript: void (0)" @click="link_userTab()" class="btn-back"><span>返回上一级</span></a>
      <div style="height: 100%;padding:1rem 0.3rem 0.3rem 0.3rem;box-sizing: border-box;">
        <div class="graph-conten" style="border-top: 0px;border-left: 0px">
          <div class="table-wrap" style="border-right: 0px">
            <div class="table-title">
              <div class="text">{{$route.params.typeName}}</div>
            </div>
            <table class="table table-striped">
              <thead>
                <tr class="twoHead">
                  <th colspan="1" rowspan="2">日期</th>
                  <th colspan="1" rowspan="2">应收</th>
                  <th colspan="1" rowspan="2">实收</th>
                  <th colspan="1" rowspan="2">净利润</th>
                  <th colspan="4">歉收因素(元)</th>
                </tr>
                <tr class="twoHead">
                  <th>欠费</th><th>呆账</th><th>减免</th><th>代收</th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="(value, index) in xData.slice(0,6)" :key="index" :class="{'echarts-active-tr': activeTrNumber === index}" @mouseenter="mouseenterSelect(index)" @mouseleave="mouseleaveSelect(index)">
                <td>{{value}}</td>
                <td>{{series[0].data[index]}}</td>
                <td>{{series[1].data[index]}}</td>
                <td>{{series[6].data[index]}}</td>
                <td>{{series[2].dataMoney[index]}}</td>
                <td>{{series[3].dataMoney[index]}}</td>
                <td>{{series[4].dataMoney[index]}}</td>
                <td>{{series[5].dataMoney[index]}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="graph-conten" style="border-top: 0px;border-right: 0px">
          <div class="table-wrap" style="border-right: 0px">
            <div class="table-title">
              <div class="text">{{$route.params.typeName}}</div>
            </div>
            <table class="table table-striped">
              <thead>
              <tr class="firstHead">
                <th colspan="1" rowspan="2">日期</th>
                <th colspan="1" rowspan="2">销售额</th>
                <th colspan="1" rowspan="2">实收</th>
                <th colspan="1" rowspan="2">净利润</th>
                <th colspan="4">歉收因素</th>
              </tr>
              <tr class="twoHead">
                <th>欠费</th><th>呆账</th><th>减免</th><th>代收(元)</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(value, index) in xData.slice(6,12)" :key="index" :class="{'echarts-active-tr': activeTrNumber2 === index}" @mouseenter="mouseenterSelect2(index)" @mouseleave="mouseleaveSelect2(index)">
                <td>{{value}}</td>
                <td>{{series[0].data[index + 6]}}</td>
                <td>{{series[1].data[index + 6]}}</td>
                <td>{{series[6].data[index + 6]}}</td>
                <td>{{series[2].dataMoney[index + 6]}}</td>
                <td>{{series[3].dataMoney[index + 6]}}</td>
                <td>{{series[4].dataMoney[index + 6]}}</td>
                <td>{{series[5].dataMoney[index + 6]}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="graph-conten" style="border-bottom: 0px;border-left: 0px">
          <incomeLineEchars v-model="lineValue" :series="draw_line_series" :xData="draw_line_xData" :canvs="canvs" :resdatad="resdatad"></incomeLineEchars>
        </div>
        <div class="graph-conten" style="border-bottom: 0px;border-right: 0px">
          <div style="height: 80%;width: 100%">
            <incomePieEchars ref="pieE" v-model="lineValue" :echartsData="echartsData"  :canvs="canvs2"></incomePieEchars>
          </div>
          <div style="width: 100%">
            <srCarousel :cursorNumber="cursorNumber" @on-cursorNumber-change="cursorNumberChange" :dataList="carouselDataList"></srCarousel>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<style scoped>
  .table-wrap .table-title2{
    height: .5rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .right-content{
    max-height: none
  }
  .table-wrap .table-title2 .text {
    background: rgba(12, 35, 52, 0.6);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    line-height: .5rem;
    padding-left: .5rem;
    box-sizing: border-box;
    color: #f8f10b;
    font-weight: bold;
}
</style>
<script>
  import incomeLineEchars from '@/components/echars/income-line-echars'
  import incomePieEchars from '@/components/echars/income-pie-echars'
  import srCarousel from '@/components/element/sr-carousel'
  import { get33CommunityDetailStatistics, get43UserTypeDetailStatistics, get53PriceTypeDetailStatistics } from '@/api/charge'
  export default {
    name: "incomeResidentialGraph",
    components: {incomeLineEchars, incomePieEchars, srCarousel},
    data(){
      return {
        lineValue: '',
        cursorNumber: 0, // let a = 0;
        draw_line_series: [],
        draw_line_xData: [],
        series: [],
        xData: [],
        carouselDataList: [],
        echartsData: [
          // {value:425, name:'欠费'},
          // {value:310, name:'呆账'},
          // {value:274, name:'减免'}
        ],
        myChart: {},
        echartsDatas: [],
        activeTrNumber: '',
        activeTrNumber2: '',
        tt: '',
        tt2: ''
      }
    },
    methods: {
      resdatad(index) {
        this.activeTrNumber = index
        this.activeTrNumber2 = index-6
        this.cursorNumber = index
        this.$refs.pieE.changeData(this.echartsDatas[index])
        this.tt.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        })
        this.tt.dispatchAction({
          type: 'highlight',
          seriesIndex: [0,1],
          dataIndex: index
        })
        this.tt2.dispatchAction({
          type: 'downplay',
          seriesIndex: [0,1],
          dataIndex: index
        })
      },
      canvs(e) {
        this.tt = e
      },
      canvs2(e) {
        this.tt2 = e
      },
      mouseenterSelect(index){
        if(index>=0){
          this.activeTrNumber = index;
          this.cursorNumber=index
          this.tt.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index
          })
          this.tt.dispatchAction({
            type: 'highlight',
            seriesIndex: [0,1],
            dataIndex: index
          })
          this.tt2.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index
          })
          this.tt2.dispatchAction({
            type: 'highlight',
            seriesIndex: [0,1],
            dataIndex: index
          })
        }
      },
      mouseleaveSelect(index){
        if(index>0){
          this.tt.dispatchAction({
            type: 'downplay',
            seriesIndex: [0,1],
            dataIndex: index
          })
          this.tt2.dispatchAction({
            type: 'downplay',
            seriesIndex: [0,1],
            dataIndex: index
          })
        }
      },
      mouseenterSelect2(index){
        if(index>=0){
          this.activeTrNumber2 = index;
          this.cursorNumber=index+6
          this.$refs.pieE.changeData(this.echartsDatas[index+6])
          this.tt.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index+6
          })
          this.tt.dispatchAction({
            type: 'highlight',
            seriesIndex: [0,1],
            dataIndex: index+6
          })
          this.tt2.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: index+6
          })
          this.tt2.dispatchAction({
            type: 'highlight',
            seriesIndex: [0,1],
            dataIndex: index+6
          })
        }
      },
      mouseleaveSelect2(index){
        if(index>0){
          this.tt.dispatchAction({
            type: 'downplay',
            seriesIndex: [0,1],
            dataIndex: index+6
          })
          this.tt2.dispatchAction({
            type: 'downplay',
            seriesIndex: [0,1],
            dataIndex: index+6
          })
        }
      },
      cursorNumberChange(index){
        this.activeTrNumber = index;
        this.activeTrNumber2 = index-6;
        this.cursorNumber=index
        this.$refs.pieE.changeData(this.echartsDatas[index])
        this.tt.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: index
        })
        this.tt.dispatchAction({
          type: 'highlight',
          seriesIndex: [0,1],
          dataIndex: index
        })
        this.tt2.dispatchAction({
          type: 'downplay',
          seriesIndex: [0,1],
          dataIndex: index
        })
      },
      // getUserTypeDetailStatistics() {
      //   let value = this.$route.params
      //   get43UserTypeDetailStatistics({ typeCode: value.typeCode, typeName: value.typeName, userName: value.userName, userNo: value.userNo }).then(r => {
      //     this.draw_line_series = r.data.series
      //     this.draw_line_xData = r.data.xData
      //   })
      // },
      getCommunityDetailStatistics(){
        let value = this.$route.params
        this.$store.dispatch('app/openLoading')
        if(value.type === 'ResidentialUser') {
          get33CommunityDetailStatistics({ typeCode: value.typeCode, typeName: value.typeName, userName: value.userName, userNo: value.userNo }).then(r => {
            //FIX BUG 数据不足时补全数据
            this.Datarendering(r)
          })
        }else if(value.type === 'UserType') {
          get43UserTypeDetailStatistics({ typeCode: value.typeCode, typeName: value.typeName, userName: value.userName, userNo: value.userNo }).then(r => {
            //FIX BUG 数据不足时补全数据
            this.Datarendering(r)
          })
        }else if(value.type === 'WaterType') {
          get53PriceTypeDetailStatistics({ typeCode: value.typeCode, typeName: value.typeName, userName: value.userName, userNo: value.userNo }).then(r => {
            //FIX BUG 数据不足时补全数据
            this.Datarendering(r)
          });
        }
      },
      Datarendering(r) {
        this.$store.dispatch('app/closeLoading')
        let arr = [];
        arr.push(r.data.series[0]);
        arr.push(r.data.series[1]);
        let size = arr[0].data.length;
        let series = JSON.parse(JSON.stringify(r.data.series));
        let xData = JSON.parse(JSON.stringify(r.data.xData));
        for (let i = 0; (size < 12) && (i < (12 - size)); i++) {
          series[0].data.push('');
          series[1].data.push('');
          series[2].data.push('');
          series[3].data.push('');
          series[4].data.push('');
          xData.push('');
        }

        this.xData = xData;
        this.series = series;
        this.draw_line_series = arr;
        this.draw_line_xData = r.data.xData;
          this.carouselDataList = xData
        r.data.series[2].data.forEach((value, index)=>{
          this.echartsDatas.push([
            {value: parseInt(r.data.series[2].data[index].substring(0, r.data.series[2].data[index].length - 1)), name:'欠费'},
            {value: parseInt(r.data.series[3].data[index].substring(0, r.data.series[2].data[index].length - 1)), name:'呆账'},
            {value: parseInt(r.data.series[4].data[index].substring(0, r.data.series[2].data[index].length - 1)), name:'减免'},
            {value: parseInt(r.data.series[5].data[index].substring(0, r.data.series[2].data[index].length - 1)), name:'代收'}
          ])
        })
        this.$refs.pieE.changeData(this.echartsDatas[0])
      },
      link_userTab() {
        this.$router.go(-1);
      }
    },
    created() {
      this.getCommunityDetailStatistics()
    }
  }
</script>

<style scoped>
  .graph-conten{
    height: 49%;
    width: calc(50% - 1px);
    float: left;
    border: 1px solid #12E6F9;
  }
  .twoHead>th{
    height:auto!important
  }
</style>
