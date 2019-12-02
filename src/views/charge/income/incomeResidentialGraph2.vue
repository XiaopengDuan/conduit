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
              <tr>
                <th>日期</th>
                <th>应收</th>
                <th>实收</th>
                <th>歉收因素占比<br>欠费|呆账|减免</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(value, index) in xData.slice(0,6)" :key="index" :class="{'echarts-active-tr': activeTrNumber === index}" @mouseenter="mouseenterSelect(index)" @mouseleave="mouseleaveSelect(index)">
                <td>{{value}}</td>
                <td>{{series[0].data[index]}}</td>
                <td>{{series[1].data[index]}}</td>
                <td>{{series[2].data[index]}}|{{series[3].data[index]}}|{{series[4].data[index]}}</td>
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
              <tr>
                <th>日期</th>
                <th>销售额</th>
                <th>实收</th>
                <th>歉收因素占比<br>欠费|呆账|减免</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(value, index) in xData.slice(6,12)" :key="index" :class="{'echarts-active-tr': activeTrNumber2 === index}" @mouseenter="mouseenterSelect2(index)" @mouseleave="mouseleaveSelect2(index)">
                <td>{{value}}</td>
                <td>{{series[0].data[index + 6]}}</td>
                <td>{{series[1].data[index + 6]}}</td>
                <td>{{series[2].data[index + 6]}}|{{series[3].data[index + 6]}}|{{series[4].data[index + 6]}}</td>
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
            <incomePieEchars  ref="pieE" v-model="lineValue" :canvs="canvs2"></incomePieEchars>
          </div>
          <div style="width: 100%">
            <srCarousel :cursorNumber="cursorNumber" :dataList="carouselDataList" @on-cursorNumber-change="cursorNumberChange"></srCarousel>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import incomeLineEchars from '@/components/echars/income-line-echars'
  import incomePieEchars from '@/components/echars/income-pie-echars'
  import srCarousel from '@/components/element/sr-carousel'
  import { get43UserTypeDetailStatistics } from '@/api/charge'
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
        echartsDatas: []
      }
    },
    methods: {
      resdatad(e) {
        this.activeTrNumber = e
        // this.activeTrNumber2 = e-6
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
        }
      },
      mouseleaveSelect(index){
        if(index>0){
          this.tt.dispatchAction({
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
      mouseleaveSelect2(index){
        if(index>0){
          this.tt2.dispatchAction({
            type: 'downplay',
            seriesIndex: [0,1],
            dataIndex: index
          })
        }
      },
      cursorNumberChange(index){
        this.activeTrNumber2 = index-6;
        this.cursorNumber=index
        this.$refs.pieE.changeData(this.echartsDatas[index])
        this.tt2.dispatchAction({
          type: 'downplay',
          seriesIndex: [0,1],
          dataIndex: index
        })
      },

      getCommunityDetailStatistics(){
        let value = this.$route.params
        this.$store.dispatch('app/openLoading')
        get43UserTypeDetailStatistics({ typeCode: value.typeCode, typeName: value.typeName, userName: value.userName, userNo: value.userNo }).then(r => {
          //FIX BUG 数据不足时补全数据
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
              {value: parseInt(r.data.series[4].data[index].substring(0, r.data.series[2].data[index].length - 1)), name:'减免'}
            ])
          })
          this.$refs.pieE.changeData(this.echartsDatas[0])
        })
      },
      link_userTab() {
        this.$router.go(-1);
      }
    },
    created() {
      // console.log(this.$route.params.typeName)
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
</style>
