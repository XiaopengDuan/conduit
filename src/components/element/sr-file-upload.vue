<template>
    <el-dialog
        :title="msg_title"
        :visible.sync="dialogVisible"
        width="30%"
    >
            <div class="upload-div"> 
    <!--  -->
            <el-upload
            ref="upload"
            action=""
            :accept="accept"
            :http-request="requestFile" 
            :on-remove="handleRemove"
            :limit="1"
            :on-change="handlePreview"
            :file-list="fileList"
            :auto-upload="false">
            <el-button v-if="!files.length>0" size="mini" class="uploadButton positonCenter" type="primary">选择文件</el-button>
            <!-- <div slot="tip" v-if="down_model" class="el-upload__tip"><a style="color: blue;cursor: pointer" @click="down_model()">下载导入模板</a></div> -->
            </el-upload>
            <el-progress v-if="progcount!==0 && files.length>0" :status="str_progress_status" :percentage="progcount"></el-progress>
            </div>
             <span slot="footer" class="dialog-footer">
                 <span v-if="down_model" style="float: left;font-size: .15rem"><i class="el-icon-download" style="color: #185D9D;"></i><a style="color: #185D9D;cursor: pointer" @click="down_model()">下载导入模板</a></span>
                <el-button :loading="loadingFlag"  size="mini" type="primary" class="uploadButton" @click="requestFile()">上传</el-button>
            </span>
         </el-dialog>
</template>
<script>
import axios from 'axios' 
export default {
    name: 'srFileUpload',
    data(){
        return {
            dialogVisible: false,
            fileList: [],
            files: [],
            str_progress_status: 'success',
            loadingFlag: false,
            progcount: 12,// 进度条
            headers: {
              ticket: '',
              'Content-Type': 'multipart/form-data'
            },
        }
    },
    props:{
        msg_title:{
            type: String, // 弹出框标题名称
            default() {
                return '上传文件'
            }
        },
        down_model:{  // 点击下载模板 不填就不会显示
            type: Function,
            default() {
                return null
            }
        }
        ,
        name:{
            type: String, // 文件参数名 必须指定
            default() {
                return 'filesData'
            }
        },
        accept:{
            type: String, // 指定上传文件格式
            default() {
                return '.xls,.xlsx'
            }
        }
        ,
        action:{ // 传参地址 必须指定
            type: String, 
            default() {
                return ''
            }
        },
        restData:{ // 上传成功后刷新的父组件数据方法
            type: Function,
            default(){
                return null
            }
        }
    },
    mounted(){
        this.headers.ticket = this.$store.state.user.token
    },
    methods:{
       fileSubmit(){
           this.$refs.upload.submit()
       },
       handlePreview(file) {
          // console.log(file)
          this.files.push(file.raw)
        //   console.log(this.temp)
        },
        requestFile(param) {
         this.str_progress_status = 'success'
         if (this.files.length === 0) { 
              this.$message({
                  message: '请选择文件',
                  type: 'warning'
                });
              return  }

          /*
            
          */
          var url = this.$props.action
          var reader = new FormData()
          this.files.forEach(function (value, item) {
              reader.append('filesData', value)
          })
          let that = this
          this.loadingFlag = true
          this.progcount = 1
          axios.post(url, reader, { 
                headers: {
                'Content-Type': 'multipart/form-data',
                ticket: this.$store.state.user.token
                },
                onUploadProgress: progressEvent => {
                    // console.log('progressEvent', progressEvent)
                    let percent = (progressEvent.loaded / progressEvent.total * 100) | 0
                    that.progcount = percent
                }
         }).then(r=>{
             this.loadingFlag = false
             if(r.data.code===200){
                 this.$props.restData()
                 this.files = []
                 this.fileList = []
                 this.dialogVisible = false
                 this.$message({
                    message: r.data.msg,
                    type: 'success'
                    });
             } else {
                this.str_progress_status = 'exception'
                this.loadingFlag = false
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: r.data.msg,
                    type: 'warning'
                });
             }
         }).catch(r=>{
             this.str_progress_status = 'exception'
             this.loadingFlag = false
               this.$message({
                  message: '上传失败',
                  type: 'warning'
                });
            //   this.progcount = 0
         })

        },
        openDialog(){ // 打开弹窗
            this.dialogVisible = true
            this.files = []
            this.fileList = []
            this.progcount = 0
        },
        handleRemove(file, fileList) {
            // console.log('file', file)
            // console.log('fileList', this.fileList)
            this.str_progress_status = 'success'
            this.progcount = 0
            var index = -1
            this.files.forEach(function (v, i) {
                if (v === file.raw) {
                index = i
                }
            })
            if (index !== -1) {
                this.files.splice(index, 1)
            }
        },
        // handlePreview(file) {
        //     console.log(file);
        // },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
    }
}
</script>
<style scoped>
.el-dialog__body{
    padding: 20px 60px !important;
}
</style>