import store from '@/stores'
export function digitize(n) {  //接受一个number类参数，拆分成一个数组并返回
    var str = n + "";    //加上空字符中，把接收的参数转换为字符串
    var arr = [];         //声明结果空数组，稍后返回
    str.split("").forEach(function (item) {   //调用split，以空字符串为分隔符切割字符串并返回数组，在数组上调用forEach方法
        arr.push(parseInt(item));    //对传入的每个字符用pasreInt转换为数字并压入arr数组
    })
    return arr;  //返回结果数组
}



export function getPageCount(totalCount,pageSize){
    return parseInt(
        (totalCount + parseInt(pageSize) - 1) /
          parseInt(pageSize)
      );
}


export function initPage (obj, service, attr) {
  obj.page = {};
  obj.seachItems = {}
  obj.page.pageNum = 1;
  obj.page.totalNum = 1;
  obj.page.pageSize = 6;
  obj.page.totalCount = 0;
  obj.page.pageCount = 8;
  obj.dataInterceptor = null;

  // 改变页数
  obj.pageChange = function (nowPage) {
    obj.page.pageNum = nowPage
    obj.searchN();
  }
  // 查询指定页
  obj.searchCurrent = function (nowPage) { // 查询指定页[
    obj.page.pageNum = nowPage
    obj.searchN()
  }

  // 查询公共方法 查询第N页
  obj.searchN = function search () {
    store.dispatch('app/openLoading')
    service(Object.assign({pageNum: obj.page.pageNum,pageSize: obj.page.pageSize}, obj.seachItems)).then(r => {
      store.dispatch('app/closeLoading')
      if(attr){ obj[attr] = r.data[attr] } else { obj.dataList = r.data } // 若没指定封装的对象名默认 obj.dataList = r.data
      obj.page.pageNum = parseInt(r.data.pageNum) || 1;
      obj.page.pageSize = parseInt(r.data.pageSize) || 10;
      obj.page.totalCount = r.data.totalCount ? parseInt(r.data.totalCount) : 0;
      obj.page.totalNum = r.data.totalNum ? parseInt(r.data.totalNum) : 0;
      if(typeof(obj.dataInterceptor)==='function') obj.dataInterceptor(obj) // 数据处理
    }, r =>{
      store.dispatch('app/closeLoading')
    })
  }

}

