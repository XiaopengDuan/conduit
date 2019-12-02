const getters = {
  loading: state => state.app.loading,
  exitZhengshu: state => state.app.exitZhengshu,
  keepAliveValue: state => state.app.keepAliveValue,
  serveHost: state => state.app.serveHost,
  leftMeunShowFlag: state => state.app.leftMeunShowFlag,
  leftMeunShowFlag2: state => state.app.leftMeunShowFlag2,
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roles,
  userKey: state => state.user.userKey,
  menuPerms: state => state.user.menuPerms,
  routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  callAnalysisindex: state => state.navIndex.callAnalysisindex,
  callAnalysisdatalist: state => state.navIndex.callAnalysisdatalist,
  thispath: state => state.user.thispath,
  record: state => state.navIndex.record,
  jurisdiction: state => state.user.jurisdiction
}
export default getters
