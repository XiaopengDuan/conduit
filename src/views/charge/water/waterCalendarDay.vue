<template>
  <div class="right right3">
    <div class="right-content">
      <!--四个装饰角-->
      <div class="top-horn-l"></div>
      <div class="top-horn-r"></div>
      <div class="bottom-horn-l"></div>
      <div class="bottom-horn-r"></div>
      <a href="javaScript: void (0)" @click="$store.dispatch('app/resetKeepAive',$options.name);$router.go(-1)" class="btn-back"><span>返回上一级</span></a>
      <div class="scroll-box">
        <div class="tablecont-box">
        <div class="sharetitle">天日历统计
          <div class="input-group-btn">
            <el-select @change="findCommunityMonthPreDayPowerMoney" v-model="communityCode" placeholder="请选择地域">
              <el-option
                v-for="item in communityOption"
                :key="item.communityCode"
                :label="item.communityName"
                :value="item.communityCode">
              </el-option>
            </el-select>
          </div>
          <div class="input-group-btn">
            <el-date-picker
              @change="findCommunityMonthPreDayPowerMoney"
              v-model="dateTime"
              value-format="yyyyMM"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </div>
        </div>
        <div style="padding-left: .5rem;padding-right: 0.5rem;">
          <table class="calendar-table" cellpadding="0" cellspacing="0">
            <thead>
            <tr>
              <th>星期日</th>
              <th>星期一</th>
              <th>星期二</th>
              <th>星期三</th>
              <th>星期四</th>
              <th>星期五</th>
              <th>星期六</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="(value, index) in calendarTable" :key="index">
              <td v-for="(v,i) in value" :key="i"
                    @mouseenter="mouseenterSelect(v)"
                    @mouseleave="mouseleaveSelect(v)"
                    :class="{'echarts-active-td': activeTrNumber === v}"
              >
                <div class="calendar-table-title" v-if="v > 0">{{v}}日</div>
                <div
                  class="calendar-table-title"
                  style="color: #0275B5"
                  v-if="v < 0"
                >{{v * -1}}日</div>
                <div class="calendar-table-conten" v-if="v > 0" style="cursor: pointer" @click="link_day(value, v)">
                  <div style="color: #00ECFF">水量：{{calendarValue(v,'power')}}T</div>
                  <div style="color: #F5680E">水费：￥{{calendarValue(v,'money')}}</div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <div style="height: 3.7rem;width: 100%">
            <incomeLineEchars ref="mycanv"  :activeTrNumber.sync="activeTrNumber" :series="draw_line_series" :xData="draw_line_xData"></incomeLineEchars>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import incomeLineEchars from '@/components/echars/income-line-echars'
  import { getCommunityMonthPreDayPowerMoney } from '@/api/chargeWater'
  import { getCommunityAll } from '@/api/usercenter'
    export default {
        name: "waterCalendarDay",
        components: {incomeLineEchars},
        mounted() {
          this.getCommunitySelectInfo()
          let seachItems = JSON.parse(this.$route.params.seachItems);
          // console.log(seachItems)
          this.dateTime = seachItems.month;
          this.communityCode = seachItems.communityCode;
          this.userNo = seachItems.user_no
          this.findCommunityMonthPreDayPowerMoney();
          // this.initCalendar();
        },
        computed:{
          calendarValue() {
            return function(i, v) {
              return this.calendars.length > 1 && this.calendars[i-1]
                ? this.calendars[i-1][v]
                : "";
            };
          }
        },
        data() {
            return {
              calendarTable: [],
              dateTime: '201905',
              calendars:  [],
              communityCode: '',
              communityOption: [],
              calendars: [],
              draw_line_series: [],
              draw_line_xData: [],
              activeTrNumber: -1,
              userNo: ''

            }
        },
        methods: {
          mouseenterSelect(index) {
            this.$refs.mycanv.mouseenterSelect(index)
          },
          mouseleaveSelect(index) {
           this.$refs.mycanv.mouseleaveSelect(index)
          },
          link_day(value, day){
            console.log(this.dateTime + (day>10?day:'0'+day),this.communityCode, this.userNo)
            this.$router.push({
              name: 'waterDayStatistics',
              params: {seachItems: JSON.stringify({dataValue: this.dateTime + (day>10?day:'0'+day), communityCode: this.communityCode, userNo: this.userNo})}
            })
          },
          initCalendar(data) {
            data = this.dateTime;
            const momentDate = moment(data, "YYYYMM");
            const daysArr = [[], [], [], [], [], []]; // 
            const currentWeekday = momentDate.date(1).weekday(); // 获取当月1日为星期几
            const currentMonthDays = momentDate.daysInMonth(); // 获取当月天数
            const lastMonthDays = momentDate.subtract(1, "months").daysInMonth(); // 获取上月天数
            const getDay = day =>
              day <= lastMonthDays
                ? day
                : day <= lastMonthDays + currentMonthDays
                ? day - lastMonthDays
                : day - (lastMonthDays + currentMonthDays); // 日期处理
            for (let i = 1; i <= 7; i += 1) {
              let virtualDay = lastMonthDays - currentWeekday + i;
              for (let j = 0; j < 6; j += 1) {
                // 不是本月的转为负数
                let number = getDay(virtualDay + j * 7);
                if (j <= 1 && number > 15) {
                  number = number * -1;
                }
                if (j >= 4 && number < 14) {
                  number = number * -1;
                }
                daysArr[j][i - 1] = number;
              }
            }
            if(daysArr[5][0]<0){
              daysArr.pop()
            }
            // console.log("daysArr", daysArr);
            this.calendarTable = daysArr;
          },
          getCommunitySelectInfo(){
            getCommunityAll().then(r => {
              this.communityOption = r.data
              this.communityOption.unshift({communityCode: '',communityName: '查看全部'})
            })
          },
          findCommunityMonthPreDayPowerMoney(){
            this.$store.dispatch('app/openLoading')
            getCommunityMonthPreDayPowerMoney({month: this.dateTime,communityCode: this.communityCode, userNo: this.userNo}).then(r => {
              this.$store.dispatch('app/closeLoading')
              // console.log('r->', r)
              this.calendars = r.data.table
              this.draw_line_series.push({name: '水费', data:r.data.moneys})
              this.draw_line_series.push({name: '总水费', data:r.data.powers})
              this.draw_line_xData = r.data.times
              this.initCalendar();
            })
          }
        }
    }
</script>

<style scoped>
.right3{
  padding-bottom: 0!important;
}
.right3 .right-content{
  padding-bottom: 0!important;
}
.right3 .tablecont-box{
  padding-bottom: 0!important;
  padding-top: 1rem!important;
}
</style>
