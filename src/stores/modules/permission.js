import { asyncRoutes, constantRoutes } from '@/router'
const permission = {
  namespaced: true,
  state:{
    routes: [],
    addRoutes: []
  },
  mutations:{
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = routes
      // state.routes = constantRoutes.concat(routes)
    }
  },
  actions:{
    generateRoutes({ commit }, data) {
      return new Promise(resolve => {
        let accessedRoutes
        if (data.roles.includes('admin2')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes( asyncRoutes, data.menuPerms)
        }
       // console.log('accessedRoutes--->', JSON.stringify(accessedRoutes))
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}

export default permission

export function filterAsyncRoutes2(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    // console.log(tmp,123)
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes2(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.meta && tmp.meta.permissionCode && hasRouter(roles, tmp.meta.permissionCode)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  // console.log(res)
  return res
}


function treeParsToArray(tree){
  var sz = []
  forEachTree(tree, sz)
  return sz
}

function forEachTree(arr, sz){
   arr.forEach((value, index) => {
    var v = Object.assign({}, value)
    delete v.children
    sz.push(v)
     if(value.children && value.children.length>0){
      forEachTree(value.children, sz)
     }
   })
}

function hasRouter(roles, name){
  return roles.includes(name)
}

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
