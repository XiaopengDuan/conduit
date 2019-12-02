import axios from 'axios'
import mapping from '../api/mapping.json'
import store from '@/stores'
import router from '@/router'
import md5 from 'js-md5'
import { getToken,removeToken,removestore } from '@/utils/auth'
import {Message} from 'element-ui'
const baseUrl = "http://192.168.1.21:10001/"
//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Cache-Control'] = 'max-age=3000'
// axios.defaults.withCredentials = true;
const service = axios.create({
  baseURL: baseUrl, // api 的 base_url
  withCredentials: false,
  timeout: 30000, // request timeout
});

service.interceptors.request.use(
  config => {
   let token = getToken()
  // console.log('ticket------------->',token)
    if (token) {
      config.headers.common['ticket'] = token
      config.headers.common['sessionid'] = md5(store.getters.jurisdiction)
    }
    let o = mapping[config.url];
    if (o) {
      config.url = `/${o.name}`;
      config.baseURL = o.origin ;
    }
    return config
  },
  error => {
    // console.log(error);
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get information such as headers or status
   * Please return  response => response
   */
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 XMLHttpRequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (response.status === 200) {
      store.dispatch('navIndex/RECORDINITS')
      if(response.data && (response.data.code===0 || response.data.code===200)){
        return Promise.resolve(res)
      }else if(response.data && response.data.code===499 && store.getters.record === 0){
        store.dispatch('navIndex/RECORDS')
        Message({
          message: '登录信息已失效',
          type: 'warning',
          duration: 5 * 1000
        })
        removestore('CHARGEINDEX')
        removestore('USERCENTERINDEX')
        removestore('WMAINGEX')
        removestore('AUTHINDEX')
        removestore('get01IndexIncomeTop3Statistics')
        removestore('getArrearCommunityCountList')
        removestore('getCommunityCallTopTen')
        removestore('get02IndexIncomeTop6Statistics')
        removestore('getArrearCommunityCountRadar')
        removestore('getCommunityUseWaterRank')
        removestore('data')
        removeToken()
        router.push({
          name: 'login'
        })
        return Promise.resolve(res)
      } else {
        if(response.data.code === 92005 && store.getters.record > 0){
          return false
        }
        if(response.data.code === 499 || response.data.code === 92005){
          store.dispatch('navIndex/RECORDS')
          store.dispatch('user/logout')
          removestore('CHARGEINDEX')
          removestore('USERCENTERINDEX')
          removestore('WMAINGEX')
          removestore('AUTHINDEX')
          removestore('data')
          removestore('get01IndexIncomeTop3Statistics')
          removestore('getArrearCommunityCountList')
          removestore('getCommunityCallTopTen')
          removestore('get02IndexIncomeTop6Statistics')
          removestore('getArrearCommunityCountRadar')
          removestore('getCommunityUseWaterRank')
          removeToken()
          router.push({
            name: 'login'
          })
        }
        Message({
          message: response.data.msg,
          type: 'warning',
          duration: 5 * 1000
        })
        store.dispatch('app/closeLoading')
        return Promise.reject(response)
      }
    } else if(response.status === 501){
      Message({
        message: response.message,
        type: 'warning',
        duration: 5 * 1000
      })
      return Promise.reject(response)
    }
  },
  (error,res2) => {
    // console.log(error.response.data.code)
    if(error.response.data.code === 499 && store.getters.record === 0){
      store.dispatch('navIndex/RECORDS')
      Message({
        message: '登录信息已失效,请重新登录',
        type: 'warning',
        duration: 5 * 1000
      })
      removestore('CHARGEINDEX')
      removestore('USERCENTERINDEX')
      removestore('WMAINGEX')
      removestore('AUTHINDEX')
      removestore('data')
      removestore('get01IndexIncomeTop3Statistics')
      removestore('getArrearCommunityCountList')
      removestore('getCommunityCallTopTen')
      removestore('get02IndexIncomeTop6Statistics')
      removestore('getArrearCommunityCountRadar')
      removestore('getCommunityUseWaterRank')
      removeToken()
      router.push({
        name: 'login'
      })
      store.dispatch('user/resetToken')
      return Promise.resolve(error)
    }
    store.dispatch('app/closeLoading')
    return Promise.reject(error)
  }
)

export default service
