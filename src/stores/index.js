import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/stores/modules/app' // 系统应用模块
import user from '@/stores/modules/user' // 用户应用模块
import permission from '@/stores/modules/permission' // 权限应用模块
import navIndex from '@/stores/modules/navIndex'
import getters from '@/stores/getters'

Vue.use(Vuex)
const modules = {
  app,
  user,
  permission,
  navIndex
}
// console.log(modules)
const store = new Vuex.Store({
  modules,
  getters
})

export default store
