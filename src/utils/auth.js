import Cookies from 'js-cookie'
const TokenKey = 'token'
const AccountInfo = 'accountInfo'


export function getstore(params) {
  if (!localStorage[params]) {
    return ''
  } else {
    var str = localStorage[params]
    return str
  }
}

export function removestore(params) {
  localStorage.removeItem(params)
}

export function setstore(item, params) {
  var str = JSON.stringify(params)
  localStorage[item] = str
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeAccountInfo(value) {
  let local_info_arr = getAccountInfo()
  let flag_num = accountIndexOf(local_info_arr,value)
  if(flag_num !==-1){
    local_info_arr.splice(flag_num,1)
  }
  return localStorage.setItem(AccountInfo, JSON.stringify(local_info_arr))
}

export function setAccountInfo(value) {
  let local_info_arr = getAccountInfo()
  let flag_num = accountIndexOf(local_info_arr,value)
  if(local_info_arr.length>3 || flag_num !== -1){
    if(flag_num !==-1){
      local_info_arr.splice(flag_num,1)
    } else {
      local_info_arr.shift()
    }
  }
  local_info_arr.push(value)
  localStorage.setItem(AccountInfo, JSON.stringify(local_info_arr))
}

export function getAccountInfo() {
  let r = localStorage.getItem(AccountInfo)?JSON.parse(localStorage.getItem(AccountInfo)):[]
  return r.constructor === Array ? r : []
}

function accountIndexOf(arr, data){
  let r = -1
  for(let i=0;i<arr.length;i++){
    if(data.userName === arr[i].userName){
       r = i
       break
    }
  }
  return r
}

