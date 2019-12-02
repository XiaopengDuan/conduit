// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/assembly.css"
import "./assets/css/element-customize.css"
import "./assets/css/style-index.css"
import "./assets/css/css.css"
import "./assets/css/cssa.css"
import "./assets/css/lodaing.css"
import App from './App'
import router from './router'
import store from './stores'

import global_ from './components/global'


//引入nprogress

import ElementUI from 'element-ui';

import './permission' // permission control

import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify);
// console.log('router', router)
Vue.use(ElementUI, {size: 'medium'});

// 简单配置
// NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 800, showSpinner: false })

Vue.prototype.GLOBAL = global_
Vue.config.productionTip = false
Vue.config.silent = true // 取消VUE 警告


// 文字过长以...显示 过滤器
Vue.filter('tooltip-filter', function (value, index) {
      if(!index) index = 6;
      return value && value.length > index?value.slice(0,index) + '...':value;
})
// 数字过长 过滤器
Vue.filter('formatNumber', function (value) {
  if (!value) return ''
  let num = parseInt(value)
  let r = ''
  if(num > 9999 && num<9999999) {
    r =  parseFloat(num/10000+'.'+ num%10000).toFixed(2) + '万'
  } else if (num> 9999999) {
    r = parseFloat(num/10000000+'.'+ num%10000000).toFixed(2) + '千万'
  } else {
    r = num
  }
  return r
})


// 下载文件
Vue.prototype.$downloadFile =function(data, fileName){
  if (!data) {
    return
  }
  // aLink.href = URL.createObjectURL(blob)
  let url = window.URL.createObjectURL(new Blob([data], {type: "application/x-rar-compressed"}))
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click();
  link.remove();
 };


/*
router.beforeEach((to, from, next) => {
  // NProgress.start()
  /!* 路由发生变化修改页面title *!/
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})
*/


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
