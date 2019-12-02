import { getToken, setToken, removeToken, setstore, getstore ,removestore } from '@/utils/auth'
import { toLogin, getLoginfo, Logout } from '@/api/auth'
import md5 from 'js-md5';
import router, { resetRouter,asyncRoutes } from '@/router'
import { get } from 'https';
const user = {
  namespaced: true,
  state:{
    token: getToken(),
    name: '',
    userKey: '',
    roles: [],
    menuPerms: [],
    permissions: {},
    datalist:['USERCENTER.USERDETAIL.DEFAULTLIST','USERCENTER.USERDETAIL.DETAIL_P1_1','USERCENTER.USERDETAIL.DETAIL_P1_1','USERCENTER.USERDETAIL','USERCENTER.USERDETAIL.DETAIL_P2_1_INFO','USERCENTER.USERDETAIL.DETAIL_P2_1','USERCENTER.USERDETAIL.DETAIL_P1_2','USERCENTER.USERDETAIL.DETAIL_P2_1','USERCENTER.USERDETAIL.DETAIL_P3_1','USERCENTER.USERDETAIL.DETAIL_P3_1','USERCENTER.USERDETAIL.DETAIL_P4_1','USERCENTER.USERDETAIL.DETAIL_P4_1','USERCENTER.USERDETAIL.DETAIL_P5_1','USERCENTER.USERDETAIL.DETAIL_P5_1','USERCENTER.USERDETAIL.DETAIL_P6_1','USERCENTER.USERDETAIL.DETAIL_P6_1','USERCENTER.WATERMONITOR','USERCENTER.WATERMONITOR.WATERMONITORDETAIL','USERCENTER.WATERMONITOR.WATERMONITORSINGLE','USERCENTER.WATERMONITOR.WATERMONITORHOUR','USERCENTER.USERREPORT.USERREPORT0','USERCENTER.USERREPORT.USERREPORT1','USERCENTER.USERREPORT.REPORT2','USERCENTER.USERREPORT.REPORT3','USERCENTER.USERREPORT.USERREPORT4','USERCENTER.REPORTDETAIL_P1','USERCENTER.REPORTDETAIL_P2','USERCENTER.REPORTDETAIL_P3','USERPROFILE','CHARGE','WMA.DATACOLLECTED','WMA.WATERACQUISITIONRATE','WMA.DATAREPORT.DATAACQUISITION','WMA.DATAREPORT.WATERMETERSTATISTICS','WMA','WMA.DATAREPORT.DATAACQUISITION','WMA.DATAREPORT.WATERMETERSTATISTICS','WMA.WMAINDEX','CHARGE.WATER.WATERUNDERPAIDCUSTOMERS','CHARGE.WATER.WATERUSERCURVEJUMP','CHARGE.WATER.WATERCURVEJUMP','CHARGE.WATER.ANALYSISUNDERPAIDCUSTOMERS','CHARGE.WATER.WATERCALENDARDAY','CHARGE.WATER.WATERHIGHFREQUENCYFLUCTUATION','CHARGE.WATER.WATERDAYSTATISTICS','CHARGE.ARREAR.ARREARQOQDIAGRAM','CHARGE.ARREAR.ARREARDIAGRAM','CHARGE.WATER.WATERMININIGHT.WATERMININIGHTPAGE1','CHARGE.WATER.WATERMININIGHT.WATERMININIGHTPAGE2','CHARGE.WATER.WATERQOQDIAGRAM','CHARGE.WATER.WATERMININIGHT.WATERMININIGHTPAGE1','CHARGE.WATER.WATERDAILYPEAK.WATERDAILYPEAKPAGE2','CHARGE.WATER.WATERMININIGHTLIST','CHARGE.WATER.WATERDAILYPEAK.WATERDAILYPEAKPAGE1','CHARGE.WATER.WATERDAILYPEAK.WATERDAILYPEAKPAGE1','CHARGE.WATER.WATERPRICETYPE','CHARGE.WATER.WATERUSERRANKING','CHARGE.WATER.WATERDAILYPEAKLIST','CHARGE.WATER.ELECTYPEUSEWATERLIST','CHARGE.WATER.WATERQOQLIST','CHARGE.WATER.ANALYSISUSEWATER','CHARGE.WATER','CHARGE.CALL.CALLANALYSIS','CHARGE.CALL.CALLPROMINENTPROBLEM','CHARGE.CALL.CALLPROMINENTPROBLEM','CHARGE.CALL.CALLSTATISTICSITEM','CHARGE.CALL.CALLLISTDETAILS','CHARGE.CALL.CHARGECALL','CHARGE.CALL','CHARGE.INCOME.INCOMEUSERLISTDETAILS','CHARGE.INCOME.INCOMEQOQDIAGRAM','CHARGE.INCOME.INCOMEWATERTYPE2','CHARGE.INCOME.INCOMEWATERTYPE','CHARGE.INCOME.INCOMEUSERTYPE2','CHARGE.INCOME.INCOMEUSERTYPE','CHARGE.INCOME.INCOMERESIDENTIALUSER2','CHARGE.INCOME.INCOMERESIDENTIALGRAPH','CHARGE.INCOME.INCOMERESIDENTIALUSER','CHARGE.INCOME.RATIO','CHARGE.INCOME','CHARGE.ARREAR.ARREARRESIDENTIALQUARTERS','CHARGE.ARREAR.ARREARUSERLISTDETAILS','CHARGE.ARREAR.ARREARUSERINFO','CHARGE.ARREAR.ARREARQOQDIAGRAM','CHARGE.ARREAR.ARREARDIAGRAM','CHARGE.ARREAR.ARREARWATERTYPE','CHARGE.ARREAR.ARREARWATERPROPERTIES','CHARGE.ARREAR.ARREARCONTINUOUS','CHARGE.ARREAR.ARREARINDEXCURVE','CHARGE.ARREAR.ARREARQOQLIST','CHARGE.ARREAR','CHARGE.CHARGEINDEX','WMA.DATAREPORT.WATERMETERSTATISTICS','WMA.DATAREPORT.DATAACQUISITION','WMA.WATERACQUISITIONRATE','WMA.DATACOLLECTED','AUTH.USER.AUTHUSERLIST','AUTH.USER.CHANGEPASSWORD','AUTH.USER.AUTHUSERUPDATE','AUTH.ROLE.AUTHROLELIST','AUTH','AUTH.AUTHINDEX','AUTH.MENU.AUTHMENUTREE','AUTH.MENU.AUTHMENULIST','AUTH.MENU.AUTHMENULISTUPDATE','AUTH.ROLE.AUTHROLEUPDATE'],
    userName: getstore('userName') ? JSON.parse(getstore('userName')) : '',
    thispath: getstore('THISPATH') ? JSON.parse(getstore('THISPATH')) : '',
    chargeindex: getstore('CHARGEINDEX')?JSON.parse(getstore('CHARGEINDEX')):'',
    userCenterindex: getstore('USERCENTERINDEX')?JSON.parse(getstore('USERCENTERINDEX')):'',
    wmaindex: getstore('WMAINGEX')?JSON.parse(getstore('WMAINGEX')):'',
    authindex: getstore('AUTHINDEX')?JSON.parse(getstore('AUTHINDEX')):'',
    jurisdiction: getstore('permissionCode')? getstore('permissionCode'):''
  },
  mutations:{
    JURISDICTION: (state, index) => {
      setstore('permissionCode',index)
      state.jurisdiction = index
    },
    CHARGEINDEX: (state, index) =>{
      state.chargeindex = index
    },
    USERCENTERINDEX: (state, index)=>{
      state.userCenterindex = index
    },
    WMAINGEX: (state,index)=>{
      state.wmaindex = index
    },
    AUTHINDEX: (state,index)=>{
      state.authindex = index
    },
    SET_USERKEY: (state, userKey) => {
      state.userKey = userKey
    },
    SET_MENUPERMS: (state, menuPerms) => {
      state.menuPerms = menuPerms
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    USER_NAME: (state, userName) => {
      state.userName = userName
    },
    THISPATH: (state, path) => {
      state.thispath = path
    }
  },
  actions:{
    logout({ commit, state }) {
      // console.log(getToken())
      if(getToken() === 'undefined'|| getToken() === undefined){
        router.push({
          name: 'login'
        })
      }
      Logout({ticket:getToken()}).then(r=>{
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_MENUPERMS', [])
        removeToken()
        resetRouter()
        setstore('menuIndex', 1)
        setstore('menuIndex2',1)
        setstore('meterdata',1)
        // localStorage.clear()
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
        router.push({
          name: 'login'
        })
      })
    },
    GETUSERCENTER({commit,state},data){
      if(data.pows[data.u].indexOf('USERCENTER') !== -1 && state.userCenterindex === ''){
        asyncRoutes.forEach(route => {
          let tmp = { ...route }
          if(tmp.meta && tmp.meta.permissionCode.indexOf('USERCENTER') !== -1) {
            let childrenlist = tmp.children
            childrenlist.forEach(s=>{
              if(s.meta.permissionCode === data.pows[data.u]) {
                let topath = "/"+s.path
                commit('USERCENTERINDEX',topath)
                setstore('USERCENTERINDEX',topath)
              }
            })
          }
        })
      }
    },
    LOGINUSERCENTER({commit,state},pows){
      asyncRoutes.forEach(route => {
        let tmp = { ...route }
        if(tmp.meta && tmp.meta.permissionCode.indexOf('USERCENTER') !== -1) {
          let childrenlist = tmp.children
          childrenlist.forEach(s=>{
            if(s.meta.permissionCode === pows[0]) {
              let topath = "/"+s.path
              commit('USERCENTERINDEX',topath)
              setstore('USERCENTERINDEX',topath)
              router.push({
                path: topath
              })
              commit('THISPATH',s,name)
              setstore('THISPATH',s.name)
            }
          })
        }
      })
    },
    GETWMA({commit,state},data) {
      if(data.pows[data.u].indexOf('WMA') !== -1 && state.wmaindex === ''){
        asyncRoutes.forEach(route => {
          let tmp = { ...route }
          if(tmp.meta && tmp.meta.permissionCode.indexOf('WMA') !== -1) {
            let childrenlist = tmp.children
            childrenlist.forEach(s=>{
              if(s.meta.permissionCode === data.pows[data.u]) {
                let topath = tmp.path+"/"+s.path
                commit('WMAINGEX',topath)
                setstore('WMAINGEX',topath)
              }
            })
          }
        })
      }
    },
    LOGINWMA({commit,state},pows){
      asyncRoutes.forEach(route => {
        let tmp = { ...route }
        if(tmp.meta && tmp.meta.permissionCode.indexOf('WMA') !== -1) {
          let childrenlist = tmp.children
          childrenlist.forEach(s=>{
            if(s.meta.permissionCode === pows[0]) {
              let topath = tmp.path+"/"+s.path
              commit('WMAINGEX',topath)
              setstore('WMAINGEX',topath)
              router.push({
                path: topath
              })
              commit('THISPATH',s,name)
              setstore('THISPATH',s.name)
            }
          })
        }
      })
    },
    GETCHARGE({commit,state},data){
      if(data.pows[data.u].indexOf('CHARGE') !== -1 && state.chargeindex === ''){
        asyncRoutes.forEach(route => {
          let tmp = { ...route }
          if(tmp.meta && tmp.meta.permissionCode.indexOf('CHARGE') !== -1) {
            let childrenlist = tmp.children
            childrenlist.forEach(s=>{
              if(s.meta.permissionCode === data.pows[data.u]) {
                let topath = tmp.path+"/"+s.path
                commit('CHARGEINDEX',topath)
                setstore('CHARGEINDEX',topath)
              }
            })
          }
        })
      }
    },
    LOGINCHARGE({commit,state},pows){
      asyncRoutes.forEach(route => {
        let tmp = { ...route }
        if(tmp.meta && tmp.meta.permissionCode.indexOf('CHARGE') !== -1) {
          let childrenlist = tmp.children
          childrenlist.forEach(s=>{
            if(s.meta.permissionCode === pows[0]) {
              let topath = tmp.path+"/"+s.path
              commit('CHARGEINDEX',topath)
              setstore('CHARGEINDEX',topath)
              router.push({
                path: topath
              })
              commit('THISPATH',s,name)
              setstore('THISPATH',s.name)
            }
          })
        }
      })
    },
    GETAUTH({commit,state},data){
      if(data.pows[data.u].indexOf('AUTH') !== -1 && state.authindex === ''){
        asyncRoutes.forEach(route => {
          let tmp = { ...route }
          if(tmp.meta && tmp.meta.permissionCode.indexOf('AUTH') !== -1) {
            let childrenlist = tmp.children
            childrenlist.forEach(s=>{
              let topath = s.name
              if(s.meta.permissionCode === data.pows[data.u] && data.pows[data.u] === 'AUTH.USER.AUTHUSERLIST') {
                commit('AUTHINDEX',topath)
                setstore('AUTHINDEX',topath)
              }else if(s.meta.permissionCode === data.pows[data.u] && data.pows[data.u] === 'AUTH.ROLE.AUTHROLELIST') {
                commit('AUTHINDEX',topath)
                setstore('AUTHINDEX',topath)
              }else if(s.meta.permissionCode === data.pows[data.u] && data.pows[data.u] === 'AUTH.MENU.AUTHMENULIST') {
                commit('AUTHINDEX',topath)
                setstore('AUTHINDEX',topath)
              }
            })
          }
        })
      }
    },
    LOGINAUTH({commit,state},pows) {
      asyncRoutes.forEach(route => {
        let tmp = { ...route }
        if(tmp.meta && tmp.meta.permissionCode.indexOf('AUTH') !== -1) {
          let childrenlist = tmp.children
          childrenlist.forEach(s=>{
            if(s.meta.permissionCode === pows[0]) {
              let topath = s.name
              commit('AUTHINDEX',topath)
              setstore('AUTHINDEX',topath)
              router.push({
                name: topath
              })
              commit('THISPATH',s,name)
              setstore('THISPATH',s.name)
            }
          })
        }
      })
    },
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_MENUPERMS', [])
        removeToken()
        resolve()
      })
    },
    login({ commit, state, dispatch }, userInfo) {
      const { userName, passWord } = userInfo
      return new Promise((resolve, reject) => {
        let md5PassWord = md5(passWord)
        toLogin({userName,passWord: md5PassWord}).then(response => {
          const { data } = response
          commit('SET_TOKEN', data.ticket)
          commit('USER_NAME', data.userName)
          // setstore('userName', data.userName)
          setToken(data.ticket)
          commit('CHARGEINDEX','')
          commit('USERCENTERINDEX','')
          commit('WMAINGEX','')
          commit('AUTHINDEX','')
          getLoginfo({ticket: data.ticket}).then(r=>{
            let res =JSON.parse(r.data)
            let pows = res.role[0].menuPerms.split(',')
            if(pows[0].indexOf('CHARGE') !== -1) {
              for(let u = 0;u < pows.length; u++){
                dispatch('GETUSERCENTER',{pows:pows,u:u})
                dispatch('GETWMA',{pows:pows,u:u})
                dispatch('GETAUTH',{pows:pows,u:u})
              }
              dispatch('LOGINCHARGE',pows)
            } else if(pows[0].indexOf('USERCENTER') !== -1){
              for(let u = 0;u < pows.length; u++){
                dispatch('GETCHARGE',{pows:pows,u:u})
                dispatch('GETWMA',{pows:pows,u:u})
                dispatch('GETAUTH',{pows:pows,u:u})
              }
              dispatch('LOGINUSERCENTER',pows)
            } else if(pows[0].indexOf('WMA') !== -1){
              for(let u = 0;u < pows.length; u++){
                dispatch('GETCHARGE',{pows:pows,u:u})
                dispatch('GETUSERCENTER',{pows:pows,u:u})
                dispatch('GETAUTH',{pows:pows,u:u})
              }
              dispatch('LOGINWMA',pows)
            } else if(pows[0].indexOf('AUTH') !== -1){
              for(let u = 0;u < pows.length; u++){
                dispatch('GETWMA',{pows:pows,u:u})
                dispatch('GETCHARGE',{pows:pows,u:u})
                dispatch('GETUSERCENTER',{pows:pows,u:u})
              }
              dispatch('LOGINAUTH',pows)
            }
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getInfo({ commit, state },path) {
      return new Promise((resolve, reject) => {
        getLoginfo({ticket: getToken()}).then(r=>{
          let res =JSON.parse(r.data)
          setstore('data',res)
          let pows = res.role[0].menuPerms.split(',')
          let data = {
            roles: ['admin'],
            menuPerms: pows,
            name: res.user.userName
          }
          commit('SET_ROLES', data.roles)
          commit('SET_MENUPERMS', data.menuPerms)
          commit('SET_NAME', data.name)
          commit('SET_USERKEY', res.user.key)
          resolve(data)
        }).catch(r=>{
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        })
      })
    },
  }
}
export default user
