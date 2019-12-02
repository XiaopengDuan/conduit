import router from './router'
import store from './stores'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import { getToken,setstore } from '@/utils/auth' // get token from cookie
const whiteList = ['/login','/test', '/lostPassWord'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  //console.log(from)
  // start progress bar
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login'||to.path === '/lostPassWord') {
      // console.log('/')
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // console.log(123456789,to.matched.length)
        if (to.matched.length === 0) {
          next({ path: '/404' })
        } else {
          store.commit('user/JURISDICTION',to.meta.permissionCode)
          next()
        }
      } else {
        try {
          // 根据Token获取登录用户信息
          const data = await store.dispatch('user/getInfo',to.path)
          // 动态加载路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', data)
          // dynamically add accessible routes
          // if(to.path === '/'){
          //   console.log('eesfcsehdvusdbvuhsdagvuadsvachsdgh')
          // }
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          store.commit('user/JURISDICTION',to.meta.permissionCode)
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
