<template>
    <div style="padding-left: .1rem">
      <el-row>
        <el-col :span="20" style="word-wrap:break-word;padding-left: .2rem">
        
          <label v-for="(value, index) in dataList" :key="index" @click="beforeCursorNumberUpdete(index)" v-bind:class="{'sr-carousel-label in': index === cursorNumber, 'sr-carousel-label': index!==cursorNumber}">{{value}}</label>
        
        </el-col>
        <el-col :span="4">
          <el-row>
            <el-col :span="6">
              <i @click="beforeCursorNumberUpdete(cursorNumber>0?cursorNumber-1:cursorNumber)" class="el-icon-caret-left sr_icon"></i>
            </el-col>
            <el-col :span="6">
              <i v-if="flag" @click="flag = !flag" class="el-icon-video-pause sr_icon"></i>
              <i v-if="!flag" @click="flag = !flag" class="el-icon-video-play sr_icon"></i>
            </el-col>
            <el-col :span="6">
              <i @click="beforeCursorNumberUpdete(cursorNumber<dataList.length-1?cursorNumber+1:cursorNumber)" class="el-icon-caret-right sr_icon"></i>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "srCarousel", //  轮播组件
        data(){
          return {
            flag: true,
            timer: ''
          }
        },
        mounted(){
          this.timer = setInterval(this.play, 2000); // 定义定时器
        },
        model: {
          prop: 'vModel',// 指定v-model的参数名为vModel
          event: 'vModel_event'
        },
        props:{
          vModel:{
            type: String // 指定v-model的参数名为vModel
          },
          dataList: { // 轮播的数组
            type: Array,
            default: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          },
          cursorNumber: { // 轮播的下标
            type: Number,
            default: 0
          }
        },
        methods: {
          beforeCursorNumberUpdete(index){
            this.cursorNumber = index;
            this.$emit('on-cursorNumber-change', index);  
          },
          play() {
            if(this.flag){
              if(this.cursorNumber<this.dataList.length-1){
                this.cursorNumber++;
              } else {
                this.cursorNumber = 0;
              }
              this.$emit('on-cursorNumber-change', this.cursorNumber);
            }
          }
        },
      beforeDestroy() {
        clearInterval(this.timer);
      }
    }
</script>

<style scoped>
  .sr-carousel-label{
    padding-left: 8px;
    padding-right: 8px;
    color: #FFFFFF;
    font-size: 13px;
    cursor: pointer;
    display: inline-block
  }
  .in{
    font-size: 13px;
    background-color:  #1D86FE;
    border-radius: 25px;
  }
  .sr_icon{
    color: #12E6F9;
    cursor: pointer;
  }
  .sr_icon :hover{
  }
</style>
