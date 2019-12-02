<template>
  <div class="full">
     <el-row style="display: flex;justify-content: space-between;">
       <el-col :span="8">
          <div style="border: 1px solid #409EFF;">
            <el-scrollbar style="height: 5.3rem;">
             <el-tree show-checkbox ref="leftTree" node-key="menuCode" :default-expand-all="true" style="min-height: 5.3rem" :data="leftData" :props="defaultProps"></el-tree>
            </el-scrollbar>
          </div>
       </el-col>
       <el-col :span="6">
         <div @click="treeToRight()" class="sr-transfer-button">
         <span >&gt;</span>
         </div>
         <div  @click="updateLeftData()" class="sr-transfer-button">
         <span> &lt; </span>
         </div>
       </el-col>
       <el-col :span="8">
          <div style="border: 1px solid #409EFF;">
            <el-scrollbar style="height: 5.3rem;">
             <el-tree show-checkbox ref="rightTree" node-key="menuCode" :default-expand-all="true" style="min-height: 5.3rem" :data="rightData" :props="defaultProps"></el-tree>
            </el-scrollbar>
          </div>
       </el-col>
     </el-row>
  </div>
</template>

<script>
  import TreeUtil from '@/utils/TreeUtil'
    export default {
        name: "srTransfer",
        props:{
          value: {
            type: Array,
            default() {
                return []
            }
          },
          options: {
            type: Array,
            default() {
              return []
            }
          },
          defaultProps: {
            type: Object,
            default() {
              return {
                children: 'subMenuList',
                label: 'menuName'
              }
            }
          }
        },
        computed: {
          watchOptions(){
            return this.$props.options
          },
          watchValue(){
            return this.$props.value
          }
        },
       watch:{
         // 初步计算穿梭框的值
         watchOptions(now, old){
            /*if(now !== old){
              this.leftData = [...now]
            } else {
              this.rightData = [...now]
            }*/
           this.valueUpdate()
          },
         watchValue() {
           this.valueUpdate()
           this.$emit('input', this.$props.value)
         },
         rightData(now, old){
           // this.add()
         }
       },
        mounted() {
          // console.log('options', this.$props.options)
          this.leftData = Object.assign({},this.$props.options)




        },
        data() {
            return {
              leftData: [],
              rightData: []
            }
        },
        methods: {
          valueUpdate(){
            let treeUtil = new TreeUtil()
            let searchTree = treeUtil.getSearchTree(this.$props.options, this.$props.value);
            let notSearchTree = treeUtil.getNotSearchTree(this.$props.options, this.$props.value);
            this.leftData = notSearchTree
            this.rightData = searchTree
          },
          treeToRight(){
            this.updateRightData()
          },
          updateModel(){
          },
          parsArryByTree(tree, arry){
            if(tree && tree.length>0){
              tree.forEach((value, index)=> {
                arry.push(value)
                this.parsArryByTree(value.subMenuList, arry)
              })
            }
          },
          insertTreeNode(tree, data){
            // 扁平化数据
            let arry = []
            this.parsArryByTree(tree, arry)
            // 判断是否存在
            if(!this.exitTreeData(arry,data.menuCode)){
              if(data.parentMenu === 'root'){ //如果是父级直接添加到数组
                tree.push(data)
              } else {
                this.addTreeChildNode(tree, data) // 判断父级添加
              }
            }
          },
          addTreeChildNode(arry, data){
            if(arry && arry.length>0){
              for(let i=0; i<arry.length; i++){
                if(arry[i].menuCode === data.parentMenu){
                  arry[i].subMenuList.push(data)
                } else {
                  this.addTreeChildNode(arry[i].subMenuList, data)
                }
              }
            }
          },
          exitTreeData(arry, key){ // 判断是否已经存在
            for(let i=0;i<arry.length; i++){
              if(arry[i].menuCode === key){
                return true
              }
            }
            return false
          },
          deleteTreeNodes(arry, data) {
            arry.forEach((value, index) => {
              this.deleteTreeChild(data, value.menuCode)
            })
          },
          deleteTreeChild(arry, key) {
            if(arry && arry.length>0){
              for(let i=0;i<arry.length;i++){
                if(arry[i].menuCode === key){
                  if(!arry[i].subMenuList || arry[i].subMenuList.length === 0){
                    arry.splice(i, 1)
                  }
                } else {
                  this.deleteTreeChild(arry[i].subMenuList, key)
                }
              }
            }
          },
          updateRightData(){
            let arry = JSON.parse(JSON.stringify(this.$refs.leftTree.getCheckedNodes(false,true)))
            let rightData = JSON.parse(JSON.stringify(this.rightData))
            let leftData = JSON.parse(JSON.stringify(this.leftData))
            /*** 移动***/
            arry.forEach((value, index) => {
              value.subMenuList = []
              this.insertTreeNode(rightData, value)
            })
            this.rightData = rightData
            this.add()
            arry = arry.reverse() // 数组倒序
           /***** 删除 ****/
            this.deleteTreeNodes(arry, leftData)
            this.leftData = leftData
          },
          updateLeftData(){
            let arry = JSON.parse(JSON.stringify(this.$refs.rightTree.getCheckedNodes(false,true)))
            let rightData = JSON.parse(JSON.stringify(this.rightData))
            let leftData = JSON.parse(JSON.stringify(this.leftData))
            /*** 移动***/
            arry.forEach((value, index) => {
              value.subMenuList = []
              this.insertTreeNode(leftData, value)
            })
            this.leftData = leftData
            arry = arry.reverse() // 数组倒序addTreeChildNode
            /***** 删除 ****/
            this.deleteTreeNodes(arry, rightData)
            this.rightData = rightData
            this.add()
          },
          getRightData(arr, sz){
            arr.forEach((value,index) => {
              sz.push(value.key);
              if(value.subMenuList && value.subMenuList.length>0){
                this.getRightData(value.subMenuList, sz)
              }
            })
          },
          add(){
            this.$props.value = []
            this.getRightData(this.rightData, this.$props.value)
          }
      }
    }
</script>

<style scoped>
 .sr-transfer-button{
   background-color: #012EA2;
   text-align: center;
   color: #FFFFFF;
   width: 1rem;
   margin: 1rem auto;
   cursor: pointer;
 }
 .sr-transfer-button:hover{
   background-color: rgb(30, 76, 192)
 }
</style>
