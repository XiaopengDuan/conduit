import NProgress from 'nprogress'
const app = {
  namespaced: true,
  state: {
    // loading: sessionStorage.getItem('loading') === null ? true : sessionStorage.getItem('test') || false, 刷新页面时重新获取
    loading: false,
    keepAliveValue: '',
    exitZhengshu: true,
    serveHost: 'https://39.152.209.97', 
    leftMeunShowFlag: false,
    leftMeunShowFlag2: false,
    // serveHost: '39.152.209.97:8085'
  },
  mutations: {
    SET_SERVEHOST: (state, serveHost) => {
      // sessionStorage.setItem('loading', loading)
      state.serveHost = serveHost
    },
    SET_LEFTMEUNSHOWFLAG: (state, leftMeunShowFlag) => {
      // sessionStorage.setItem('loading', loading)
      state.leftMeunShowFlag = leftMeunShowFlag
    },
    SET_LEFTMEUNSHOWFLAG2: (state, leftMeunShowFlag) => {
      // sessionStorage.setItem('loading', loading)
      state.leftMeunShowFlag2 = leftMeunShowFlag
    },
    SET_LOADING: (state, loading) => {
      // sessionStorage.setItem('loading', loading)
      state.loading = loading
    },
    SET_EXITZHENGSHU: (state, exitZhengshu) => {
      // sessionStorage.setItem('loading', loading)
      state.exitZhengshu = exitZhengshu
    },
    SET_KEEPALIVEVALUE: (state, keepAliveValue) => {
      // sessionStorage.setItem('loading', loading)
      state.keepAliveValue = keepAliveValue
    }
  },
  actions: {
    changeZS(context, d){
      context.commit("SET_EXITZHENGSHU", d);
    },
    openLoading(context){
      NProgress.start();
      // console.log('start')
      context.commit("SET_LOADING", true);
    },
    closeLoading(context){
      NProgress.done();
      // console.log('done')
      context.commit("SET_LOADING", false);
    },
    resetKeepAive(context, name) {
      const conf = context.state.keepAliveValue;
      let arr = context.state.keepAliveValue.split(',');
      if (name && typeof name === 'string') {
        let i = arr.indexOf(name);
        if (i > -1) {
          arr.splice(i, 1);
          context.commit("SET_KEEPALIVEVALUE", arr.join())
          // 销毁缓存500毫秒后重新启用缓存
          setTimeout(() => {
            context.commit("SET_KEEPALIVEVALUE", conf)
          }, 500);
        }
      }
    },
    resetKeepAliveAll(context){
      const conf = context.state.keepAliveValue;
      // 清空所有缓存
      context.commit("SET_KEEPALIVEVALUE", '')
      // 销毁缓存500毫秒后重新启用缓存
      setTimeout(() => {
        context.commit("SET_KEEPALIVEVALUE", conf)
      }, 500);
    }
  }
}
export default app
